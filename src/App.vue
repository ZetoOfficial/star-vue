<template>
  <VaTabs>
    <VaTab>
      <RouterLink to="/universe">Вселенная</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink to="/galaxy">Галактика</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink to="/stars">Звезды</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink to="/planets">Планеты</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink to="/constellations">Созвездия</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink to="/reports">Отчеты</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink to="/audit">Журнал событий</RouterLink>
    </VaTab>
  </VaTabs>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  max-width: 1300px;
}
</style>

<script lang="ts" setup>
import { useLocalStorageStore } from './stores/localstorage.store';

const store = useLocalStorageStore();

window.addEventListener('storage', () => {
  store.trigger();
});

</script>