import { defineComponent, h, onMounted } from 'vue'
import Report from './reports.page.vue'
import { useReportStore } from '../../stores/reports.store';
import { useGalaxyStore } from '../../stores/galaxies.store';
import { ReportInfo } from '../../models/reportsInfo';

export default defineComponent(() => {
    const store = useReportStore()
    const galaxyStore = useGalaxyStore()

    async function getReportInfo(galaxyId: string): Promise<ReportInfo> {
        return await store.getReportData(galaxyId)
    }

    onMounted(async () => {
        await galaxyStore.getGalaxies()
    })

    return () => h(Report, {
        galaxies: galaxyStore.galaxies,

        getReportInfo: getReportInfo
    });
});