import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from '../interfaces/profile'

export interface ProfileState {
  profile: IProfile | undefined
}

const initialState: ProfileState = {
  profile: undefined,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateProfile } = profileSlice.actions

export default profileSlice.reducer
