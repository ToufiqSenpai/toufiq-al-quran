import React from 'react'
import { Divider } from '@mui/material'
import Image from 'next/legacy/image'
import { GetStaticProps, GetStaticPaths } from 'next'
import PlayAudio from '../../components/surah/PlayAudio';
import arabicNumber from '../../utils/arabic-number';
import { useLocalStorage } from 'usehooks-ts';
import Head from 'next/head';

type Translate = {
  resource_id: number,
  text: string
}

interface PageProps {
  ayahScript: any[]
  surahDetails: any
  translate: {
    id: Translate[]
    en: Translate[]
  }
}

function Surah({ ayahScript, surahDetails, translate }: PageProps) {
  const [translateId] = useLocalStorage('language', 'en')
  const [showTranslate] = useLocalStorage('show-translate', 'false')

  const translateText = (): any => {
    if(translateId == 'en') return translate.en
    else if(translateId == 'id') return translate.id
    else return translate.en
  }

  return (
    <main className="max-w-[1200px] mt-14 mx-auto">
      <Head>
        <title>{"Taufiq's"} Quran | Surah {surahDetails.name_simple}</title>
      </Head>
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
      <PlayAudio />
      <Divider />
      <section className='mb-16'>
        {ayahScript.map((ayah: any, index: number) => (
          <React.Fragment key={index + 1}>
            <div className='my-3 mx-3'>
              <div className='text-right font-quran text-3xl'>{ayah.text_uthmani} {`(${arabicNumber(index + 1)})`}</div>
              {showTranslate ? <div className='text-base mt-2 max-mobile:mt-5' dangerouslySetInnerHTML={{ __html: translateText()[index].text}}></div> : null}
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
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const getAyahScript = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${params?.surah}`)
    .then(response => response.json())
    .then(response => response.verses)

  const getSurahDetails = await fetch(`https://api.quran.com/api/v4/chapters/${params?.surah}?language=id`)
    .then(response => response.json())
    .then(response => response.chapter)

  const enAyahTranslation = await fetch(`https://api.quran.com/api/v4/quran/translations/167?chapter_number=${params?.surah}`)
    .then(response => response.json())
    .then(response => response.translations)

  const idAyahTranslation = await fetch(`https://api.quran.com/api/v4/quran/translations/33?chapter_number=${params?.surah}`)
    .then(response => response.json())
    .then(response => response.translations)

  return {
    props: {
      ayahScript: getAyahScript,
      surahDetails: getSurahDetails,
      translate: {
        en: enAyahTranslation,
        id: idAyahTranslation
      }
    }
  }
}