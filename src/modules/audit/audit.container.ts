import Audit from "./audit.page.vue";
import { defineComponent, h, onMounted, onUnmounted } from "vue";
import { useAuditStore } from "../../stores/audit.store";
import { useLocalStorageStore } from "../../stores/localstorage.store";
import { TRIGGER_AUDIT_KEY } from "../../constants";

export default defineComponent(() => {
    const store = useAuditStore();
    const localStorageStore = useLocalStorageStore()

    async function refresh() {
        await store.getAudits()
    }

    onMounted(async () => {
        await refresh()
        localStorageStore.watch(TRIGGER_AUDIT_KEY, async () => await refresh())
    })

    onUnmounted(() => {
        localStorageStore.unwatch(TRIGGER_AUDIT_KEY)
    })

    return () => h(Audit, {
        items: store.audits,
        columns: [
            { key: "operationType", sortable: true },
            { key: "tableName", sortable: true },
            { key: "timestamp", sortable: true },
            { key: "rowId", sortable: true },
            { key: "newValue", sortable: true },
            { key: "oldValue", sortable: true },
        ],
        filterColumns: ["operationType", "tableName", "timestamp", "rowId", "newValue", "oldValue"],
    });
})