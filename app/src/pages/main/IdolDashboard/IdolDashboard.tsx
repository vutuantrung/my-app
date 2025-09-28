import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

// ---------------- Types ----------------
export interface NodeDatum {
    id: string;
    group?: string;
    type?: string;
    size?: number;
    image?: string; // URL or object URL
    x?: number; y?: number; vx?: number; vy?: number; fx?: number | null; fy?: number | null;
}
export interface LinkDatum { source: string | NodeDatum; target: string | NodeDatum; weight?: number; }
export interface GraphData { nodes: NodeDatum[]; links: LinkDatum[]; }

export interface ForceGraphProps {
    data?: GraphData;
    width?: number;
    height?: number;
    initialCharge?: number; // default -400
    initialLinkDistance?: number; // default 80
}

// --------------- Demo ------------------
const demoData: GraphData = {
    nodes: Array.from({ length: 10 }, (_, i) => ({
        id: `N${i + 1}`,
        group: `G${i % 4}`,
        size: 10 + Math.round(Math.random() * 10),
        image: i % 4 === 0 ? `https://picsum.photos/seed/react${i}/160` : undefined,
    })),
    links: Array.from({ length: 18 }, () => {
        const a = Math.floor(Math.random() * 10), b = Math.floor(Math.random() * 10);
        return { source: `N${a + 1}`, target: `N${b + 1}`, weight: 1 + Math.floor(Math.random() * 3) } as LinkDatum;
    }).filter((d: any) => (d.source as string) !== (d.target as string)),
};

// ------------- Utilities ---------------
function useResizeObserver<T extends Element>(ref: React.RefObject<T>) {
    const [rect, setRect] = useState<DOMRect | null>(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const ro = new ResizeObserver(() => setRect(el.getBoundingClientRect()));
        ro.observe(el);
        setRect(el.getBoundingClientRect());
        return () => ro.disconnect();
    }, [ref]);
    return rect;
}

const sid = (d: Pick<NodeDatum, "id">) => String(d.id).replace(/[^a-zA-Z0-9_-]/g, "_");

