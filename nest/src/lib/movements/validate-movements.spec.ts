import { validateMovements } from './validate-movements';

test('it should return an error when no balance is provided', () => {
  expect(validateMovements([], [])).toStrictEqual({
    type: 'Error',
    reasons: ['No balance provided. Unable to validate movements.'],
  });
});

test('it should return an error when there movements after the last balance', () => {
  const movements = [
    { id: 12, date: new Date(1995, 5, 25).getTime(), amount: 100 },
    { id: 14, date: new Date(2023, 8, 21).getTime(), amount: -200 },
    { id: 22, date: new Date(1995, 3, 25).getTime(), amount: 50 },
    { id: 68, date: new Date(2016, 7, 25).getTime(), amount: -50 },
  ];
  const balances = [{ date: new Date(2016, 8, 26).getTime(), balance: 100 }];

  expect(validateMovements(movements, balances)).toStrictEqual({
    type: 'Error',
    reasons: ['There are movements after the last balance Date.'],
  });
});

test('it should return an error when there are insatisfied balances', () => {
  const movements = [
    { id: 12, date: new Date(1995, 5, 25).getTime(), amount: 100 },
    { id: 14, date: new Date(2023, 8, 21).getTime(), amount: -200 },
    { id: 22, date: new Date(1995, 3, 25).getTime(), amount: 50 },
    { id: 68, date: new Date(2016, 7, 25).getTime(), amount: -50 },
    { id: 30, date: new Date(2017, 7, 25).getTime(), amount: 500 },
    { id: 27, date: new Date(2022, 7, 25).getTime(), amount: -50 },
  ];
  const balances = [
    { date: new Date(2018, 8, 26).getTime(), balance: 100 },
    { date: new Date(2014, 8, 26).getTime(), balance: 150 },
    { date: new Date(2024, 8, 26).getTime(), balance: -400 },
  ];

  expect(validateMovements(movements, balances)).toStrictEqual({
    type: 'Error',
    reasons: [
      `Balance with Date "${new Date(
        2018,
        8,
        26,
      ).getTime()}" is not satisfied. Check if there are missing movements.`,
      `Balance with Date "${new Date(
        2024,
        8,
        26,
      ).getTime()}" is not satisfied. Check if there are missing movements.`,
    ],
  });
});

test('it should return a success when all the balances are satisfied (simple)', () => {
  const movements = [
    { id: 12, date: new Date(1995, 5, 25).getTime(), amount: 100.1 },
    { id: 14, date: new Date(2023, 8, 21).getTime(), amount: -200.2 },
  ];
  const balances = [{ date: new Date(2024, 8, 26).getTime(), balance: -100.1 }];

  expect(validateMovements(movements, balances)).toStrictEqual({
    type: 'Success',
    reasons: [],
  });
});

test('it should return a success when all the balances are satisfied (multiple)', () => {
  const movements = [
    { id: 12, date: new Date(1995, 5, 25).getTime(), amount: 100 },
    { id: 14, date: new Date(2023, 8, 21).getTime(), amount: -200 },
    { id: 22, date: new Date(1995, 3, 25).getTime(), amount: 50 },
    { id: 43, date: new Date(2016, 7, 25).getTime(), amount: -50 },
    { id: 68, date: new Date(2017, 7, 25).getTime(), amount: 500 },
    { id: 21, date: new Date(2022, 7, 25).getTime(), amount: -50 },
  ];
  const balances = [
    { date: new Date(2018, 8, 26).getTime(), balance: 450 },
    { date: new Date(2014, 8, 26).getTime(), balance: 150 },
    { date: new Date(2024, 8, 26).getTime(), balance: -250 },
  ];

  expect(validateMovements(movements, balances)).toStrictEqual({
    type: 'Success',
    reasons: [],
  });
});

test('it should return a success when all the balances are satisfied (multiple with duplicates)', () => {
  const movements = [
    { id: 12, date: new Date(1995, 5, 25).getTime(), amount: 300 },
    { id: 14, date: new Date(2023, 8, 21).getTime(), amount: -6000 },
    { id: 14, date: new Date(2023, 8, 21).getTime(), amount: -6000 },
    { id: 14, date: new Date(2023, 8, 21).getTime(), amount: -6000 },
    { id: 22, date: new Date(1995, 3, 25).getTime(), amount: 5000 },
    { id: 22, date: new Date(1995, 3, 25).getTime(), amount: 5000 },
    { id: 22, date: new Date(1995, 3, 25).getTime(), amount: 5000 },
    { id: 43, date: new Date(2016, 7, 25).getTime(), amount: -50 },
    { id: 68, date: new Date(2017, 7, 25).getTime(), amount: 500 },
    { id: 21, date: new Date(2022, 7, 25).getTime(), amount: -50 },
    { id: 21, date: new Date(2022, 7, 25).getTime(), amount: -50 },
  ];
  const balances = [
    { date: new Date(2018, 8, 26).getTime(), balance: 450 },
    { date: new Date(2014, 8, 26).getTime(), balance: 5300 },
    { date: new Date(2024, 8, 26).getTime(), balance: -6050 },
  ];

  expect(validateMovements(movements, balances)).toStrictEqual({
    type: 'Success',
    reasons: [],
  });
});

test('it should return a success when there are no movements and the balances are 0', () => {
  const movements = [];
  const balances = [
    { date: new Date(2018, 8, 26).getTime(), balance: 0 },
    { date: new Date(2014, 8, 26).getTime(), balance: 0 },
    { date: new Date(2024, 8, 26).getTime(), balance: 0 },
  ];

  expect(validateMovements(movements, balances)).toStrictEqual({
    type: 'Success',
    reasons: [],
  });
});
