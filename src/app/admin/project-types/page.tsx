'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, Briefcase } from 'lucide-react'
import { useAlert } from '@/hooks/useAlert'

interface ProjectType {
  id: string
  name: string
  description?: string
  isActive: boolean
  order: number
}

export default function AdminProjectTypesPage() {
  const alert = useAlert()
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingType, setEditingType] = useState<ProjectType | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
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
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (type?: ProjectType) => {
    if (type) {
      setEditingType(type)
      setFormData({
        name: type.name,
        description: type.description || '',
      })
    } else {
      setEditingType(null)
      setFormData({ name: '', description: '' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingType(null)
    setFormData({ name: '', description: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/project-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchProjectTypes()
        handleCloseModal()
        alert.success('Project type created successfully!')
      } else {
        const data = await response.json()
        alert.error(data.error || 'Failed to create project type')
      }
    } catch (error) {
      console.error('Error creating project type:', error)
      alert.error('An error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = await alert.confirm({
      title: 'Delete Project Type?',
      message: 'Are you sure you want to delete this project type? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {},
      onCancel: () => {}
    })

    if (!confirmed) return

    try {
      const response = await fetch(`/api/project-types/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchProjectTypes()
        alert.success('Project type deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting project type:', error)
      alert.error('Failed to delete project type')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Briefcase className="text-blue-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Project Types Management
                </h1>
                <p className="text-gray-600">
                  Manage the types of projects users can join
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add Project Type
            </button>
          </div>

          {projectTypes.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="text-gray-300 mx-auto mb-4" size={64} />
              <p className="text-gray-600 text-lg">No project types yet</p>
              <p className="text-gray-500 text-sm">
                Create your first project type to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectTypes.map((type) => (
                <div
                  key={type.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {type.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        type.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {type.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {type.description && (
                    <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(type.id)}
                      className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded transition-all flex items-center justify-center gap-2"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingType ? 'Edit Project Type' : 'Create New Project Type'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Web Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this project type"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {editingType ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
