import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import { RootState } from '../../redux/store';
import { setAudioUrl, setCurrentSurah, setPlay } from '../../redux/audio-slice';
import formatTime from '../../utils/format-time';
import { useLocalStorage } from 'usehooks-ts';

function AudioBar() {
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [seeking, setSeeking] = useState(false)

  const [qari] = useLocalStorage('qari', 7)

  const { audioUrl, play, showAudioNav, currentSurah } = useSelector((state: RootState) => state.audio)
  const dispatch = useDispatch()

  const audioRef = useRef<HTMLAudioElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)

  const { push } = useRouter()

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

    if (!seeking) {
      audioRef.current.addEventListener('timeupdate', timeUpdate)
    } else {
      audioRef.current.removeEventListener('timeupdate', timeUpdate)
    }

    // Mouse slider listener
    sliderRef.current?.addEventListener('mousedown', () => {
      setSeeking(true)
    })

    sliderRef.current?.addEventListener('mouseup', () => {
      setSeeking(false)
      if (!audioRef.current) return
      if (!sliderRef.current) return

      audioRef.current.currentTime = parseInt(sliderRef.current.value)
    })

    // Touch slider listener
    sliderRef.current?.addEventListener('touchstart', () => {
      setSeeking(true)
    })

    sliderRef.current?.addEventListener('touchend', () => {
      setSeeking(false)
      if (!audioRef.current) return
      if (!sliderRef.current) return

      audioRef.current.currentTime = parseInt(sliderRef.current.value)
    })

    return () => {
      audioRef.current?.removeEventListener('timeupdate', timeUpdate)
    }
  }, [seeking])

  const handlePreviousSurah = async () => {
    if(Math.floor((audioRef.current?.currentTime as number)) > 2) {
      // @ts-ignore
      audioRef.current.currentTime = 0
    } else {
      const prevSurah = (parseInt(currentSurah) - 1).toString()
      const res = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${qari}/${prevSurah}`)
      const audio = await res.json()

      dispatch(setAudioUrl(audio.audio_file.audio_url))
      dispatch(setCurrentSurah(prevSurah))
      await audioRef.current?.pause()
      await audioRef.current?.play()
    }


  }

  const handleNextSurah = async () => {
    const nextSurah = (parseInt(currentSurah) + 1).toString()
    const res = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${qari}/${nextSurah}`)
    const audio = await res.json()

    dispatch(setAudioUrl(audio.audio_file.audio_url))
    dispatch(setCurrentSurah(nextSurah))
    await audioRef.current?.pause()
    await audioRef.current?.play()
  }

  return (
    <motion.nav
      className='fixed bottom-0 right-0 left-0 bg-white h-14 flex justify-between flex-col'
      initial={{ y: '60px' }}
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
          onChange={e => setCurrentTime(parseInt(e.target.value))}
        />
        <div className='flex justify-between mx-1 text-sm'>
          <div>
            {formatTime(Math.floor(currentTime))}
          </div>
          <div>{formatTime(Math.floor(audioRef.current?.duration || 0))}</div>
        </div>
      </section>
      <section className='mx-auto relative top-[-14px] flex items-center'>
        <div className='mr-1' onClick={handlePreviousSurah}>
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
        <div className='ml-1' onClick={handleNextSurah}>
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