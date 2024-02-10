'use client'

import CalegCard from "@/components/CalegCard"
import DetailCalegTingkat2 from "@/components/DetailCalegTingkat2"
import Header from "@/components/Header"
import Pagination from "@/components/Pagination"
import SearchInput from "@/components/SearchInput"
import { DCT_DPRD_WONOSOBO } from "@/data/dprd_kab/data"
import { CalonLegislatif, DataCalonLegislatif, ResponseData } from "@/types/generic"
import { defaultBlurDataURL } from "@/utils/blurDefault"
import { KECAMATAN_WONOSOBO, MAPPING_KECAMATAN_DAPIL, RANDOM_DCT_DPRD_WONOSOBO, searchKeyword, shuffleArray, sliceDctData, toSnakeCaseWithDash } from "@/utils/generic"
import useDebounce from "@/utils/hooks/useDebounce"
import { Button, Modal } from "flowbite-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const KonsituenDPRD2Page = () => {
  const [viewSize, _setViewSize] = useState<number>(50)
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')
  const [dctList, setDctList] = useState(RANDOM_DCT_DPRD_WONOSOBO)
  const [selectedKecamatan, setSelectedKecamatan] = useState<string[]>([])
  const [selectedDapil, setSelectedDapil] = useState<string[]>([])
  const [isChange, setChange] = useState<boolean>(false)
  const [dctListPerPage, setDctListPerPage] = useState(sliceDctData(dctList, page, viewSize))
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
  const [selectedCalon, setSelectedCalon] = useState<CalonLegislatif | null>(null)

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
    fetch(url).then((res) => res.json()).then((data: ResponseData<CalonLegislatif[]>) => {
      setSelectedCalon(data.data[0])
      setDialogOpen(true)
    })
  }

  return (
    <>
      <Header />
      <div className="max-w-screen-xl items-center mx-auto p-4 gap-2">
        <SearchInput setKeyword={setKeyword} />

        <Pagination dctList={dctList} viewSize={viewSize} page={page} setPage={setPage} />

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
              <CalegCard key={index} index={index} person={person} onCalonClick={onCalonClick} />
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

export default KonsituenDPRD2Page
