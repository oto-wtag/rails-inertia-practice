"use client"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { adminConfigurationsCountriesPath } from "@/routes"
import { useForm } from "@inertiajs/react"
import { CheckIcon, ChevronsUpDownIcon, Plus, Upload, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

type Country = {
  name: string
  code: string
}

export default function NewCountryDialog() {
  const [open, setOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Enhanced form data with picture and description
  const { data, setData, post, processing, errors, reset, setError } = useForm<{
    name: string
    code: string
    description: string
    picture: File | null
  }>({
    name: "",
    code: "",
    description: "",
    picture: null,
  })

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,cca3",
        )
        const countryData = await res.json()

        const processedCountries: Country[] = countryData
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .filter((country: Country) => country.code)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name))

        setCountries(processedCountries)
      } catch (err) {
        console.error("Failed to fetch countries:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCountries()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(adminConfigurationsCountriesPath(), {
      onSuccess: () => {
        reset()
        setOpen(false)
        setError({ name: "", code: "", description: "", picture: undefined })
        setImagePreview(null)
      },
    })
  }

  const handleCountrySelect = (selectedCountry: Country) => {
    setData({
      ...data,
      name: selectedCountry.name,
      code: selectedCountry.code,
    })
    setPopoverOpen(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError({ ...errors, picture: "Please select a valid image file" })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError({ ...errors, picture: "Image must be smaller than 5MB" })
        return
      }

      setData("picture", file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Clear any previous error
      if (errors.picture) {
        setError({ ...errors, picture: undefined })
      }
    }
  }

  const removeImage = () => {
    setData("picture", null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const resetForm = () => {
    reset()
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setError({ name: "", code: "", description: "", picture: undefined })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          resetForm()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          <span>Add Country</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new country</DialogTitle>
            <DialogDescription>
              Add new countries you work with, including pictures and
              descriptions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Country Selection */}
            <div className="space-y-2">
              <Label htmlFor="country-select">Country</Label>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="country-select"
                    type="button"
                    variant="outline"
                    role="combobox"
                    size="lg"
                    aria-expanded={popoverOpen}
                    className="w-full justify-between"
                  >
                    {data.name
                      ? data.name
                      : loading
                        ? "Loading..."
                        : "Select country..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.code}
                            value={country.name}
                            onSelect={() => handleCountrySelect(country)}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                data.name === country.name
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <InputError message={errors.name} />
            </div>

            {/* Picture Upload */}
            <div className="space-y-2">
              <Label htmlFor="picture-upload">Country Picture</Label>
              <div className="space-y-3">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative h-32 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
                    <img
                      src={imagePreview}
                      alt="Country preview"
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {imagePreview ? "Change Picture" : "Upload Picture"}
                  </Button>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeImage}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="picture-upload"
                />
                <p className="text-sm text-gray-500">
                  Accepted formats: JPG, PNG, GIF (max 5MB)
                </p>
              </div>
              <InputError message={errors.picture} />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a description for this country..."
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <InputError message={errors.description} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!data.name || processing}>
              {processing ? "Adding..." : "Add country"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
