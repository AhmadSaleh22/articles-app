'use client'

import { useEffect, useState } from 'react'
import { useAlertStore, Toast as ToastType } from '@/store/useAlertStore'
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  X
} from 'lucide-react'

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

const colorMap = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    text: 'text-green-900 dark:text-green-100'
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    text: 'text-red-900 dark:text-red-100'
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    text: 'text-yellow-900 dark:text-yellow-100'
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    text: 'text-blue-900 dark:text-blue-100'
  }
}

function ToastItem({ toast }: { toast: ToastType }) {
  const [isExiting, setIsExiting] = useState(false)
  const removeToast = useAlertStore((state) => state.removeToast)
  const Icon = iconMap[toast.type]
  const colors = colorMap[toast.type]

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      removeToast(toast.id)
    }, 300)
  }

  useEffect(() => {
    // Auto-close animation slightly before actual removal
    const duration = toast.duration || 5000
    const timer = setTimeout(() => {
      setIsExiting(true)
    }, duration - 300)

    return () => clearTimeout(timer)
  }, [toast.duration])

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-lg
        backdrop-blur-sm
        transition-all duration-300 ease-in-out
        ${colors.bg} ${colors.border}
        ${
          isExiting
            ? 'opacity-0 translate-x-full scale-95'
            : 'opacity-100 translate-x-0 scale-100'
        }
      `}
      style={{
        animation: isExiting ? undefined : 'slideIn 0.3s ease-out'
      }}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.icon}`} />

      <p className={`flex-1 text-sm font-medium ${colors.text}`}>
        {toast.message}
      </p>

      <button
        onClick={handleClose}
        className={`
          flex-shrink-0 p-0.5 rounded-md
          hover:bg-black/5 dark:hover:bg-white/10
          transition-colors duration-200
          ${colors.text}
        `}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export function ToastContainer() {
  const toasts = useAlertStore((state) => state.toasts)

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      <div className="flex flex-col gap-2 pointer-events-auto">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  )
}
