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
    <h3 class="va-h3">
      Создание галактики
    </h3>
    <GalaxyForm :init-data="selectedItemRef" :universes="universes" :submit="closeModal(createItem)" />
  </VaModal>

  <VaModal class="modal-crud" :model-value="isEditModalOpenRef" size="small" hide-default-actions @cancel="resetModal">
    <h3 class="va-h3">Редактирование галактики</h3>
    <GalaxyForm :init-data="selectedItemRef" :universes="universes" :submit="handleUpdate" />
  </VaModal>

  <VaModal :model-value="isDeleteModalOpenRef" size="small" @ok="handleDelete" @cancel="resetModal" blur>
    <h3 class="va-h3">Предупреждение</h3>
    <p>Вы уверены, что хотите удалить этот элемент?</p>
  </VaModal>
</template>
  
<script lang="ts" setup>
import { Galaxy } from '../../models/galaxy';
import { Universe } from '../../models/universe';
import { computed, defineProps, ref } from 'vue';
import { inputGalaxyDto } from '../../api/galaxy';
import GalaxyForm from '../../components/galaxy.form.vue'

const props = defineProps<{
  items: Galaxy[];
  columns: string[];
  universes: Universe[];
  filterColumns: string[];

  createItem: (form: inputGalaxyDto) => Promise<void>;
  updateItem: (id: string, form: inputGalaxyDto) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}>();

const selectedItemRef = ref<Galaxy | null>(null)
const filterColumnsRef = ref<string>("name")
const filteredItems = computed(() => {
  if (!filterInput.value) {
    return props.items;
  }
  return props.items.filter(item => {
    const key = filterColumnsRef.value as keyof Galaxy;
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
  console.log(`Edit star ${selectedItemRef.value.name} with id ${selectedItemRef.value.id}`)
}

function openDeleteModal(rowIndex: number) {
  console.log(`Delete index ${rowIndex}`)
  selectedItemRef.value = filteredItems.value[rowIndex]
  isDeleteModalOpenRef.value = true
  console.log(`Delete star ${selectedItemRef.value.name} with id ${selectedItemRef.value.id}`)
}

async function handleUpdate(form: inputGalaxyDto) {
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
    