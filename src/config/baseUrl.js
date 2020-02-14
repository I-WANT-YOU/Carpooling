// 线上
const dev = 'https://api.bgain.com/index';
const prod = 'https://api.bgain.com/index';
// 测试

// const prod = 'http://dev.xjetry.top:8085';
// const dev = 'http://dev.xjetry.top:8085';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
