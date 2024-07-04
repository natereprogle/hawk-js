const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: '.qodana/code-coverage/',
    coverageReporters: [
        'lcovonly',
    ],
    // Functional tests can take a while since they're pulling real data,
    // so we want to just disable the open handles warning since they will eventually close
    openHandlesTimeout: 0,
}

module.exports = config