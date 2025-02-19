import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				primary: '#E11D48',
			}
		}
	},
	plugins: [tailwindcssAnimate],
}

export default config

