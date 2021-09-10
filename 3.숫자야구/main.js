import Vue from 'vue';
// ES2015 에  들어 있는 모듈 시스템. 나는 package.json에 기록했던 Vue를 사용하겠다.

import NumberBaseball from './NumberBaseball.vue'
//  import로 NumberBaseball 연결

   
Vue.config.devtools = false;
new Vue(NumberBaseball).$mount( '#root' );
//  el 과 같은 역할. vue가 통제할 태그
// vue 컴포넌트를 인스턴스에 연결해 주어야 한다.