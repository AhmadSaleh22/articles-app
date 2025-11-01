import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

export interface ConfirmDialog {
  id: string
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel?: () => void
}

interface AlertStore {
  toasts: Toast[]
  confirmDialog: ConfirmDialog | null

  // Toast actions
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void

  // Confirm dialog actions
  showConfirm: (dialog: Omit<ConfirmDialog, 'id'>) => Promise<boolean>
  hideConfirm: () => void

  // Convenience methods
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  toasts: [],
  confirmDialog: null,

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7)
    const newToast = { ...toast, id }

    set((state) => ({
      toasts: [...state.toasts, newToast]
    }))

    // Auto-remove after duration
    const duration = toast.duration || 5000
    setTimeout(() => {
      get().removeToast(id)
    }, duration)
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
  },

  showConfirm: (dialog) => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(7)

      set({
        confirmDialog: {
          ...dialog,
          id,
          onConfirm: () => {
            dialog.onConfirm?.()
            get().hideConfirm()
            resolve(true)
          },
          onCancel: () => {
            dialog.onCancel?.()
            get().hideConfirm()
            resolve(false)
          }
        }
      })
    })
  },

  hideConfirm: () => {
    set({ confirmDialog: null })
  },

  // Convenience methods
  success: (message, duration) => {
    get().addToast({ type: 'success', message, duration })
  },

  error: (message, duration) => {
    get().addToast({ type: 'error', message, duration })
  },

  info: (message, duration) => {
    get().addToast({ type: 'info', message, duration })
  },

  warning: (message, duration) => {
    get().addToast({ type: 'warning', message, duration })
  }
}))
