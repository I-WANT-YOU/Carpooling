import { Locale } from 'vant';
import { getLanguage } from '@utils/auth';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';
import en from './en';
import cn from './zh-CN';

export const langs = [{
  name: 'English',
  value: 'en',
  logoName: 'zh-CN',
}, {
  name: '简体中文',
  value: 'zh-CN',
  logoName: 'en',
}];


export const messages = {
  en: {
    ...en,
  },
  'zh-CN': {
    ...cn,
  },
};

export default () => {
  if (getLanguage() === 'en') {
    Locale.use('en', enUS);
  } else {
    Locale.use('zh-CN', zhCN);
  }
};
