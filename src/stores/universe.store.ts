import { defineStore } from 'pinia'
import { inputUniverseDto, createUniverse, updateUniverse, getUniverses, deleteUniverseById } from '../api/universe'
import { Universe } from '../models/universe'

interface State {
    universes: Universe[],
}

export const useUniverseStore = defineStore('universe', {
    state: (): State => {
        return {
            universes: []
        }
    },
    actions: {
        async createUniverse(dto: inputUniverseDto) {
            await createUniverse(dto)
        },
        async getUniverses() {
            const universes = await getUniverses()
            this.universes = universes
        },
        async updateUniverse(universeID: string, dto: inputUniverseDto) {
            await updateUniverse(universeID, dto)
        },
        async deleteUniverseById(universeID: string) {
            await deleteUniverseById(universeID)
        }
    },
})