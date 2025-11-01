'use client'

import { useEffect, useState } from 'react'
import { useAlertStore } from '@/store/useAlertStore'
import { AlertTriangle, X } from 'lucide-react'

export function ConfirmDialog() {
  const confirmDialog = useAlertStore((state) => state.confirmDialog)
  const hideConfirm = useAlertStore((state) => state.hideConfirm)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (confirmDialog) {
      // Trigger animation after mount
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [confirmDialog])

  if (!confirmDialog) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      confirmDialog.onCancel?.()
    }
  }

  const handleCancel = () => {
    setIsVisible(false)
    setTimeout(() => {
      confirmDialog.onCancel?.()
    }, 200)
  }

  const handleConfirm = () => {
    setIsVisible(false)
    setTimeout(() => {
      confirmDialog.onConfirm()
    }, 200)
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/50 backdrop-blur-sm
        transition-opacity duration-200
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleBackdropClick}
    >
      <div
        className={`
          relative w-full max-w-md
          bg-white dark:bg-gray-800
          rounded-xl shadow-2xl
          transition-all duration-200
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* Close button */}
        <button
          onClick={handleCancel}
          className="
            absolute top-4 right-4
            p-1 rounded-lg
            text-gray-400 hover:text-gray-600
            dark:text-gray-500 dark:hover:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-700
            transition-colors duration-200
          "
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-2">
            {confirmDialog.title}
          </h3>

          {/* Message */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
            {confirmDialog.message}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="
                flex-1 px-4 py-2.5 rounded-lg
                text-sm font-medium
                text-gray-700 dark:text-gray-300
                bg-gray-100 dark:bg-gray-700
                hover:bg-gray-200 dark:hover:bg-gray-600
                transition-colors duration-200
              "
            >
              {confirmDialog.cancelText || 'Cancel'}
            </button>

            <button
              onClick={handleConfirm}
              className="
                flex-1 px-4 py-2.5 rounded-lg
                text-sm font-medium
                text-white
                bg-red-600 hover:bg-red-700
                dark:bg-red-500 dark:hover:bg-red-600
                transition-colors duration-200
              "
            >
              {confirmDialog.confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
