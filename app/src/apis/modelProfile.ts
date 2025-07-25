const HOST = "http://localhost:3001";

function searchModelProfile(modelName: string): Promise<any> {
	const url = `${HOST}/api/idol/search`;
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: modelName })
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				console.log('Success:', data);
				resolve(data);
			})
			.catch(error => {
				console.error('Error:', error);
				resolve([]);
			});
	});
}

export { searchModelProfile }