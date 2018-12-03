/**
 * Created by Administrator on 2018/5/15.
 */

//根据环境变量加载特定的config文件信息
var targetSetting = require('./config/' + global.env + "/setting");
var basePath = targetSetting['settingData']['basePath']; //项目根文件目录
var projectPath = targetSetting['settingData']['projectPath'];
var resourcePath = targetSetting['settingData']['resourcePath'];
var port = targetSetting['settingData']['frontPort']; //本地port
var isProd = targetSetting['settingData']['isProd']; //是否为生产环境

//其他配置信息
var httpDataLimit = '25mb';
var appConfig = targetSetting['appConfig'];

//全局数据变量
var overallData = {
    'access_token': '',
};

module.exports = {
    targetSetting: targetSetting,
    httpDataLimit: httpDataLimit,
    overallData: overallData,
    appConfig: appConfig,
    basePath: basePath,
    projectPath: projectPath,
    resourcePath: resourcePath,
    isProd: isProd,
    port: port
};