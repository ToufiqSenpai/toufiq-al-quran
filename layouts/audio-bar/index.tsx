import { useEffect, useState } from 'react'
import { Slider } from '@mui/material'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import { RootState } from '../../redux/store';
import { setPlay } from '../../redux/audio-slice';

function AudioBar() {
  const { audioUrl, play, showAudioNav } = useSelector((state: RootState) => state.audio)
  const dispatch = useDispatch()
  const [audio, setAudio] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)

  useEffect(() => {
    setAudio(new Audio(audioUrl))
  }, [audioUrl])

  useEffect(() => {
    if(play) {
      audio?.pause()
    } else {
      audio?.play()

      // setInterval(() => {
      //   setCurrentTime(state => state + 1)
      // }, 1000)
    }
  }, [play, audio])

  // console.log(audio.duration)

  return (
    <motion.nav className='fixed bottom-0 right-0 left-0 bg-white h-14 flex justify-between flex-col'
      animate={{ y: showAudioNav ? 0 : '60px' }}
      transition={{ times: 0.5 }}
    >
      <section className='flex flex-col'>
        <Slider 
          min={0}
          max={audio?.duration}
          // onChange={e => e.target?.addEventListener('')}
          size='small' 
          sx={{
            "&.MuiSlider-root": { padding: 0 }
          }}
        />
        <div className='flex justify-between mx-1 text-sm'>
          <div>00:00</div>
          <div>03:00</div>
        </div>
      </section>
      <section className='mx-auto relative top-[-16px] flex items-center'>
        <div className='mr-1'>
          <SkipPreviousRoundedIcon 
            sx={{
              width: 32,
              height: 32
            }}
          />
        </div>
        <div onClick={() => dispatch(setPlay(!play && true))}>
          {play ? (
            <PlayCircleIcon sx={{
              width: 42,
              height: 42
            }} />
          ) : (
            <PauseCircleRoundedIcon sx={{
              width: 42,
              height: 42
            }} />
          )}
        </div>
        <div className='ml-1'>
          <SkipNextRoundedIcon 
            sx={{
              width: 32,
              height: 32
            }}
          />
        </div>
      </section>
    </motion.nav>
  )
}

export default AudioBar