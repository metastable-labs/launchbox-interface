import moment from "moment";

const tokens = [
  {
    id: "7",
    name: "Satosh",
    symbol: "$SAT",
    createdAt: moment().subtract(2, "minutes").toISOString(),
    updatedAt: moment().subtract(15, "minutes").toISOString(),
    network: "base",
  },
  {
    id: "1",
    name: "Alpha",
    symbol: "$ALP",
    createdAt: moment().subtract(11, "hours").toISOString(),
    updatedAt: moment().subtract(10, "hours").toISOString(),
    network: "base",
  },
  {
    id: "2",
    name: "Beta",
    symbol: "$BTA",
    createdAt: moment().subtract(1, "days").toISOString(),
    updatedAt: moment().subtract(23, "hours").toISOString(),
    network: "base",
  },
  {
    id: "3",
    name: "Choco",
    symbol: "$CHO",
    createdAt: moment().subtract(3, "days").toISOString(),
    updatedAt: moment().subtract(2, "days").toISOString(),
    network: "base",
  },
  {
    id: "4",
    name: "Delta",
    symbol: "$DLT",
    createdAt: moment().subtract(5, "days").toISOString(),
    updatedAt: moment().subtract(4, "days").toISOString(),
    network: "base",
  },
  {
    id: "5",
    name: "Epsilon",
    symbol: "$EPS",
    createdAt: moment().subtract(7, "days").toISOString(),
    updatedAt: moment().subtract(6, "days").toISOString(),
    network: "base",
  },
  {
    id: "6",
    name: "Zeta",
    symbol: "$ZTA",
    createdAt: moment().subtract(10, "days").toISOString(),
    updatedAt: moment().subtract(9, "days").toISOString(),
    network: "base",
  },
];

export { tokens };
