/**
 * @author FrierenDv
 * @version 1.0.0
 */

import axios from "axios";
import { Config, API_URL, extractCode, PARSER, Results } from "./Config";

export const insta = async (url: string): Promise<Results> => {
	const valicode = extractCode(url);
	if (!valicode || typeof valicode !== "string") {
		return {
			status: false,
			message: "Failed extract code in url, is that valid instagram url?",
		};
	}
	const data = await axios
		.get(API_URL(valicode), {
			headers: {
				// @ts-ignore:next-line
				...Config,
			},
		})
		.catch((e: any) => e.response);
	if (data.data && data.data.status == "ok") {
		delete data.data.data.shortcode_media.edge_media_to_parent_comment;
		delete data.data.data.shortcode_media.edge_media_preview_comment;
		const results: Results = PARSER(data.data);
		return results;
	} else {
		return {
			status: false,
			message: "idk dude",
		};
	}
};
const INSTA = {
	dl: insta,
	instagram: insta,
	insta,
};
export default INSTA;
