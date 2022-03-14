import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SimpsonsAPI from '../api/simpsons.api';
import { Simpson } from '../models';

export type SimpsonsState = {
  simpsons: Simpson[];

  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;

  lastUpdate: number;
};

export type SimpsonDeleteAction = {
  id: string;
};

const initialState: SimpsonsState = {
  simpsons: [],
  status: 'idle',
  error: null,
  lastUpdate: new Date().getUTCDate(),
};

export const fetchSimpsons = createAsyncThunk(
  'simpsons/getSimpsons',
  async () => {
    const localSimpsons = await AsyncStorage.getItem('eteration_simpsons');

    // Check for local data exist
    if (localSimpsons) {
      // If exist, return local data
      return JSON.parse(localSimpsons);
    }

    // If not exist, fetch data from API and save to local storage
    const simpsons = await SimpsonsAPI.fetchSimpsons();
    await AsyncStorage.setItem('eteration_simpsons', JSON.stringify(simpsons));
    return simpsons;
  },
);

export const simpsonsSlice = createSlice({
  name: 'simpsons',
  initialState,
  reducers: {
    addSimpson: (state, { payload }: PayloadAction<Simpson>) => {
      const simpsons = [...state.simpsons, payload];
      AsyncStorage.setItem('eteration_simpsons', JSON.stringify(simpsons));

      return {
        ...state,
        simpsons,
        lastUpdate: new Date().getUTCDate(),
      };
    },
    deleteSimpson: (
      state,
      { payload: { id } }: PayloadAction<SimpsonDeleteAction>,
    ) => {
      const simpsons = state.simpsons.filter(simpson => simpson.id !== id);
      AsyncStorage.setItem('eteration_simpsons', JSON.stringify(simpsons));

      return {
        ...state,
        simpsons,
        lastUpdate: new Date().getUTCDate(),
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSimpsons.fulfilled, (state, action) => {
      return {
        ...state,
        simpsons: action.payload,
        status: 'succeeded',
        lastUpdate: new Date().getUTCDate(),
      };
    });
    builder.addCase(fetchSimpsons.rejected, (state, action) => {
      return {
        ...state,
        error: action.error?.message ?? 'Unknown error',
        status: 'failed',
        lastUpdate: new Date().getUTCDate(),
      };
    });
  },
});

export const { addSimpson, deleteSimpson } = simpsonsSlice.actions;

export const selectSimpsons = (state: {
  simpsonsSlice: SimpsonsState;
}): Simpson[] => state.simpsonsSlice.simpsons;

export const selectSimpsonByID = (state: {
  simpsonsSlice: SimpsonsState;
}): Simpson[] => state.simpsonsSlice.simpsons;

export default simpsonsSlice.reducer;
