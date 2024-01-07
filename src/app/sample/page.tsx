'use client'

import { DPR_JATENG_DAPIL6_RAW } from "@/data/dpr/jateng_dapil6"
import { transformData } from "@/utils/extractor"
import { Button } from "flowbite-react"

const SamplePage = () => {
  const handleTransform = () => {
    console.log('Transform Data')
    const dataCalon = transformData(DPR_JATENG_DAPIL6_RAW)
    console.log(dataCalon)
  }

  return (
    <>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Button onClick={handleTransform}>Transform Data Test</Button>
      </div>
    </>
  )
}

export default SamplePage
