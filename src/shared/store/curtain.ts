import { create } from 'zustand'

type CurtainState = {
	label: string | null
	onCovered: (() => void) | null
	show: (label: string, onCovered: () => void) => void
	hide: () => void
}

export const useCurtain = create<CurtainState>((set) => ({
	label: null,
	onCovered: null,
	show: (label, onCovered) => set({ label, onCovered }),
	hide: () => set({ label: null, onCovered: null }),
}))
