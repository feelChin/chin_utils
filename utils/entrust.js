import debounce from "./debounce.js";

export default function entrust(element, callback) {
	const self = window.FEELCHIN_UTILS;

	if (!self._body) {
		self._body = document.body;

		self._entrustEvent = (e) => {
			let target = e.target;

			while (target != self._body) {
				if (!target.parentNode) return;

				const entrust = target.getAttribute("entrust");

				if (entrust && self.eventList[entrust]) {
					self.eventList[entrust]({
						that: this,
						element: target,
					});
					break;
				}

				target = target.parentNode;
			}
		};

		self.debounceEntrust = debounce(self._entrustEvent, 300, true);

		self._body.addEventListener("click", self.debounceEntrust);
		self.entrust_cancel = () => {
			console.log("entrust_cancel");
			self._body.removeEventListener("click", self.debounceEntrust);
		};
	}

	if (!self.eventList) {
		self.eventList = {};
	}

	if (element) {
		self.eventList[element] = callback;
	}

	return this;
}
