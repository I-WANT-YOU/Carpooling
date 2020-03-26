// 线上
const prod = 'http://lc.romacredit.com/jeeplus';
const dev = 'http://lc.romacredit.com/jeeplus';

// 测试
/* const prod = 'http://49.233.81.18/jeeplus';
const dev = 'http://49.233.81.18/jeeplus'; */

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
