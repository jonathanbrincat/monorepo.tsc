const { isOdd } = require('../dist/cjs/index.js');

test("isOdd", () => {
  expect(isOdd(1)).toBe(true);
  expect(isOdd(2)).toBe(false);
  expect(isOdd(3)).toBe(true);
});
