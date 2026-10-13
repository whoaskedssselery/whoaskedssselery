import biome from 'devicon/icons/biome/biome-original.svg'
import css from 'devicon/icons/css3/css3-original.svg'
import docker from 'devicon/icons/docker/docker-original.svg'
import figma from 'devicon/icons/figma/figma-original.svg'
import motion from 'devicon/icons/framermotion/framermotion-original.svg'
import git from 'devicon/icons/git/git-original.svg'
import html from 'devicon/icons/html5/html5-original.svg'
import javascript from 'devicon/icons/javascript/javascript-original.svg'
import nodejs from 'devicon/icons/nodejs/nodejs-original.svg'
import postgresql from 'devicon/icons/postgresql/postgresql-original.svg'
import react from 'devicon/icons/react/react-original.svg'
import sass from 'devicon/icons/sass/sass-original.svg'
import supabase from 'devicon/icons/supabase/supabase-original.svg'
import typescript from 'devicon/icons/typescript/typescript-original.svg'
import vite from 'devicon/icons/vitejs/vitejs-original.svg'
import vscode from 'devicon/icons/vscode/vscode-original.svg'
import webstorm from 'devicon/icons/webstorm/webstorm-original.svg'
import zustand from 'devicon/icons/zustand/zustand-original.svg'
import { siClaude, siReacthookform, siReactquery, siZod } from '@/shared/config/brands'

export type TechIcon =
	| { kind: 'file'; src: string; mono?: boolean }
	| { kind: 'mark'; path: string; hex: string }

export type Tech = { name: string; icon: TechIcon }

export type TechGroup = 'interface' | 'data' | 'tooling'

const file = (name: string, src: string, mono = false): Tech => ({
	name,
	icon: { kind: 'file', src, mono },
})
const mark = (name: string, icon: { path: string; hex: string }): Tech => ({
	name,
	icon: { kind: 'mark', path: icon.path, hex: `#${icon.hex}` },
})

export const tech: Record<TechGroup, Tech[]> = {
	interface: [
		file('HTML', html),
		file('CSS', css),
		file('Sass', sass),
		file('JavaScript', javascript),
		file('TypeScript', typescript),
		file('React', react),
		file('Motion', motion, true),
	],
	data: [
		file('Zustand', zustand),
		mark('TanStack Query', siReactquery),
		mark('React Hook Form', siReacthookform),
		mark('Zod', siZod),
		file('Supabase', supabase),
		file('PostgreSQL', postgresql),
	],
	tooling: [
		file('Vite', vite),
		file('Node.js', nodejs),
		file('Docker', docker),
		file('Biome', biome),
		file('Git', git),
		file('Figma', figma),
		file('WebStorm', webstorm),
		file('VS Code', vscode),
		mark('Claude Code', siClaude),
	],
}
