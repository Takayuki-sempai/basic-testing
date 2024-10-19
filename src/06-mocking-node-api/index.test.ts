import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as path from 'path';
import * as fsPromises from 'fs/promises';

jest.mock('path', () => ({
  __esModule: true,
  ...jest.requireActual('path'),
}));

jest.mock('fs/promises', () => ({
  __esModule: true,
  ...jest.requireActual('fs/promises'),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 230);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 230);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 230);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(230);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 230);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 230);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 110);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(110);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(440);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously('./index');
    expect(spyJoin).toBeCalledWith(__dirname, './index');
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('./index1.ts');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const testContent = 'Test content';
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(testContent);
    const result = await readFileAsynchronously('./index.ts');
    expect(result).toBe(testContent);
  });
});
