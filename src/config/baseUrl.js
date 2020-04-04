// 线上
const prod = 'https://api.chuang-w.com';
const dev = 'https://api.chuang-w.com';

// 测试http://lc.romacredit.com/
// const prod = 'http://49.233.81.18/jeeplus';
// const dev = 'http://49.233.81.18/jeeplus';
// 测试
// const prod = 'http://lc.romacredit.com/';
// const dev = 'http://lc.romacredit.com/';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
