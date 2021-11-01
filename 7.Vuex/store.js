import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // vue랑 vuex를 연결 

export const SET_WINNER = 'SET_WINNER'; // 함수명을 변수로 빼 줄 수 있다. (ES2015 문법). 동적 속성
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';
// export하여 다른 파일에서 쓸 수 있게끔 모듈로 만든다.

export default new Vuex.Store({
    state: {
        // vue의 data와 비슷
        tableData: [
            ['','',''],
            ['','',''],
            ['','',''],
            // 2차원 배열: 배열 안에 배열이 또 들어가 있음!
        ],
        turn: 'O', // 클릭할 때마다 턴이 O에서 X로, X에서 O로 넘어감.
        winner: '',
    },
    getters: {
        // vue의 computed와 비슷
    },
    mutations: {
        // state를 동기적으로 수정할 때 사용
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, {
            row,
            cell
        }) {
            // 첫 번째 매개변수에는 state가, 두 번째 매개변수에는 data가 들어간다.
            Vue.set(state.tableData[row], cell, state.turn);
            // 칸에 O나 X 그려주기. tableData[row][cell] 에 state.turn을 대입한다.
            //Vuex에서도 배열의 인덱스에 접근하는 경우에는 화면이 바뀌지 않기 때문에 Vue.set이나 this.$set()을 사용해 주어야 한다.
            // Vuex에는 $set 이 없으므로 Vue.set 사용.
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O'; // turn이 O였으면 X로, X였으면 O로 변경
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
            ['','',''],
            ['','',''],
            ['','',''],
            ];            
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
        // 이것들은 다 onClickTd 안에 들어있던 것들이다.
    },
    actions: {
        // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
    },
});