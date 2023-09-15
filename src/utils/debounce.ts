export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout!)
      timeout = null
      func(...args)
    }

    clearTimeout(timeout!)
    timeout = setTimeout(later, wait)
  }
}
