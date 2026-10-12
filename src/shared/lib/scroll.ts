import Lenis from 'lenis'

let lenis: Lenis | null = null

const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export const startSmoothScroll = () => {
	if (prefersReducedMotion()) return () => {}

	lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, autoRaf: true })
	return () => {
		lenis?.destroy()
		lenis = null
	}
}

export const setScrollLocked = (locked: boolean) => {
	if (lenis) {
		if (locked) lenis.stop()
		else lenis.start()
	}
	document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export const scrollToTop = (y = 0) => {
	if (lenis) lenis.scrollTo(y, { immediate: true, force: true })
	else window.scrollTo(0, y)
}

export const scrollToY = (y: number) => {
	if (lenis) lenis.scrollTo(y, { immediate: true })
	else window.scrollTo(0, y)
}

export const jumpToId = (id: string) => {
	const target = id === 'top' ? 0 : document.getElementById(id)
	if (target === null) return
	if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
	else if (target === 0) window.scrollTo(0, 0)
	else target.scrollIntoView({ block: 'start' })
}

export const scrollToId = (id: string) => {
	const target = id === 'top' ? 0 : document.getElementById(id)
	if (target === null) return
	if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 })
	else if (target === 0) window.scrollTo(0, 0)
	else target.scrollIntoView({ block: 'start' })
}
