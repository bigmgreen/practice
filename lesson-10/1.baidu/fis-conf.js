//发布的时候忽略以下目录或文件
fis.set('project.ignore', [
    'package.json',
    '/node_modules/**',
    'fis-conf.js'
]);

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    }),
    spriter: fis.plugin('csssprites'),
    packager: fis.plugin('deps-pack', {
        useTrack : false,
        'output/app.js': [
            '/static/lib/jquery/jquery.min.js',
            '/static/lib/storage/storage.js',
            '/static/lib/throttle/throttle.js',
            '/static/js/index.js'
        ],
        'output/app.css': [
            '/static/css/base.css',
            '/static/css/header.css',
            '/static/css/footer.css',
            '/static/css/skin.css',
            '/static/css/sprite.css',
            '/static/css/index.css'
        ]
    })
}).match('*.js', {
    optimizer: fis.plugin('uglify-js')
}).match('*.css', {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
}).match('*.{png,jpg}', {
    optimizer: fis.plugin('png-compressor')
}).match('output/**.{js,css，png,jpg}', {
    useHash: true
}).match('*.{png,jpg}', {
    useHash: true
}).match('*.html', {
    optimizer: fis.plugin('html-minifier')
});