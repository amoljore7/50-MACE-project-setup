import { takeEvery } from 'redux-saga/effects';
import axios from '../../../config/axios';
import { runSaga } from 'redux-saga';
import { forgotUserPassword, watchForgotPassword } from '../saga';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

Object.defineProperty(window, 'location', {
  value: {
    href: ''
  }
});

describe('watcher forgot password saga', () => {
  it('watcher saga', () => {
    const forgotPasswordWatcherSaga = watchForgotPassword();
    expect(forgotPasswordWatcherSaga.next().value).toEqual(
      takeEvery('FORGOT_PASSWORD', forgotUserPassword)
    );
  });
});

describe('worker forgot password saga', () => {
  const payloadData = {
    type: '',
    payload: {
      email: 'abc.xyz@gmail.com'
    }
  };
  afterEach(() => {
    dispatched = [];
  });
  let dispatched: any = [];
  const fakeStore = {
    dispatch: (action: any) => dispatched.push(action)
  };
  it('forgot password API successfully called', async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.resolve({
        data: {}
      })
    );
    const task = runSaga(fakeStore, forgotUserPassword, payloadData);
    await task.toPromise();
    expect(axios.post).toHaveBeenCalledWith(
      `http://10.71.71.115:6060/api/v1/users/forgotPassword`,
      payloadData.payload
    );
    expect(dispatched).toEqual([
      { type: 'LOADING' },
      { type: 'FORGOT_PASSWORD_SUCCESS', payload: '' }
    ]);
    expect(window.location.href).toEqual('/');
  });
  it('forgot password API is not successfully called', async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.reject(Error('Some Error occurred. Please try again.'))
    );
    const task = runSaga(fakeStore, forgotUserPassword, payloadData);
    await task.toPromise();
    expect(dispatched).toEqual([
      { type: 'LOADING' },
      { type: 'FORGOT_PASSWORD_FAIL', payload: 'Some Error occurred. Please try again.' }
    ]);
  });
});
