import { defineStore } from 'pinia'
import { Galaxy } from '../models/galaxy'
import { getGalaxies, createGalaxy, updateGalaxy, deleteGalaxyById, inputGalaxyDto } from '../api/galaxy'

interface State {
    galaxies: Galaxy[],
}

export const useGalaxyStore = defineStore('galaxy', {
    state: (): State => {
        return {
            galaxies: []
        }
    },
    actions: {
        async getGalaxies() {
            this.galaxies = await getGalaxies()
        },
        async createGalaxy(dto: inputGalaxyDto) {
            await createGalaxy(dto)
        },
        async updateGalaxy(galaxyId: string, dto: inputGalaxyDto) {
            await updateGalaxy(galaxyId, dto)
        },
        async deleteGalaxyById(galaxyId: string) {
            await deleteGalaxyById(galaxyId)
        }
    },
})