import { ITransaction } from "@/types/type-transaction";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  modal: boolean
  notes: ITransaction[]
  reception: number
}

const initialState: IInitialState = {
  modal: false,
  reception: 5,
  notes: []
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
    },
    setNotes: (state, { payload }: PayloadAction<{ notes: ITransaction[] }>) => {
      state.notes = payload.notes
    },
    addNewNotes: (state, { payload }: PayloadAction<{ note: ITransaction }>) => {
      console.log(payload.note)
      state.notes.push(payload.note)
    },
    deleteNote: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.notes = state.notes.filter(el => el.id !== payload.id)
    }
  }
})

export const { reducer, actions } = rootSlice