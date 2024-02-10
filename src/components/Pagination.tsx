import { Button } from "flowbite-react"
import { Dispatch, FC, SetStateAction } from "react"

interface PaginationProps {
  dctList: any[]
  viewSize: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const Pagination: FC<PaginationProps> = ({ dctList, viewSize, page, setPage }) => {
  const totalPages = Math.ceil(dctList.length / viewSize)
  const onPageChangeClick = (i: number) => {
    setPage(i + 1)
  }

  return (
    <div className="flex flex-row gap-1 my-2">
      {[...Array(totalPages)].map((_, i) => (
        <Button size="xs" color={page === (i + 1) ? 'blue' : 'gray'} key={i} onClick={() => onPageChangeClick(i)}>{i + 1}</Button>
      ))}
    </div>
  )
}

export default Pagination
