const path = require('path')
const fs = require('fs')
const cracoBabelLoader = require('craco-babel-loader')

// manage relative paths to packages
const appDirectory = fs.realpathSync(process.cwd())
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, "packages/lebara-client/src/components/"),
            '@hooks': path.resolve(__dirname, "packages/lebara-client/src/hooks/"),
        }
    },
    plugins: [
        {
            plugin: cracoBabelLoader,
            options: {
                includes: [
                    resolvePackage('./packages/lebara-client'),
                ],
            },
        },
    ],
}