import { useEffect, useState } from "react"

interface useDebounceProps {
  value: string
  delay?: number
}

const useDebounce = ({ value, delay = 300 }: useDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
