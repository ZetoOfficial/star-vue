import { defineStore } from 'pinia'
import { inputPlanetDto, createPlanet, updatePlanet, getPlanets, deletePlanetById } from '../api/planets'
import { Planet } from '../models/planet'

interface State {
    planets: Planet[]
}

export const usePlanetStore = defineStore('planet', {
    state: (): State => ({
        planets: []
    }),
    actions: {
        async getPlanets() {
            this.planets = await getPlanets()
        },
        async createPlanet(planet: inputPlanetDto) {
            await createPlanet(planet)
            await this.getPlanets()
        },
        async updatePlanet(id: string, dto: inputPlanetDto) {
            await updatePlanet(id, dto)
            await this.getPlanets()
        },
        async deletePlanetById(id: string) {
            await deletePlanetById(id)
            await this.getPlanets()
        }
    }
})