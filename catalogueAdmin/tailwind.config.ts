import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			backgroundImage: {
				'main-gradient': `
				  radial-gradient(at 40% 51%, hsla(244, 78%, 78%, 0.23) 0px, transparent 50%),
				  radial-gradient(at 99% 2%, hsla(168, 83%, 73%, 0.56) 0px, transparent 50%),
				  radial-gradient(at 100% 100%, hsla(305, 92%, 90%, 1) 0px, transparent 50%),
				  radial-gradient(at 34% 3%, hsla(261, 93%, 90%, 1) 0px, transparent 50%),
				  radial-gradient(at 0% 100%, hsla(336, 97%, 86%, 0.57) 0px, transparent 50%)`
			},
			colors: {
				mainBg: 'hsla(0, 0%, 100%, 1)',
				primary: '#E11D48'

			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},

			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
}

export default config

