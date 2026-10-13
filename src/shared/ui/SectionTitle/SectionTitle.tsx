import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import './SectionTitle.scss'

export const SectionTitle = ({ id, children }: { id: string; children: ReactNode }) => {
	const reduce = useReducedMotion()

	return (
		<h2 id={id} className="section-title">
			<motion.span
				className="section-title__inner"
				initial={reduce ? false : { y: '105%' }}
				whileInView={{ y: '0%' }}
				viewport={{ once: true, margin: '0px 0px -15% 0px' }}
				transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
			>
				{children}
			</motion.span>
		</h2>
	)
}
