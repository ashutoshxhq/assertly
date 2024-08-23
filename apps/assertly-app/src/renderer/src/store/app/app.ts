import { atomWithStorage } from 'jotai/utils'

export const isDarkMode = atomWithStorage<boolean>('darkMode', false)
