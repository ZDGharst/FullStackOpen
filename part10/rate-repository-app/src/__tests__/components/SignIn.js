import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { SignInContainer } from '../../components/SignIn';
import { act } from 'react-test-renderer';


describe('Sign in form', () => {
  it('Sign in form submit handler', async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

    act(() => {
      fireEvent.changeText(getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(getByTestId('passwordField'), 'password');
      fireEvent.press(getByTestId('submitButton'));
    });
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0]).toEqual({
        username: 'kalle',
        password: 'password'
      });
    });
  });
});