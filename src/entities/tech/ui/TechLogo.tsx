import type { Tech } from '../model/tech'

type TechLogoProps = Tech & { className?: string; size?: number }

export const TechLogo = ({ icon, className = '', size = 56 }: TechLogoProps) =>
	icon.kind === 'file' ? (
		<img
			className={icon.mono ? `${className} tech-logo--mono` : className}
			src={icon.src}
			alt=""
			width={size}
			height={size}
			loading="lazy"
			draggable={false}
		/>
	) : (
		<svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill={icon.hex}>
			<path d={icon.path} />
		</svg>
	)
