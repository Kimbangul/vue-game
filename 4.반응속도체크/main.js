import Vue from 'vue';
Vue.config.devtools = false;

import responseCheck from './responseCheck.vue'

new Vue(responseCheck).$mount( '#root' );