import type { ReactNode } from 'react'
import { useLocalized, useT } from '@/shared/i18n/useT'
import { MacWindow } from '@/shared/ui/MacWindow/MacWindow'
import type { Project } from '../model/projects'
import './ProjectMedia.scss'

type ProjectMediaProps = {
	project: Project
	shared?: boolean
	framed?: boolean
	children?: ReactNode
}

export const ProjectMedia = ({
	project,
	shared = false,
	framed = false,
	children,
}: ProjectMediaProps) => {
	const localized = useLocalized()
	const t = useT('work')
	const style = shared ? { viewTransitionName: 'project-media' } : undefined

	if (project.status === 'soon') {
		return (
			<div className="project-media project-media--soon" style={style}>
				<span className="project-media__soon-name">{project.name}</span>
				<span className="project-media__soon-tag">{t('soon')}</span>
			</div>
		)
	}

	if (project.commands) {
		const commands = (
			<div className="project-media__terminal">
				<code className="project-media__commands">
					{project.commands.map(({ run, note }) => (
						<span className="project-media__entry" key={run}>
							<span className="project-media__line">
								<span className="project-media__prompt" aria-hidden="true">
									${' '}
								</span>
								{run}
							</span>
							<span className="project-media__note"># {localized(note)}</span>
						</span>
					))}
				</code>
				{children}
			</div>
		)

		return framed ? (
			<MacWindow
				className="project-media"
				variant="terminal"
				label={`${project.slug} — zsh`}
				style={style}
			>
				{commands}
			</MacWindow>
		) : (
			<div className="project-media project-media--terminal" style={style}>
				{commands}
			</div>
		)
	}

	if (!project.image) return null

	const image = (
		<img
			src={project.image.src}
			alt={localized(project.image.alt)}
			width={1600}
			height={1000}
			decoding="async"
			style={project.image.position ? { objectPosition: project.image.position } : undefined}
		/>
	)

	return framed ? (
		<MacWindow className="project-media" label="localhost" style={style}>
			{image}
		</MacWindow>
	) : (
		<div className="project-media" style={style}>
			{image}
		</div>
	)
}
