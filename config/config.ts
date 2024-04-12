const settingConfig = {
//开发以及部署时的URL，hash模式时在不确定二级目录名称的情况下建议使用""代表相对路径或者"/二级目录/"，history模式默认使用"/"或者"/二级目录/"
  publicPath: './',
  //生产环境构建文件的目录名
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'assets',
  //标题
  title: '长风',
  shortName: 'blog',
  //标题分隔符
  titleSeparator: ' - ',
  //标题是否反转 如果为false:"page - title"，如果为ture:"title - page"
  titleReverse: false,
  //token名称
  tokenName: 'token',
  // 接口前缀
  requestPrefix: '',
  //需校验的路由
  routesBlackList: ['/markdown'],
  //配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 60 * 1000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0]
} as any

export default settingConfig