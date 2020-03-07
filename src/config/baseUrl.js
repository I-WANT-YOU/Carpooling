// 线上

// 测试
const prod = 'http://49.233.183.51:8080/jeeplus';
const dev = 'http://49.233.183.51:8080/jeeplus';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
