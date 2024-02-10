import { DCT_DPRD_WONOSOBO } from "@/data/dprd_kab/data";
import { DataCalonLegislatif } from "@/types/generic";

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const toSnakeCaseWithDash = (str: string): string => {
  return str.split(' ').join('-').toLowerCase();
}

export const sliceDctData = (data: DataCalonLegislatif[], page: number, viewSize: number) => {
  const start = (page - 1) * viewSize
  const end = start + viewSize
  const slicedData = data.slice(start, end)
  return slicedData
}

export const searchKeyword = (keyword: string, data: DataCalonLegislatif[]): DataCalonLegislatif[] => {
  const result = data.filter((item) => {
    return Object.values(item).some((value) =>
      value.toLowerCase().includes(keyword.toLowerCase())
    )
  })

  return result
}

export const KECAMATAN_WONOSOBO = {
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

export const MAPPING_KECAMATAN_DAPIL = {
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

export const RANDOM_DCT_DPRD_WONOSOBO = shuffleArray(DCT_DPRD_WONOSOBO)