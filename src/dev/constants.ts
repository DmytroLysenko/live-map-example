import { ITicket, IWatermark } from "./components/TPSMapApp/types/ticket";

const greenWatermark: IWatermark = {
  id: 1,
  watermarkName: "Green",
  color: "lightgreen",
  sortOrder: 1,
};
const redWatermark: IWatermark = {
  id: 2,
  watermarkName: "Red",
  color: "red",
  sortOrder: 2,
};
const blueWatermark: IWatermark = {
  id: 3,
  watermarkName: "Blue",
  color: "lightblue",
  sortOrder: 3,
};

export const tickets: ITicket[] = [
  {
    id: 1,
    section: "1",
    row: "1",
    // sectionId: 8154001,
    // rowId: 96676901,
    watermarks: [greenWatermark],
  },
  {
    id: 2,
    section: "1",
    row: "2",
    // sectionId: 8154001,
    // rowId: 96676951,
    watermarks: [redWatermark],
  },
  {
    id: 3,
    section: "2",
    row: "1",
    // sectionId: 8154051,
    // rowId: 96677851
  },
  {
    id: 4,
    section: "3",
    row: "1",
    // sectionId: 8154101,
    // rowId: 96678851
  },
  {
    id: 5,
    section: "7",
    row: "1",
    // sectionId: 8154201,
    // rowId: 96680001,
    watermarks: [blueWatermark],
  },
  {
    id: 6,
    section: "7",
    row: "2",
    // sectionId: 8154201,
    // rowId: 96680051,
    watermarks: [blueWatermark],
  },
  {
    id: 7,
    section: "7",
    row: "3",
    // sectionId: 8154201,
    // rowId: 96680101,
    watermarks: [blueWatermark],
  },
  {
    id: 8,
    section: "7",
    row: "4",
    // sectionId: 8154201,
    // rowId: 96680151,
    watermarks: [blueWatermark],
  },
  {
    id: 9,
    section: "8",
    row: "1",
    // sectionId: 8154251,
    // rowId: 96680951,
    watermarks: [redWatermark, blueWatermark],
  },
];

export const sections: any = [];
