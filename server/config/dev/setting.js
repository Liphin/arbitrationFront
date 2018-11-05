/**
 * Created by Administrator on 2018/11/3.
 */
var settingData = {
    basePath: "G:/SoftwareOutSourcing/report_prod/front/reportFront", //基础路径
    projectPath: "G:/SoftwareOutSourcing/report_prod/front/reportFront/project", //基础路径
    domainName: "http://report.test.liphin.com", //域名设置
    isProd: false, //是否为生产环境
    frontPort: 3032, //前端port
    backPort: 8082 //后台port
};
//其他配置
settingData['projectPath'] = settingData['basePath'] + "/project";
settingData['resourcePath'] = settingData['basePath'] + "/resource";


//应用配置
var appConfig = {
    appid: 'wx8c0feed4f5d17636',
    secret: 'da618efecb2ca815dd7779d2b93e43fc',
};

module.exports = {
    settingData: settingData,
    appConfig: appConfig,
};
