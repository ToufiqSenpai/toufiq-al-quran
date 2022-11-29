import React from 'react'
import { Divider } from '@mui/material'
import Image from 'next/legacy/image'
import { GetStaticProps, GetStaticPaths } from 'next'
import PlayAudio from '../../components/surah/PlayAudio';

interface PageProps {
  ayahScript: any[],
  surahDetails: any
}

function Surah({ ayahScript, surahDetails }: PageProps) {
  // ayahScript.map(ayah => console.log(ayah))
  return (
    <main className="max-w-[1200px] mt-14 mx-auto">
      <h1 className='text-center text-2xl font-medium'>Surah {surahDetails.name_simple}</h1>
      <div className='relative flex justify-center'>
        <Image
          className='object-contain'
          alt='Bismillah'
          src='/icons/bismillah.png'
          width={300}
          height={100}
        />
      </div>
      <PlayAudio audioUrl='' />
      <Divider />
      <section>
        {ayahScript.map((ayah: any, index: number) => (
          <React.Fragment key={index + 1}>
            <div className='my-3'>
              <h6 className='text-right font-quran text-3xl'>{ayah.text_uthmani}</h6>
            </div>
            <Divider />
          </React.Fragment>
        ))}
      </section>
    </main>
  )
}

export default Surah

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.quran.com/api/v4/chapters?language=id')
  const surahList = await res.json()

  const paths = surahList.chapters.map((surah: any) => ({
    params: { surah: `${surah.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const getAyahScript = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${params?.surah}`)
    .then(response => response.json())
    .then(response => response.verses)

  const getSurahDetails = await fetch(`https://api.quran.com/api/v4/chapters/${params?.surah}?language=id`)
    .then(response => response.json())
    .then(response => response.chapter)

  return {
    props: {
      ayahScript: getAyahScript,
      surahDetails: getSurahDetails
    }
  }
}