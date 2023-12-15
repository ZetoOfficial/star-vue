import { defineStore } from 'pinia'
import { Galaxy } from '../models/galaxy'
import { getGalaxies } from '../api/galaxy'

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
            const galaxies = await getGalaxies()
            this.galaxies = galaxies
        },
    },
})