import { create } from 'zustand'

const KEY = 'portfolio:intro-seen'

const seen = () => {
	try {
		return sessionStorage.getItem(KEY) === '1'
	} catch {
		return false
	}
}

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

type IntroState = {
	done: boolean
	finish: () => void
}

export const useIntro = create<IntroState>((set) => ({
	done: seen() || reduced(),
	finish: () => {
		try {
			sessionStorage.setItem(KEY, '1')
		} catch {}
		set({ done: true })
	},
}))
