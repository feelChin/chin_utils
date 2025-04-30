export default () => {
	window._ = (select) => {
		const result = document.querySelectorAll(select);

		return result.length > 1 ? result : result[0];
	};

	window._class = (element, className, type) => {
		switch (type) {
			case "remove":
				if (element.classList.contains(className)) {
					element.classList.remove(className);
				}
				break;
			case "toggle":
				element.classList.toggle(className);
				break;
			default:
				if (element.classList.contains(className)) return;
				element.classList.add(className);
		}
	};

	window._attr = (element, { label, value }) => {
		if (label) {
			element.setAttribute(label, value);
		} else {
			return element.getAttribute(value);
		}
	};
};
