export default (baseClass, ...mixins) => {
	class merge extends baseClass {
		constructor(...args) {
			super(...args);
			mixins.forEach((mixin) => {
				copyProps(this, new mixin());
			});
		}
	}
	const copyProps = (target, source) => {
		Object.getOwnPropertyNames(source)
			.concat(Object.getOwnPropertySymbols(source))
			.forEach((prop) => {
				if (
					!prop.match(
						/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
					)
				)
					Object.defineProperty(
						target,
						prop,
						Object.getOwnPropertyDescriptor(source, prop)
					);
			});
	};
	mixins.forEach((mixin) => {
		copyProps(merge.prototype, mixin.prototype);
		copyProps(merge, mixin);
	});
	return merge;
};
