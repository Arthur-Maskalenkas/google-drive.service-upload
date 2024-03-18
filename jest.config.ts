import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

const { paths, baseUrl } = compilerOptions

const config: Config.InitialOptions = {
    roots: ['<rootDir>/tests', '<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!**/protocols/**',
        '!**/test/**',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    preset: 'ts-jest',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                isolatedModules: true,
            },
        ],
    },
    modulePaths: [baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(paths),
}
export default config
