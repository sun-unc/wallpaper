import {request} from "@/utils/request.js"

export function getBannerAPI() {
	return request("/bizhi/homeBanner")
}

export function getRandomWrapperAPI() {
	return request("/bizhi/randomWall")
}