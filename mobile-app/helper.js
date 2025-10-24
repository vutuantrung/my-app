const formatName = (str) => {
	return str
		.split('-')                      // Split by hyphen
		.map(word =>
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)                                // Capitalize each segment
		.join(' ');                      // Join with space
};

function parseTags(meta) {
	const raw = meta?.tags;
	if (!raw) return [];
	return String(raw)
		.split('|')
		.map(kv => {
			const [k, v] = kv.split(':');
			// console.log(k)
			if (['debut_age', 'birth_year', 'debut_year', 'birthplace', 'starsign', 'blood_type', 'height'].includes(k?.toLowerCase())) return null;
			if (k === 'cup') return "Cup " + v.toUpperCase()
			return (v || k || '').split(',')[0];
		})
		.filter(Boolean)
		.map(s => s.trim());
}

module.exports = {
	formatName,
	parseTags
};