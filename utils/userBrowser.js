export default () => {
	const ua = navigator.userAgent;

	let client = "";

	if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
		client = "ios";
	} else if (/(Android)/i.test(ua)) {
		client = "android";
	} else {
		client = "pc";
	}

	return client;
};
