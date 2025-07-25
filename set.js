(() => {
	const data = {};

	document.getElementById("userPromptInput").value = data.userPromptInput;
	document.getElementById("negativePromptInput").value = data.negativePromptInput;
	for (const { id, selectedText } of data.importDropdowns) {
		selectOptionByText(id, selectedText)
	}

	function selectOptionByText(selectId, targetText) {
		const select = document.getElementById(selectId);
		if (!select) {
			console.error(`Select element with ID '${selectId}' not found.`);
			return;
		}

		for (let i = 0; i < select.options.length; i++) {
			if (select.options[i].text === targetText) {
				select.selectedIndex = i;
				// Optionally, trigger change event
				select.dispatchEvent(new Event('change'));
				return;
			}
		}
	}
})()