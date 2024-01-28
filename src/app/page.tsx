'use client'

import { DCT_DPRD_WONOSOBO } from "@/data/dprd_kab/data"
import { DataCalonLegislatif } from "@/types/generic"
import { Button } from "flowbite-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const sliceDctData = (data: DataCalonLegislatif[], page: number, viewSize: number) => {
  const start = (page - 1) * viewSize
  const end = start + viewSize
  const slicedData = data.slice(start, end)
  return slicedData
}

const searchKeyword = (keyword: string, data: DataCalonLegislatif[]): DataCalonLegislatif[] => {
  const result = data.filter((item) => {
    return Object.values(item).some((value) =>
      value.toLowerCase().includes(keyword.toLowerCase())
    )
  })
  
  return result
}

const HomePage = () => {
  const [viewSize, setViewSize] = useState<number>(50)
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')
  const [dctList, setDctList] = useState(DCT_DPRD_WONOSOBO)
  const [dctListPerPage, setDctListPerPage] = useState(sliceDctData(dctList, page, viewSize))
  const totalPages = Math.ceil(dctList.length / viewSize)
  const onPageChangeClick = (i: number) => {
    setPage(i + 1)
  }

  useEffect(() => {
    const slicedData = sliceDctData(dctList, page, viewSize)
    setDctListPerPage(slicedData)
  }, [page, viewSize, dctList])

  useEffect(() => {
    const filterdData = searchKeyword(keyword, DCT_DPRD_WONOSOBO)
    setDctList(filterdData)
  }, [keyword])

  return (
    <>
      <div className="max-w-screen-xl items-center mx-auto p-4 gap-2">
        <div className="relative mb-1">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Cari berdasarkan apa saja..." 
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
          />
          <button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cari</button>
        </div>

        <div className="flex flex-row gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <Button size="xs" color={page === (i + 1) ? 'blue' : 'gray'} key={i} onClick={() => onPageChangeClick(i)}>{i+1}</Button>
          ))}
        </div>
      </div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 gap-2">
        <div className="grid grid-cols-4 gap-4">
          {dctListPerPage.map((person, index) => {
            return (
              <div key={index} className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{person.nama}</h5>
                <div>
                  <div>
                    <Image src={person.foto} alt={person.nama} style={{ width: '100%', height: 'auto' }} width={250} height={250} />
                  </div>
                  <div>Domisili: {person.daerah}</div>
                  <div>Dapil: {person.dapil}</div>
                  <div>No. urut: {person.noUrut}</div>
                  <div>Partai: {person.partai}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomePage
