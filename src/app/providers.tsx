'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const Providers = ({ children }: { children: ReactNode}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000,
      }
    }
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
    </>
  )
}

export default Providers
