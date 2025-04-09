"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  File,
  FileImage,
  FileText,
  FileVideo,
  FileAudio,
  Upload,
  X,
  Info,
  DollarSign,
  ImageIcon,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

type FileType = "image" | "video" | "audio" | "document" | "other"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: FileType
  url: string
}

export function LeadMagnetUploadCard() {
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [isPaid, setIsPaid] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<FileType>("document")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Process each file
    for (const file of Array.from(e.target.files)) {
      try {
        // Determine file type
        let type: FileType = "other"
        if (file.type.startsWith("image/")) type = "image"
        else if (file.type.startsWith("video/")) type = "video"
        else if (file.type.startsWith("audio/")) type = "audio"
        else if (
          file.type.startsWith("application/pdf") ||
          file.type.includes("document") ||
          file.type.includes("sheet")
        )
          type = "document"

        // Upload file to server
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to upload file")
        }

        const data = await response.json()

        // Add to uploaded files
        setUploadedFiles((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
            type,
            url: data.url,
          },
        ])

        // Update progress
        setUploadProgress((prev) => prev + 100 / e.target.files!.length)
      } catch (error) {
        console.error("Error uploading file:", error)
        toast({
          title: "Upload failed",
          description: "Failed to upload file. Please try again.",
          variant: "destructive",
        })
      }
    }

    setIsUploading(false)
    setUploadProgress(100)

    // Reset the input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file for the thumbnail",
        variant: "destructive",
      })
      return
    }

    try {
      // Upload thumbnail to server
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload thumbnail")
      }

      const data = await response.json()

      // Create object URL for preview
      const url = URL.createObjectURL(file)
      setThumbnailPreview(url)
      setThumbnailFile(file)

      toast({
        title: "Thumbnail uploaded",
        description: "Thumbnail has been uploaded successfully.",
      })
    } catch (error) {
      console.error("Error uploading thumbnail:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload thumbnail. Please try again.",
        variant: "destructive",
      })
    }

    // Reset the input
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = ""
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) URL.revokeObjectURL(file.url)
      return prev.filter((f) => f.id !== id)
    })
  }

  const removeThumbnail = () => {
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview)
    setThumbnailPreview(null)
    setThumbnailFile(null)
  }

  const handleSubmit = async () => {
    if (!name) {
      toast({
        title: "Missing name",
        description: "Please provide a name for your lead magnet.",
        variant: "destructive",
      })
      return
    }

    if (!description) {
      toast({
        title: "Missing description",
        description: "Please provide a description for your lead magnet.",
        variant: "destructive",
      })
      return
    }

    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one file for your lead magnet.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create form data
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("fileType", fileType)
      formData.append("isPaid", isPaid.toString())

      if (isPaid && price) {
        formData.append("price", price)
      }

      // Add files
      uploadedFiles.forEach((file, index) => {
        formData.append(`file-${index}`, JSON.stringify(file))
      })

      // Add thumbnail
      if (thumbnailFile) {
        formData.append("thumbnailFile", thumbnailFile)
      }

      // Submit form
      const response = await fetch("/api/lead-magnets", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          fileType,
          isPaid,
          price: isPaid ? price : undefined,
          files: uploadedFiles,
          thumbnailUrl: thumbnailPreview,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to create lead magnet")
      }

      const data = await response.json()

      toast({
        title: "Lead magnet created",
        description: "Your lead magnet has been created successfully.",
      })

      // Redirect to the next step
      router.push(`/lead-magnets/${data.leadMagnet.id}/edit?step=design`)
    } catch (error) {
      console.error("Error creating lead magnet:", error)
      toast({
        title: "Creation failed",
        description: "Failed to create lead magnet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case "image":
        return <FileImage className="h-6 w-6 text-blue-500" />
      case "video":
        return <FileVideo className="h-6 w-6 text-red-500" />
      case "audio":
        return <FileAudio className="h-6 w-6 text-green-500" />
      case "document":
        return <FileText className="h-6 w-6 text-amber-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Upload Lead Magnet</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">About lead magnets</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Lead magnets are valuable resources you offer to potential customers in exchange for their contact
                  information. They can be eBooks, guides, templates, videos, or any content that provides value to your
                  audience.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Upload your lead magnet files and provide details to attract your audience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Lead Magnet Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="name">Lead Magnet Name</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose a compelling name that clearly communicates the value of your lead magnet.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="name"
            placeholder="e.g., Ultimate Guide to Digital Marketing"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Lead Magnet Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="description">Description</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Describe what your audience will learn or gain from this lead magnet.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="description"
            placeholder="Describe what your audience will learn or gain from this lead magnet..."
            className="min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* File Type Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="file-type">File Type</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the type of content you're uploading.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={fileType} onValueChange={(value) => setFileType(value as FileType)}>
            <SelectTrigger id="file-type">
              <SelectValue placeholder="Select file type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="document">Document (PDF, DOCX, etc.)</SelectItem>
              <SelectItem value="image">Image (JPG, PNG, etc.)</SelectItem>
              <SelectItem value="video">Video (MP4, MOV, etc.)</SelectItem>
              <SelectItem value="audio">Audio (MP3, WAV, etc.)</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Upload Files</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload the content files for your lead magnet. You can upload multiple files if needed.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX, JPG, PNG, MP4, MP3 (MAX. 50MB)</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.mp4,.mov,.mp3,.wav"
                />
              </label>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-violet-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="border rounded-md divide-y">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {file.type.charAt(0).toUpperCase() + file.type.slice(1)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Thumbnail Image</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Upload an eye-catching thumbnail image that represents your lead magnet. This will be displayed in
                    listings and promotions.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col gap-4">
            {!thumbnailPreview ? (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnail-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Upload thumbnail image</span>
                    </p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, GIF (Recommended: 1200 x 630px)</p>
                  </div>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    className="hidden"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailUpload}
                    accept="image/*"
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden rounded-md border">
                  <Image
                    src={thumbnailPreview || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove thumbnail</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="is-paid">Paid Lead Magnet</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Toggle this if you want to charge for your lead magnet. Otherwise, it will be offered for free in
                      exchange for contact information.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch id="is-paid" checked={isPaid} onCheckedChange={setIsPaid} />
          </div>

          {isPaid && (
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="9.99"
                  className="pl-9"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save & Continue"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
