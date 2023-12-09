import { Universe } from "../models/universe";

export interface inputUniverseDto {
    name: string,
    size: number,
    composition: string
}

export async function createUniverse(dto: inputUniverseDto): Promise<Universe> {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/api/universes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });

    return response.json();
}

export async function getUniverses(limit: number, offset: number): Promise<Universe[]> {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/api/universes?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}

export async function getUniverseById(universeID: string): Promise<Universe> {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/api/universes/${universeID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return response.json();
}

export async function updateUniverse(universeID: string, dto: inputUniverseDto): Promise<Universe> {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/api/universes/${universeID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    })

    return response.json();
}

export async function deleteUniverseById(universeID: string): Promise<void> {
    const baseUrl = import.meta.env.VITE_API_URL;
    await fetch(`${baseUrl}/api/universes/${universeID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}