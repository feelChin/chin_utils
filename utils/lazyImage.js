export default class LazyImage {
	constructor() {
		this.config = {
			rootMargin: "0px",
			threshold: 0,
		};

		this.init();
	}
	init() {
		this.observer = new IntersectionObserver(function (entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target;

					img.src = img.getAttribute("data-lazy-src");
					img.removeAttribute("data-lazy-src");

					this.unobserve(img);
				}
			});
		}, this.config);

		document.querySelectorAll("[data-lazy-src]").forEach((el) => {
			this.observer.observe(el);
		});
	}
}
