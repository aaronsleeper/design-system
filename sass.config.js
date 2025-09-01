module.exports = {
	outputStyle: 'compressed',
	sourceMap: true,
	includePaths: ['src/tokens', 'src/themes'],
	functions: {
		// Custom SCSS functions for design tokens
		'color-mix($color1, $color2, $weight)': (color1, color2, weight) => {
			return `color-mix(${color1}, ${color2} ${weight}%)`;
		},
		'spacing($multiplier)': (multiplier) => {
			return `${multiplier.value * 4}px`;
		},
		'font-size($level)': (level) => {
			const sizes = {
				1: '0.75rem', // 12px
				2: '0.875rem', // 14px
				3: '1rem', // 16px
				4: '1.125rem', // 18px
				5: '1.25rem', // 20px
				6: '1.5rem', // 24px
				7: '1.875rem', // 30px
				8: '2.25rem', // 36px
				9: '3rem', // 48px
				10: '3.75rem', // 60px
			};
			return sizes[level.value] || '1rem';
		},
	},
};
