export const splitChars = (text: string, offset = 0) =>
	Array.from(text, (char, position) => ({
		char,
		id: `${position}-${char}`,
		order: offset + position,
	}))
