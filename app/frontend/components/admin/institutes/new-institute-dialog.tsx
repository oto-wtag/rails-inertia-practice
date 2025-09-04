import { Button } from "@/components/ui/button"
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Country } from "@/types/country-types"
import { CheckIcon, ChevronsUpDownIcon, Plus, Upload, X } from "lucide-react"
import { useState } from "react"
import InputError from "@/components/input-error"
import { cn } from "@/lib/utils"
import { useForm } from "@inertiajs/react"
import { useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { adminConfigurationsInstitutesPath } from "@/routes"

const NewInstituteDialog = ({ countries }: { countries: Country[] }) => {
  const [open, setOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
    setError,
    clearErrors,
  } = useForm<{
    name: string
    country_id: number | null
    city: string
    picture: File | null
    description: string
  }>({
    name: "",
    country_id: null,
    city: "",
    picture: null as File | null,
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(adminConfigurationsInstitutesPath(), {
      onSuccess: () => {
        reset()
        setOpen(false)
        clearErrors()
        setImagePreview(null)
      },
    })
  }

  const handleCountrySelect = (selectedCountry: Country) => {
    setData("country_id", selectedCountry.id)
    setPopoverOpen(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError({ ...errors, picture: "Please select a valid image file" })
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError({ ...errors, picture: "Image must be smaller than 5MB" })
        return
      }

      setData("picture", file)

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }

      reader.readAsDataURL(file)
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
    clearErrors()
  }

  const selectedCountry = countries.find((c) => c.id === data.country_id)

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
        <Button>
          <Plus />
          <span>Add Institute</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Institute</DialogTitle>
            <DialogDescription>
              Add new institutes you work with, including pictures and
              descriptions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter institute name..."
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              <InputError message={errors.name} />
            </div>

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
                    {selectedCountry
                      ? selectedCountry.name
                      : "Select country..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command className={cn("h-[340px]")}>
                    <CommandInput placeholder="Search country..." />
                    <CommandList
                      onWheel={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.id}
                            value={country.name}
                            onSelect={() => handleCountrySelect(country)}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                data.country_id === country.id
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
              <InputError message={errors.country_id} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Enter city"
                value={data.city}
                onChange={(e) => setData("city", e.target.value)}
              />
              <InputError message={errors.city} />
            </div>

            {/* Picture Upload */}
            <div className="space-y-2">
              <Label htmlFor="picture-upload">Institute Picture</Label>
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
            <Button type="submit">
              {processing ? "Adding..." : "Add Institute"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewInstituteDialog
