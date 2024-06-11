const periodOptions = [
  { text: 'Last year', value: 'last-year' },
  { text: 'Last month', value: 'last-month' },
  { text: 'Last week', value: 'last-week' },
  { text: 'Last 24 hours', value: 'last-24-hours' },
];

const generateData = () => {
  const data = [];
  const today = new Date();
  let value = 500;
  for (let i = 0; i < 365; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    value += Math.random() * 200 - 100;
    data.push({ date, value });
  }

  const smoothingFactor = 0.3;
  for (let i = 1; i < data.length - 1; i++) {
    data[i].value = data[i].value * smoothingFactor + ((data[i - 1].value + data[i + 1].value) / 2) * (1 - smoothingFactor);
  }

  return data;
};

export { periodOptions, generateData };
