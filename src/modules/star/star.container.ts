import Star from './star.page.vue';
import { defineComponent, h, onMounted, onUnmounted } from 'vue'
import { useStarStore } from "../../stores/star.store";
import { useLocalStorageStore } from "../../stores/localstorage.store";
import { useGalaxyStore } from "../../stores/galaxies.store";
import { inputStarDto } from '../../api/star';
import { TRIGGER_STAR_KEY } from "../../constants";

export default defineComponent(() => {
    const store = useStarStore()
    const galaxyStore = useGalaxyStore()
    const localStorageStore = useLocalStorageStore()

    async function refresh() {
        await store.getStars()
        await galaxyStore.getGalaxies()
    }

    async function createAndRefresh(dto: inputStarDto) {
        await store.createStar(dto)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_STAR_KEY)
    }

    async function updateAndRefresh(id: string, dto: inputStarDto) {
        await store.updateStar(id, dto)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_STAR_KEY)
    }

    async function deleteAndRefresh(id: string) {
        await store.deleteStarById(id)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_STAR_KEY)
    }

    onMounted(async () => {
        await refresh()
        localStorageStore.watch(TRIGGER_STAR_KEY, async () => await refresh())
    })

    onUnmounted(() => {
        localStorageStore.unwatch(TRIGGER_STAR_KEY)
    })

    return () => h(Star, {
        items: store.stars.sort((a, b) => a.name.localeCompare(b.name)),
        columns: [
            { key: "name", sortable: true },
            { key: "spectralType", sortable: true },
            { key: "luminosity", sortable: true },
            { key: "distanceFromEarth", sortable: true },
            { key: "temperature", sortable: true },
            { key: "galaxy.name", sortable: true },
            { key: "actions", width: 80 },
        ],
        filterColumns: ["name", "spectralType", "luminosity", "distanceFromEarth", "temperature", "galaxy.name"],
        galaxies: galaxyStore.galaxies,

        createItem: createAndRefresh,
        updateItem: updateAndRefresh,
        deleteItem: deleteAndRefresh,
    });
})
