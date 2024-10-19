import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  __esModule: true,
  ...jest.requireActual('axios'),
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    throttledGetDataFromApi.cancel();
  });

  test('should create instance with provided base url', async () => {
    const axiosMock = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as AxiosInstance;
    const createSpy = jest.spyOn(axios, 'create').mockReturnValue(axiosMock);

    await throttledGetDataFromApi('test');
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosMock = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as AxiosInstance;
    jest.spyOn(axios, 'create').mockReturnValue(axiosMock);

    await throttledGetDataFromApi('test');
    expect(axiosMock.get).toHaveBeenCalledWith('test');
  });

  test('should return response data', async () => {
    const mockResponseData = { test: 'testData' };
    const axiosMock = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    } as unknown as AxiosInstance;
    jest.spyOn(axios, 'create').mockReturnValue(axiosMock);

    const response = await throttledGetDataFromApi('test');
    expect(response).toBe(mockResponseData);
  });
});
