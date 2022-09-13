const path = require("path");
const {addBeforeLoader} = require("@craco/craco");
const {loaderByName} = require("@craco/craco");
const {getLoaders} = require("@craco/craco");
const libraries = [path.resolve(__dirname, "../packages/core/src"), path.resolve(__dirname, "../packages/lebara-client/packages/core/src"), path.resolve(__dirname, "../packages/lebara-client/packages/netherlands/src"), path.resolve(__dirname, "../packages/lebara-client/packages/germany/src"), path.resolve(__dirname, "../packages/lebara-client/packages/france/src"), ];

module.exports = {
    webpack: {
        configure: webpackConfig => {
            const scopePlugin = webpackConfig.resolve.plugins.find(
                ({constructor}) => constructor && constructor.name === 'ModuleScopePlugin'
            );
            const {matches} = getLoaders(webpackConfig, loaderByName('babel-loader'));
            addBeforeLoader(webpackConfig, loaderByName('babel-loader'), {
                ...matches[0].loader,
                include: [...libraries],
            });
            scopePlugin.appSrcs = [...scopePlugin.appSrcs, ...libraries]
            return webpackConfig;
        },
        alias: {
            '@lebara/core': path.resolve(__dirname, "../packages/lebara-client/packages/core/src"),
            '@lebara/germany': path.resolve(__dirname, "../packages/lebara-client/packages/germany/src"),
            '@lebara/france': path.resolve(__dirname, "../packages/lebara-client/packages/france/src"),
            '@lebara/denmark': path.resolve(__dirname, "../packages/lebara-client/packages/denmark/src"),
            '@lebara/netherlands': path.resolve(__dirname, "../packages/lebara-client/packages/netherlands/src"),
        }
    }
}
