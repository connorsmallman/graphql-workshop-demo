module.exports = function (api) {
    api.cache(true);

    return {
        babelrcRoots: [
            // Keep the root as a root
            ".",
          
            // Also consider monorepo packages "root" and load their .babelrc files.
            "./client/*"
        ],
    }
}