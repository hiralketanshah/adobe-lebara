const path = require('path')
const {addBeforeLoader} = require("@craco/craco");
const {loaderByName} = require("@craco/craco");
const {getLoaders} = require("@craco/craco");
const libraries = [path.resolve(__dirname, "./src"), path.resolve(__dirname, "./packages/lebara-client/src"), path.resolve(__dirname, "./packages/lebara-client/packages/core/src"), ];

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, "packages/lebara-client/src/components/"),
            'rotues': path.resolve(__dirname, "packages/lebara-client/src/rotues/"),
            '@hooks': path.resolve(__dirname, "packages/lebara-client/src/hooks/"),
            '@lebara/core': path.resolve(__dirname, "packages/lebara-client/packages/core/src/"),
            '@lebara/germany': path.resolve(__dirname, "packages/lebara-client/packages/germany/src/"),
        },
        configure: webpackConfig => {
            console.log("configureconfigureconfigureconfigureconfigureconfigureconfigure");

            const scopePlugin = webpackConfig.resolve.plugins.find(
                ({constructor}) => constructor && constructor.name === 'ModuleScopePlugin'
            );
            const {matches} = getLoaders(webpackConfig, loaderByName('babel-loader'));
            console.log(matches[0]);
            addBeforeLoader(webpackConfig, loaderByName('babel-loader'), {
                ...matches[0].loader,
                include: [...libraries],
            });
            console.log(scopePlugin.appSrcs);
            scopePlugin.appSrcs = [...scopePlugin.appSrcs, ...libraries]
            return webpackConfig;
        }

    }
}