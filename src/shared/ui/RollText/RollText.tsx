import type { ReactNode } from 'react'
import './RollText.scss'

export const RollText = ({ children }: { children: ReactNode }) => (
	<span className="roll">
		<span className="roll__inner">
			<span className="roll__line">{children}</span>
			<span className="roll__line" aria-hidden="true">
				{children}
			</span>
		</span>
	</span>
)
