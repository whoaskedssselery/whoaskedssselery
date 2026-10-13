import type { Lang } from '@/shared/store/settings'

export type Localized<T> = Record<Lang, T>

export const dictionary = {
	nav: {
		skip: { en: 'Skip to content', ru: 'Перейти к содержимому' },
		label: { en: 'Sections', ru: 'Разделы' },
		work: { en: 'Work', ru: 'Работы' },
		stack: { en: 'Stack', ru: 'Стек' },
		about: { en: 'About', ru: 'Обо мне' },
		contact: { en: 'Contact', ru: 'Контакты' },
	},
	controls: {
		language: { en: 'Language', ru: 'Язык' },
		toLight: { en: 'Switch to light theme', ru: 'Включить светлую тему' },
		toDark: { en: 'Switch to dark theme', ru: 'Включить тёмную тему' },
		openMenu: { en: 'Open menu', ru: 'Открыть меню' },
		closeMenu: { en: 'Close menu', ru: 'Закрыть меню' },
	},
	hero: {
		first: { en: 'Maksim', ru: 'Максим' },
		last: { en: 'Korzhnev', ru: 'Коржнев' },
		role: { en: 'Frontend developer', ru: 'Фронтенд-разработчик' },
	},
	work: {
		title: { en: 'Selected work', ru: 'Работы' },
		soon: { en: 'Soon', ru: 'Скоро' },
		filter: { en: 'Filter projects', ru: 'Фильтр проектов' },
		all: { en: 'All', ru: 'Все' },
		app: { en: 'Apps', ru: 'Приложения' },
		tool: { en: 'Tools', ru: 'Инструменты' },
		library: { en: 'Libraries', ru: 'Библиотеки' },
		prev: { en: 'Previous project', ru: 'Предыдущий проект' },
		next: { en: 'Next project', ru: 'Следующий проект' },
		open: { en: 'Open project', ru: 'Открыть проект' },
	},
	about: {
		title: { en: 'About', ru: 'Обо мне' },
		bio: {
			en: "I'm Maksim, {age}, a frontend developer from Moscow and a third-year student at RTU MIREA. I've been around frontend for about two years, and for the last seven months I've been writing code for real. What I love most is an interface that feels alive: smooth transitions, custom scrollbars, responsiveness and a design you never have to figure out. Next I want to learn backend and I'm looking at Go, and at NestJS with Prisma. Away from the code I play games, go to the gym and take long walks.",
			ru: 'Я Максим, мне {age}. Фронтенд-разработчик из Москвы, учусь на третьем курсе РТУ МИРЭА. Во фронтенде около двух лет, а последние семь месяцев плотно пишу код. Больше всего люблю, когда интерфейс ощущается живым: плавные переходы, кастомные скроллбары, отзывчивость и дизайн, в котором не нужно разбираться. Дальше хочу освоить бэкенд, присматриваюсь к Go и к NestJS с Prisma. Когда не за кодом, играю, хожу в зал и долго гуляю.',
		},
	},
	desktop: {
		close: { en: 'Close window', ru: 'Закрыть окно' },
		minimize: { en: 'Minimize window', ru: 'Свернуть окно' },
		expand: { en: 'Expand window', ru: 'Развернуть окно' },
		restore: { en: 'Restore size', ru: 'Вернуть размер' },
		dock: { en: 'Dock', ru: 'Док' },
	},
	stack: {
		title: { en: 'Stack', ru: 'Стек' },
		interface: { en: 'Interface', ru: 'Интерфейс' },
		data: { en: 'State and data', ru: 'Состояние и данные' },
		tooling: { en: 'Tooling', ru: 'Инструменты' },
	},
	contact: {
		title: { en: 'Say hello', ru: 'Напиши мне' },
		lead: {
			en: 'About a project, an idea or just to talk code.',
			ru: 'По проекту, идее или просто поговорить о коде.',
		},
		telegram: { en: 'Fastest reply', ru: 'Отвечаю быстрее всего' },
		github: { en: 'All the code', ru: 'Весь код' },
		linkedin: { en: 'Experience', ru: 'Опыт и резюме' },
		discord: { en: 'Chat or play', ru: 'Поболтать или поиграть' },
		vk: { en: 'If you prefer it', ru: 'Если удобнее там' },
		soon: { en: 'Soon', ru: 'Скоро' },
	},
	footer: {
		more: { en: 'Click to eat one more', ru: 'Нажми, чтобы съесть ещё' },
		copy: { en: 'Copy email', ru: 'Скопировать почту' },
		copied: { en: 'Copied', ru: 'Скопировано' },
		avito: { en: 'Avito Jobs', ru: 'Авито Работа' },
		cv: { en: 'Download CV', ru: 'Скачать резюме' },
		soon: { en: 'soon', ru: 'скоро' },
	},
	project: {
		back: { en: 'All work', ru: 'Все работы' },
		stack: { en: 'Stack', ru: 'Стек' },
		next: { en: 'Next project', ru: 'Следующий проект' },
		copy: { en: 'Copy command', ru: 'Скопировать команду' },
		copied: { en: 'Copied', ru: 'Скопировано' },
		notFound: { en: 'Project not found', ru: 'Проект не найден' },
	},
} satisfies Record<string, Record<string, Localized<string>>>
