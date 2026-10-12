import { flushSync } from 'react-dom'

type TransitionOptions = {
	onCommitted?: () => void
}

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export const withViewTransition = (
	update: () => void,
	{ onCommitted }: TransitionOptions = {},
): ViewTransition | null => {
	const commit = () => {
		flushSync(update)
		onCommitted?.()
	}

	if (!document.startViewTransition || reducedMotion()) {
		commit()
		return null
	}

	return document.startViewTransition(commit)
}
