// D3 Force Graph — extracted JS
// Requires: <script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script> loaded before this file.

// --- Sample data (replace with your own or loadJson('data.json'))
let data = {
    nodes: [
        { id: 'A', group: 'Team', size: 18, image: 'https://picsum.photos/seed/A/160' },
        { id: 'B', group: 'Team', size: 16 },
        { id: 'C', group: 'Service', size: 20, image: 'https://picsum.photos/seed/C/160' },
        { id: 'D', group: 'Service', size: 14 },
        { id: 'E', group: 'DB', size: 22, image: 'https://picsum.photos/seed/E/160' },
        { id: 'F', group: 'Cache', size: 12 },
        { id: 'G', group: 'Client', size: 16, image: 'https://picsum.photos/seed/G/160' },
        { id: 'H', group: 'Client', size: 14 }
    ],
    links: [
        { source: 'A', target: 'C', type: 'owns', weight: 3 },
        { source: 'B', target: 'C', type: 'maintains', weight: 1 },
        { source: 'C', target: 'D', type: 'calls', weight: 2 },
        { source: 'C', target: 'E', type: 'writes', weight: 4 },
        { source: 'D', target: 'F', type: 'reads', weight: 1 },
        { source: 'E', target: 'F', type: 'warms', weight: 2 },
        { source: 'G', target: 'C', type: 'requests', weight: 3 },
        { source: 'H', target: 'D', type: 'requests', weight: 2 }
    ]
};

const svg = d3.select('#graph');
const tooltip = document.getElementById('tooltip');
const width = 1200, height = 800;
const defs = svg.select('defs');
const sid = d => String(d.id).replace(/[^a-zA-Z0-9_-]/g, '_');

const colorByGroup = d3.scaleOrdinal()
    .domain([...new Set(data.nodes.map(n => n.group))])
    .range(['#FFE58F', '#7EE787', '#6AA9FF', '#FF9CCC', '#A78BFA', '#F8C18C']);

// Root group with pan/zoom transform
const gRoot = svg.append('g').attr('id', 'root');
let gLinks = gRoot.append('g').attr('class', 'links');
let gNodes = gRoot.append('g').attr('class', 'nodes');
let gLabels = gRoot.append('g').attr('class', 'labels');

let link = gLinks.selectAll('line')
    .data(data.links)
    .join('line')
    .attr('class', 'link')
    .attr('stroke-width', d => 1 + Math.sqrt(d.weight || 1))
    .attr('marker-end', 'url(#arrow)')
    .attr('color', '#6aa9ff');

let node = gNodes.selectAll('circle')
    .data(data.nodes)
    .join('circle')
    .attr('class', 'node')
    .attr('r', d => (d.size || 12))
    .style('fill', d => d.image ? `url(#img-${sid(d)})` : colorByGroup(d.group))
    .on('click', (event, d) => selectNode(d))
    .call(drag());

let label = gLabels.selectAll('text')
    .data(data.nodes)
    .join('text')
    .attr('class', 'label')
    .attr('text-anchor', 'middle')
    .attr('dy', d => -(d.size || 12) - 4)
    .text(d => d.id);

// Create/update image patterns for nodes that have d.image
function refreshPatterns() {
    const imageNodes = data.nodes.filter(n => n.image);
    const patterns = defs.selectAll('pattern.node-img')
        .data(imageNodes, d => d.id)
        .join(enter => {
            const p = enter.append('pattern')
                .attr('class', 'node-img')
                .attr('id', d => `img-${sid(d)}`)
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', d => (d.size || 12) * 2)
                .attr('height', d => (d.size || 12) * 2);
            p.append('image')
                .attr('width', d => (d.size || 12) * 2)
                .attr('height', d => (d.size || 12) * 2)
                .attr('preserveAspectRatio', 'xMidYMid slice');
            return p;
        });
    patterns.select('image').attr('href', d => d.image);
}
refreshPatterns();

