import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(16);
    expect(account.getBalance()).toBe(16);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(16);
    expect(() => account.withdraw(32)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(16);
    const account2 = getBankAccount(10);
    expect(() => account.transfer(32, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(16);
    expect(() => account.transfer(32, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(16);
    expect(account.deposit(10).getBalance()).toBe(26);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(16);
    expect(account.withdraw(5).getBalance()).toBe(11);
  });

  test('should transfer money', () => {
    const account = getBankAccount(16);
    const account2 = getBankAccount(10);
    expect(account.transfer(7, account2).getBalance()).toBe(9);
    expect(account2.getBalance()).toBe(17);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(16);
    const fetchedBalance = await account.fetchBalance();
    if (fetchedBalance != null) {
      expect(typeof fetchedBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(16);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(42);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(16);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
  });
});
