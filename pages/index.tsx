import { useEffect } from 'react'
import { Divider, useAutocomplete } from '@mui/material'
import { useRouter } from 'next/router'

interface PageProps {
  surahList: any
}

function Page({ surahList }: PageProps) {
  const { getInputProps, groupedOptions } = useAutocomplete({
    id: 'search-surah',
    options: surahList.chapters,
    getOptionLabel: option => (option as any).name_simple,
    includeInputInList: true,
    open: true
  })

  const { push } = useRouter()

  return (
    <main className="max-w-[1200px] mt-16 mx-auto">
      <section className='flex justify-center mb-5'>
        <input className='border border-solid border-black mx-auto min-w-[310px] max-w-7xl rounded px-2 h-7' placeholder='Search surah...' {...getInputProps()} />
      </section>
      <Divider className='my-3' />
      <section className="mb-16 grid max-mobile:grid-cols-1 min-ipad:grid-cols-2 min-desktop:grid-cols-3 gap-3 px-2">
        {groupedOptions.map((data: any, index: number) => (
          <figure key={index} className="m-0 py-2 border border-solid border-black flex items-center justify-between" onClick={() => push(`/${data.id}`)}>
            <div className="flex items-center">
              <h2 className="bg-gray-100 w-10 h-10 flex items-center justify-center ml-2">{data.id}</h2>
              <div className="ml-2">
                <h3 className="text-[18px] font-semibold">{data.name_simple}</h3>
                <h3 className="text-sm">{data.translated_name.name}</h3>
              </div>
            </div>
            <h2 className='mr-2 font-semibold'>{data.name_arabic}</h2>
          </figure>
        ))}
      </section>
    </main>
  )
}

export default Page

export async function getStaticProps() {
  const res = await fetch('https://api.quran.com/api/v4/chapters?language=en')
  const data = await res.json()

  return {
    props: {
      surahList: data
    }
  }
}