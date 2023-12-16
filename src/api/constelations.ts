import { Constellation } from "../models/constellation";
import { composeURL } from "./url";

export interface inputConstellationDto {
    name: string
    shape: string
    abbreviation: string
    history: string
    galaxyId: string
}

export async function createConstellation(dto: inputConstellationDto): Promise<void> {
    await fetch(composeURL('/api/Constellation'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });
}

export async function getConstellations(): Promise<Constellation[]> {
    const response = await fetch(composeURL('/api/Constellation'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}

export async function updateConstellation(constellationId: string, dto: inputConstellationDto): Promise<void> {
    await fetch(composeURL(`/api/Constellation/${constellationId}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });
}

export async function deleteConstellationById(constellationId: string): Promise<void> {
    await fetch(composeURL(`/api/Constellation/${constellationId}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}