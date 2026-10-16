import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useT } from '@/shared/i18n/useT'
import { setScrollLocked } from '@/shared/lib/scroll'
import { useIntro } from '@/shared/store/intro'
import './Preloader.scss'

const DURATION = 1100

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

export const Preloader = () => {
	const done = useIntro((s) => s.done)
	const finish = useIntro((s) => s.finish)
	const hero = useT('hero')
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (done) return
		setScrollLocked(true)

		let frame = 0
		const start = performance.now()
		const tick = (now: number) => {
			const progress = Math.min(1, (now - start) / DURATION)
			setCount(Math.round(easeInOut(progress) * 100))
			if (progress < 1) frame = requestAnimationFrame(tick)
			else window.setTimeout(finish, 220)
		}
		frame = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(frame)
	}, [done, finish])

	return (
		<AnimatePresence onExitComplete={() => setScrollLocked(false)}>
			{!done && (
				<motion.div
					className="preloader"
					aria-hidden="true"
					exit={{ clipPath: 'inset(0 0 100% 0)' }}
					transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
				>
					<span className="preloader__name">
						{hero('first')} {hero('last')}
					</span>
					<span className="preloader__role">{hero('role')}</span>
					<span className="preloader__count">{String(count).padStart(3, '0')}</span>
					<span className="preloader__bar" style={{ transform: `scaleX(${count / 100})` }} />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
