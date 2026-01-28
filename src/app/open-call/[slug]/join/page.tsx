"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "../../../components/header"
import { Footer } from "../../../components/footer"
import formOptions from "../../../data/form-options.json"
import { Button, LinkButton, IconButton, Checkbox, FormField } from "../../../components/ui"
import { ArrowLeft, Mail, Phone, Upload, User, X } from "lucide-react"
import Link from "next/link"

interface OpenCallDetail {
  id: string
  title: string
  slug: string
  description: string
}

export default function JoinOpenCallPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [openCall, setOpenCall] = useState<OpenCallDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    expertise: "",
    bio: "",
    country: "",
    city: ""
  })

  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  useEffect(() => {
    const fetchOpenCall = async () => {
      try {
        const response = await fetch(`/api/open-calls/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setOpenCall(data)
        } else if (response.status === 404) {
          setError("Open call not found")
        } else {
          setError("Failed to load open call")
        }
      } catch (err) {
        console.error("Error fetching open call:", err)
        setError("An error occurred while loading the open call")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchOpenCall()
    }
  }, [slug])

  if (loading) {
    return (
      <main className="bg-black min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-40">
          <div className="w-12 h-12 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !openCall) {
    return (
      <main className="bg-black min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl text-white mb-4">{error || "Open Call Not Found"}</h1>
          <Link href="/open-call" className="text-[#C9A96E] hover:text-[#BD9352] focus:shadow-[0px_0px_0px_2px_rgba(201,169,110,0.32)] rounded transition-colors">
            Back to Open Calls
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push(`/open-call/${slug}`)
    }, 3000)
  }

  if (submitSuccess) {
    return (
      <main className="bg-black min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Thank You for Joining!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your contribution has been received and is being reviewed by our team.
              </p>
              <p className="text-gray-400">
                Redirecting you back to the open call...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-black">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <LinkButton href={`/open-call/${slug}`} variant="primary" className="mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {openCall.title}</span>
          </LinkButton>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join This Open Call
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Fill out the form below to participate and contribute to this archive.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
            <div className="space-y-6">
              {/* Personal Information Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="First Name"
                  required
                  inputProps={{
                    type: "text",
                    name: "firstName",
                    value: formData.firstName,
                    placeholder: "Enter your first name",
                    onChange: handleInputChange,
                    required: true,
                    leadingIcon: <User className="w-4 h-4" />
                  }}
                />
                <FormField
                  label="Last Name"
                  required
                  inputProps={{
                    type: "text",
                    name: "lastName",
                    placeholder: "Enter your last name",
                    value: formData.lastName,
                    onChange: handleInputChange,
                    required: true,
                    leadingIcon: <User className="w-4 h-4" />
                  }}
                />
                <FormField
                  label="Email Address"
                  required
                  inputProps={{
                    type: "email",
                    placeholder: "Enter your email address",
                    leadingIcon: <Mail className="w-4 h-4" />,
                    value: formData.email,
                    onChange: handleInputChange,
                    required: true,
                    name: "email"
                  }}
                />
                <FormField
                  label="Phone Number"
                  required
                  inputProps={{
                    type: "tel",
                    name: "phone",
                    value: formData.phone,
                    placeholder: "Enter your phone number",
                    leadingIcon: <Phone className="w-4 h-4" />,
                    onChange: handleInputChange,
                    required: true,
                  }}
                />
                <FormField
                  label="Experience Field"
                  required
                  selectProps={{
                    name: "expertise",
                    value: formData.expertise,
                    onChange: handleInputChange,
                    required: true,
                    options: [
                      { value: "", label: "Select your field" },
                      ...formOptions.expertise
                    ]
                  }}
                />
              </div>

              {/* Tell Us About Yourself */}
              <FormField
                label="Tell Us About Yourself"
                required
                textareaProps={{
                  name: "bio",
                  value: formData.bio,
                  onChange: handleInputChange,
                  required: true,
                  rows: 5,
                  placeholder: "Tell us about yourself and why you want to contribute..."
                }}
              />

              {/* Country and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Country"
                  required
                  selectProps={{
                    name: "country",
                    value: formData.country,
                    onChange: handleInputChange,
                    required: true,
                    options: [
                      { value: "", label: "Select your country" },
                      ...formOptions.countries
                    ]
                  }}
                />
                <FormField
                  label="City"
                  required
                  selectProps={{
                    name: "city",
                    value: formData.city,
                    onChange: handleInputChange,
                    required: true,
                    options: [
                      { value: "", label: "Select your city" },
                      ...formOptions.cities
                    ]
                  }}
                />
              </div>

              {/* File Upload */}
              <FormField
                label="Upload Files"
                required
              >
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-[#C9A961]/50 transition-colors">
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">
                    Drag and drop your files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Supported formats: JPG, PNG, PDF, MP3, DOC, DOCX
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.pdf,.mp3,.mp4,.doc,.docx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none px-6 py-3 text-base bg-[#C9A96E] text-[#332217] shadow-[inset_0px_1px_0px_rgba(255,255,255,0.40)] hover:shadow-[inset_0px_8px_16px_rgba(255,255,255,0.40)] active:shadow-[inset_0px_-8px_16px_rgba(255,255,255,0.40)] focus:shadow-[0px_0px_0px_2px_rgba(201,169,110,0.32)] cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>

                {/* Uploaded Files List */}
                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-black/50 border border-white/10 rounded-lg px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#C9A961]/20 rounded-lg flex items-center justify-center">
                            <Upload className="w-5 h-5 text-[#C9A961]" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{file.name}</p>
                            <p className="text-gray-500 text-xs">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <IconButton
                          type="button"
                          onClick={() => removeFile(index)}
                          variant="ghost"
                          size="compact"
                          aria-label="Remove file"
                          className="text-gray-500 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                )}
              </FormField>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 pt-4">
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                  label={
                    <span className="text-gray-300 text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#C9A96E] hover:text-[#BD9352] focus:shadow-[0px_0px_0px_2px_rgba(201,169,110,0.32)] rounded transition-colors">
                        Terms and Conditions
                      </Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-[#C9A96E] hover:text-[#BD9352] focus:shadow-[0px_0px_0px_2px_rgba(201,169,110,0.32)] rounded transition-colors">
                        Privacy Policy
                      </Link>
                      {" "}*
                    </span>
                  }
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  onClick={() => router.back()}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !agreeToTerms}
                  variant="primary"
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Contribution"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
