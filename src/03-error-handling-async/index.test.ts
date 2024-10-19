import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(42);
    expect(result).toBe(42);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const f = () => {
      throwError('testMessage');
    };
    expect(f).toThrowError('testMessage');
  });

  test('should throw error with default message if message is not provided', () => {
    const f = () => {
      throwError();
    };
    expect(f).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const f = () => {
      throwCustomError();
    };
    expect(f).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
