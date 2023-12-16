import { Audit } from "../models/audit";
import { composeURL } from "./url";

export async function getAudits(): Promise<Audit[]> {
    const response = await fetch(composeURL('/api/Audit'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}