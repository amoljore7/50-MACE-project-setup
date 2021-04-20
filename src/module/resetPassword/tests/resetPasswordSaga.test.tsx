import { takeEvery } from 'redux-saga/effects';
import axios from '../../../config/axios';
import { runSaga } from 'redux-saga';
import { changeUserPassword, watchResetPassword } from '../saga';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

Object.defineProperty(window, 'location', {
  value: {
    href: 'abc?id=1'
  }
});

describe('watcher reset password saga', () => {
  it('watcher saga', () => {
    const resetPasswordWatcherSaga = watchResetPassword();
    expect(resetPasswordWatcherSaga.next().value).toEqual(
      takeEvery('RESET_PASSWORD', changeUserPassword)
    );
  });
});

describe('worker resset password saga', () => {
  const payloadData = {
    type: '',
    payload: {
      firstReset: true,
      password: ''
    }
  };
  afterEach(() => {
    dispatched = [];
  });
  let dispatched: any = [];
  const fakeStore = {
    dispatch: (action: any) => dispatched.push(action)
  };
  it('reset password API successfully called', async () => {
    mockedAxios.put.mockImplementation(() =>
      Promise.resolve({
        data: {}
      })
    );

    const task = runSaga(fakeStore, changeUserPassword, payloadData);
    await task.toPromise();
    expect(axios.put).toHaveBeenCalledWith(
      `http://10.71.71.115:6060/api/v1/users/updatePassword/1`,
      payloadData.payload
    );
    expect(dispatched).toEqual([
      { type: 'RESET_PASSWORD_LOADING' },
      { type: 'RESET_PASSWORD_SUCCESS', payload: '' }
    ]);
    // expect(window.location.href).toEqual('/');
  });
  it('reset password API is not successfully called', async () => {
    mockedAxios.put.mockImplementation(() =>
      Promise.reject(Error('Some Error occurred. Please try again.'))
    );
    const task = runSaga(fakeStore, changeUserPassword, payloadData);
    await task.toPromise();
    expect(dispatched).toEqual([
      { type: 'RESET_PASSWORD_LOADING' },
      { type: 'RESET_PASSWORD_FAIL', payload: 'Some Error occurred. Please try again.' }
    ]);
  });
});
