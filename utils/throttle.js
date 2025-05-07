export default (fn, delay = 300, isImmediate = false, props) => {
	let timer = null;
	let immediate = isImmediate;

	let myThrottle = function () {
		const args = [...arguments, props];

		if (timer) return;

		if (immediate) {
			fn.apply(this, args);
			immediate = false;
		} else {
			timer = setTimeout(() => {
				fn.apply(this, args);
				timer = null;
			}, delay);
		}
	};

	return myThrottle;
};
