// 加 md5
fis.match('*.{js,css,png,jpg}', {
    useHash: true
});

//资源合并
fis.match('::package', {
    // 启用 fis-spriter-csssprites 插件
    spriter: fis.plugin('csssprites'),
    packager: fis.plugin('deps-pack', {
        'dist/app.js': [
            '/static/lib/jquery/jquery.min.js',
            '/static/lib/storage/storage.js',
            '/static/lib/throttle/throttle.js',
            '/static/css/index.css'
        ],
        'dist/app.css': [
            '/static/css/base.css',
            '/static/css/header.css',
            '/static/css/footer.css',
            '/static/css/skin.css',
            '/static/css/index.css'
        ]

    })
});

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});

//对js进行压缩
fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

//对css进行压缩
fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

//对图片进行压缩
fis.match('*.{png,jpg}', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});

//对html进行压缩
fis.match('*.html', {
    //invoke fis-optimizer-html-minifier
    optimizer: fis.plugin('html-minifier')
});