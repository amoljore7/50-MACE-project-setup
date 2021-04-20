import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import { ForgotPassword } from '../component/forgotPassword';

describe('forgot password page', () => {
  it('loads and displays forgot password page', async () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      forgotPasswordReducer: {} as any,
      forgotPassword: jest.fn()
    };
    const { asFragment } = render(<ForgotPassword {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByTestId('formWrapper').children.length).toEqual(4);

    const forgotPasswordButton = screen.getByTestId('forgotPasswordButton');
    expect(forgotPasswordButton).toBeDisabled();

    const emailInput = screen.getByTestId('emailInput');

    fireEvent.change(emailInput, { target: { value: 'abc.xyz@gmail.com' } });

    expect(forgotPasswordButton).toBeEnabled();
  });
  it('loader is displayed on forgot password button when it is clicked', () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      forgotPasswordReducer: {
        loading: true,
        error: ''
      },
      forgotPassword: jest.fn()
    };
    render(<ForgotPassword {...mockProps} />);
    expect(screen.getByTestId('forgotPasswordButtonLoader')).toBeInTheDocument();
  });
  it('loader is not displayed on forgot password button when it is not clicked', () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      forgotPasswordReducer: {
        loading: false,
        error: ''
      },
      forgotPassword: jest.fn()
    };
    render(<ForgotPassword {...mockProps} />);
    expect(screen.getByText('SEND VERIFICATION EMAIL')).toBeInTheDocument();
  });
});
