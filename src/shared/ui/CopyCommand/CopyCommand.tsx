import { Check } from '@phosphor-icons/react/dist/csr/Check'
import { Copy } from '@phosphor-icons/react/dist/csr/Copy'
import { useEffect, useRef, useState } from 'react'
import { useT } from '@/shared/i18n/useT'
import './CopyCommand.scss'

export const CopyCommand = ({ command }: { command: string }) => {
	const t = useT('project')
	const [copied, setCopied] = useState(false)
	const timer = useRef<number>(0)

	useEffect(() => () => window.clearTimeout(timer.current), [])

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(command)
		} catch {
			return
		}
		setCopied(true)
		window.clearTimeout(timer.current)
		timer.current = window.setTimeout(() => setCopied(false), 1800)
	}

	return (
		<button type="button" className="copy-command" onClick={copy}>
			{copied ? <Check size={16} weight="bold" /> : <Copy size={16} />}
			<span aria-live="polite">{copied ? t('copied') : t('copy')}</span>
		</button>
	)
}
