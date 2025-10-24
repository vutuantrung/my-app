// Replace this with your real data wiring (e.g., fetched from SQLite-backed API).
const data = {
	name: "Sakura Aoi",
	japaneseName: "葵 さくら",
	avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
	coverPhotos: [
		"https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=1400&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1400&auto=format&fit=crop"
	],
	nationality: "Japan",
	dob: "1998-05-12",
	debut: "2018-09-01",
	bust_cm: 89,
	waist_cm: 58,
	hips_cm: 86,
	cup: "E",
	height_cm: 160,
	tags: ["Actress", "Model", "Tokyo", "Fashion", "Travel"],
	links: {
		facebook: "https://facebook.com/yourprofile",
		instagram: "https://instagram.com/yourprofile"
	}
};

// ---------- Render ----------
function renderProfile(p) {
	// Basic text fields
	setText("name", p.name);
	setText("jpName", p.japaneseName || "");
	setText("nationality", p.nationality || "");
	setText("dob", p.dob || "");
	setText("debut", p.debut || "");
	setText("bust", fmtCM(p.bust_cm));
	setText("waist", fmtCM(p.waist_cm));
	setText("hips", fmtCM(p.hips_cm));
	setText("cup", p.cup || "");
	setText("height", fmtCM(p.height_cm));

	// Avatar
	const avatar = byId("avatar");
	if (p.avatar) avatar.style.backgroundImage = `url("${p.avatar}")`;

	// Tags
	const tagsEl = byId("tags");
	tagsEl.innerHTML = "";
	(p.tags || []).forEach(t => {
		const span = document.createElement("span");
		span.className = "tag";
		span.textContent = t;
		tagsEl.appendChild(span);
	});

	// Links
	const fb = byId("btnFacebook");
	const ig = byId("btnInstagram");
	fb.style.display = p?.links?.facebook ? "inline-flex" : "none";
	ig.style.display = p?.links?.instagram ? "inline-flex" : "none";
	if (p?.links?.facebook) fb.href = p.links.facebook;
	if (p?.links?.instagram) ig.href = p.links.instagram;

	// Cover
	renderCover(p.coverPhotos || []);
}

function fmtCM(v) {
	if (v === undefined || v === null || v === "") return "";
	return `${v} cm`;
}

function setText(id, val) { const el = byId(id); if (el) el.textContent = val || ""; }
function byId(id) { return document.getElementById(id); }

// ---------- Cover slider logic ----------
let currentIndex = 0;
function renderCover(images) {
	const track = byId("coverTrack");
	const dots = byId("coverDots");
	track.innerHTML = "";
	dots.innerHTML = "";

	images.forEach((src, i) => {
		const slide = document.createElement("div");
		slide.className = "slide";
		slide.style.backgroundImage = `url("${src}")`;
		slide.setAttribute("role", "group");
		slide.setAttribute("aria-roledescription", "slide");
		slide.setAttribute("aria-label", `Slide ${i + 1} of ${images.length}`);
		track.appendChild(slide);

		const dot = document.createElement("button");
		dot.type = "button";
		dot.setAttribute("role", "tab");
		dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
		dot.addEventListener("click", () => jumpTo(i));
		dots.appendChild(dot);
	});

	// Prev/Next
	byId("btnPrev").onclick = () => stepSlide(-1);
	byId("btnNext").onclick = () => stepSlide(1);

	// Sync dots on scroll
	let raf;
	track.addEventListener("scroll", () => {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(() => {
			const i = indexFromScroll(track);
			setActiveDot(i);
			currentIndex = i;
		});
	});

	window.addEventListener("resize", () => setActiveDot(indexFromScroll(track)));
}

function setActiveDot(i) {
	const dots = Array.from(byId("coverDots").querySelectorAll("button"));
	dots.forEach((d, idx) => d.setAttribute("aria-selected", idx === i ? "true" : "false"));
}

function indexFromScroll(track) {
	const i = Math.round(track.scrollLeft / track.clientWidth);
	const max = Math.max(0, track.children.length - 1);
	return Math.max(0, Math.min(i, max));
}

function jumpTo(i) {
	const track = byId("coverTrack");
	track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
	setActiveDot(i);
	currentIndex = i;
}

function stepSlide(step) {
	const track = byId("coverTrack");
	const total = track.children.length;
	if (!total) return;
	const next = (currentIndex + step + total) % total;
	jumpTo(next);
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
	renderProfile(data);
});
