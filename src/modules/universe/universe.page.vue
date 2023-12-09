<template>
  <VaButton @click="openCreateModal()">Создать</VaButton>

  <VaDataTable class="table-crud" :items="items" :columns="columns" striped>
    <template #cell(actions)="{ rowIndex }">
      <VaButton preset="plain" icon="edit" @click="openEditModal(rowIndex)" />
      <VaButton preset="plain" icon="delete" class="ml-3" @click="openDeleteModal(rowIndex)" />
    </template>
  </VaDataTable>

  <VaModal class="modal-crud" :model-value="isCreateModalOpen" title="Create item" size="small" @ok="createItem"
    @cancel="resetModal">
    <VaInput v-model="inputUniverse.name" class="my-6" label="Name" />
    <VaInput v-model="inputUniverse.size" class="my-6" label="Size" error />
    <VaInput v-model="inputUniverse.composition" class="my-6" label="Composition" error />
  </VaModal>

  <VaModal class="modal-crud" :model-value="isEditModalOpen" title="Edit item" size="small" @ok="updateItem"
    @cancel="resetModal">
    <VaInput v-model="inputUniverse.name" class="my-6" label="Name" />
    <VaInput v-model="inputUniverse.size" class="my-6" label="Size" />
    <VaInput v-model="inputUniverse.composition" class="my-6" label="Composition" />
  </VaModal>

  <VaModal :model-value="isDeleteModalOpen" size="small" @ok="deleteItem" @cancel="resetModal" blur>
    <h3 class="va-h3">
      Предупреждение
    </h3>
    <p>Вы уверены, что хотите удалить этот элемент?</p>
  </VaModal>
</template>

<script lang="ts" setup>
import { Universe } from '../../models/universe';
import { inputUniverseDto } from '../../api/universe';


defineProps<{
  items: Universe[];
  columns: string[];

  inputUniverse: inputUniverseDto;

  openCreateModal: () => void;
  isCreateModalOpen: boolean;
  createItem: () => void;

  openEditModal: (id: number) => void;
  isEditModalOpen: boolean;
  updateItem: () => void;

  openDeleteModal: (id: number) => void;
  isDeleteModalOpen: boolean;
  deleteItem: () => void;

  resetModal(): void;
}>();

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
  