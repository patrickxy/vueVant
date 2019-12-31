const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
let Mock = require("mockjs");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 去除生产环境的sourcemap，加速构建
  productionSourceMap: false,
  lintOnSave: true,
  // 配置webpack
  configureWebpack: {
    // externals
    // externals: {
    //   vue: "Vue"
    // }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");

    // 配置alias 别名  可添加多个
    config.resolve.alias.set("@com", resolve("src/components"));
    // 添加分析插件
    // config
    //   .plugin("webpack-bundle-analyzer")
    //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    // config.plugin("html").tap(args => {
    //   return args;
    // });
  },
  devServer: {
    // 代理他人服务接口
    // proxy: {
    //   "/api": {
    //     target:
    //       "https://www.easy-mock.com/mock/5b306650fa3fe672961c094d/example",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": ""
    //     }
    //   }
    // },
    // 本地http服务
    before: function(app) {
      let mockObj = Mock.mock({
        "object|2": {
          "310000": "上海市",
          "320000": "江苏省",
          "330000": "浙江省",
          "340000": "安徽省"
        }
      });
      app.get("/api/mock", function(req, res) {
        res.json({ code: 0, data: mockObj });
      });
      app.post("/api/upload", function(req, res) {
        res.json({ code: 0, data: mockObj });
      });
      app.get("/api/mock/:id", function(req, res) {
        console.log(req.query);
        console.log(req.params);
        res.json({ code: 0, data: mockObj });
      });
    }
  }
};
