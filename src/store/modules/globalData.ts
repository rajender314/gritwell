import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../store';
import { GetGlobalData } from '../../services/global-data-store';

export interface GlobalData {
    permissions: [];
    date_format: string;
  }
  
  const initialState: GlobalData = {
    permissions: [],
    date_format: ''
  };

  export const getGlobalDataAsync = createAsyncThunk(
    'counter/fetchCount',
    async () => {
      const response = await GetGlobalData();
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );

  export const globalDataSlice = createSlice({
    name: 'globalData',
    initialState : initialState,
    reducers: {
        globalData: (state:any, action: PayloadAction<GlobalData>) => {
            const data = action.payload;
            state.permissions = data.permissions;
            state.date_format = data.date_format;
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getGlobalDataAsync.pending, () => {
          })
          .addCase(getGlobalDataAsync.fulfilled, (state, action) => {
            // console.log(action.payload)
            const data = action.payload;
            state.permissions = data.permissions;
            state.date_format = data.date_format;
          })
          .addCase(getGlobalDataAsync.rejected, (state) => {
              console.log('Error in getting global data')
          });
      },
  });

  export const { globalData } = globalDataSlice.actions;

  export default globalDataSlice.reducer;