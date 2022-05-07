// 配置生产、开发环境的基本数据
let BASE_URL = "";
const TIME_OUT = 10000;

// 根据process.env.NODE_ENV 的值，来选择开发环境和生产环境
if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://152.136.185.210:5000";
}

export { BASE_URL, TIME_OUT };
