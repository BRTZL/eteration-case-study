import { act, renderHook } from '@testing-library/react-hooks';
import { useCreateCharacter } from '../createCharacter';

describe('useCreateCharacter', () => {
  it('returns errors if no values provided at submit', () => {
    const { result } = renderHook(() => useCreateCharacter());

    act(() => {
      result.current.submit();
    });

    expect(result.current.errors).toEqual({
      name: 'This field is required.',
      job: 'This field is required.',
    });
  });

  it('calls alert with valid input', () => {
    const { result } = renderHook(() => useCreateCharacter());

    act(() => {
      result.current.setName('Bartu OZEL');
      result.current.setJob('Test Job');
      result.current.setBio('Test Bio');
      result.current.setImageLink('https://picsum.photos/200');
    });

    act(() => {
      result.current.submit();
    });
  });
});
