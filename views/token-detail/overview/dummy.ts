import { Period } from './types';

const generateData = (period: Period) => {
  const data = [];
  const today = new Date();
  let value = 500;
  let startTime;

  switch (period) {
    case '1h':
      startTime = new Date(today.getTime() - 60 * 60 * 1000);
      for (let i = 0; i <= 60; i += 5) {
        const date = new Date(startTime.getTime() + i * 60 * 1000);
        value += Math.random() * 20 - 10;
        data.push({ date, value });
      }
      break;
    case '24h':
      startTime = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 24; i += 2) {
        const date = new Date(startTime.getTime() + i * 60 * 60 * 1000);
        value += Math.random() * 50 - 25;
        data.push({ date, value });
      }
      break;
    case '1w':
      startTime = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 7; i++) {
        const date = new Date(startTime.getTime() + i * 24 * 60 * 60 * 1000);
        value += Math.random() * 100 - 50;
        data.push({ date, value });
      }
      break;
    case '1m':
      startTime = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 4; i++) {
        const date = new Date(startTime.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        value += Math.random() * 200 - 100;
        data.push({ date, value });
      }
      break;
    default:
      throw new Error("Invalid period. Choose from '1h', '24h', '1w', or '1m'");
  }

  const smoothingFactor = 0.3;
  for (let i = 1; i < data.length - 1; i++) {
    data[i].value = data[i].value * smoothingFactor + ((data[i - 1].value + data[i + 1].value) / 2) * (1 - smoothingFactor);
  }

  return data;
};

export { generateData };
