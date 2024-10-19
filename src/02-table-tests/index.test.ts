// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: -1, action: Action.Add, expected: 0 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 3, b: -1, action: Action.Subtract, expected: 4 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 8, b: 0.5, action: Action.Multiply, expected: 4 },
  { a: -2, b: -1, action: Action.Multiply, expected: 2 },
  { a: 345, b: 0, action: Action.Multiply, expected: 0 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 12, b: -2, action: Action.Divide, expected: -6 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: -8, b: 0, action: Action.Divide, expected: -Infinity },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },
  { a: 55, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 55, b: 0, action: 'Add', expected: null },
  { a: '7', b: 0, action: Action.Add, expected: null },
  { a: '3', b: '12', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should calculate $a $action $b and return $expected as result',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
