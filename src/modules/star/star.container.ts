import { defineComponent, h, onMounted, onUnmounted } from 'vue'
import Star from './Star.page.vue';
import { useStarStore } from "../../stores/star.store";
import { useLocalStorageStore } from "../../stores/localstorage.store";
import { inputStarDto } from '../../api/star';
import { TRIGGER_STAR_KEY } from "../../constants";

export default defineComponent(() => {
    const store = useStarStore()
    const localStorageStore = useLocalStorageStore()

    async function createAndRefresh(dto: inputStarDto) {
        if (!validateInputs(dto)) return
        await store.createStar(dto)
        await store.getStars()

        localStorageStore.triggerTimeoutKey(TRIGGER_STAR_KEY)
    }

    async function updateStarAndRefresh(id: string, dto: inputStarDto) {
        if (!validateInputs(dto)) return
        console.log(`update and refresh with id ${id} - ${JSON.stringify(dto)}`)
        await store.updateStar(id, dto)
        await store.getStars()

        localStorageStore.triggerTimeoutKey(TRIGGER_STAR_KEY)
    }

    async function deleteStarAndRefresh(id: string) {
        await store.deleteStarById(id)
        await store.getStars()

        localStorageStore.triggerTimeoutKey(TRIGGER_STAR_KEY)
    }

    function validateInputs(dto: inputStarDto) {
        if (!dto) return false
    }

    onMounted(async () => {
        await store.getStars()
        localStorageStore.watch(TRIGGER_STAR_KEY, () => store.getStars())
    })

    onUnmounted(() => {
        localStorageStore.unwatch(TRIGGER_STAR_KEY)
    })

    return () => h(Star, {
        items: store.stars,
        columns: [
            { key: "name", sortable: true },
            { key: "spectralType", sortable: true },
            { key: "luminosity", sortable: true },
            { key: "distanceFromEarth", sortable: true },
            { key: "temperature", sortable: true },
            { key: "galaxyName", sortable: true },
            { key: "actions", width: 80 },
        ],
        filterColumns: ["name", "spectralType", "luminosity", "distanceFromEarth", "temperature", "galaxyName"],

        createItem: createAndRefresh,
        updateItem: updateStarAndRefresh,
        deleteItem: deleteStarAndRefresh,
    });
})
