import init from "./utils/init.js";
import cookie from "./utils/cookie.js";
import entrust from "./utils/entrust.js";
import timeCountdown from "./utils/timeCountdown.js";

export { cookie, entrust, timeCountdown };

export default (() => {
	window["FEELCHIN_UTILS"] = {};

	init();
})();
