(() => {
    const randText = generateCryptoRandomText(10);
    console.log(randText);

    const data = {
        id: randText
    };
    //// scratchpadTextEl
    const scratchpadTextEl = document.getElementById("scratchpadTextEl");
    data.userPromptInput = scratchpadTextEl.value;

    //// userPromptInput
    const userPromptInput = document.getElementById("userPromptInput");
    data.userPromptInput = userPromptInput.value;


    //// negativePromptInput
    const negativePromptInput = document.getElementById("negativePromptInput");
    data.negativePromptInput = negativePromptInput.value;

    //// UserElTab
    const allSelectedObjs = [];
    const userElTab = document.querySelector("div[id='UserElTab']");
    if (!userElTab) {
        return null;
    }

    const importDropdowns = document.querySelectorAll("select[class='import-dropdown']");
    for (const dd of importDropdowns) {
        const idEle = dd.id;
        const selectedText = dd.options[dd.selectedIndex].text;
        allSelectedObjs.push({
            id: idEle, selectedText: selectedText
        })
    }

    data.importDropdowns = allSelectedObjs;


    //// styleOptionsEl
    const styleOptionsEls = document.getElementById("styleOptionsEl").children;
    for (const opt of styleOptionsEls) {
        const imgClass = opt.children[0].getAttribute("class")
        if (imgClass === "style-option selected") {
            data.styleSelected = opt.children[1].innerText;
        }
    }

    //// orientationSlider
    const orientationSlider = document.getElementById("orientationSlider");
    if (orientationSlider) {
        data.orientationSlider = orientationSlider.value;
    }

    //// orientationSlider
    const guidanceScale = document.getElementById("guidanceScale");
    if (guidanceScale) {
        data.guidanceScale = guidanceScale.value;
    }

    //// seed, title
    const appearanceTab = document.getElementById("appearanceTab");
    if (appearanceTab) {
        const inputContainers = appearanceTab.querySelectorAll("div[class='input-container']");
        for (const container of inputContainers) {
            const input = container.children[0];
            if (input.getAttribute("placeholder") === "Leave blank for a random seed") {
                data.seed = input.value ? input.value : "";
            }
            if (input.getAttribute("placeholder") === "Type a name for your title image") {
                data.title = input.value ? input.value : "";
            }
        }
    }

    //// treat
    const filteredImportDropdowns = data.importDropdowns.filter(e => e.selectedText.toLowerCase() !== 'default');
    data.importDropdowns = filteredImportDropdowns;

    console.log(data)

    function generateCryptoRandomText(length) {
        const array = new Uint8Array(Math.ceil(length / 2)); // Each byte represents 2 hex characters
        window.crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').substring(0, length);
    }
})();