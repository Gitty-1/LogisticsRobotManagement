// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/guihao.zheng/Desktop/robot/LogisticsRobotManagement/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/guihao.zheng/Desktop/robot/LogisticsRobotManagement/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/guihao.zheng/Desktop/robot/LogisticsRobotManagement/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import DefineOptions from "file:///C:/Users/guihao.zheng/Desktop/robot/LogisticsRobotManagement/node_modules/unplugin-vue-define-options/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/guihao.zheng/Desktop/robot/LogisticsRobotManagement/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    DefineOptions()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8082/",
        //跨域地址
        changeOrigin: true,
        //支持跨域
        rewrite: (path) => path.replace(/^\/api/, "")
        //重写路径,替换/api
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxndWloYW8uemhlbmdcXFxcRGVza3RvcFxcXFxyb2JvdFxcXFxMb2dpc3RpY3NSb2JvdE1hbmFnZW1lbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWhhby56aGVuZ1xcXFxEZXNrdG9wXFxcXHJvYm90XFxcXExvZ2lzdGljc1JvYm90TWFuYWdlbWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ3VpaGFvLnpoZW5nL0Rlc2t0b3Avcm9ib3QvTG9naXN0aWNzUm9ib3RNYW5hZ2VtZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgRGVmaW5lT3B0aW9ucyBmcm9tICd1bnBsdWdpbi12dWUtZGVmaW5lLW9wdGlvbnMvdml0ZSdcclxuXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdnVlSnN4KCksXHJcbiAgICBEZWZpbmVPcHRpb25zKClcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXJ2ZXI6e1xyXG4gICAgcHJveHk6e1xyXG4gICAgICAgJy9hcGknOntcclxuICAgICAgICAgICB0YXJnZXQ6XCJodHRwOi8vbG9jYWxob3N0OjgwODIvXCIsIC8vXHU4REU4XHU1N0RGXHU1NzMwXHU1NzQwXHJcbiAgICAgICAgICAgY2hhbmdlT3JpZ2luOnRydWUsIC8vXHU2NTJGXHU2MzAxXHU4REU4XHU1N0RGXHJcbiAgICAgICAgICAgcmV3cml0ZToocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIikvL1x1OTFDRFx1NTE5OVx1OERFRlx1NUY4NCxcdTY2RkZcdTYzNjIvYXBpXHJcbiAgICAgICB9XHJcbiAgICB9XHJcbiB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1gsU0FBUyxlQUFlLFdBQVc7QUFFclosU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLG1CQUFtQjtBQUxpTixJQUFNLDJDQUEyQztBQVM1UixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFPO0FBQUEsSUFDTCxPQUFNO0FBQUEsTUFDSCxRQUFPO0FBQUEsUUFDSCxRQUFPO0FBQUE7QUFBQSxRQUNQLGNBQWE7QUFBQTtBQUFBLFFBQ2IsU0FBUSxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBO0FBQUEsTUFDL0M7QUFBQSxJQUNIO0FBQUEsRUFDSDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
