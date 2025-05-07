import throttle from "./throttle.js";

export default class VisibleItemToScroll {
	constructor({ el, className = "active" }) {
		if (!el) {
			throw "el没有传入dom";
		}

		const clientHeight = document.documentElement.clientHeight;

		const state = {
			clientHeight,
			observer: null,
			current: document.querySelectorAll(el),
			config: {
				rootMargin: clientHeight + "px",
				threshold: 0,
			},
			item: [],
			className,
		};

		for (let key in state) {
			this[key] = state[key];
		}

		this.init();
		this.listener();
	}

	init() {
		const self = this;

		this.observer = new IntersectionObserver(function (entries) {
			entries.forEach((entry) => {
				const target = entry.target;
				const speed = target.getAttribute("speed") || 2;

				const { top, height } = target.getBoundingClientRect();
				const scrollTop = target.scrollTop;

				const option = {
					target,
					top,
					height,
					scrollTop,
					speed,
					clientHeight: self.clientHeight,
					disable: true,
				};

				if (entry.isIntersecting) {
					self.item.push(option);
					self.handleScroll();

					this.unobserve(target);
				}
			});
		}, this.config);

		this.current.forEach((el) => {
			this.observer.observe(el);
		});
	}

	listener() {
		window.addEventListener("resize", () => {
			const newClientHeight = document.documentElement.clientHeight;
			this.clientHeight = newClientHeight;
			this.config.rootMargin = newClientHeight + "px";
		});

		window.addEventListener(
			"scroll",
			throttle(this.handleScroll.bind(this), 10)
		);
	}

	setValue(el) {
		const { top, height, scrollTop, speed, clientHeight } = el;

		if (height > clientHeight) {
			return parseFloat(
				Math.min(
					Math.max((scrollTop - top) / (height - clientHeight), 0) * speed,
					1
				).toFixed(6)
			);
		}

		return parseFloat(
			Math.min(
				Math.max(
					((scrollTop + clientHeight - top) / (clientHeight + height)) * speed,
					0
				),
				1
			).toFixed(6)
		);
	}

	setScrolled(el) {
		const v = this.setValue(el);
		el.target.style.setProperty(`--scrolled`, `${v}`);

		if (v === 1) {
			const destroy = el.target.getAttribute("destroy");
			if (destroy) {
				this.item.forEach((element, index) => {
					if (element === el) {
						this.item[index].disable = false;
					}
				});
			}

			el.target.classList.add(this.className);
		} else {
			if (el.target.classList.contains(this.className))
				el.target.classList.remove(this.className);
		}
	}

	handleScroll() {
		if (!this.item.length) {
			return;
		}

		this.item.forEach((el) => {
			if (!el.disable) return;

			el.top = el.target.getBoundingClientRect().top;
			requestAnimationFrame(() => {
				this.setScrolled(el);
			});
		});
	}
}
