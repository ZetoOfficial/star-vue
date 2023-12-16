import { Planet } from "../models/planet";
import { composeURL } from "./url";

export interface inputPlanetDto {
    name: string,
    mass: number,
    diameter: number,
    distanceFromStar: number,
    surfaceTemperature: number,
    starId: string
}

export async function createPlanet(dto: inputPlanetDto): Promise<void> {
    await fetch(composeURL('/api/Planet'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });
}

export async function getPlanets(): Promise<Planet[]> {
    const response = await fetch(composeURL('/api/Planet'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}

export async function updatePlanet(planetId: string, dto: inputPlanetDto): Promise<void> {
    await fetch(composeURL(`/api/Planet/${planetId}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    })
}

export async function deletePlanetById(planetId: string): Promise<void> {
    await fetch(composeURL(`/api/Planet/${planetId}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}