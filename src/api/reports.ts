import { ReportInfo } from "../models/reportsInfo";
import { composeURL } from "./url";


export async function getReportData(galaxyId: string): Promise<ReportInfo> {
    const response = await fetch(composeURL(`/api/Report/data?gId=${galaxyId}`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json()
}