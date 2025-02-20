import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import globalDataReducer from '../store/modules/globalData';

export const store = configureStore({
  reducer: {
    globalData: globalDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;