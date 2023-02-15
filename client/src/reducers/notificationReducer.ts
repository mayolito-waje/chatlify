import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, AnyAction } from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';
import type { RootState } from '../store';

interface notificationState {
  text: string;
  type: 'success' | 'error' | '';
}

const initialState: notificationState = {
  text: '',
  type: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload as 'success' | 'error';
    },
    removeNotification(state) {
      state.text = '';
      state.type = '';
    },
  },
});

export const { setNotification, setType, removeNotification } =
  notificationSlice.actions;

let timeoutID: string | number | NodeJS.Timeout | undefined;

export const handleNotification =
  (
    text: string,
    type: 'success' | 'error'
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch): Promise<void> => {
    clearTimeout(timeoutID);

    dispatch(setNotification(text));
    dispatch(setType(type));

    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

export default notificationSlice.reducer;
