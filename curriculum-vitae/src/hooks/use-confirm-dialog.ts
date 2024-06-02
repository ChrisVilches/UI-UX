import { useCallback, useState } from 'react'

interface UseConfirmDialogReturn<T> {
  hideConfirm: () => void
  setConfirmItem: (o: T) => void
  showConfirm: boolean
  confirmItem: T | null
}

/**
 * Manages a confirm dialog where a single item (any object) is being passed to the dialog,
 * used in order to confirm an operation against that item (e.g. delete).
 */
export function useConfirmDialog<T> (): UseConfirmDialogReturn<T> {
  const [item, setItem] = useState<T | null>(null)
  const [show, setShow] = useState(false)

  const setConfirmItem = useCallback((o: T) => {
    setItem(o)
    setShow(true)
  }, [])

  const hideConfirm = useCallback(() => {
    setShow(false)
  }, [])

  return {
    hideConfirm,
    setConfirmItem,
    confirmItem: item,
    showConfirm: show
  }
}
