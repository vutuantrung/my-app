async function getAllModels() {
	const req = await fetch('/api/model_profiles', { method: 'GET' })
	if (!req.ok) {
		throw new Error(`Failed to fetch models: ${req.status} ${req.statusText}`);
	}
	const data = await req.json();
	return data;
}

async function getModelByName(name: string) {
	const req = await fetch(`/api/model_profiles?name=${encodeURIComponent(name)}`, { method: 'GET' });
	if (!req.ok) {
		throw new Error(`Failed to fetch model ${name}: ${req.status} ${req.statusText}`);
	}
	const data = await req.json();
	return data;
}

export { getAllModels, getModelByName }