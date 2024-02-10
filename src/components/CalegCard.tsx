import { DataCalonLegislatif } from "@/types/generic"
import { defaultBlurDataURL } from "@/utils/blurDefault"
import Image from "next/image"
import { FC } from "react"

interface CalegCardProps {
  index: number
  person: DataCalonLegislatif
  onCalonClick: (person: DataCalonLegislatif) => void
}

const CalegCard: FC<CalegCardProps> = ({ index, person, onCalonClick }) => {
  return <div key={index} className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={() => onCalonClick(person)}>
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
}

export default CalegCard
