// https://github.com/shelljs/shelljs 生产版本
require('shelljs/global') //提供shell命令
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
// 异步任务提醒
var ora = require('ora')
var webpack = require('webpack')
// 生产包配置
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)
// 日志输出
var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// 删除之前构建的文件
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
