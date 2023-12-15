import { defineStore } from 'pinia'
import { getReportData } from '../api/reports'
import { ReportInfo } from '../models/reportsInfo'

export const useReportStore = defineStore('report', {
    actions: {
        async getReportData(galaxyId: string): Promise<ReportInfo> {
            return await getReportData(galaxyId)
        }
    }
})