// --------------- Component --------------
const ForceGraph: React.FC<ForceGraphProps> = ({
    data: initial = demoData,
    width = 1200,
    height = 800,
    initialCharge = -400,
    initialLinkDistance = 80,
}) => {
    const [data, setData] = useState<GraphData>(initial);
    const [selected, setSelected] = useState<NodeDatum | null>(null);
    const [charge, setCharge] = useState<number>(initialCharge);
    const [linkDist, setLinkDist] = useState<number>(initialLinkDistance);
    const [jsonText, setJsonText] = useState<string>("");
    const [imgPrefix, setImgPrefix] = useState<string>("./images/");
    const [imgExt, setImgExt] = useState<string>(".png");

    const svgRef = useRef<SVGSVGElement | null>(null);
    const rootRef = useRef<SVGGElement | null>(null);
    const defsRef = useRef<SVGDefsElement | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const tipRef = useRef<HTMLDivElement | null>(null);

    const rect = useResizeObserver(wrapRef);
    const color = useMemo(() => d3.scaleOrdinal<string, string>(d3.schemeTableau10 as unknown as string[]), []);

    // init containers & zoom once
    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        if (!rootRef.current) rootRef.current = svg.append("g").attr("id", "root").node() as SVGGElement;
        if (!defsRef.current) defsRef.current = (svg.select("defs").node() as SVGDefsElement) ?? svg.append("defs").node() as SVGDefsElement;

        const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.2, 6]).on("zoom", (e: any) => {
            d3.select(rootRef.current!).attr("transform", (e.transform as any));
        });
        svg.call(zoom as any);
        svg.call(zoom.transform as any, d3.zoomIdentity.translate(80, 40).scale(0.95));
    }, []);

    // main render effect
    useEffect(() => {
        if (!svgRef.current || !rootRef.current || !defsRef.current) return;

        const gRoot = d3.select(rootRef.current);
        const defs = d3.select(defsRef.current);

        const gLinks = gRoot.selectAll<SVGGElement, LinkDatum>("g.links").data([null as unknown as LinkDatum]).join("g").attr("class", "links");
        const gNodes = gRoot.selectAll<SVGGElement, NodeDatum>("g.nodes").data([null as unknown as NodeDatum]).join("g").attr("class", "nodes");
        const gLabels = gRoot.selectAll<SVGGElement, NodeDatum>("g.labels").data([null as unknown as NodeDatum]).join("g").attr("class", "labels");

        // Links
        const linkSel = gLinks
            .selectAll<SVGLineElement, any>("line")
            .data(data.links, (d: any) => `${(d.source as any)}-${(d.target as any)}`)
            .join(
                (enter: any) => enter
                    .append("line")
                    .attr("class", "link")
                    .attr("stroke", "#6aa9ff")
                    .attr("stroke-opacity", 0.55)
                    .attr("stroke-width", (d: any) => 1 + Math.sqrt(d.weight || 1)),
                (update: any) => update,
                (exit: any) => exit.remove()
            );

        // Nodes
        const nodeSel = gNodes
            .selectAll<SVGCircleElement, NodeDatum>("circle")
            .data(data.nodes, (d: any) => d.id)
            .join(
                (enter: any) => enter
                    .append("circle")
                    .attr("class", "node")
                    .attr("r", (d: any) => d.size || 10)
                    .style("fill", (d: any) => (d.image ? `url(#img-${sid(d)})` : color(d.group || d.type || "default")))
                    .on("click", (_: any, d: any) => setSelected(d))
                    .on("pointerenter", (e: any, d: any) => showTip(e as PointerEvent, d))
                    .on("pointermove", (e: any, d: any) => showTip(e as PointerEvent, d))
                    .on("pointerleave", () => hideTip())
                    .call(
                        d3
                            .drag<SVGCircleElement, NodeDatum>()
                            .on("start", (e: any, d: any) => {
                                if (!e.active) sim.alphaTarget(0.25).restart();
                                d.fx = d.x; d.fy = d.y;
                            })
                            .on("drag", (e: any, d: any) => { d.fx = e.x; d.fy = e.y; })
                            .on("end", (e: any, d: any) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
                    ),
                (update: any) => update
                    .attr("r", (d: any) => d.size || 10)
                    .style("fill", (d: any) => (d.image ? `url(#img-${sid(d)})` : color(d.group || d.type || "default"))),
                (exit: any) => exit.remove()
            );

        // Labels
        const labelSel = gLabels
            .selectAll<SVGTextElement, NodeDatum>("text")
            .data(data.nodes, (d: any) => d.id)
            .join(
                (enter: any) => enter
                    .append("text")
                    .attr("class", "label")
                    .attr("text-anchor", "middle")
                    .style("fill", "#e8edf2")
                    .style("paint-order", "stroke")
                    .style("stroke", "#0e1420")
                    .style("stroke-width", "3px")
                    .style("font-size", "11px")
                    .text((d: any) => d.id),
                (update: any) => update.text((d: any) => d.id),
                (exit: any) => exit.remove()
            );

        // Patterns for images
        const imageNodes = data.nodes.filter((n) => n.image);
        defs
            .selectAll<SVGPatternElement, NodeDatum>("pattern.node-img")
            .data(imageNodes, (d: any) => d.id)
            .join(
                (enter: any) => {
                    const p = enter
                        .append("pattern")
                        .attr("class", "node-img")
                        .attr("id", (d: any) => `img-${sid(d)}`)
                        .attr("patternUnits", "userSpaceOnUse")
                        .attr("width", (d: any) => (d.size || 10) * 2)
                        .attr("height", (d: any) => (d.size || 10) * 2);
                    p.append("image")
                        .attr("width", (d: any) => (d.size || 10) * 2)
                        .attr("height", (d: any) => (d.size || 10) * 2)
                        .attr("preserveAspectRatio", "xMidYMid slice");
                    return p;
                },
                (update: any) => update
                    .attr("width", (d: any) => (d.size || 10) * 2)
                    .attr("height", (d: any) => (d.size || 10) * 2),
                (exit: any) => exit.remove()
            )
            .select("image")
            .attr("href", (d: any) => d.image as string);

        // Simulation
        const sim = d3
            .forceSimulation<NodeDatum>(data.nodes)
            .force("link", d3.forceLink<NodeDatum, any>(data.links).id((d: any) => d.id).distance(linkDist).strength(0.08))
            .force("charge", d3.forceManyBody().strength(charge))
            .force("collide", d3.forceCollide<NodeDatum>().radius((d: any) => (d.size || 10) + 4))
            .force("center", d3.forceCenter((rect?.width ?? width) / 2, (rect?.height ?? height) / 2))
            .on("tick", ticked);

        function ticked() {
            linkSel
                .attr("x1", (d: any) => (d.source as NodeDatum).x!)
                .attr("y1", (d: any) => (d.source as NodeDatum).y!)
                .attr("x2", (d: any) => (d.target as NodeDatum).x!)
                .attr("y2", (d: any) => (d.target as NodeDatum).y!);

            d3.select(defsRef.current)
                .selectAll<SVGPatternElement, NodeDatum>("pattern.node-img")
                .attr("x", (d: any) => (d.x! - (d.size || 10)))
                .attr("y", (d: any) => (d.y! - (d.size || 10)));

            nodeSel.attr("cx", (d: any) => d.x!).attr("cy", (d: any) => d.y!);
            labelSel.attr("x", (d: any) => d.x!).attr("y", (d: any) => d.y! - (d.size || 10) - 6);
        }

        return () => { sim.stop(); };
    }, [data, charge, linkDist, rect, width, height, color]);

    // ---------------- UI handlers ----------------
    function showTip(e: PointerEvent, d: NodeDatum) {
        if (!tipRef.current) return;
        tipRef.current.style.opacity = "1";
        tipRef.current.textContent = `${d.id}${d.group ? " · " + d.group : ""}`;
        tipRef.current.style.left = `${e.clientX}px`;
        tipRef.current.style.top = `${e.clientY}px`;
    }
    function hideTip() { if (tipRef.current) tipRef.current.style.opacity = "0"; }

    function reheat() { setData((d: any) => ({ ...d })); }

    function fitToScreen() {
        if (!svgRef.current || !data.nodes.length) return;
        const svg = d3.select(svgRef.current);
        const xs = data.nodes.map((n) => n.x ?? 0), ys = data.nodes.map((n) => n.y ?? 0);
        const minX = Math.min(...xs), maxX = Math.max(...xs);
        const minY = Math.min(...ys), maxY = Math.max(...ys);
        const pad = 40;
        const boxW = (maxX - minX) + pad * 2, boxH = (maxY - minY) + pad * 2;
        const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;
        const r = svg.node()!.getBoundingClientRect();
        const k = Math.min(r.width / boxW, r.height / boxH, 6);
        const t = d3.zoomIdentity.translate(r.width / 2, r.height / 2).scale(k).translate(-midX, -midY);
        (d3.zoom() as any).transform(svg, t);
    }

    function onFilesPicked(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f || !selected) return;
        const url = URL.createObjectURL(f);
        setData((prev) => {
            const nodes = prev.nodes.map((n) => (n.id === selected.id ? { ...n, image: url } : n));
            return { ...prev, nodes };
        });
        e.target.value = "";
    }

    function assignFromFolder(e: React.ChangeEvent<HTMLInputElement>) {
        const list = e.target.files; if (!list) return;
        const map = new Map<string, File>();
        for (const f of Array.from(list)) {
            const base = f.name.replace(/\.[^.]+$/, "");
            map.set(base, f);
        }
        setData((prev) => {
            const nodes = prev.nodes.map((n) => {
                const f = map.get(String(n.id));
                return f ? { ...n, image: URL.createObjectURL(f) } : n;
            });
            return { ...prev, nodes };
        });
        e.target.value = "";
    }

    function autoAssignPrefix() {
        setData((prev) => ({
            ...prev,
            nodes: prev.nodes.map((n) => ({ ...n, image: `${imgPrefix}${n.id}${imgExt}` })),
        }));
    }

    function applyJson() {
        try {
            const j: GraphData = JSON.parse(jsonText);
            if (!Array.isArray(j.nodes) || !Array.isArray(j.links)) throw new Error("Expect {nodes:[], links:[]}");
            setData(j);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            alert(`Invalid JSON: ${msg}`);
        }
    }

    // --------------- Render ----------------
    return (
        <div className="h-screen w-screen bg-[#0b0d12] text-white grid grid-rows-[auto_1fr_auto]" style={{ color: "#e8edf2" }}>
            <header className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: "#1a2230" }}>
                <h1 className="text-sm font-semibold">ForceGraph.tsx — React + D3</h1>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }} onClick={fitToScreen}>Fit</button>
                    <button className="px-3 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }} onClick={reheat}>Reheat</button>
                    <label className="flex items-center gap-2 px-2 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }}>
                        <input type="range" min={-1500} max={-50} step={10} value={charge} onChange={(e) => setCharge(+e.target.value)} />
                        <span className="opacity-80 text-xs">charge</span>
                    </label>
                    <label className="flex items-center gap-2 px-2 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }}>
                        <input type="range" min={20} max={200} step={5} value={linkDist} onChange={(e) => setLinkDist(+e.target.value)} />
                        <span className="opacity-80 text-xs">link</span>
                    </label>
                    <input type="file" accept="image/*" onChange={onFilesPicked} className="px-3 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }} title="Upload image for selected node" />
                    <span className="text-xs opacity-80">{selected ? `Selected: ${selected.id}` : "No node selected"}</span>
                </div>
            </header>

            <div ref={wrapRef} className="relative">
                <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full block" role="img" aria-label="Force graph">
                    <defs ref={defsRef as any}></defs>
                </svg>
                <div ref={tipRef} className="absolute pointer-events-none px-2 py-1 rounded text-xs opacity-0 transition-opacity" style={{ background: "#0f1522", border: "1px solid #1f2a3f" }} />
                <div className="absolute right-2 bottom-2 px-2 py-1 text-xs" style={{ background: "rgba(0,0,0,.7)", border: "1px solid #20283a", borderRadius: 8, color: "#9aa8b5" }}>Wheel to zoom • Drag nodes • Click to select</div>
            </div>

            <section className="grid gap-2 p-3" style={{ borderTop: "1px solid #1a2230" }}>
                <div className="flex flex-wrap items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }} onClick={() => setData(demoData)}>Load demo</button>
                    <label className="px-2 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }} title="Pick a folder; filenames should match node IDs e.g., N7.png">
                        {/* @ts-ignore: webkitdirectory is non-standard but widely supported */}
                        <input type="file" multiple webkitdirectory onChange={assignFromFolder} className="hidden" />
                        <span className="text-xs">Assign images from folder…</span>
                    </label>
                    <input value={imgPrefix} onChange={(e) => setImgPrefix(e.target.value)} placeholder="./images/" className="px-2 py-1 rounded-lg border min-w-[220px]" style={{ background: "#0f1524", borderColor: "#243048" }} />
                    <input value={imgExt} onChange={(e) => setImgExt(e.target.value)} placeholder=".png" className="px-2 py-1 rounded-lg border w-[90px]" style={{ background: "#0f1524", borderColor: "#243048" }} />
                    <button className="px-3 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }} onClick={autoAssignPrefix}>Auto‑assign by prefix</button>
                </div>
                <textarea className="px-2 py-2 rounded-lg border text-xs min-h-[110px]" style={{ background: "#0f1524", borderColor: "#243048" }} placeholder='{"nodes":[{"id":"A","image":"avatarA.png"},{"id":"B"}],"links":[{"source":"A","target":"B"}]}' value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border" style={{ background: "#0f1524", borderColor: "#243048" }} onClick={applyJson}>Apply JSON</button>
                </div>
            </section>
        </div>
    );
};

export default ForceGraph;
