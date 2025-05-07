import init from "./init.js";
import cookie from "./utils/cookie.js";
import getParam from "./utils/getParam.js";
import userBrowser from "./utils/userBrowser.js";
import debounce from "./utils/debounce.js";
import throttle from "./utils/throttle.js";
import entrust from "./utils/entrust.js";
import timeCountdown from "./utils/timeCountdown.js";
import LazyImage from "./utils/lazyImage.js";
import VisibleItem from "./utils/visibleItem.js";
import VisibleItemToScroll from "./utils/visibleItemToScroll.js";

export {
	userBrowser,
	throttle,
	debounce,
	cookie,
	getParam,
	entrust,
	timeCountdown,
	LazyImage,
	VisibleItem,
	VisibleItemToScroll,
};

export default (() => {
	window["FEELCHIN_UTILS"] = {};

	init();
})();
