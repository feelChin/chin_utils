const get = (name) => {
	var cookieName = name + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookieArray = decodedCookie.split(";");

	for (var i = 0; i < cookieArray.length; i++) {
		var cookie = cookieArray[i];
		while (cookie.charAt(0) === " ") {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(cookieName) === 0) {
			return cookie.substring(cookieName.length, cookie.length);
		}
	}
	return "";
};

const set = (
	name,
	value,
	time = new Date().setFullYear(new Date().getFullYear() + 1)
) => {
	// 设置过期时间为一年后

	var cookieString =
		name +
		"=" +
		encodeURIComponent(value) +
		"; expires=" +
		new Date(time).toUTCString() +
		"; path=/";
	document.cookie = cookieString;
};

export default {
	set,
	get,
	delete: (name) => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
	},
};
