import { Galaxy } from "../models/galaxy";
import { composeURL } from "./url";

export async function getGalaxies(): Promise<Galaxy[]> {
    const response = await fetch(composeURL(`/api/Galaxy`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}