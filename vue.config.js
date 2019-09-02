const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Mock = require('./src/mock');
const bodyParser = require('body-parser')

console.log('===================process.env.NODE_ENV=================');
console.log(process.env.NODE_ENV);
console.log('====================================');
module.exports = {
        lintOnSave: false,
        // assetsDir: './src/externals',
        // publicPath: '/mpvue/',
        productionSourceMap: false,

        devServer: {
            overlay: {
                warnings: true,
                errors: true
            },
                // proxy: {
                //     '/data/*':{
                //         'target':'http://enterprise.you-tiao.com',
                //         changeOrigin: true
                //     } 
                // }
                // before(app) {
                //     app.use(bodyParser.urlencoded({
                //         extended: false
                //     }));
                //     app.use(bodyParser.json())
                //     /* 接口模拟 */
                //     app.get('/data/m/publicity/subjectCategory/list', (req, res) => {
                //             res.json(Mock.subjectCategoryList)
                //         }),
                //         app.get('/data/m/publicity/slide/list', (req, res) => {
                //             res.json(Mock.slideList)
                //         }),
                //         app.post('/data/m/publicity/subject/search', (req, res) => {
                //             if (req.body.subjectCategoryId == 1) {
                //                 res.json(Mock.subjectSearch1)
                //             }

                //             if (req.body.subjectCategoryId == 2) {
                //                 res.json(Mock.subjectSearch2)
                //             }

                //             if (req.body.subjectCategoryId == 3) {
                //                 res.json(Mock.subjectSearch3)
                //             }
                //             if (req.body.subjectCategoryId == undefined) {
                //                 res.json({
                //                     err: '请输入id'
                //                 })
                //             }
                //         })
                //     app.get('/data/m/publicity/activity/list', (req, res) => {
                //         res.json(Mock.ActivityList)
                //     })
                // }
            }
        }