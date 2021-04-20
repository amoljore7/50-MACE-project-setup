import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import { LoginPage } from '../component/login';

describe('login page', () => {
  it('loads and displays login page', async () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      loginReducer: {} as any,
      userLogin: jest.fn()
    };
    const { asFragment } = render(<LoginPage {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByTestId('formWrapper').children.length).toEqual(5);

    const loginButton = screen.getByTestId('loginButton');
    expect(loginButton).toBeDisabled();

    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');
    fireEvent.change(usernameInput, { target: { value: 'shubham' } });
    fireEvent.change(passwordInput, { target: { value: 'tripathi' } });

    waitFor(() => expect(loginButton).toBeEnabled());
  });
  it('loader is displayed on login button when it is clicked', () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      loginReducer: {
        currentUser: '',
        loading: true,
        error: ''
      },
      userLogin: jest.fn()
    };
    const { asFragment } = render(<LoginPage {...mockProps} />);
    expect(screen.getByTestId('loginLoader')).toBeInTheDocument();
  });
  it('loader is not displayed on forgot password button when it is not clicked', () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      loginReducer: {
        currentUser: '',
        loading: false,
        error: ''
      },
      userLogin: jest.fn()
    };
    render(<LoginPage {...mockProps} />);
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });
});
