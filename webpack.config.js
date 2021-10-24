const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const pkg = require('./package.json');

// 库版本信息
const banner = `
    @name ${pkg.name}
    @description ${pkg.description}\n
    @version v${pkg.version}
    @homepage ${pkg.homepage}
    @repository ${pkg.repository.url}\n`;

module.exports = {
    mode: 'production',
    // 入口文件
    entry: './src/theme-liawn.js',
    output: {
        // 出口文件
        filename: 'theme-liawn.min.js',
        // 处理输出位置
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.css?$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: "postcss-loader",   // 添加浏览器前缀，压缩 CSS
                    options: {
                        postcssOptions: {
                            plugins: [
                                require("autoprefixer")
                                    ({
                                        overrideBrowserslist: [
                                            'ie >= 8', // ie版本大于等于ie8
                                            'Firefox >= 20', // 火狐浏览器大于20版本
                                            'Safari >= 5', // safari大于5版本
                                            'Android >= 4', // 安卓版本大于4
                                            'Ios >= 6', // ios版本大于ios6
                                            'last 4 version' // 浏览器最新的四个版本
                                        ]
                                    })
                            ]
                        }
                    }
                }],
        }]
    },
    resolve: {
        // 解析时，可以不用带扩展（后缀）
        extensions: ['.css', '.js']
    },
    plugins: [
        // 打包生成dist前会自动删除dist下的文件，使用npm脚本“rm -rf ./dist”也可以
        new CleanWebpackPlugin(),
        // 输出库版本信息
        new webpack.BannerPlugin(banner)
    ],
    optimization: {
        minimizer: [
            // js代码混淆压缩
            new UglifyJsPlugin({
                cache: false,        // 使用缓存
                parallel: true,     // 使用多进程提高打包速度
                sourceMap: true,    // 用于生产的SourceMap
                uglifyOptions: {    // 压缩文件里去掉注释
                    output: {
                        comments: false,
                    },
                }
            }),
            // css代码压缩
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                // 用于压缩和优化CSS 的处理器，默认是 cssnano
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    // 去掉css注释，但似乎没作用
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                // 配置插件是否可以将消息打印到控制台
                canPrint: true
            }),
        ]
    },
};