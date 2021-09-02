const VueLoaderPlugin = require('vue-loader/lib/plugin'); 
// 노드 환경에서는 require를 이용하여 파일을 불러온다! 
const path = require('path');
// 절대 경로로 적을 때 힘들 것을 도와주는 노드 모듈.

module.exports = {
    mode: 'development',
    // 배포할 떄는 production 으로 바꿔주면 된다.
    devtool: 'eval',
    // 개발할 때는 eval(웹팩이 빌드하는 속도가 빠르다), 최종 배포 시에는 hidden-source-map 사용
    resolve: {
        extensions: ['.js', '.vue']
        // 확장자 처리, 예를 들어 main.js 에서 파일을 import 할 때 파일 확장자를 제거할 수 있다.
    },
    entry: {
        // 100개가 되는 스크립트 중 대표 파일
        app: path.join(__dirname, 'main.js') , // 수백 개 되는 스크립트가 하나로 합쳐질 파일의 이름\
    },
    module: {
        // webpack 의 핵심
        rules: [
            {
            // 파일들을 합칠 때 어떻게 합쳐야 할지.
            test: /\.vue$/,
            use: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    // sass, less, postcss 등을 사용할 것이면 sass-loader 등을 추가.
                ]
            }
        ],
    },
    plugins: [new VueLoaderPlugin()],
    output: {
        filename: '[name].js', // 최종 결과물
        path: path.join(__dirname, 'dist')
        // __dirname : 현재 경로
    },
};