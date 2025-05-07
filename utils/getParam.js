export default (data) => {
	const url = window.location.search;
	let result = null;

	if (!~url.indexOf(data)) {
		return result;
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

	return result;
};
