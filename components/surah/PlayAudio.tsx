import React from 'react'
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../redux/store';
import { setAudioUrl, setCurrentSurah, setPlay, showAudioNav } from '../../redux/audio-slice';

function PlayAudio() {
  const audioState = useSelector((state: RootState) => state.audio)
  const dispatch = useDispatch()
  const { query } = useRouter()

  const handlePlay = async () => {
    const res = await fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${query.surah}`)
    const audio = await res.json()

    // Handle show audio nav
    if (!audioState.showAudioNav) dispatch(showAudioNav(true))

    // Handle set current surah
    dispatch(setCurrentSurah((query.surah as string)))

    // Audio change handle
    const audioFile = audio.audio_file.audio_url
    if (audioFile !== audioState.audioUrl) {
      dispatch(setAudioUrl(audioFile))
    }
    
    // Handle play
    dispatch(setPlay(audioState.play ? false : true))
  }

  return (
    <div className='flex justify-end items-center my-4 mx-2'>
      <h4 className='text-base font-medium mr-1'>Play Audio</h4>
      <span onClick={handlePlay}>
        {audioState.play && audioState.currentSurah == query.surah ? (
          <PauseCircleRoundedIcon
            sx={{
              width: 32,
              height: 32
            }}
          />
        ) : (

          <PlayCircleIcon
            sx={{
              width: 32,
              height: 32
            }}
          />
        )}
      </span>
    </div>
  )
}

export default PlayAudio