import Constelation from "./constellations.page.vue";
import { defineComponent, h, onMounted, onUnmounted } from "vue";
import { useConstellationStore } from "../../stores/constelations.store";
import { useLocalStorageStore } from "../../stores/localstorage.store";
import { useGalaxyStore } from "../../stores/galaxies.store";
import { TRIGGER_CONSTELLATION_KEY } from "../../constants";
import { inputConstellationDto } from "../../api/constelations";

export default defineComponent(() => {
    const store = useConstellationStore();
    const galaxyStore = useGalaxyStore()
    const localStorageStore = useLocalStorageStore()

    async function createAndRefresh(dto: inputConstellationDto) {
        await store.createConstellation(dto)
        await store.getConstellations()

        localStorageStore.triggerTimeoutKey(TRIGGER_CONSTELLATION_KEY)
    }

    async function updateAndRefresh(id: string, dto: inputConstellationDto) {
        console.log(`update and refresh with id ${id} - ${JSON.stringify(dto)}`)
        await store.updateConstellation(id, dto)
        await store.getConstellations()

        localStorageStore.triggerTimeoutKey(TRIGGER_CONSTELLATION_KEY)
    }

    async function deleteAndRefresh(id: string) {
        await store.deleteConstellationById(id)
        await store.getConstellations()

        localStorageStore.triggerTimeoutKey(TRIGGER_CONSTELLATION_KEY)
    }

    onMounted(async () => {
        await store.getConstellations()
        await galaxyStore.getGalaxies()

        localStorageStore.watch(TRIGGER_CONSTELLATION_KEY, async () => await store.getConstellations())
    })

    onUnmounted(() => {
        localStorageStore.unwatch(TRIGGER_CONSTELLATION_KEY)
    })

    return () => h(Constelation, {
        items: store.constellations,
        columns: [
            { key: "name", sortable: true },
            { key: "shape", sortable: true },
            { key: "abbreviation", sortable: true },
            { key: "history", sortable: true },
            { key: "galaxy.name", sortable: true },
            { key: "actions", width: 80 },
        ],
        filterColumns: ["name", "shape", "abbreviation", "history", "galaxy.name"],
        galaxies: galaxyStore.galaxies,

        createItem: createAndRefresh,
        updateItem: updateAndRefresh,
        deleteItem: deleteAndRefresh,
    });
})