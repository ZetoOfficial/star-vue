import { defineComponent, h, onMounted, onUnmounted } from "vue";
import { usePlanetStore } from "../../stores/planet.store";
import { useStarStore } from "../../stores/star.store";
import { useLocalStorageStore } from "../../stores/localstorage.store";
import Planet from "./planet.page.vue";
import { inputPlanetDto } from "../../api/planets";
import { TRIGGER_PLANET_KEY } from "../../constants";

export default defineComponent(() => {
    const store = usePlanetStore();
    const starStore = useStarStore();
    const localStorageStore = useLocalStorageStore()

    async function refresh() {
        await store.getPlanets()
        await starStore.getStars()
    }

    async function createAndRefresh(from: inputPlanetDto) {
        await store.createPlanet(from)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_PLANET_KEY)
    }

    async function updateAndRefresh(id: string, from: inputPlanetDto) {
        await store.updatePlanet(id, from)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_PLANET_KEY)
    }

    async function deleteAndRefresh(id: string) {
        await store.deletePlanetById(id)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_PLANET_KEY)
    }

    onMounted(async () => {
        await refresh()
        localStorageStore.watch(TRIGGER_PLANET_KEY, async () => await refresh())
    })

    onUnmounted(async () => {
        localStorageStore.unwatch(TRIGGER_PLANET_KEY)
    })

    return () => h(Planet, {
        items: store.planets,
        columns: [
            { key: "name", sortable: true },
            { key: "mass", sortable: true },
            { key: "diameter", sortable: true },
            { key: "distanceFromStar", sortable: true },
            { key: "surfaceTemperature", sortable: true },
            { key: "star.name", sortable: true },
            { key: "actions", width: 80 },
        ],
        stars: starStore.stars,
        filterColumns: ["name", "mass", "diameter", "distanceFromStar", "surfaceTemperature", "star.name"],

        createItem: createAndRefresh,
        updateItem: updateAndRefresh,
        deleteItem: deleteAndRefresh,
    });
})