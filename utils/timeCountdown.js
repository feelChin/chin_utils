export default ({
	start = Date.now(),
	end = Date.now() + 24 * 60 * 60 * 1000,
	fps = 30,
	zero = true,
	millisecond = false,
	cb = () => {},
	isEnd = () => {},
}) => {
	const startTime = new Date(start).getTime();
	const endTime = new Date(end).getTime();
	const beforeTime = Date.now();

	let lastTime = 0;

	function padStartTwo(num) {
		if (!zero) return num;
		return num < 10 ? "0" + num : num;
	}

	function insertDecimal(num) {
		const str = num.toString();
		const len = str.length;

		return len > 3
			? str.slice(0, len - 3) + "." + str.slice(len - 3)
			: "0." + str.padStart(3, "0");
	}

	function updateTime(time) {
		var ref = requestAnimationFrame(updateTime.bind(this));
		if (time - lastTime < 1000 / fps) {
			return;
		}
		lastTime = time;
		//锁帧

		const elapsed = Date.now() - beforeTime;
		const nowTime =
			new Date(endTime).getTime() - new Date(startTime).getTime() - elapsed;

		if (nowTime <= 0) {
			cancelAnimationFrame(ref);
			isEnd();
			return;
		}

		const days = Math.floor(nowTime / (1000 * 60 * 60 * 24));
		const hours = Math.floor(nowTime / (1000 * 60 * 60));
		const minutes = Math.floor((nowTime % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = millisecond
			? insertDecimal(Math.floor(nowTime % (1000 * 60)))
			: Math.floor((nowTime % (1000 * 60)) / 1000);

		cb({
			d: padStartTwo(days),
			h: padStartTwo(hours),
			m: padStartTwo(minutes),
			s: padStartTwo(seconds),
		});
	}

	requestAnimationFrame(updateTime.bind(this));
};
