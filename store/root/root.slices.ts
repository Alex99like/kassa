import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  modal: boolean
  reception: number
}

const initialState: IInitialState = {
  modal: false,
  reception: 5
}

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    handleModal: (state, { payload }: PayloadAction<boolean>) => {
      state.modal = payload
    },
    changeReception: (state, { payload }: PayloadAction<number>) => {
      state.reception = payload
    }
  }
})

export const { reducer, actions } = rootSlice