import { LockSimple } from '@phosphor-icons/react/dist/csr/LockSimple'
import type { CSSProperties, ReactNode } from 'react'
import './MacWindow.scss'

type MacWindowProps = {
	children: ReactNode
	label: string
	variant?: 'browser' | 'terminal'
	style?: CSSProperties
	className?: string
}

export const MacWindow = ({
	children,
	label,
	variant = 'browser',
	style,
	className,
}: MacWindowProps) => (
	<div className={`mac mac--${variant}${className ? ` ${className}` : ''}`} style={style}>
		<div className="mac__bar" aria-hidden="true">
			<span className="mac__lights">
				<span className="mac__light mac__light--close" />
				<span className="mac__light mac__light--min" />
				<span className="mac__light mac__light--max" />
			</span>
			{variant === 'browser' ? (
				<span className="mac__address">
					<LockSimple size={12} weight="fill" />
					{label}
				</span>
			) : (
				<span className="mac__title">{label}</span>
			)}
		</div>
		<div className="mac__body">{children}</div>
	</div>
)