// Build adjacency for fast neighbor lookup
const neighbors = new Map();
for (const n of data.nodes) neighbors.set(n.id, new Set([n.id]));
for (const e of data.links) {
    neighbors.get(e.source)?.add(e.target);
    neighbors.get(e.target)?.add(e.source);
}

// Simulation with tuned forces for stable layout
const sim = d3.forceSimulation(data.nodes)
    .force('link', d3.forceLink(data.links)
        .id(d => d.id)
        .distance(d => 48 + 16 * Math.sqrt(d.weight || 1))
        .strength(0.08)
    )
    .force('charge', d3.forceManyBody().strength(-380))
    .force('collide', d3.forceCollide().radius(d => (d.size || 12) + 4))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', ticked);

// Hover interactions (highlight neighbors)
node.on('pointerenter', (event, d) => {
    const N = neighbors.get(d.id) || new Set();
    node.classed('highlight', n => N.has(n.id));
    link.classed('highlight', l => N.has(l.source.id || l.source) && N.has(l.target.id || l.target));
    label.attr('opacity', n => N.has(n.id) ? 1 : 0.15);
    showTip(event, d);
});
node.on('pointermove', (event, d) => showTip(event, d));
node.on('pointerleave', () => {
    node.classed('highlight', false);
    link.classed('highlight', false);
    label.attr('opacity', 1);
    hideTip();
});

// Zoom & pan
const zoom = d3.zoom()
    .scaleExtent([0.2, 4])
    .on('zoom', (event) => gRoot.attr('transform', event.transform));
svg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(100, 60).scale(0.9));

// Controls
document.getElementById('fit').onclick = () => fitToScreen();
document.getElementById('reset').onclick = () => svg.transition().duration(450).call(zoom.transform, d3.zoomIdentity);
document.getElementById('shuffle').onclick = () => { sim.alpha(0.9).restart(); };

// --- Search API wiring ---
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const apiOut = document.getElementById('apiOut');

async function callSearchApi(idolName) {
    if (!idolName) { apiOut.textContent = 'API: please enter a query'; return; }
    const endpoint = `http://localhost:3001/api/idol/search`; // TODO: replace with your API
    apiOut.textContent = 'API: loading...';
    searchBtn.disabled = true;
    try {
        // shunka-ayami
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": idolName,
                "updateRecord": false,
                "reuseSavedFile": true,
                "displayType": "json"
            })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        apiOut.textContent = 'API result:\n' + JSON.stringify(json, null, 2);
        // const codes = json.movies;
        // delete json.movies
        console.log('API result', json);
        // If the API returns {nodes, links}, re-bind and restart
        const fetchedData = {
            nodes: [
                { id: json.name, group: 'Idol', size: 50, image: 'https://picsum.photos/seed/A/160' },
                ...json.movies.map(code => ({ id: code, group: 'Movie', size: 10 }))
            ],
            links: json.movies.map(code => ({ source: json.name, target: code, type: 'idol_movie', weight: 3 }))
        }
        if (fetchedData && Array.isArray(fetchedData.nodes) && Array.isArray(fetchedData.links)) {
            rebindData(fetchedData);
        }
    } catch (err) {
        apiOut.textContent = 'API error: ' + (err?.message || String(err));
    } finally {
        searchBtn.disabled = false;
    }
}

searchBtn.addEventListener('click', () => callSearchApi(searchInput.value.trim()));
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') callSearchApi(searchInput.value.trim()); });

// ---- Local image upload → selected node ----
const fileInput = document.getElementById('imgFile');
const selInfo = document.getElementById('selInfo');
let selected = null;

function selectNode(d) {
    selected = d;
    selInfo.textContent = `Selected: ${d.id}`;
}

fileInput?.addEventListener('change', (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!selected) { alert('Click a node to select it first.'); fileInput.value = ''; return; }
    const url = URL.createObjectURL(f);
    selected.image = url;
    ensurePattern(selected);
    d3.selectAll('circle.node').filter(n => n === selected)
        .style('fill', `url(#img-${sid(selected)})`);
    fileInput.value = '';
});

