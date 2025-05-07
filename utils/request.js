const api = {
	cancel: () => {},
	response: () => {},
	error: () => {},
};

function request(method, url, option) {
	let controller = new AbortController();

	let [FETCH_TIMEOUT, didTimeout, timer] = [10000, false, null];

	return new Promise((resolve, reject) => {
		api.cancel = () => {
			controller.abort();
			controller = new AbortController();
		};

		timer = setTimeout(() => {
			didTimeout = true;
			reject("请求超时");
		}, FETCH_TIMEOUT);

		const { type, headers, data } = option;

		const params = {
			method,
			headers: headers || {},
			signal: controller.signal,
		};

		if (method === "get" || method === "delete") {
			if (data) {
				for (let [key, value] of Object.entries(data)) {
					url += `${url.indexOf("?") === -1 ? "?" : "&"}${key}=${value}`;
				}
			}
		}

		if (method === "post" || method === "put") {
			switch (type) {
				case "form":
					let formData = new FormData();
					for (let key of Object.keys(data)) {
						if (
							Object.prototype.toString.call(data[key]) === "[object Array]"
						) {
							data[key].map((item) => {
								formData.append(key, item);
							});
						} else {
							formData.append(key, data[key]);
						}
					}
					params.body = formData;
					break;
				case "default":
					params.body = JSON.stringify(data);
					params.headers["Content-Type"] = "application/x-www-form-urlencoded";
					break;
				default:
					params.body = JSON.stringify(data);
					params.headers["Content-Type"] = "application/json";
			}
		}

		fetch(url, { ...params })
			.then((response) => {
				if (option && option.dataType === "text") {
					return response.text();
				} else {
					return response.json();
				}
			})
			.then(async (response) => {
				if (timer) clearTimeout(timer);

				await api.response(response);

				if (!didTimeout) {
					resolve(response);
				}
			})
			.catch((err) => {
				if (timer) clearTimeout(timer);
				if (didTimeout) return;
				reject(err);
			});
	})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			if (timer) clearTimeout(timer);

			api.error(err);

			throw err;
		});
}

export default {
	get: (...param) => request("get", ...param),
	post: (...param) => request("post", ...param),
	put: (...param) => request("put", ...param),
	delete: (...param) => request("delete", ...param),
	api,
};
