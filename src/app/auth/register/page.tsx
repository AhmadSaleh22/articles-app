'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Briefcase, MessageSquare, Facebook as FacebookIcon, Twitter, Instagram, Linkedin, Link2, Plus, X, Calendar, Clock } from 'lucide-react'
import { useAlert } from '@/hooks/useAlert'

interface ProjectType {
  id: string
  name: string
  description?: string
}

interface AvailabilitySlot {
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  dayOfWeek?: string
  notes?: string
}

export default function RegisterPage() {
  const router = useRouter()
  const alert = useAlert()
  const [loading, setLoading] = useState(false)
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([])
  const [otherLinksInput, setOtherLinksInput] = useState('')
  const [otherLinksList, setOtherLinksList] = useState<string[]>([])
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])

  // Form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    experienceField: '',
    aboutYourself: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    projectTypeIds: [] as string[],
  })

  useEffect(() => {
    fetchProjectTypes()
  }, [])

  const fetchProjectTypes = async () => {
    try {
      const response = await fetch('/api/project-types')
      if (response.ok) {
        const data = await response.json()
        setProjectTypes(data)
      }
    } catch (error) {
      console.error('Error fetching project types:', error)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleProjectTypeToggle = (projectTypeId: string) => {
    if (formData.projectTypeIds.includes(projectTypeId)) {
      setFormData({
        ...formData,
        projectTypeIds: formData.projectTypeIds.filter((id) => id !== projectTypeId),
      })
    } else {
      setFormData({
        ...formData,
        projectTypeIds: [...formData.projectTypeIds, projectTypeId],
      })
    }
  }

  const handleAddOtherLink = () => {
    if (otherLinksInput.trim()) {
      setOtherLinksList([...otherLinksList, otherLinksInput.trim()])
      setOtherLinksInput('')
    }
  }

  const handleRemoveOtherLink = (index: number) => {
    setOtherLinksList(otherLinksList.filter((_, i) => i !== index))
  }

  const handleAddAvailability = () => {
    setAvailabilitySlots([
      ...availabilitySlots,
      {
        startDate: '',
        endDate: '',
        startTime: '09:00',
        endTime: '17:00',
        notes: '',
      },
    ])
  }

  const handleRemoveAvailability = (index: number) => {
    setAvailabilitySlots(availabilitySlots.filter((_, i) => i !== index))
  }

  const handleAvailabilityChange = (
    index: number,
    field: keyof AvailabilitySlot,
    value: string
  ) => {
    const updated = [...availabilitySlots]
    updated[index] = { ...updated[index], [field]: value }
    setAvailabilitySlots(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          otherLinks: otherLinksList,
          availability: availabilitySlots,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert.success(
          'Registration successful! Please check your email to complete your setup.'
        )
        router.push('/auth/registration-success')
      } else {
        alert.error(data.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      alert.error('An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Fill in your details to join our platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="text-blue-600" size={24} />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="text-blue-600" size={24} />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Professional Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="text-blue-600" size={24} />
              Professional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Field *
                </label>
                <input
                  type="text"
                  name="experienceField"
                  value={formData.experienceField}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Software Development, Marketing, Design"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell Us About Yourself
                </label>
                <textarea
                  name="aboutYourself"
                  value={formData.aboutYourself}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Share your background, experience, and what makes you unique..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Project Types */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Type of Projects You Want to Join
            </h2>
            {projectTypes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <label
                    key={type.id}
                    className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.projectTypeIds.includes(type.id)}
                      onChange={() => handleProjectTypeToggle(type.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{type.name}</div>
                      {type.description && (
                        <div className="text-sm text-gray-600">{type.description}</div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">
                No project types available yet
              </p>
            )}
          </section>

          {/* Social Media */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Social Media Accounts
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FacebookIcon className="text-blue-600" size={20} />
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="Facebook profile URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <Twitter className="text-sky-500" size={20} />
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="Twitter/X profile URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="text-pink-600" size={20} />
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="Instagram profile URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="text-blue-700" size={20} />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn profile URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Other Links */}
              <div className="border-t pt-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Link2 size={18} />
                  Other Links
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    value={otherLinksInput}
                    onChange={(e) => setOtherLinksInput(e.target.value)}
                    placeholder="Add other website or portfolio link"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddOtherLink}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>
                {otherLinksList.length > 0 && (
                  <div className="space-y-2">
                    {otherLinksList.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700 truncate">{link}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveOtherLink(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Availability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" size={24} />
              Your Availability
            </h2>
            <button
              type="button"
              onClick={handleAddAvailability}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Add Availability Slot
            </button>

            {availabilitySlots.length > 0 && (
              <div className="space-y-4">
                {availabilitySlots.map((slot, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-300 rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-900">
                        Slot {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveAvailability(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={slot.startDate}
                          onChange={(e) =>
                            handleAvailabilityChange(index, 'startDate', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={slot.endDate}
                          onChange={(e) =>
                            handleAvailabilityChange(index, 'endDate', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) =>
                            handleAvailabilityChange(index, 'startTime', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) =>
                            handleAvailabilityChange(index, 'endTime', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes (Optional)
                        </label>
                        <input
                          type="text"
                          value={slot.notes || ''}
                          onChange={(e) =>
                            handleAvailabilityChange(index, 'notes', e.target.value)
                          }
                          placeholder="Add any notes about this availability"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
            >
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
            <p className="text-sm text-gray-600 text-center mt-4">
              After registration, you'll receive an email to set your password.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
