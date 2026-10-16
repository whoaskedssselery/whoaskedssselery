import { AnimatePresence, motion } from 'motion/react'
import { useCurtain } from '@/shared/store/curtain'
import './Curtain.scss'

const ease = [0.76, 0, 0.24, 1] as const

export const Curtain = () => {
	const label = useCurtain((s) => s.label)

	return (
		<AnimatePresence>
			{label && (
				<motion.div
					key={label}
					className="curtain"
					aria-hidden="true"
					initial={{ clipPath: 'inset(100% 0 0 0)' }}
					animate={{ clipPath: 'inset(0% 0 0 0)' }}
					exit={{ clipPath: 'inset(0 0 100% 0)' }}
					transition={{ duration: 0.6, ease }}
					onAnimationComplete={(definition) => {
						if (
							typeof definition === 'object' &&
							'clipPath' in definition &&
							definition.clipPath === 'inset(0% 0 0 0)'
						) {
							const { onCovered, hide } = useCurtain.getState()
							onCovered?.()
							window.setTimeout(hide, 180)
						}
					}}
				>
					<motion.span
						className="curtain__label"
						initial={{ y: '110%' }}
						animate={{ y: '0%' }}
						exit={{ y: '-110%' }}
						transition={{ duration: 0.6, ease }}
					>
						{label}
					</motion.span>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
