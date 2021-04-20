import { takeLatest } from 'redux-saga/effects';
import axios from '../../../config/axios';
import { runSaga } from 'redux-saga';
import { userLoginOne, watchLogin } from '../saga';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('watcher login saga', () => {
  it('watcher saga', () => {
    const loginWatcherSaga = watchLogin();
    expect(loginWatcherSaga.next().value).toEqual(takeLatest('LOGIN', userLoginOne));
  });
});

Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  }
});

describe('worker login saga', () => {
  const payloadData = {
    type: '',
    payload: {
      username: 'abc',
      password: 'xyz'
    }
  };
  afterEach(() => {
    dispatched = [];
  });
  let dispatched: any = [];
  const fakeStore = {
    dispatch: (action: any) => dispatched.push(action)
  };
  it('login Api is successfully called', async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          accessToken: 'pqr'
        }
      })
    );
    const task = runSaga(fakeStore, userLoginOne, payloadData);
    await task.toPromise();
    expect(axios.post).toHaveBeenCalledWith(
      `http://10.71.71.115:6060/api/v1/auth`,
      payloadData.payload
    );
    expect(dispatched).toEqual([
      { type: 'LOGIN_LOADING' },
      { type: 'LOGIN_SUCCESS', payload: 'abc' }
    ]);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'currentUser', JSON.stringify('abc'));
    expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'accessToken', 'pqr');
  });
  it('login Api is not successfully called', async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.reject(Error('Some Error occurred. Please try again.'))
    );
    const task = runSaga(fakeStore, userLoginOne, payloadData);
    await task.toPromise();
    expect(dispatched).toEqual([
      { type: 'LOGIN_LOADING' },
      { type: 'LOGIN_FAIL', payload: 'Some Error occurred. Please try again.' }
    ]);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
