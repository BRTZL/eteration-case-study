// @ts-nocheck
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { mocked } from 'ts-jest/utils';
import store from '../../redux';
import { useCreateCharacter } from '../../util/createCharacter';
import SimpsonAddScreen from '../SimpsonAddScreen';

jest.mock('../../util/createCharacter');

describe('SimpsonAddScreen', () => {
  it('renders the fields and captures input', () => {
    const submit = jest.fn();
    const setName = jest.fn();
    const setJob = jest.fn();
    const setBio = jest.fn();
    const setImageLink = jest.fn();
    mocked(useCreateCharacter).mockReturnValueOnce({
      errors: {},
      submit,
      setName,
      setBio,
      setJob,
      setImageLink,
      name: 'Bartu OZEL',
      job: 'Test Job',
      bio: 'Test Bio',
      imageLink: 'https://picsum.photos/200',
    });

    const out = render(
      <Provider store={store}>
        <SimpsonAddScreen navigation={undefined} route={undefined} />
      </Provider>,
    );

    fireEvent.changeText(
      out.getByPlaceholderText('Enter character name...'),
      'Bartu OZEL',
    );
    expect(setName).toBeCalledWith('Bartu OZEL');

    fireEvent.changeText(
      out.getByPlaceholderText('Enter character job...'),
      'Test Job',
    );
    expect(setJob).toBeCalledWith('Test Job');

    fireEvent.changeText(
      out.getByPlaceholderText('Enter character bio...'),
      'Test Bio',
    );
    expect(setBio).toBeCalledWith('Test Bio');

    fireEvent.changeText(
      out.getByPlaceholderText('Enter character image link...'),
      'https://picsum.photos/200',
    );
    expect(setImageLink).toBeCalledWith('https://picsum.photos/200');

    fireEvent.press(out.getByText('Add Character'));

    expect(submit).toBeCalled();
  });

  it('renders error message', () => {
    mocked(useCreateCharacter).mockReturnValueOnce({
      errors: {
        name: 'Name is required',
        job: 'Job is required',
      },
      submit: jest.fn(),
      setName: jest.fn(),
      setJob: jest.fn(),
      setBio: jest.fn(),
      setImageLink: jest.fn(),
      name: 'Bartu OZEL',
      job: 'Test Job',
      bio: 'Test Bio',
      imageLink: 'https://picsum.photos/200',
    });
    const out = render(
      <Provider store={store}>
        <SimpsonAddScreen navigation={undefined} route={undefined} />
      </Provider>,
    );

    out.getByText('Name is required');
    out.getByText('Job is required');
  });
});
