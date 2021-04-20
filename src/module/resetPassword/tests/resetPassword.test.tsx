import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { ResetPassword } from '../component/resetPassword';

describe('reset password page', () => {
  it('loads and displays reset password page', async () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      resetPasswordReducer: {} as any,
      resetPassword: jest.fn()
    };
    const { asFragment } = render(<ResetPassword {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByTestId('formWrapper').children.length).toEqual(3);

    const resetPasswordButton = screen.getByTestId('resetPasswordButton');
    expect(resetPasswordButton).toBeDisabled();

    const newPassword = screen.getByTestId('newPassword');
    const confirmPassword = screen.getByTestId('confirmPassword');

    fireEvent.change(newPassword, { target: { value: 'shubham' } });
    expect(resetPasswordButton).toBeDisabled();

    fireEvent.change(confirmPassword, { target: { value: 'shubham' } });
    waitFor(() => expect(resetPasswordButton).toBeEnabled());
  });
  it('loader is displayed on reset password button when it is clicked', () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      resetPasswordReducer: {
        loading: true
      },
      resetPassword: jest.fn()
    };
    render(<ResetPassword {...mockProps} />);
    expect(screen.getByTestId('resetPasswordButtonLoader')).toBeInTheDocument();
  });
  it('loader is not displayed on reset password button when it is not clicked', () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
      resetPasswordReducer: {
        loading: false
      },
      resetPassword: jest.fn()
    };
    render(<ResetPassword {...mockProps} />);
    expect(screen.getByText('RESET PASSWORD')).toBeInTheDocument();
  });
});
