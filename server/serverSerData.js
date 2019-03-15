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

var isProd = true;

//全局数据变量
var overallData = {
    'access':{
        'access_token': '',
        'refresh_token': '',
        'scope': '',
        'token_type': '',
        'expires_in': '',
        'timestamp': '',
    },
    'key':{
        'consumer_key':'hu3GpYYLmdgC_NnpPECGZqTIERYa',
        'consumer_secret':'SmHV_D7bIFdBSgrlVk5RwbNcQ8Ua',
        'grant_type':'',
        'username':'qidai',
        'password':'123456',
    }
};

var getAccesstoken = {
    'time':'0 0 6 * * *',  //每天早上6点获取accesstoken数据信息
};

module.exports = {
    targetSetting: targetSetting,
    httpDataLimit: httpDataLimit,
    overallData: overallData,
    getAccesstoken: getAccesstoken,
    appConfig: appConfig,
    basePath: basePath,
    projectPath: projectPath,
    resourcePath: resourcePath,
    isProd: isProd,
    port: port
};