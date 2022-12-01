import React, { useEffect, useState, useRef } from 'react'
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
  const [currentTime, setCurrentTime] = useState<number>(0)

  const { audioUrl, play, showAudioNav } = useSelector((state: RootState) => state.audio)
  const dispatch = useDispatch()

  const audioRef = useRef<HTMLAudioElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)
  const [seeking, setSeeking] = useState(false)

  // Event play
  useEffect(() => {
    if (!audioRef.current) return

    if (play) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [play])

  // Timeseek event 
  useEffect(() => {
    if (!audioRef.current) return

    function timeUpdate(e: any) {
   
        if (!audioRef.current) return
        if (!sliderRef.current) return
        const slider = sliderRef.current
        const audioCurrTime = audioRef.current.currentTime
  
        slider.value = audioCurrTime.toString()
        setCurrentTime(Math.floor(audioCurrTime))
        
      
    }

    if(!seeking) {
      audioRef.current.addEventListener('timeupdate', timeUpdate)
    } else {
      audioRef.current.removeEventListener('timeupdate', timeUpdate)
    }

    sliderRef.current?.addEventListener('mousedown', e => {
      setSeeking(true)
    })

    sliderRef.current?.addEventListener('mouseup', e => {
      setSeeking(false)
      if (!audioRef.current) return
      if (!sliderRef.current) return

      audioRef.current.currentTime = parseInt(sliderRef.current.value)
    })

    return () => {
      audioRef.current?.removeEventListener('timeupdate', timeUpdate)
    }
  }, [seeking])

  const formatTime = (second: number) => {
    const hours = Math.floor(second / 3600);
    const minutes = Math.floor(second / 60) % 60;
    const seconds = second % 60;
    return [hours, minutes, seconds]
      .map(v => ('' + v).padStart(2, '0'))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  }

  return (
    <motion.nav
      className='fixed bottom-0 right-0 left-0 bg-white h-14 flex justify-between flex-col'
      animate={{ y: showAudioNav ? 0 : '60px' }}
      transition={{ times: 0.5 }}
    >
      <audio
        ref={audioRef}
        src={audioUrl}
      />
      <section className='flex flex-col'>
        <input
          className='audio-slider'
          type='range'
          ref={sliderRef}
          min={0}
          max={audioRef.current?.duration}
        // onMouseUp={e => console.log(e.target.value)}
        />
        <div className='flex justify-between mx-1 text-sm'>
          <div>{formatTime(Math.floor(audioRef.current?.currentTime || 0))}</div>
          <div>{formatTime(Math.floor(audioRef.current?.duration || 0))}</div>
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
          {!play ? (
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