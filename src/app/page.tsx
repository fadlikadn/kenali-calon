'use client'

import Header from "@/components/Header"
import { Button } from "flowbite-react"
import { useRouter } from "next/navigation"

const HomePage = () => {
  const router = useRouter()

  return (
    <>
      {/* Header */}
      <Header />

      {/* End of Header */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Kenali Calon Legislatif Wonosobo</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Cari tahu calon legislatif yang mewakili masyarakat Wonosobo di level DPRD Kabupaten, Provinsi, Pusat, serta DPD.</p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 gap-1">
            <Button color="blue" onClick={() => router.push('/dprd-kabupaten-kota')}>DPRD Kabupaten</Button>
            <Button color="gray" disabled>DPRD Provinsi</Button>
            <Button color="gray" disabled>DPR Pusat</Button>
            <Button color="gray" disabled>DPD</Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage

