import {request} from "@/utils/request.js"

export function getBannerAPI() {
	return request("/homeBanner")
}

export function getRandomWrapperAPI() {
	return request("/randomWall")
}

export function getClassifyAPI(data = {}) {
	return request("/classify", {data})
}

export function getClassifyListAPI(data = {}) {
	return request("/wallList", {data})
}

export function getSetupScoreAPI(data = {}) {
	return request("/setupScore", {data})
}