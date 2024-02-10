'use client'

import DetailCalegTingkat2 from "@/components/DetailCalegTingkat2"
import Header from "@/components/Header"
import { DCT_DPRD_WONOSOBO } from "@/data/dprd_kab/data"
import { CalonLegislatifTingkat2, DataCalonLegislatif, ResponseData } from "@/types/generic"
import { defaultBlurDataURL } from "@/utils/blurDefault"
import { shuffleArray, toSnakeCaseWithDash } from "@/utils/generic"
import useDebounce from "@/utils/hooks/useDebounce"
import { Button, Modal } from "flowbite-react"
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

const KECAMATAN_WONOSOBO = {
  WONOSOBO: 'Wonosobo',
  SELOMERTO: 'Selomerto',
  LEKSONO: 'Leksono',
  WATUMALANG: 'Watumalang',
  SUKOHARJO: 'Sukoharjo',
  MOJOTENGAH: 'Mojotengah',
  GARUNG: 'Garung',
  KEJAJAR: 'Kejajar',
  KALIKAJAR: 'Kalikajar',
  KERTEK: 'Kertek',
  KEPIL: 'Kepil',
  SAPURAN: 'Sapuran',
  WADASLINTANG: 'Wadaslintang',
  KALIWIRO: 'Kaliwiro',
  KALIBAWANG: 'Kalibawang'
}

const MAPPING_KECAMATAN_DAPIL = {
  [KECAMATAN_WONOSOBO.WONOSOBO]: 'WONOSOBO 1',
  [KECAMATAN_WONOSOBO.SELOMERTO]: 'WONOSOBO 1',
  [KECAMATAN_WONOSOBO.LEKSONO]: 'WONOSOBO 2',
  [KECAMATAN_WONOSOBO.WATUMALANG]: 'WONOSOBO 2',
  [KECAMATAN_WONOSOBO.SUKOHARJO]: 'WONOSOBO 2',
  [KECAMATAN_WONOSOBO.MOJOTENGAH]: 'WONOSOBO 3',
  [KECAMATAN_WONOSOBO.GARUNG]: 'WONOSOBO 3',
  [KECAMATAN_WONOSOBO.KEJAJAR]: 'WONOSOBO 3',
  [KECAMATAN_WONOSOBO.KALIKAJAR]: 'WONOSOBO 4',
  [KECAMATAN_WONOSOBO.KERTEK]: 'WONOSOBO 4',
  [KECAMATAN_WONOSOBO.KEPIL]: 'WONOSOBO 5',
  [KECAMATAN_WONOSOBO.SAPURAN]: 'WONOSOBO 5',
  [KECAMATAN_WONOSOBO.WADASLINTANG]: 'WONOSOBO 6',
  [KECAMATAN_WONOSOBO.KALIWIRO]: 'WONOSOBO 6',
  [KECAMATAN_WONOSOBO.KALIBAWANG]: 'WONOSOBO 6'
}

const randomDefaultData = shuffleArray(DCT_DPRD_WONOSOBO)

const HomePage = () => {
  const [viewSize, _setViewSize] = useState<number>(50)
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')
  const [dctList, setDctList] = useState(randomDefaultData)
  const [selectedKecamatan, setSelectedKecamatan] = useState<string[]>([])
  const [selectedDapil, setSelectedDapil] = useState<string[]>([])
  const [isChange, setChange] = useState<boolean>(false)
  const [dctListPerPage, setDctListPerPage] = useState(sliceDctData(dctList, page, viewSize))
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
  const [selectedCalon, setSelectedCalon] = useState<CalonLegislatifTingkat2 | null>(null)

  const totalPages = Math.ceil(dctList.length / viewSize)
  const onPageChangeClick = (i: number) => {
    setPage(i + 1)
  }
  const debouncedKeyword = useDebounce({ value: keyword })

  const selectKecamatan = (kecamatan: string) => {
    if (kecamatan !== '') {
      if (selectedKecamatan.includes(kecamatan)) {
        setSelectedKecamatan(selectedKecamatan.filter((item) => item !== kecamatan))
        setSelectedDapil(selectedDapil.filter((item) => item !== MAPPING_KECAMATAN_DAPIL[kecamatan]))
      } else {
        setSelectedKecamatan([...selectedKecamatan, kecamatan])
        setSelectedDapil([...selectedDapil, MAPPING_KECAMATAN_DAPIL[kecamatan]])
      }
    }
  }

  const clearFilter = () => {
    setSelectedKecamatan([])
  }

  useEffect(() => {
    const slicedData = sliceDctData(dctList, page, viewSize)
    setDctListPerPage(slicedData)
  }, [page, viewSize, dctList])

  useEffect(() => {
    setSelectedDapil(selectedKecamatan.map((item) => MAPPING_KECAMATAN_DAPIL[item]))
  }, [selectedKecamatan])

  useEffect(() => {
    let filteredData = searchKeyword(debouncedKeyword, DCT_DPRD_WONOSOBO)
    if (selectedKecamatan.length > 0) {
      filteredData = filteredData.filter((item) => selectedDapil.includes(item.dapil))
      setDctList(shuffleArray(filteredData))
      setChange(true)
    }
    // if (debouncedKeyword === '') {
    //   filteredData = shuffleArray(filteredData)
    // }
    if (debouncedKeyword !== '') setChange(true)
    if (debouncedKeyword !== '' || isChange) {
      setDctList(filteredData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword, selectedDapil])

  const onCalonClick = (person: DataCalonLegislatif) => {
    const url = `https://caleg.zakiego.com/api/dprd-kabupaten-kota/calon/${toSnakeCaseWithDash(person.dapil)}/${toSnakeCaseWithDash(person.partai)}/${person.noUrut}`
    fetch(url).then((res) => res.json()).then((data: ResponseData<CalonLegislatifTingkat2[]>) => {
      setSelectedCalon(data.data[0])
      setDialogOpen(true)
      // TODO: open dialog contain detail calon
    })
  }

  return (
    <>
      <Header />
      <div className="max-w-screen-xl items-center mx-auto p-4 gap-2">
        <div className="relative mb-1">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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

        <div className="flex flex-row gap-1 my-2">
          {[...Array(totalPages)].map((_, i) => (
            <Button size="xs" color={page === (i + 1) ? 'blue' : 'gray'} key={i} onClick={() => onPageChangeClick(i)}>{i + 1}</Button>
          ))}
        </div>

        <div className="flex flex-wrap flex-row gap-1 my-2">
          {Object.values(KECAMATAN_WONOSOBO).map((kecamatan) => {
            return (
              <Button key={kecamatan} color={selectedKecamatan.includes(kecamatan) ? 'blue' : 'light'} size="xs" onClick={() => selectKecamatan(kecamatan)}>{kecamatan}</Button>
            )
          })}
          <Button size="xs" color="success" onClick={clearFilter}>Bersihkan Filter</Button>
        </div>
      </div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 gap-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dctListPerPage.map((person, index) => {
            return (
              <div key={index} className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={() => onCalonClick(person)}>
                <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{person.nama}</h5>
                <div>
                  <div>
                    <Image src={person.foto} alt={person.nama} style={{ width: '100%', height: 'auto' }} width={250} height={250} placeholder="blur" blurDataURL={defaultBlurDataURL} />
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
      <Modal show={isDialogOpen} onClose={() => setDialogOpen(false)} size="4xl">
        <Modal.Header>{selectedCalon?.nama}</Modal.Header>
        <Modal.Body>
          <div className="p-2">
            <DetailCalegTingkat2 data={selectedCalon} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => setDialogOpen(false)}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HomePage
