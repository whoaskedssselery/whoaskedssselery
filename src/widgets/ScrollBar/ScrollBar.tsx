import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToY } from '@/shared/lib/scroll'
import './ScrollBar.scss'

const MIN_THUMB = 48
const IDLE_MS = 1100
const EDGE_PX = 18

export const ScrollBar = () => {
	const { scrollY } = useScroll()
	const [visible, setVisible] = useState(false)
	const [dragging, setDragging] = useState(false)
	const [metrics, setMetrics] = useState({ thumb: 0, track: 0, max: 0 })
	const top = useRef<HTMLDivElement>(null)
	const idle = useRef(0)

	const place = (y: number) => {
		if (!top.current || metrics.max <= 0) return
		const offset = (y / metrics.max) * (metrics.track - metrics.thumb)
		top.current.style.transform = `translateY(${offset}px)`
	}

	useEffect(() => {
		const measure = () => {
			const view = window.innerHeight
			const doc = document.documentElement.scrollHeight
			const track = view - 12
			setMetrics({
				track,
				thumb: doc > view ? Math.max(MIN_THUMB, (view / doc) * track) : 0,
				max: Math.max(0, doc - view),
			})
		}
		measure()
		const observer = new ResizeObserver(measure)
		observer.observe(document.body)
		window.addEventListener('resize', measure)
		return () => {
			observer.disconnect()
			window.removeEventListener('resize', measure)
		}
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: re-place the thumb when its size changes
	useEffect(() => place(window.scrollY), [metrics])

	const wake = useCallback(() => {
		setVisible(true)
		window.clearTimeout(idle.current)
		idle.current = window.setTimeout(() => setVisible(false), IDLE_MS)
	}, [])

	useEffect(() => () => window.clearTimeout(idle.current), [])

	useMotionValueEvent(scrollY, 'change', (y) => {
		place(y)
		wake()
	})

	useEffect(() => {
		const onMove = (event: PointerEvent) => {
			if (window.innerWidth - event.clientX < EDGE_PX) wake()
		}
		window.addEventListener('pointermove', onMove, { passive: true })
		return () => window.removeEventListener('pointermove', onMove)
	}, [wake])

	if (!metrics.thumb) return null

	return (
		<motion.div
			className="scrollbar"
			data-active={visible || dragging}
			aria-hidden="true"
			onPointerEnter={wake}
		>
			<div
				ref={top}
				className="scrollbar__thumb"
				style={{ height: metrics.thumb }}
				onPointerDown={(event) => {
					event.currentTarget.setPointerCapture(event.pointerId)
					setDragging(true)
					const startY = event.clientY
					const startScroll = window.scrollY
					const ratio = metrics.max / (metrics.track - metrics.thumb)
					const target = event.currentTarget
					const onMove = (move: PointerEvent) => {
						scrollToY(startScroll + (move.clientY - startY) * ratio)
					}
					const onUp = () => {
						setDragging(false)
						target.removeEventListener('pointermove', onMove)
						target.removeEventListener('pointerup', onUp)
						target.removeEventListener('pointercancel', onUp)
						wake()
					}
					target.addEventListener('pointermove', onMove)
					target.addEventListener('pointerup', onUp)
					target.addEventListener('pointercancel', onUp)
				}}
			/>
		</motion.div>
	)
}
