import audioPlayerImage from '@/assets/projects/audio-player.webp'
import claudeWorkspaceCover from '@/assets/projects/claude-workspace.webp'
import s3UiKitCover from '@/assets/projects/s3-ui-kit.webp'
import typistImage from '@/assets/projects/typist.webp'
import wavelyImage from '@/assets/projects/wavely.webp'
import type { Localized } from '@/shared/i18n/dictionary'

export type ProjectCategory = 'app' | 'tool' | 'library'

export type Project = {
	slug: string
	name: string
	status: 'released' | 'soon'
	category: ProjectCategory
	date: string
	kind: Localized<string>
	tagline: Localized<string>
	summary: Localized<string>
	highlights: Localized<string[]>
	stack: string[]
	repo?: string
	npm?: string
	commands?: { run: string; note: Localized<string> }[]
	cover?: string
	image?: {
		src: string
		alt: Localized<string>
		position?: string
	}
}

const gh = (name: string) => `https://github.com/whoaskedssselery/${name}`

const catalog: Project[] = [
	{
		slug: 'wavely',
		name: 'Wavely',
		status: 'released',
		category: 'app',
		date: '2026-06',
		kind: { en: 'Web app', ru: 'Веб-приложение' },
		tagline: {
			en: 'A personal music player with its own library, playlists and accounts.',
			ru: 'Личный музыкальный плеер: своя коллекция, плейлисты и аккаунты.',
		},
		summary: {
			en: 'Upload your own tracks, build playlists and shuffle through them. Sign in with an email code, GitHub or Google. The backend is a self-hosted Supabase in Docker, with the schema, access policies and SQL functions kept in the repository.',
			ru: 'Загружаешь свои треки, собираешь плейлисты и слушаешь вперемешку. Вход по коду из письма, через GitHub или Google. Бэкенд — собственный Supabase в Docker, схема базы, политики доступа и SQL-функции лежат в репозитории.',
		},
		highlights: {
			en: [
				'Covers are compressed and converted to WebP in the browser before upload.',
				'Queue with shuffle and repeat (off, all, one); playlists sort by drag and drop, with mouse or keyboard.',
				'Email one-time-code sign-in with resend, plus GitHub and Google OAuth.',
				'Profile with listening stats, inline editing and account deletion.',
				'Feature-Sliced Design, TanStack Query for server state, Zustand for client state.',
			],
			ru: [
				'Обложки сжимаются и переводятся в WebP прямо в браузере перед загрузкой.',
				'Очередь с shuffle и repeat (выкл, все, один); треки в плейлисте сортируются перетаскиванием, мышью или с клавиатуры.',
				'Вход по одноразовому коду из письма с повторной отправкой, плюс OAuth через GitHub и Google.',
				'Профиль со статистикой прослушиваний, инлайн-редактированием и удалением аккаунта.',
				'Feature-Sliced Design, TanStack Query для серверного состояния, Zustand для клиентского.',
			],
		},
		stack: [
			'React 19',
			'TypeScript',
			'Vite',
			'Zustand',
			'TanStack Query',
			'React Hook Form',
			'Zod',
			'dnd-kit',
			'SCSS',
			'Supabase',
		],
		repo: gh('wavely'),
		image: {
			src: wavelyImage,
			alt: {
				en: 'Wavely sign-in screen with Google and GitHub buttons and an email form.',
				ru: 'Экран входа в Wavely: кнопки Google и GitHub и форма с почтой.',
			},
		},
	},
	{
		slug: 'typist',
		name: 'Typist',
		status: 'released',
		category: 'app',
		date: '2026-06',
		kind: { en: 'Web app', ru: 'Веб-приложение' },
		tagline: {
			en: 'A keyboard trainer that unlocks letters as your accuracy grows.',
			ru: 'Клавиатурный тренажёр: новые буквы открываются по мере роста точности.',
		},
		summary: {
			en: 'Inspired by keybr. Practice starts with a few letters and adds more once you type them accurately. It works in Russian and English, tracks speed and sessions, and shows the next key on an on-screen keyboard.',
			ru: 'Вдохновлён keybr. Тренировка начинается с нескольких букв, новые добавляются, когда набираешь их точно. Работает на русском и английском, считает скорость и сессии, подсвечивает следующую клавишу на экранной клавиатуре.',
		},
		highlights: {
			en: [
				'Progressive letter unlocking driven by typing accuracy.',
				'Live WPM, session statistics and a daily goal.',
				'On-screen keyboard highlights the key to press next.',
				'Russian and English, light and dark themes, adjustable font and size, draggable interface elements.',
			],
			ru: [
				'Постепенное открытие букв на основе точности набора.',
				'WPM в реальном времени, статистика сессий и дневная цель.',
				'Экранная клавиатура подсвечивает следующую клавишу.',
				'Русский и английский, светлая и тёмная темы, настройка шрифта и размера, перетаскиваемые элементы интерфейса.',
			],
		},
		stack: ['React 19', 'TypeScript', 'Vite', 'Zustand', 'SCSS', 'Recharts'],
		repo: gh('typist'),
		image: {
			src: typistImage,
			alt: {
				en: 'Typist training screen: unlocked letters, a line of words to type and an on-screen keyboard.',
				ru: 'Экран тренировки Typist: открытые буквы, строка слов для набора и экранная клавиатура.',
			},
		},
	},
	{
		slug: 'audio-player',
		name: 'Audio Player',
		status: 'released',
		category: 'app',
		date: '2026-01',
		kind: { en: 'Vanilla JS app', ru: 'Приложение на чистом JS' },
		tagline: {
			en: 'A local web player in plain JavaScript, no frameworks.',
			ru: 'Локальный веб-плеер на чистом JavaScript, без фреймворков.',
		},
		summary: {
			en: 'Your music stays in the browser: tracks, covers and metadata live in IndexedDB, player state in localStorage. Metadata is read from MP3 files automatically.',
			ru: 'Музыка остаётся в браузере: треки, обложки и метаданные лежат в IndexedDB, состояние плеера в localStorage. Метаданные читаются из MP3 автоматически.',
		},
		highlights: {
			en: [
				'Class-based vanilla JavaScript (ES6+) with SCSS.',
				'IndexedDB holds audio files, covers, tracks and playlists; localStorage keeps the current track, position and settings.',
				'ID3 metadata extracted from MP3 files with jsmediatags.',
				'Playlists, Favorites, shuffle, repeat, search, a context menu and light and dark themes.',
			],
			ru: [
				'Классовый vanilla JavaScript (ES6+) и SCSS.',
				'IndexedDB хранит аудиофайлы, обложки, треки и плейлисты; localStorage — текущий трек, позицию и настройки.',
				'ID3-метаданные из MP3 достаются через jsmediatags.',
				'Плейлисты, «Избранное», shuffle, repeat, поиск, контекстное меню, светлая и тёмная темы.',
			],
		},
		stack: ['JavaScript', 'IndexedDB', 'SCSS', 'jsmediatags'],
		repo: gh('audio-player'),
		image: {
			src: audioPlayerImage,
			position: '0 0',
			alt: {
				en: 'Audio Player: a track collection, playlists and the playback bar.',
				ru: 'Audio Player: коллекция треков, плейлисты и панель воспроизведения.',
			},
		},
	},
	{
		slug: 'claude-workspace',
		name: 'Claude Workspace',
		status: 'released',
		category: 'tool',
		date: '2026-08',
		kind: { en: 'CLI tool', ru: 'CLI-утилита' },
		tagline: {
			en: 'A CLI that sets up Claude Code skills and project instructions in one command.',
			ru: 'CLI, который одной командой настраивает скиллы и инструкции Claude Code в проекте.',
		},
		summary: {
			en: 'It installs a curated preset of skills, a workspace manifest and a CLAUDE.md into any project, and keeps them reproducible across a team the way package.json pins dependencies. Published on npm.',
			ru: 'Ставит в любой проект подобранный набор скиллов, манифест и CLAUDE.md и держит их воспроизводимыми для команды, как package.json фиксирует зависимости. Опубликован в npm.',
		},
		highlights: {
			en: [
				'Interactive wizard, or one command with a preset name for CI and repeat setups.',
				'Add, remove and sync skills from a manifest.',
				'Install a skill from any repository, hide or restore a workspace.',
				'CI on GitHub Actions, MIT licensed, documented in English and Russian.',
			],
			ru: [
				'Интерактивный мастер или одна команда с названием пресета для CI и повторных настроек.',
				'Добавление, удаление и синхронизация скиллов по манифесту.',
				'Установка скилла из любого репозитория, временное скрытие и возврат воркспейса.',
				'CI на GitHub Actions, лицензия MIT, документация на английском и русском.',
			],
		},
		stack: ['Node.js', 'JavaScript', 'npm', 'GitHub Actions'],
		repo: gh('claude-workspace'),
		npm: 'https://www.npmjs.com/package/claude-workspace',
		cover: claudeWorkspaceCover,
		commands: [
			{
				run: 'npx claude-workspace init',
				note: {
					en: 'adds .claude/skills, workspace.yaml and CLAUDE.md',
					ru: 'добавляет .claude/skills, workspace.yaml и CLAUDE.md',
				},
			},
			{
				run: 'npx claude-workspace sync',
				note: {
					en: 'keeps skills up to date after pulling changes',
					ru: 'обновляет скиллы после подтягивания изменений',
				},
			},
		],
	},
	{
		slug: 's3-ui-kit',
		name: 's3-ui-kit',
		status: 'soon',
		category: 'library',
		date: '2026-09',
		kind: { en: 'UI library', ru: 'UI-библиотека' },
		tagline: {
			en: 'A headless React component library.',
			ru: 'Headless-библиотека React-компонентов.',
		},
		summary: {
			en: 'Components that own interaction, keyboard behavior and accessibility, and leave data and styling to your app. Typed, generic APIs and WAI-ARIA patterns throughout.',
			ru: 'Компоненты берут на себя взаимодействие, работу с клавиатурой и доступность, а данные и стили оставляют приложению. Типизированные обобщённые API и паттерны WAI-ARIA.',
		},
		highlights: { en: [], ru: [] },
		stack: ['React', 'TypeScript', 'Sass'],
		cover: s3UiKitCover,
	},
]

const homeOrder = ['wavely', 'typist', 'claude-workspace', 'audio-player', 's3-ui-kit']

export const projects: Project[] = homeOrder.map((slug) => {
	const project = catalog.find((item) => item.slug === slug)
	if (!project) throw new Error(`Unknown project: ${slug}`)
	return project
})

export const findProject = (slug: string) => projects.find((project) => project.slug === slug)

export const nextProject = (slug: string) => {
	const pages = projects.filter((project) => project.status === 'released')
	const index = pages.findIndex((project) => project.slug === slug)
	return pages[(index + 1) % pages.length]
}

export const showcase = projects.filter((project) => project.image)

export const released = projects.filter((project) => project.status === 'released')

export const previousProject = (slug: string) => {
	const index = released.findIndex((project) => project.slug === slug)
	return released[(index - 1 + released.length) % released.length]
}
