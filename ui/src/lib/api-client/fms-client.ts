import createClient, { type Middleware } from "openapi-fetch";
import type { paths, components } from "../../fms/fms-api";
import { settingsStore } from "$lib/settings-store";
import { get } from "svelte/store";

// TODO configure with real FMS URL (and local dev option)
export const fmsClient = createClient<paths>({ baseUrl: "http://localhost" });

const apiVersion = "1.0";

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		let settings = get(settingsStore);
		let auth = btoa(`${settings.username}:${settings.key}`);
		request.headers.set("Authorization", `Basic ${auth}`);
		return request;
	},
  };
fmsClient.use(authMiddleware);

export type TeamIssue = components["schemas"]["TeamIssueModel"];

export function getTeamNotes(teamNumber: number) {
	return fmsClient.GET(
		"/api/v{version}/FTA/{season}/{eventCode}/teamIssues/{noteId}/{teamNumber}/{issueType}/{resolutionStatus}",
		{
			params: {
				query: {
					teamNumber: teamNumber,
					noteId: undefined,
					issueType: undefined,
					resolutionStatus: undefined,
				},
				path: {
					season: 2024,
					eventCode: "ABCD",
					version: apiVersion,
				}
			}
		},
	)
}