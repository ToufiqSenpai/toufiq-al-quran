import { Suspense } from "react"
import HeroSection from "./hero-section"
import SurahListContainer from "./surah-list-container"

async function getSurahList() {
  const res = await fetch('https://api.quran.com/api/v4/chapters?language=id')
  return res.json()
}

async function Page() {
  const surahList = await getSurahList()

  return (
    <main className="max-w-[1200px] mt-16 mx-auto">
      <HeroSection />
      <Suspense>
        {/* @ts-ignore */}
        <SurahListContainer surahList={surahList} />
      </Suspense>
    </main>
  )
}

export default Page