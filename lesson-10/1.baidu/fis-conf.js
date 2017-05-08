//
// /*    合并   start      */
//
// //js，css合并
// fis.match('::package', {
//     // 启用 fis-spriter-csssprites 插件
//     spriter: fis.plugin('csssprites'),
//     packager: fis.plugin('deps-pack', {
//         'app.js': [
//             '/static/lib/jquery/jquery.min.js',
//             '/static/lib/storage/storage.js',
//             '/static/lib/throttle/throttle.js',
//             '/static/js/index.js'
//         ],
//         'app.css': [
//             '/static/css/base.css',
//             '/static/css/header.css',
//             '/static/css/footer.css',
//             '/static/css/skin.css',
//             '/static/css/index.css'
//         ]
//     })
// });
//
// // 对 CSS 进行图片合并
// fis.match('/static/css/*.css', {
//     // 给匹配到的文件分配属性 `useSprite`
//     useSprite: true
// });
//
// /*    合并   end      */
//
// /*   压缩   start   */
//
// // //对js进行压缩
// // fis.match('/static/js/*.js', {
// //     // fis-optimizer-uglify-js 插件进行压缩，已内置
// //     optimizer: fis.plugin('uglify-js')
// // });
// //
// // //对css进行压缩
// // fis.match('/static/css/*.css', {
// //     // fis-optimizer-clean-css 插件进行压缩，已内置
// //     optimizer: fis.plugin('clean-css')
// // });
//
// //对图片进行压缩
// fis.match('*.{png,jpg}', {
//     // fis-optimizer-png-compressor 插件进行压缩，已内置
//     optimizer: fis.plugin('png-compressor')
// });

//对html进行压缩
fis.match('*.html', {
    //invoke fis-optimizer-html-minifier
    optimizer: fis.plugin('html-minifier')
});

// /*   压缩   end   */

// 加 md5
fis.match('*.{js,css,png,jpg}', {
    useHash: true
});

//发布的时候忽略以下目录或文件
fis.set('project.ignore', [
    'package.json',
    '/node_modules/**',
    'fis-conf.js'
]);

//
// // 启用打包插件，必须匹配 ::package
// fis.match('::package', {
//     packager: fis.plugin('map'),
//     spriter: fis.plugin('csssprites', {
//         layout: 'matrix',
//         margin: '15'
//     })
// })
//     .match('*.js', {
//         packTo: '/static/app.js',
//         optimizer: fis.plugin('uglify-js')
//     })
//     .match('*.css', {
//         packTo: '/static/app.css',
//         optimizer: fis.plugin('clean-css')
//     });

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
}).match('/static/**.js', {
    packTo: 'app.js'
}).match('/static/**.css', {
    packTo: 'app.css'
});
