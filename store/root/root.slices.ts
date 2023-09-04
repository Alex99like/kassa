import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  modal: boolean
}

const initialState: IInitialState = {
  modal: false
}

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    handleModal: (state, { payload }: PayloadAction<boolean>) => {
      state.modal = payload
    }
  }
})

export const { reducer, actions } = rootSlice