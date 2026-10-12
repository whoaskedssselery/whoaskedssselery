import { flushSync } from 'react-dom'
import { create } from 'zustand'
import { scrollToTop } from './scroll'
import { withViewTransition } from './viewTransition'

export type Route = { name: 'home' } | { name: 'project'; slug: string }

const PROJECT_PREFIX = '#/projects/'

export const parseRoute = (hash: string): Route => {
	if (hash.startsWith(PROJECT_PREFIX)) {
		const slug = decodeURIComponent(hash.slice(PROJECT_PREFIX.length)).split(/[/?]/)[0]
		if (slug) return { name: 'project', slug }
	}
	return { name: 'home' }
}

export const routeHref = (route: Route) =>
	route.name === 'project' ? `${PROJECT_PREFIX}${route.slug}` : '#/'

const routeKey = (route: Route) => routeHref(route)
const slugOf = (route: Route) => (route.name === 'project' ? route.slug : null)

type RouterState = {
	route: Route
	transitionSlug: string | null
}

export const useRouter = create<RouterState>(() => ({
	route: parseRoute(location.hash),
	transitionSlug: null,
}))

const savedScroll = new Map<string, number>()

export type SlideDirection = 'next' | 'prev'

const run = (next: Route, scrollY: number, shared: string | null, slide?: SlideDirection) => {
	const root = document.documentElement
	if (slide) root.dataset.slide = slide

	if (shared && !slide) flushSync(() => useRouter.setState({ transitionSlug: shared }))

	const transition = withViewTransition(
		() => useRouter.setState({ route: next, transitionSlug: slide ? null : shared }),
		{ onCommitted: () => scrollToTop(scrollY) },
	)

	const done = () => {
		useRouter.setState({ transitionSlug: null })
		delete root.dataset.slide
	}
	if (transition) transition.finished.finally(done)
	else done()
}

export const navigate = (next: Route, slide?: SlideDirection) => {
	const current = useRouter.getState().route
	if (routeKey(current) === routeKey(next)) return

	savedScroll.set(routeKey(current), window.scrollY)
	history.pushState(null, '', routeHref(next))
	run(next, 0, slugOf(next) ?? slugOf(current), slide)
}

window.addEventListener('popstate', () => {
	const next = parseRoute(location.hash)
	const current = useRouter.getState().route
	if (routeKey(current) === routeKey(next)) return

	savedScroll.set(routeKey(current), window.scrollY)
	const bothProjects = next.name === 'project' && current.name === 'project'
	run(
		next,
		savedScroll.get(routeKey(next)) ?? 0,
		slugOf(next) ?? slugOf(current),
		bothProjects ? 'prev' : undefined,
	)
})
