import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  play: false,
  audioUrl: '',
  showAudioNav: false
}

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setPlay: (state, action: PayloadAction<boolean>) => {
      state.play = action.payload
    },
    showAudioNav: (state, action: PayloadAction<boolean>) => {
      state.showAudioNav = action.payload
    },
    setAudioUrl: (state, action: PayloadAction<string>) => {
      state.audioUrl = action.payload
    }
  }
})

export const {
  setPlay,
  showAudioNav,
  setAudioUrl
} = audioSlice.actions

export default audioSlice.reducer