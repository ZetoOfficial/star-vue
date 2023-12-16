<template>
    <VaSelect v-model="filterColumnsRef" :options="filterColumns" />
    <VaInput class="ml-3" v-model="filterInput" placeholder="Filter..." />
    <VaDataTable class="table-crud" :items="filteredItems" :columns="columns" striped />
</template>
  
<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import { Audit } from '../../models/audit';

const props = defineProps<{
    items: Audit[];
    columns: string[];
    filterColumns: string[];
}>();

const filterColumnsRef = ref<string>("operationType")
const filteredItems = computed(() => {
    if (!filterInput.value) {
        return props.items
    }
    return props.items.filter(item => {
        const key = filterColumnsRef.value as keyof Audit;
        return item[key].toString().toLowerCase().includes(filterInput.value.toLowerCase());
    });
})
const filterInput = ref("")
</script>
  
<style lang="scss" scoped>
.table-crud {
    --va-form-element-default-width: 0;

    .va-input {
        display: block;
    }

    &__slot {
        th {
            vertical-align: middle;
        }
    }
}

.modal-crud {
    .va-input {
        display: block;
    }
}
</style>
    