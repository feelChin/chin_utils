export default (fn, delay = 300, immediate, props) => {
	let timer = null;

	let myDebounce = function () {
		const args = [...arguments, props];
		timer && clearTimeout(timer);

		if (immediate) {
			!timer && fn.apply(this, args);
			timer = setTimeout(() => {
				timer = null;
			}, delay);
		} else {
			timer = setTimeout(() => {
				fn.apply(this, args);
			}, delay);
		}
	};

	myDebounce.cancel = () => {
		clearTimeout(timer);
		timer = null;
	};

	return myDebounce;
};
