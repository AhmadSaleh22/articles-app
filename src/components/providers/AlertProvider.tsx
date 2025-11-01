'use client'

import { ToastContainer } from '@/components/ui/Toast'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export function AlertProvider() {
  return (
    <>
      <ToastContainer />
      <ConfirmDialog />
    </>
  )
}
