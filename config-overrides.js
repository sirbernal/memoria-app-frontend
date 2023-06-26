module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        "path": false,
        "buffer": false,
        "crypto": false,
        "os": false,
        "stream": false,
        "url": false,
        "util": false,
        "timers": false,
        "zlib": false,
        "process": false,
        "http": false,
    }
    return config
}