<template>
  <div>
    <va-tabs>
      <va-tab>
        <router-link to="/universe">Вселенная</router-link>
      </va-tab>
      <va-tab>
        <router-link to="/galaxy">Галактика</router-link>
      </va-tab>
      <va-tab>
        <router-link to="/stars">Звезды</router-link>
      </va-tab>
      <va-tab>
        <router-link to="/planets">Планеты</router-link>
      </va-tab>
      <va-tab>
        <router-link to="/constellation">Созвездия</router-link>
      </va-tab>
      <va-tab>
        <router-link to="/reports">Отчеты</router-link>
      </va-tab>
      <va-tab>
        <router-link to="/audit">Журнал событий</router-link>
      </va-tab>
    </va-tabs>
    <router-view></router-view>
  </div>
</template>
