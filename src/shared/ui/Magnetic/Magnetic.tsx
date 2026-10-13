import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { type ReactNode, useRef } from 'react'

type MagneticProps = {
	children: ReactNode
	strength?: number
	className?: string
}

export const Magnetic = ({ children, strength = 0.35, className }: MagneticProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const reduce = useReducedMotion()
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.6 })
	const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.6 })

	return (
		<motion.div
			ref={ref}
			className={className}
			style={{ x: springX, y: springY, display: 'inline-block' }}
			onPointerMove={(event) => {
				if (reduce || event.pointerType !== 'mouse' || !ref.current) return
				const rect = ref.current.getBoundingClientRect()
				x.set((event.clientX - rect.left - rect.width / 2) * strength)
				y.set((event.clientY - rect.top - rect.height / 2) * strength)
			}}
			onPointerLeave={() => {
				x.set(0)
				y.set(0)
			}}
		>
			{children}
		</motion.div>
	)
}
