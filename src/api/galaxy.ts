import { Galaxy } from "../models/galaxy";
import { composeURL } from "./url";

export interface inputGalaxyDto {
    name: string,
    size: number,
    shape: string,
    composition: string,
    distanceFromEarth: number,
    universeId: string
}

export async function createGalaxy(dto: inputGalaxyDto): Promise<void> {
    await fetch(composeURL('/api/Galaxy'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });
}

export async function getGalaxies(): Promise<Galaxy[]> {
    const response = await fetch(composeURL(`/api/Galaxy`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}

export async function updateGalaxy(galaxyId: string, dto: inputGalaxyDto): Promise<void> {
    await fetch(composeURL(`/api/Galaxy/${galaxyId}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    })
}

export async function deleteGalaxyById(galaxyId: string): Promise<void> {
    await fetch(composeURL(`/api/Galaxy/${galaxyId}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}