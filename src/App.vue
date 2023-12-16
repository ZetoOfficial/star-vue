<template>
  <VaTabs class="tabs">
    <VaTab>
      <RouterLink class="test" to="/universe">Вселенная</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink class="test" to="/galaxy">Галактика</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink class="test" to="/stars">Звезды</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink class="test" to="/planets">Планеты</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink class="test" to="/constellations">Созвездия</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink class="test" to="/reports">Отчеты</RouterLink>
    </VaTab>
    <VaTab>
      <RouterLink class="test" to="/audit">Журнал событий</RouterLink>
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

.tabs {
  margin-bottom: 30px;
  text-decoration: none;
}

.test {
  color: black;
}

.test:hover {
  font-size: larger;
}

.router-link-active {
  font-size: larger;
}
</style>

<script lang="ts" setup>
import { useLocalStorageStore } from './stores/localstorage.store';

const store = useLocalStorageStore();

window.addEventListener('storage', () => {
  store.trigger();
});

</script>