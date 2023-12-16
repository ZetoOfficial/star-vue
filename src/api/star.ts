import { Star } from "../models/star";
import { composeURL } from './url';

export interface inputStarDto {
    name: string,
    spectralType: string,
    luminosity: number,
    distanceFromEarth: number,
    temperature: number,
    galaxyId: string
}

export async function createStar(dto: inputStarDto) {
    await fetch(composeURL('/api/Star'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });
}

export async function getStars(): Promise<Star[]> {
    const response = await fetch(composeURL('/api/Star'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}

export async function updateStar(starId: string, dto: inputStarDto) {
    await fetch(composeURL(`/api/Star/${starId}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    })
}

export async function deleteStarById(starId: string): Promise<void> {
    await fetch(composeURL(`/api/Star/${starId}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}