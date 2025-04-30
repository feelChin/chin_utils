export default () => {
	const url = window.location.search;

	if (url.indexOf(data) === -1) {
		return null;
	}

	let params = url.split("?");
	if (~params[1].indexOf("&")) {
		params = params[1].split("&");
	}

	try {
		params.forEach((item) => {
			const [key, value] = item.split("=");
			if (key === data) {
				result = value;
				throw Error();
			}
		});
	} catch {}
};
