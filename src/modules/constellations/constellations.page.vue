<template>
  <VaButton @click="openCreateModal()">Создать</VaButton>
  <VaSelect class="ml-3" v-model="filterColumnsRef" :options="filterColumns" />
  <VaInput class="ml-3" v-model="filterInput" placeholder="Filter..." />

  <VaDataTable class="table-crud" :items="filteredItems" :columns="columns" striped>
    <template #cell(actions)="{ rowIndex }">
      <VaButton preset="plain" icon="edit" @click="openEditModal(rowIndex)" />
      <VaButton preset="plain" icon="delete" class="ml-3" @click="openDeleteModal(rowIndex)" />
    </template>
  </VaDataTable>

  <VaModal class="modal-crud" :model-value="isCreateModalOpenRef" size="small" hide-default-actions @cancel="resetModal">
    <h3 class="va-h3">Создание созвездия</h3>
    <ConstellationForm :init-data="selectedItemRef" :galaxies="galaxies" :submit="closeModal(createItem)" />
  </VaModal>

  <VaModal class="modal-crud" :model-value="isEditModalOpenRef" size="small" hide-default-actions @cancel="resetModal">
    <h3 class="va-h3">Редактирование созвездия</h3>
    <ConstellationForm :init-data="selectedItemRef" :galaxies="galaxies" :submit="handleUpdate" />
  </VaModal>

  <VaModal :model-value="isDeleteModalOpenRef" size="small" @ok="handleDelete" @cancel="resetModal" blur>
    <h3 class="va-h3">Предупреждение</h3>
    <p>Вы уверены, что хотите удалить этот элемент?</p>
  </VaModal>
</template>
  
<script lang="ts" setup>
import { Constellation } from '../../models/constellation';
import { Galaxy } from '../../models/galaxy';
import { inputConstellationDto } from '../../api/constelations';
import { computed, defineProps, ref } from 'vue';
import ConstellationForm from '../../components/constellation.form.vue';

const props = defineProps<{
  items: Constellation[];
  columns: string[];
  galaxies: Galaxy[];
  filterColumns: string[];

  createItem: (form: inputConstellationDto) => Promise<void>;
  updateItem: (id: string, form: inputConstellationDto) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}>();

const selectedItemRef = ref<Constellation | null>(null)
const filterColumnsRef = ref<string>("name")
const filteredItems = computed(() => {
  if (!filterInput.value) {
    return props.items;
  }
  return props.items.filter(item => {
    const key = filterColumnsRef.value as keyof Constellation;
    if (key.includes('.')) {
      const [firstKey, secondKey] = key.split('.');
      return item[firstKey][secondKey].toString().toLowerCase().includes(filterInput.value.toLowerCase());
    }
    const itemValue = item[key];
    if (typeof itemValue === 'number') {
      return itemValue === Number(filterInput.value);
    } else {
      return itemValue.toString().toLowerCase().includes(filterInput.value.toLowerCase());
    }
  });
});
const isCreateModalOpenRef = ref<boolean>(false)
const isEditModalOpenRef = ref(false)
const isDeleteModalOpenRef = ref(false)
const filterInput = ref("")

function resetModal() {
  selectedItemRef.value = null
  isCreateModalOpenRef.value = false
  isEditModalOpenRef.value = false
  isDeleteModalOpenRef.value = false
}

function closeModal(action: Function) {
  return (...args: any[]) => action(...args).finally(() => {
    resetModal()
  })
}
function openCreateModal() {
  isCreateModalOpenRef.value = true
}

function openEditModal(rowIndex: number) {
  selectedItemRef.value = filteredItems.value[rowIndex]
  isEditModalOpenRef.value = true
  console.log(`Edit universe ${selectedItemRef.value.name} with id ${selectedItemRef.value.id}`)
}

function openDeleteModal(rowIndex: number) {
  console.log(`Delete index ${rowIndex}`)
  selectedItemRef.value = filteredItems.value[rowIndex]
  isDeleteModalOpenRef.value = true
  console.log(`Delete universe ${selectedItemRef.value.name} with id ${selectedItemRef.value.id}`)
}

async function handleUpdate(form: inputConstellationDto) {
  await props.updateItem(selectedItemRef.value!.id, form)
  resetModal()
}

async function handleDelete() {
  await props.deleteItem(selectedItemRef.value!.id)
  resetModal()
}

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
    