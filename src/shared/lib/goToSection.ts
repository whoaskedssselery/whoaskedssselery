import { useCurtain } from '@/shared/store/curtain'
import { navigate, routeHref, useRouter } from './router'
import { jumpToId } from './scroll'

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export const goToSection = (id: string, label: string) => {
	const onHome = useRouter.getState().route.name === 'home'

	if (reducedMotion()) {
		if (!onHome) navigate({ name: 'home' })
		window.setTimeout(() => jumpToId(id), onHome ? 0 : 50)
		return
	}

	useCurtain.getState().show(label, () => {
		if (!onHome) {
			history.pushState(null, '', routeHref({ name: 'home' }))
			useRouter.setState({ route: { name: 'home' } })
		}
		requestAnimationFrame(() => jumpToId(id))
	})
}
