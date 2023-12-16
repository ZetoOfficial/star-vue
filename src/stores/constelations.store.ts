import { defineStore } from 'pinia'
import { inputConstellationDto, createConstellation, getConstellations, updateConstellation, deleteConstellationById } from '../api/constelations'
import { Constellation } from '../models/constellation'

interface State {
    constellations: Constellation[]
}

export const useConstellationStore = defineStore('constellation', {
    state: (): State => {
        return {
            constellations: []
        }
    },
    actions: {
        async getConstellations(): Promise<Constellation[]> {
            const response = await getConstellations()
            this.constellations = response
            return response
        },
        async createConstellation(dto: inputConstellationDto): Promise<void> {
            await createConstellation(dto)
        },
        async updateConstellation(constellationId: string, dto: inputConstellationDto): Promise<void> {
            await updateConstellation(constellationId, dto)
        },
        async deleteConstellationById(constellationId: string): Promise<void> {
            await deleteConstellationById(constellationId)
        }
    }
})