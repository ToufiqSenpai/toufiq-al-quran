import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Language from '../../components/settings/Language'
import Qari from '../../components/settings/Qari'
import ShowAyahTranslation from '../../components/settings/ShowAyahTranslation'

interface SettingsPageProps {
  qariList: any
}

function Settings({ qariList }: SettingsPageProps) {

  return (
    <div className='max-w-[1200px] mt-14 mx-auto'>
      <Head>
        <title>{"Taufiq's"} Quran | Settings</title>
      </Head>
      <Language />
      <Qari qariList={qariList} />
      <ShowAyahTranslation />
    </div>
  )
}

export default Settings

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://api.quran.com/api/v4/resources/recitations?language=en')
  const qariList: object = await res.json()

  return {
    props: {
      qariList
    }
  }
}