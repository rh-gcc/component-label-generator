let labels, formControls, partNumberInput, additionalInfoInput, componentPackageInput, componentTypeInput;

const componentOptions = {
	"partNumber": {
		type: "text",
		placeholder: "Part number, e.g. 2N3906"
	},
	"additionalInfo": {
		type: "text",
		placeholder: "Additional info, e.g. Rapid order code"
	},
	"componentPackage": {
		type: "select",
		placeholder: "Component package",
		options: { 
			"DO-35": { packageId: "DO-35" },
			"DO-41": { packageId: "DO-41" },
			"NS257": { packageId: "NS257" },
			"NS257": { packageId: "NS257" },
			"SOT-25-TH": { packageId: "SOT-25-TH" },
			"TO-1": { packageId: "TO-1" },
			"TO-6": { packageId: "TO-6" }, 
			"TO-18": { packageId: "TO-18" },
			"TO-39": { packageId: "TO-39" },
			"TO-92": { packageId: "TO-92" },
			"TO-106": { packageId: "TO-106" }, 
			"TO-204": { packageId: "TO-204" },
			"TO-220": { packageId: "TO-220" },
			"TO-225": { packageId: "TO-225" }
		},
		otherOption: "Other package"
	},
	"componentType": {
		type: "select",
		placeholder: "Component type",
		options: { 
			"gp-npn-bjt": { symbolId: "npn-bjt", name: "General Purpose NPN BJT" },
			"pwr-npn-bjt": { symbolId: "npn-bjt", name: "Power NPN BJT" },
			"gp-pnp-bjt": { symbolId: "pnp-bjt", name: "General Purpose PNP BJT" },
			"pwr-pnp-bjt": { symbolId: "pnp-bjt", name: "Power PNP BJT" },
			"gp-nmos": { symbolId: "nmos", name: "General Purpose N-Channel MOSFET" },
			"pwr-nmos": { symbolId: "nmos", name: "Power N-Channel MOSFET" },
			"gp-pmos": { symbolId: "pmos", name: "General Purpose P-Channel MOSFET" },
			"pwr-pmos": { symbolId: "pmos", name: "Power P-Channel MOSFET" },
			"njfet": { symbolId: "njfet", name: "N-Channel JFET" },
			"pjfet": { symbolId: "pjfet", name: "P-Channel JFET" },
			"gp-diode": { symbolId: "diode", name: "General Purpose Diode" },
			"schottky-diode": { symbolId: "schottky-diode", name: "Schottky Diode" },
			"zener-diode": { symbolId: "zener-diode", name: "Zener Diode" },
			"ujt": { symbolId: "ujt", name: "UJT" },
			"thyristor": { symbolId: "thyristor", name: "Thyristor" }
		},
		otherOption: "Other component"
	}
}

const createComponentLabel = () => {
	labels.innerHTML = "";

	const label = document.createElement("div");
	label.className = "label";

	const heading = document.createElement("h3");
  	heading.textContent = partNumberInput.value;
	heading.className = "partNumber";
  	
	const partType = document.createElement("p");
  	partType.textContent = componentOptions["componentType"].options[componentTypeInput.value].name;
	partType.className = "partType";

  	const additionalInfo = document.createElement("p");
  	additionalInfo.textContent = additionalInfoInput.value;
	additionalInfo.className = "additionalInfo";

	label.appendChild(heading);
	label.appendChild(createComponentGraphics());
	label.appendChild(partType);
	label.appendChild(additionalInfo);

	labels.appendChild(label);
	html2canvas(label).then((canvas) => {
		labels.innerHTML = "";
    		labels.appendChild(canvas)
 	});
}


const createComponentGraphics = () => {
	const componentGraphicsWrapper = document.createElement("div");
	componentGraphicsWrapper.className = "componentGraphicsWrapper";

	const componentSymbol = document.createElement("img"); 
	componentSymbol.src = "resources/images/component-symbols/" + componentOptions["componentType"].options[componentTypeInput.value].symbolId + ".png";
	componentSymbol.className = "componentSymbol";

	const componentPackage = document.createElement("img"); 
	componentPackage.src = "resources/images/component-packages/" + componentOptions["componentPackage"].options[componentPackageInput.value].packageId + ".png";
	componentPackage.className = "componentPackage";

	componentGraphicsWrapper.appendChild(componentPackage);
	componentGraphicsWrapper.appendChild(componentSymbol);

	return componentGraphicsWrapper;
}


const createFormControls = () => {
	Object.keys(componentOptions).forEach((inputId) => {
		const input = componentOptions[inputId];
		if(input.type == "text") {
			const inputElement = document.createElement("input");
			inputElement.id = inputId + "Input";
			inputElement.type = "text";
			inputElement.placeholder = input.placeholder;
			formControls.appendChild(inputElement);
		} else {
			const dropdownElement = document.createElement("select");
			dropdownElement.id = inputId + "Input";
			
			const defaultOption = document.createElement("option");
			defaultOption.innerHTML = input.placeholder;
			defaultOption.disabled = true;
			defaultOption.selected = true;
			dropdownElement.appendChild(defaultOption);

			Object.keys(input.options).forEach((optionId) => {
				const optionElement = document.createElement("option");
				optionElement.value = optionId;
				optionElement.innerHTML = input.options[optionId].name || optionId;
				dropdownElement.appendChild(optionElement);
			})
			formControls.appendChild(dropdownElement);
		}
	});
}

window.onload = () => {
	labels = document.getElementById("labels");
	formControls = document.getElementById("formControls");

	createFormControls();
	
	partNumberInput = document.getElementById("partNumberInput");
	additionalInfoInput = document.getElementById("additionalInfoInput");
	componentTypeInput = document.getElementById("componentTypeInput");
	componentPackageInput = document.getElementById("componentPackageInput");

	const inputFields = document.getElementsByTagName("input");
	Object.keys(inputFields).forEach((inputId) => {
		const input = inputFields[inputId];
		input.addEventListener("input", () => {
			createComponentLabel();	
		})
	});
	
	const dropdownFields = document.getElementsByTagName("select");
	Object.keys(dropdownFields).forEach((dropdownId) => {
		const input = dropdownFields[dropdownId];
		input.addEventListener("change", () => {
			createComponentLabel();	
		})
	});
}
