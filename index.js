import init from "./utils/init.js";
import cookie from "./utils/cookie.js";
import getParam from "./utils/getParam.js";
import userBrowser from "./utils/userBrowser.js";
import debounce from "./utils/debounce.js";
import entrust from "./utils/entrust.js";
import timeCountdown from "./utils/timeCountdown.js";

export { userBrowser, debounce, cookie, getParam, entrust, timeCountdown };

export default (() => {
	window["FEELCHIN_UTILS"] = {};

	init();
})();
