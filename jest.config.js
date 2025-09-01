export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|scss)$': '<rootDir>/src/test/mocks/styleMock.js',
	},
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.stories.{ts,tsx}',
		'!src/**/*.test.{ts,tsx}',
		'!src/**/*.spec.{ts,tsx}',
		'!src/test/**/*',
		'!src/**/index.ts',
	],
	testMatch: ['<rootDir>/src/**/__tests__/**/*.{ts,tsx}', '<rootDir>/src/**/*.{test,spec}.{ts,tsx}'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	transformIgnorePatterns: ['/node_modules/(?!lit|@lit|@open-wc).+\\.js$'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
			useESM: true,
		},
	},
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	extensionsToTreatAsEsm: ['.ts'],
};
