async function fetchText(rel) {
  const url = new URL(`./components/${rel}`, window.location.href);
  const res = await fetch(url.toString(), { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to fetch ${rel}: ${res.status} ${res.statusText}`);
  return res.text();
}

export async function loadAndInject(slotSelector, componentRelPath) {
  const el = document.querySelector(slotSelector);
  if (!el) throw new Error(`Slot not found: ${slotSelector}`);
  const html = await fetchText(componentRelPath);
  el.innerHTML = html;
}

export async function loadPages(slotSelector, pageRels) {
  const el = document.querySelector(slotSelector);
  if (!el) throw new Error(`Slot not found: ${slotSelector}`);
  const parts = await Promise.all(pageRels.map(p => fetchText(p)));
  el.innerHTML = parts.join("\n");
}
