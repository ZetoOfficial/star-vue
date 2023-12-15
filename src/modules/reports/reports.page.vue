<template>
    <VaSelect v-model="selectedGalaxyRef" :options="selectOptions" text-by="name" />
    <VaButton :href="getDownloadReportLink('excel')">Скачать Excel отчет</VaButton>
    <VaButton :href="getDownloadReportLink('word')">Скачать Word отчет</VaButton>

    <VaDataTable class="table-crud" :items="reportInfo" :columns="columns" striped>
    </VaDataTable>
</template>

<script lang="ts" setup>
import { watch, computed, defineProps, ref } from 'vue';
import { composeURL } from '../../api/url'
import { Galaxy } from '../../models/galaxy';
import { ReportInfo } from '../../models/reportsInfo';

const props = defineProps<{
    galaxies: Galaxy[],
    getReportInfo: (id: string) => Promise<ReportInfo>
}>();

const selectedGalaxyRef = ref<Galaxy>();

const selectOptions = computed(() => {
    const selectOptions = props.galaxies
    selectedGalaxyRef.value = selectOptions[0]
    return selectOptions
});

const columns = [
    { key: 'category', label: 'Категория', width: '10vw' },
    { key: 'description', label: 'Описание', width: '40vw' },
];

const reportInfo = ref<{ category: string, description: string }[]>([])

watch(selectedGalaxyRef, async () => {
    if (selectedGalaxyRef.value) {
        const data = await props.getReportInfo(selectedGalaxyRef.value.id)
        reportInfo.value = [
            { category: 'Название галактики', description: data.name },
            { category: 'Тип галактики', description: data.shape },
            { category: 'Размер галактики', description: `${data.size} млн. км` },
            { category: 'Основные звезды', description: data.stars },
            { category: 'Известные планеты', description: data.planets },
            { category: 'Состав', description: data.composition }
        ]
    } else {
        reportInfo.value = []
    }
})

function getDownloadReportLink(type: 'word' | 'excel'): string {
    return composeURL(`/api/Report/${type}?gId=${selectedGalaxyRef.value?.id}`)
}
</script>