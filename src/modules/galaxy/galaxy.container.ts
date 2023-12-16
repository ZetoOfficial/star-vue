import Galaxy from "./galaxy.page.vue";
import { defineComponent, h, onMounted } from "vue";
import { useGalaxyStore } from "../../stores/galaxies.store";
import { useLocalStorageStore } from "../../stores/localstorage.store";
import { useUniverseStore } from "../../stores/universe.store";
import { TRIGGER_GALAXY_KEY } from "../../constants";
import { inputGalaxyDto } from "../../api/galaxy";

export default defineComponent(() => {
    const store = useGalaxyStore();
    const universeStore = useUniverseStore();
    const localStorageStore = useLocalStorageStore()

    async function refresh() {
        await store.getGalaxies()
        await universeStore.getUniverses()
    }

    async function createAndRefresh(dto: inputGalaxyDto) {
        await store.createGalaxy(dto)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_GALAXY_KEY)
    }

    async function updateAndRefresh(id: string, dto: inputGalaxyDto) {
        console.log(`update and refresh with id ${id} - ${JSON.stringify(dto)}`)
        await store.updateGalaxy(id, dto)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_GALAXY_KEY)
    }

    async function deleteAndRefresh(id: string) {
        await store.deleteGalaxyById(id)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_GALAXY_KEY)
    }

    onMounted(async () => {
        await refresh()
        localStorageStore.watch(TRIGGER_GALAXY_KEY, async () => await refresh())
    })

    return () => h(Galaxy, {
        items: store.galaxies,
        columns: [
            { key: "name", sortable: true },
            { key: "size", sortable: true },
            { key: "shape", sortable: true },
            { key: "composition", sortable: true },
            { key: "distanceFromEarth", sortable: true },
            { key: "universe.name", sortable: true },
            { key: "actions", width: 80 },
        ],
        filterColumns: ["name", "size", "shape", "composition", "distanceFromEarth", "universe.name"],
        universes: universeStore.universes,

        createItem: createAndRefresh,
        updateItem: updateAndRefresh,
        deleteItem: deleteAndRefresh,
    });
})