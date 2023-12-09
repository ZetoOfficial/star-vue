import { defineComponent, h, onMounted, ref } from 'vue'
import Universe from './universe.page.vue';
import { useUniverseStore } from "../../stores/universe.store";

export default defineComponent(() => {
    const store = useUniverseStore()

    const defaultUniverse = {
        name: "",
        size: 0,
        composition: "",
    };

    const isCreateModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);

    async function createAndRefresh() {
        if (!store.inputUniverse) return
        await store.createUniverse(store.inputUniverse)
        await store.getUniverses()
        store.inputUniverse = null
        isCreateModalOpen.value = false;
    }

    async function updateUniverseAndRefresh() {
        if (!store.selectedUniverseId) return console.log("No universe selected")
        if (!store.inputUniverse) return console.log("No input dto")
        console.log(`update and refresh with id ${store.selectedUniverseId} - ${JSON.stringify(store.inputUniverse)}`)
        await store.updateUniverse(store.selectedUniverseId, store.inputUniverse)
        await store.getUniverses()
        isEditModalOpen.value = false;
    }

    async function deleteUniverseAndRefresh() {
        if (!store.selectedUniverseId) return
        await store.deleteUniverseById(store.selectedUniverseId)
        await store.getUniverses()
        isDeleteModalOpen.value = false;
    }

    onMounted(async () => {
        await store.getUniverses()
    })

    return () => h(Universe, {
        items: store.universes,
        columns: [
            { key: "name", sortable: true },
            { key: "size", sortable: true },
            { key: "composition", sortable: true },
            { key: "actions", width: 80 },
        ],

        inputUniverse: store.inputUniverse || defaultUniverse,

        openCreateModal: () => {
            store.inputUniverse = { ...defaultUniverse }
            isCreateModalOpen.value = true;
        },
        isCreateModalOpen: isCreateModalOpen.value,
        createItem: createAndRefresh,

        openEditModal: (id: number) => {
            const selectedItem = store.universes[id]
            store.selectedUniverseId = selectedItem.id
            store.inputUniverse = {
                name: selectedItem.name,
                size: selectedItem.size,
                composition: selectedItem.composition
            }
            isEditModalOpen.value = true;
            console.log(`Edit universe ${selectedItem.name} with id ${selectedItem.id}`)
        },
        isEditModalOpen: isEditModalOpen.value,
        updateItem: updateUniverseAndRefresh,

        openDeleteModal: (id: number) => {
            const selectedItem = store.universes[id]
            store.selectedUniverseId = selectedItem.id
            isDeleteModalOpen.value = true;
        },
        isDeleteModalOpen: isDeleteModalOpen.value,
        deleteItem: deleteUniverseAndRefresh,

        resetModal: () => {
            store.inputUniverse = null
            store.selectedUniverseId = null
            isCreateModalOpen.value = false;
            isEditModalOpen.value = false;
            isDeleteModalOpen.value = false;
            console.log("Reset modal")
        }
    });
})
