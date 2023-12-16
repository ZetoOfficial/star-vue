import { defineComponent, h, onMounted, onUnmounted } from 'vue'
import Universe from './universe.page.vue';
import { useUniverseStore } from "../../stores/universe.store";
import { useLocalStorageStore } from "../../stores/localstorage.store";
import { inputUniverseDto } from '../../api/universe';
import { TRIGGER_UNIVERSE_KEY } from "../../constants";

export default defineComponent(() => {
    const store = useUniverseStore()
    const localStorageStore = useLocalStorageStore()

    async function refresh() {
        await store.getUniverses()
    }

    async function createAndRefresh(dto: inputUniverseDto) {
        await store.createUniverse(dto)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_UNIVERSE_KEY)
    }

    async function updateAndRefresh(id: string, dto: inputUniverseDto) {
        await store.updateUniverse(id, dto)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_UNIVERSE_KEY)
    }

    async function deleteAndRefresh(id: string) {
        await store.deleteUniverseById(id)
        await refresh()

        localStorageStore.triggerTimeoutKey(TRIGGER_UNIVERSE_KEY)
    }

    onMounted(async () => {
        await refresh()
        localStorageStore.watch(TRIGGER_UNIVERSE_KEY, async () => await refresh())
    })

    onUnmounted(() => {
        localStorageStore.unwatch(TRIGGER_UNIVERSE_KEY)
    })

    return () => h(Universe, {
        items: store.universes,
        columns: [
            { key: "name", sortable: true },
            { key: "size", sortable: true },
            { key: "composition", sortable: true },
            { key: "actions", width: 80 },
        ],
        filterColumns: ["name", "size", "composition"],

        createItem: createAndRefresh,
        updateItem: updateAndRefresh,
        deleteItem: deleteAndRefresh,
    });
})
