import React, { useEffect } from 'react';
import { render, act, wait } from '@testing-library/react';

import useSearch from '.';

const delayedPromise = () => {
  let resolveFn;
  const promise = new Promise(resolve => {
    resolveFn = resolve;
  });

  return [promise, resolveFn];
};

describe('useSearch', () => {
  const state = { current: null };
  const debounce = 100;
  const onQueryChange = jest.fn().mockResolvedValue([]);

  beforeEach(() => {
    state.current = null;
    jest.useFakeTimers();
  });

  const initializeUseSearch = (opts = {}) => {
    const Cmp = () => {
      // eslint-disable-next-line no-underscore-dangle
      const _state = useSearch(onQueryChange, { debounce, ...opts });

      useEffect(() => {
        state.current = _state;
      }, [_state]);

      return '';
    };

    render(<Cmp />);
  };

  const setInputValue = value => {
    act(() => {
      state.current.inputProps.onChange({ target: { value } });
    });
  };

  const waitForDebounce = async () => {
    await act(async () => {
      await jest.advanceTimersByTime(debounce);
    });
  };

  const setDebouncedValue = async value => {
    await act(async () => {
      state.current.inputProps.onChange({ target: { value } });
      await jest.advanceTimersByTime(debounce);
    });
  };

  const triggerFocus = async () => {
    await act(async () => {
      state.current.inputProps.onFocus();
      await wait();
    });
  };

  describe('query resolution', () => {
    it('should happen after debounce', async () => {
      const results = ['results'];
      onQueryChange.mockResolvedValueOnce(results);

      initializeUseSearch();

      setInputValue('stuff');

      expect(onQueryChange).not.toHaveBeenCalled();

      await waitForDebounce();

      expect(onQueryChange).toHaveBeenCalled();
      expect(state.current.results).toEqual(results);
    });

    it('should correctly indicate the loading state', async () => {
      const [promise, resolve] = delayedPromise();

      onQueryChange.mockReturnValueOnce(promise);

      initializeUseSearch();

      await setDebouncedValue('test0');
      expect(state.current.isLoading).toBeTruthy();

      await act(async () => {
        resolve(['stuff']);
        await promise;
      });

      expect(state.current.isLoading).toBeFalsy();
    });

    it('should cancel pending promises', async () => {
      const [promise, resolve] = delayedPromise();

      onQueryChange.mockReturnValueOnce(promise);

      initializeUseSearch();

      await setDebouncedValue('test0');
      await setDebouncedValue('test1');

      resolve(['stuff']);
      await promise;

      expect(state.current.results).toEqual([]);
    });

    it('should invoke on onQueryError on failure', async () => {
      const error = 'error';
      const onQueryError = jest.fn();

      onQueryChange.mockRejectedValueOnce(error);

      initializeUseSearch({ onQueryError });

      await setDebouncedValue('test0');
      expect(onQueryError).toHaveBeenCalledWith(error);
    });

    it('should cache previous results', async () => {
      const results = ['cached'];
      const inputValue = 'test';
      onQueryChange.mockResolvedValueOnce(results);

      initializeUseSearch();

      await setDebouncedValue(inputValue);
      await setDebouncedValue(`${inputValue}e`);
      await setDebouncedValue(inputValue);

      expect(onQueryChange).toHaveBeenCalledTimes(2);
    });

    it('should be canceled if user removes input', async () => {
      const [promise, resolve] = delayedPromise();

      onQueryChange.mockReturnValueOnce(promise);

      initializeUseSearch();

      await setDebouncedValue('test0');
      await setDebouncedValue('');

      await act(async () => {
        resolve(['stuff']);
        await promise;
      });

      expect(state.current.results).toEqual([]);
    });
  });

  describe('focus', () => {
    it('should show results', async () => {
      initializeUseSearch();

      await triggerFocus();

      expect(state.current.areResultsShown).toBeTruthy();
    });

    it('should resolve results, and clear cache if resolveOnFocus is true', async () => {
      const results = ['cached'];
      const inputValue = 'test';
      onQueryChange.mockResolvedValueOnce(results);

      initializeUseSearch({ resolveOnFocus: true });

      await setDebouncedValue(inputValue);
      await triggerFocus();

      expect(onQueryChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('isDirty', () => {
    it('should initially be false', () => {
      initializeUseSearch();

      expect(state.current.isDirty).toBeFalsy();
    });

    it('should be true once a user interacts with the search', async () => {
      initializeUseSearch();

      await setDebouncedValue('test');

      expect(state.current.isDirty).toBeTruthy();
    });
  });

  describe('hide results', () => {
    it('should set areResultsShown to false', async () => {
      initializeUseSearch();

      await triggerFocus();

      act(() => {
        state.current.hideResults();
      });

      expect(state.current.areResultsShown).toBeFalsy();
    });
  });

  describe('setQueryWithoutRefetch', () => {
    it('should set the query state without resolving results', async () => {
      initializeUseSearch();

      act(() => {
        state.current.setQueryWithoutRefetch('test');
      });

      await waitForDebounce();

      expect(state.current.inputProps.value).toBe('test');
      expect(onQueryChange).not.toHaveBeenCalled();
    });
  });
});
