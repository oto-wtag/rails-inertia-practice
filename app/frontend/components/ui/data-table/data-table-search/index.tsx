import { useEffect, useMemo, useState, useRef } from "react"

import { Input } from "@/components/ui/input"
import { DEBOUNCE_TIME } from "@/lib/constants"
import { debounce } from "@/lib/helper-functions/debounce"
import { cn } from "@/lib/utils"

interface DataTableSearchProps {
  onSearch: (searchText: string) => void
  value?: string
}

const DataTableSearch: React.FC<DataTableSearchProps> = ({
  onSearch,
  value = "",
}) => {
  const [inputValue, setInputValue] = useState(value)
  const isTypingRef = useRef(false)
  const lastExternalValueRef = useRef(value)

  useEffect(() => {
    if (value !== lastExternalValueRef.current && !isTypingRef.current) {
      setInputValue(value)
      lastExternalValueRef.current = value
    }
  }, [value])

  const debouncedSearch = useMemo(() => {
    const debounced = debounce((searchText: string) => {
      onSearch(searchText)
      setTimeout(() => {
        isTypingRef.current = false
        lastExternalValueRef.current = searchText
      }, 50)
    }, DEBOUNCE_TIME)

    return debounced
  }, [onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value
    isTypingRef.current = true
    setInputValue(newVal)
    debouncedSearch(newVal)
  }

  return (
    <div className="flex h-8 w-full items-center md:w-64">
      <Input
        value={inputValue}
        placeholder="Search..."
        onChange={handleChange}
        className={cn("h-8 w-full")}
      />
    </div>
  )
}

export default DataTableSearch
