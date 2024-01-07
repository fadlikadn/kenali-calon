import { ResponseData } from "@/types/generic"
import { useQuery } from "@tanstack/react-query"

export const useQueryAPIDCTDPRD = () => {
  const url = 'https://infopemilu.kpu.go.id/Pemilu/Dct_dprd/Dct_dprdkabko?kode_dapil=330701&_=1704604113338'
  return useQuery<ResponseData<any>>({
    queryKey: ['DCT_DPRD', '330701'],
    queryFn: async () => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    }
  })
}