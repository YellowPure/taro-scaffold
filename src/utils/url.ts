/**
 * url上添加参数
 * @param uri 
 * @param key 
 * @param value 
 */
export function updateQueryStringParameter(uri, key, value) {
	if(!value) {
		return uri;
	}
	const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	const separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}
