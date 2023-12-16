import { defineStore } from "pinia";
import { getAudits } from "../api/audit";
import { Audit } from "../models/audit";

interface State {
    audits: Audit[]
}

export const useAuditStore = defineStore("audit", {
    state: (): State => ({
        audits: []
    }),
    actions: {
        async getAudits() {
            this.audits = await getAudits();
        }
    }
})