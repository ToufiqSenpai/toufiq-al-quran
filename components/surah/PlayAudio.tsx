import React from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../redux/store';
import { setAudioUrl, setPlay, showAudioNav } from '../../redux/audio-slice';

interface ComponentsProps {
  audioUrl: string
}

function PlayAudio({ audioUrl }: ComponentsProps) {
  const audioState = useSelector((state: RootState) => state.audio)
  const dispatch = useDispatch()
  const { query } = useRouter()

  const playSurah = async () => {
    const res = await fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${query.surah}`)
    const audio = await res.json()

    if(!audioState.showAudioNav) dispatch(showAudioNav(true))
    
    dispatch(setAudioUrl(audio.audio_file.audio_url))
    dispatch(setPlay(audioState.play ? false : true))
  }
  
  return (
    <div className='flex justify-end items-center my-4'>
      {/* <input type='range' ondr /> */}
      <h4 className='text-base font-medium mr-1'>Play Audio</h4>
      <span onClick={playSurah}>
        <PlayCircleIcon
          sx={{
            width: 32,
            height: 32
          }}
        />
      </span>
    </div>
  )
}

export default PlayAudio