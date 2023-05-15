const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        open: true,
        proxy: {
            "/ckt": {
                target: "https://api.chuangkit.com",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "/ckt": "",
                },
            },
            "/v2": {
                target: "https://api-v2.chuangkit.com",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "/v2": "",
                },
            },
            "/oss": {
                target: "https://pub-cdn-oss.chuangkit.com",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "/oss": "",
                },
            },
        },
    },
});
