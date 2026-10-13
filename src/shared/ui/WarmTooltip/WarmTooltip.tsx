import {
	Children,
	type CSSProperties,
	cloneElement,
	createContext,
	type ReactElement,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'
import './WarmTooltip.scss'

type Side = 'top' | 'bottom'

type Target = { el: HTMLElement; content: ReactNode; side: Side; id: string }
type Place = { x: number; y: number; arrow: number; side: Side }

type Api = {
	open: (target: Target, instant: boolean) => void
	close: (id: string) => void
}

const DELAY = 400
const WARM = 300
const GAP = 8
const EDGE = 8

const Context = createContext<Api | null>(null)

const place = (target: Target, label: HTMLElement): Place => {
	const rect = target.el.getBoundingClientRect()
	const { offsetWidth: w, offsetHeight: h } = label
	const center = rect.left + rect.width / 2
	const x = Math.min(Math.max(center - w / 2, EDGE), innerWidth - w - EDGE)
	const side: Side =
		target.side === 'top' && rect.top - h - GAP < EDGE
			? 'bottom'
			: target.side === 'bottom' && rect.bottom + h + GAP > innerHeight - EDGE
				? 'top'
				: target.side
	const y = side === 'top' ? rect.top - h - GAP : rect.bottom + GAP
	return { x, y, arrow: Math.min(Math.max(center - x, 12), w - 12), side }
}

export const WarmTooltipProvider = ({ children }: { children: ReactNode }) => {
	const [target, setTarget] = useState<Target | null>(null)
	const [shown, setShown] = useState(false)
	const [glide, setGlide] = useState(false)
	const [spot, setSpot] = useState<Place | null>(null)
	const label = useRef<HTMLDivElement>(null)
	const delay = useRef<number>(0)
	const warmUntil = useRef(0)
	const current = useRef<string | null>(null)
	const live = useRef(false)
	const pending = useRef<string | null>(null)

	const hide = useCallback(() => {
		window.clearTimeout(delay.current)
		pending.current = null
		if (live.current) warmUntil.current = performance.now() + WARM
		live.current = false
		current.current = null
		setShown(false)
	}, [])

	const api = useMemo<Api>(
		() => ({
			open: (next, instant) => {
				window.clearTimeout(delay.current)
				const warm = performance.now() < warmUntil.current
				const reveal = () => {
					pending.current = null
					setGlide(live.current || warm)
					current.current = next.id
					live.current = true
					setTarget(next)
					setShown(true)
				}
				if (instant || live.current || warm) reveal()
				else {
					pending.current = next.id
					delay.current = window.setTimeout(reveal, DELAY)
				}
			},
			close: (id) => {
				if (current.current === id || pending.current === id) hide()
			},
		}),
		[hide],
	)

	useLayoutEffect(() => {
		if (target && label.current) setSpot(place(target, label.current))
	}, [target])

	useEffect(() => {
		if (!shown) return
		const stop = () => hide()
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') hide()
		}
		window.addEventListener('scroll', stop, { passive: true })
		window.addEventListener('resize', stop)
		window.addEventListener('keydown', onKey)
		return () => {
			window.removeEventListener('scroll', stop)
			window.removeEventListener('resize', stop)
			window.removeEventListener('keydown', onKey)
		}
	}, [shown, hide])

	useEffect(() => () => window.clearTimeout(delay.current), [])

	return (
		<Context.Provider value={api}>
			{children}
			{createPortal(
				<div
					ref={label}
					className="warm-tip"
					role="tooltip"
					aria-hidden={!shown}
					id={target?.id}
					data-show={shown}
					data-glide={glide}
					data-side={spot?.side ?? 'top'}
					style={
						spot
							? ({
									transform: `translate(${spot.x}px, ${spot.y}px)`,
									'--arrow': `${spot.arrow}px`,
								} as CSSProperties)
							: undefined
					}
				>
					<span className="warm-tip__label">{target?.content}</span>
				</div>,
				document.body,
			)}
		</Context.Provider>
	)
}

type WarmTooltipProps = {
	content: ReactNode
	side?: Side
	children: ReactElement<Record<string, unknown>>
}

export const WarmTooltip = ({ content, side = 'top', children }: WarmTooltipProps) => {
	const api = useContext(Context)
	const id = useId()
	const [active, setActive] = useState(false)
	const child = Children.only(children)

	useEffect(() => () => api?.close(id), [api, id])

	if (!api) return child

	const props = child.props as Record<string, (event: never) => void>
	const call = (name: string, event: unknown) => props[name]?.(event as never)

	const start = (el: HTMLElement, instant: boolean) => {
		setActive(true)
		api.open({ el, content, side, id }, instant)
	}
	const stop = () => {
		setActive(false)
		api.close(id)
	}

	return cloneElement(child, {
		'aria-describedby': active ? id : undefined,
		onPointerEnter: (event: React.PointerEvent<HTMLElement>) => {
			call('onPointerEnter', event)
			if (event.pointerType === 'mouse') start(event.currentTarget, false)
		},
		onPointerLeave: (event: React.PointerEvent<HTMLElement>) => {
			call('onPointerLeave', event)
			stop()
		},
		onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
			call('onPointerDown', event)
			stop()
		},
		onFocus: (event: React.FocusEvent<HTMLElement>) => {
			call('onFocus', event)
			if (event.currentTarget.matches(':focus-visible')) start(event.currentTarget, true)
		},
		onBlur: (event: React.FocusEvent<HTMLElement>) => {
			call('onBlur', event)
			stop()
		},
	})
}
