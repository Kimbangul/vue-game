import Vue from 'vue';
import VueRouter from 'vue-router';
import NumberBaseball from '../3.숫자야구/NumberBaseball.vue';
import ResponseCheck from '../4.반응속도체크/responseCheck.vue';
import RockScissorsPaper from '../5.가위바위보/RockScissorsPaper.vue';
import LottoGenerator from '../6.로또추첨기/LottoGenerator.vue';
import GameMatcher from './GameMatcher.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    // 루트 컴포넌트에도 연결해주어야 함
    routes: [
        {path: '/number-baseball', component: NumberBaseball, }, // 원하는 주소, 화면에 표시할 컴포넌트
        {path: '/response-check', component: ResponseCheck},
        {path: '/rock-scissors-paper', component: RockScissorsPaper},
        {path: '/lotto-generator', component: LottoGenerator}, // 페이지가 늘어날 때마다 페이지에 맞게 쭉 적어주면 된다.
        {path:'/game/:name', component: GameMatcher} //  /game/numver-baseball, :name 부분이 계속 바뀜
        //다이나믹 라우트 매칭, 수많은 게임들을 하나로 묶을 수 있어 코드 정리에도 좋고 라우트 정리에도 좋음
    ],
});