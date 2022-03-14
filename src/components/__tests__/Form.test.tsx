import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TextInput } from '../Form';

it('functions as a button', () => {
  const setText = jest.fn();
  const out = render(
    <TextInput
      label="test label"
      placeholder="Test Placeholder"
      onChangeText={(text: string) => setText(text)}
    />,
  );

  fireEvent.changeText(
    out.getByPlaceholderText('Test Placeholder'),
    'test input',
  );
  expect(setText).toBeCalledWith('test input');
});
