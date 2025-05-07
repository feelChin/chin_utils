export default class VisibleItem {
	constructor({ el, className = "active" }) {
		if (!el) {
			throw "为传入dom参数";
		}

		this.el = document.querySelectorAll(el);
		this.className = className;

		this.config = {
			rootMargin: "0px",
			threshold: 0,
		};

		this.init();
	}
	init() {
		const self = this;

		this.observer = new IntersectionObserver(function (entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const item = entry.target;
					item.classList.add(self.className);

					this.unobserve(item);
				}
			});
		}, this.config);

		this.el.forEach((el) => {
			this.observer.observe(el);
		});
	}
}
