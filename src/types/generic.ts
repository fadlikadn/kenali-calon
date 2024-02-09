export interface ResponseData<T> {
  status?: string
  data: T
}

export interface DataCalonLegislatif {
  partai: string
  dapil: string
  noUrut: string
  foto: string
  nama: string
  jenisKelamin: string
  daerah: string
  note1: string
  note2: string
}

export interface CalonLegislatifTingkat2 {
  id: string
  namaPartai: string
  logoPartai: string
  dapilId: string
  namaDapil: string
  nomorUrut: number
  pasFoto: string
  nama: string
  jenisKelamin: string
  pilihanPublikasi?: string[]
  statusPublikasi?: string
  tempatLahir?: string
  usia?: number
  agama?: string
  statusDisabilitas?: string
  pekerjaan?: string
  riwayatPekerjaan?: RiwayatPekerjaan[]
  statusHukum?: string
  riwayatPendidikan?: RiwayatPendidikan[]
  riwayatKursusDiklat?: RiwayatKursusDiklat[]
  riwayatOrganisasi?: RiwayatOrganisasi[]
  riwayatPenghargaan?: RiwayatPenghargaan[]
  programUsulan?: string[]
  motivasi?: string[]
}

export interface RiwayatPekerjaan {
  namaPerusahaanLembaga: string
  jabatan?: string
  tahunMasuk: string
  tahunKeluar: string
}

export interface RiwayatPendidikan {
  jenjangPendidikan: string
  namaInstitusi: string
  tahunMasuk: string
  tahunKeluar: string
}

export interface RiwayatKursusDiklat {
  namaKursus: string
  lembagaPenyelenggara: string
  nomorSertifikat?: string
  tahunMasuk: string
  tahunKeluar: string
}

export interface RiwayatOrganisasi {
  namaOrganisasi: string
  jabatan: string
  tahunMasuk: string
  tahunKeluar: string
}

export interface RiwayatPenghargaan {
  namaPenghargaan: any
  lembaga: string
  tahun: string
}