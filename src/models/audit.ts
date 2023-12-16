export interface Audit {
  id: number,
  operationType: string,
  tableName: string,
  rowId: string,
  oldValue: string,
  newValue: string,
  timestamp: string
}