import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import LandingPage from '../component/landing';

const routeComponentPropsMock = {
  history: {} as any,
  location: {} as any,
  match: {} as any
};

test('loads and displays landing page', async () => {
  const { asFragment } = render(<LandingPage {...routeComponentPropsMock} />);
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('landingWrapper').children.length).toEqual(5);

  //   const signInButton = screen.getByText('Sign In');
  //   fireEvent.click(signInButton);
  //   await waitFor(() => expect(signInButton).not.toBeInTheDocument());
  //   expect(signInButton).not.toBeInTheDocument();
});
