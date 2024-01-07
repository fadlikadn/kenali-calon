import { DataCalonLegislatif } from "@/types/generic";

export const extractDapil = (input: string): string => {
  const dapil = input.match(/<center><i>Dapil<\/i><br>(.*)<\/center>/)
  return dapil ? dapil[1] : ''
}

export const extractFoto = (input: string): string => {
  const foto = input.match(/<center><img src=\"(.*?)\" width=\"75\"/);
  return foto ? foto[1] : '';
}

export const extractNoUrut = (input: string): string => {
  const noUrut = input.match(/<center><i>nomor urut<\/i><br><b><font size=\"3\">(.*?)<\/font><\/b><\/center>/);
  return noUrut ? noUrut[1] : '';
}

export const extractPartai = (input: string): string => {
  const match = input.match(/<img src=\"..\/berkas-sipol\/parpol\/profil\/gambar_parpol\/.*\" width=\"30\" > (.*)/);
  return match ? match[1] : '';
}

export const transformData = (val: string[][]): DataCalonLegislatif[] => {
  const dataCalon = val.map((caleg) => {
    const data: DataCalonLegislatif = {
      partai: extractPartai(caleg[0]),
      dapil: extractDapil(caleg[1]),
      noUrut: extractNoUrut(caleg[2]),
      foto: extractFoto(caleg[3]),
      nama: caleg[4],
      jenisKelamin: caleg[5],
      daerah: caleg[6],
      note1: caleg[7],
      note2: caleg[8],
    }
    return data
  })
  
  return dataCalon
}

