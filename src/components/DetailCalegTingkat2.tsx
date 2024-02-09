// Import necessary libraries
import { CalonLegislatifTingkat2, RiwayatKursusDiklat, RiwayatOrganisasi, RiwayatPekerjaan, RiwayatPendidikan, RiwayatPenghargaan } from '@/types/generic';
import Image from 'next/image';
import { FC } from 'react';

// Define the component using the provided data model
const DetailCalegTingkat2: FC<{ data: CalonLegislatifTingkat2 | null }> = ({ data }) => {
  return (
    <>
      {
        data && (
          <div className="max-w-2xl mx-auto bg-white rounded-md" >
            <h2 className="text-3xl font-semibold mb-4">{data.nama}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2">Partai: {data.namaPartai}</p>
                <Image src={`https://infopemilu.kpu.go.id/${data.logoPartai}`} alt={`${data.namaPartai} Logo`} className="max-w-full h-auto mb-4" width={150} height={150} />
                <Image src={data.pasFoto} alt={`Foto ${data.nama}`} className="max-w-full h-auto mb-4" width={500} height={500} />
                <p>Konstituen/Dapil: {data.namaDapil}</p>
                <p>Nomor Urut: {data.nomorUrut}</p>
                <p>Jenis Kelamin: {data.jenisKelamin}</p>
                <p>Tanggal Lahir: {data.tempatLahir}</p>
                <p>Umur: {data.usia}</p>
                <p>Agama: {data.agama}</p>
                <p>Status Disabilitas: {data.statusDisabilitas}</p>
                <p>Pekerjaan: {data.pekerjaan}</p>
              </div>

              {/* Displaying RiwayatPekerjaan */}
              {data.riwayatPekerjaan && data.riwayatPekerjaan.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Riwayat Pekerjaan</h3>
                  {data.riwayatPekerjaan.map((pekerjaan: RiwayatPekerjaan, index: number) => (
                    <div key={index} className="mb-4">
                      <p>Perusahaan: {pekerjaan.namaPerusahaanLembaga}</p>
                      <p>Posisi: {pekerjaan.jabatan}</p>
                      <p>Tahun Bergabung: {pekerjaan.tahunMasuk}</p>
                      <p>Tahun Keluar: {pekerjaan.tahunKeluar}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Displaying RiwayatPendidikan */}
              {data.riwayatPendidikan && data.riwayatPendidikan.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Riwayat Pendidikan</h3>
                  {data.riwayatPendidikan.map((pendidikan: RiwayatPendidikan, index: number) => (
                    <div key={index} className="mb-4">
                      <p>Tingkat Pendidikan: {pendidikan.jenjangPendidikan}</p>
                      <p>Nama Institusi: {pendidikan.namaInstitusi}</p>
                      <p>Tahun Masuk: {pendidikan.tahunMasuk}</p>
                      <p>Tahun Lulus: {pendidikan.tahunKeluar}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Displaying RiwayatKursusDiklat */}
              {data.riwayatKursusDiklat && data.riwayatKursusDiklat.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Riwayat Kursus dan Pelatihan</h3>
                  {data.riwayatKursusDiklat.map((kursus: RiwayatKursusDiklat, index: number) => (
                    <div key={index} className="mb-4">
                      <p>Nama Kursus / Pelatihan: {kursus.namaKursus}</p>
                      <p>Institusi Kursus / Pelatihan: {kursus.lembagaPenyelenggara}</p>
                      <p>Nomor Sertifikat: {kursus.nomorSertifikat}</p>
                      <p>Tahun Bergabung : {kursus.tahunMasuk}</p>
                      <p>Tahun Lulus: {kursus.tahunKeluar}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Displaying RiwayatOrganisasi */}
              {data.riwayatOrganisasi && data.riwayatOrganisasi.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Riwayat Organisasi</h3>
                  {data.riwayatOrganisasi.map((organisasi: RiwayatOrganisasi, index: number) => (
                    <div key={index} className="mb-4">
                      <p>Nama Organisasi: {organisasi.namaOrganisasi}</p>
                      <p>Posisi: {organisasi.jabatan}</p>
                      <p>Tahun Mulai: {organisasi.tahunMasuk}</p>
                      <p>Tahun Selesai: {organisasi.tahunKeluar}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Displaying RiwayatPenghargaan */}
              {data.riwayatPenghargaan && data.riwayatPenghargaan.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Riwayat Penghargaan</h3>
                  {data.riwayatPenghargaan.map((penghargaan: RiwayatPenghargaan, index: number) => (
                    <div key={index} className="mb-4">
                      <p>Nama Penghargaan: {penghargaan.namaPenghargaan}</p>
                      <p>Institusi Pemberi Penghargaan: {penghargaan.lembaga}</p>
                      <p>Tahun: {penghargaan.tahun}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div >
        )
      }
    </>
  );
};

export default DetailCalegTingkat2
