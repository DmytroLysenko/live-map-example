export interface ITicket {
  sectionId?: number;
  rowId?: number;
  id: number;
  section: string;
  row: string;
  watermarks?: IWatermark[];
}

export interface IWatermark {
  color: string;
  id: number;
  watermarkName: string;
  sortOrder: number;
}