function ensurePattern(d) {
    const pid = `img-${sid(d)}`;
    let p = defs.select(`#${pid}`);
    const size = (d.size || 12) * 2;
    if (p.empty()) {
        p = defs.append('pattern')
            .attr('class', 'node-img')
            .attr('id', pid)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', size)
            .attr('height', size);
        p.append('image')
            .attr('width', size)
            .attr('height', size)
            .attr('preserveAspectRatio', 'xMidYMid slice');
    }
    p.select('image').attr('href', d.image);
}

// ---- Re-bind graph data & restart forces ----
function rebindData(newData) {
    data = {
        nodes: (newData.nodes || []).map(n => ({ ...n })),
        links: (newData.links || []).map(l => ({ ...l }))
    };

    // Rebuild neighbor index
    neighbors.clear();
    for (const n of data.nodes) neighbors.set(n.id, new Set([n.id]));
    for (const e of data.links) {
        const s = e.source.id || e.source; const t = e.target.id || e.target;
        neighbors.get(s)?.add(t); neighbors.get(t)?.add(s);
    }

    // Re-bind selections
    link = gLinks.selectAll('line')
        .data(data.links, d => `${d.source.id || d.source}->${d.target.id || d.target}`)
        .join(enter => enter.append('line')
            .attr('class', 'link')
            .attr('stroke-width', d => 1 + Math.sqrt(d.weight || 1))
            .attr('color', '#6aa9ff')
        );

    node = gNodes.selectAll('circle')
        .data(data.nodes, d => d.id)
        .join(enter => enter.append('circle')
            .attr('class', 'node')
            .attr('r', d => (d.size || 12))
            .style('fill', d => d.image ? `url(#img-${sid(d)})` : colorByGroup(d.group))
            .on('click', (event, d) => selectNode(d))
            .call(drag())
        )
        .attr('r', d => (d.size || 12))
        .style('fill', d => d.image ? `url(#img-${sid(d)})` : colorByGroup(d.group));

    label = gLabels.selectAll('text')
        .data(data.nodes, d => d.id)
        .join('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr('dy', d => -(d.size || 12) - 4)
        .text(d => d.id);

    // Update patterns for any nodes with images
    refreshPatterns();

    // Attach nodes/links to sim and restart
    sim.nodes(data.nodes);
    sim.force('link').links(data.links);
    sim.alpha(0.9).restart();
}

// Window resize keeps viewBox scaling
addEventListener('resize', () => {/* responsive by viewBox */ });

function ticked() {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    defs.selectAll('pattern.node-img')
        .attr('x', d => (d.x - (d.size || 12)))
        .attr('y', d => (d.y - (d.size || 12)));

    node.attr('cx', d => d.x).attr('cy', d => d.y);
    label.attr('x', d => d.x).attr('y', d => d.y - (d.size || 12) - 6);
}

function drag() {
    function dragstarted(event, d) {
        if (!event.active) sim.alphaTarget(0.25).restart();
        d.fx = d.x; d.fy = d.y;
    }
    function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
    function dragended(event, d) { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }
    return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
}

function showTip(event, d) {
    tooltip.style.opacity = 1;
    tooltip.textContent = `${d.id}${d.group ? ' · ' + d.group : ''}`;
    const { x, y } = event;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}
function hideTip() { tooltip.style.opacity = 0; }

function fitToScreen(padding = 40) {
    const nodes = data.nodes;
    if (!nodes.length) return;
    const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const boxWidth = (maxX - minX) + padding * 2;
    const boxHeight = (maxY - minY) + padding * 2;
    const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;
    const svgRect = svg.node().getBoundingClientRect();
    const scale = Math.min(svgRect.width / boxWidth, svgRect.height / boxHeight, 4);
    const transform = d3.zoomIdentity.translate(svgRect.width / 2, svgRect.height / 2).scale(scale).translate(-midX, -midY);
    svg.transition().duration(500).call(zoom.transform, transform);
}

// Optional: load external JSON file with {nodes,links}
async function loadJson(url) {
    const res = await fetch(url);
    const json = await res.json();
    rebindData(json);
}
