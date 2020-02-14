import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { getLanguage } from '@utils/auth';
import { messages } from './lang';


Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: getLanguage(),
  messages,
});

export default i18n;
