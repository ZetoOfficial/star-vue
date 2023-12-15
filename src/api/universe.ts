import { Universe } from "../models/universe";
import { composeURL } from './url';

export interface inputUniverseDto {
    name: string,
    size: number,
    composition: string
}

export async function createUniverse(dto: inputUniverseDto) {
    await fetch(composeURL('/api/Universe'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });
}

export async function getUniverses(): Promise<Universe[]> {
    const response = await fetch(composeURL('/api/Universe'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}

export async function updateUniverse(universeID: string, dto: inputUniverseDto) {
    await fetch(composeURL(`/api/Universe/${universeID}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    })
}

export async function deleteUniverseById(universeID: string): Promise<void> {
    await fetch(composeURL(`/api/Universe/${universeID}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}