import { defineComponent, h, onMounted, onUnmounted } from 'vue'
import Universe from './universe.page.vue';
import { useUniverseStore } from "../../stores/universe.store";
import { useLocalStorageStore } from "../../stores/localstorage.store";
import { inputUniverseDto } from '../../api/universe';
import { TRIGGER_UNIVERSE_KEY } from "../../constants";

export default defineComponent(() => {
    const store = useUniverseStore()
    const localStorageStore = useLocalStorageStore()

    async function createAndRefresh(dto: inputUniverseDto) {
        if (!validateInputs(dto)) return
        await store.createUniverse(dto)
        await store.getUniverses()

        localStorageStore.triggerTimeoutKey(TRIGGER_UNIVERSE_KEY)
    }

    async function updateUniverseAndRefresh(id: string, dto: inputUniverseDto) {
        if (!validateInputs(dto)) return
        console.log(`update and refresh with id ${id} - ${JSON.stringify(dto)}`)
        await store.updateUniverse(id, dto)
        await store.getUniverses()

        localStorageStore.triggerTimeoutKey(TRIGGER_UNIVERSE_KEY)
    }

    async function deleteUniverseAndRefresh(id: string) {
        await store.deleteUniverseById(id)
        await store.getUniverses()

        localStorageStore.triggerTimeoutKey(TRIGGER_UNIVERSE_KEY)
    }

    function validateInputs(dto: inputUniverseDto) {
        if (!dto) return false
        if (!dto.name || dto.name.trim().length === 0) return false
        if (isNaN(dto.size) || dto.size < 0) return false
        if (!dto.composition || dto.composition.trim().length === 0) return false
        return true;
    }

    onMounted(async () => {
        await store.getUniverses()
        localStorageStore.watch(TRIGGER_UNIVERSE_KEY, () => store.getUniverses())
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
        updateItem: updateUniverseAndRefresh,
        deleteItem: deleteUniverseAndRefresh,
    });
})
