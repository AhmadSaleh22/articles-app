import { useAlertStore } from '@/store/useAlertStore'

export function useAlert() {
  const success = useAlertStore((state) => state.success)
  const error = useAlertStore((state) => state.error)
  const info = useAlertStore((state) => state.info)
  const warning = useAlertStore((state) => state.warning)
  const showConfirm = useAlertStore((state) => state.showConfirm)

  return {
    success,
    error,
    info,
    warning,
    confirm: showConfirm
  }
}
