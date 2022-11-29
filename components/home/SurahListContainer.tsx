import React from 'react'
import Link from 'next/link'

interface PropComponent {
  surahList: any
}

async function SurahListContainer({ surahList }: PropComponent) {
  return (
    <div className="grid max-mobile:grid-cols-1 min-ipad:grid-cols-2 min-desktop:grid-cols-3 gap-3">
      {surahList.chapters.map((data: any, index: number) => (
        <Link href={`/${data.id}`} key={index} className="m-0 py-2 border border-solid border-black flex items-center">
          <div className="flex items-center">
            <h2 className="bg-gray-200 w-10 h-10 flex items-center justify-center ml-2">{data.id}</h2>
            <div className="ml-2">
              <h3 className="text-[18px] font-semibold">{data.name_simple}</h3>
              <h3 className="text-sm">{data.translated_name.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SurahListContainer