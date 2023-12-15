import { defineStore } from 'pinia'
import { Star } from '../models/star'
import { inputStarDto, createStar, getStars, updateStar, deleteStarById } from '../api/star'

interface State {
    stars: Star[],
}

export const useStarStore = defineStore('star', {
    state: (): State => {
        return {
            stars: []
        }
    },
    actions: {
        async createStar(dto: inputStarDto) {
            await createStar(dto)
        },
        async getStars() {
            const stars = await getStars()
            this.stars = stars
        },
        async updateStar(universeID: string, dto: inputStarDto) {
            await updateStar(universeID, dto)
        },
        async deleteStarById(universeID: string) {
            await deleteStarById(universeID)
        }
    },
})