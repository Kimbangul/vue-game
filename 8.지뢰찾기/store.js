import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
export const CODE = {
    NORMAL: -1, //닫힌 칸(지뢰 없음)
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE : -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    MINE: -7,
    OPENED: 0 //0 이상이면 모두 열린 칸
};

const placeMine = (row, cell, mine) => {
        const candidate = Array(row * cell).fill().map((arr, i) => {return i});
        // 갯수만큼 배열 생성 [0,1,2,3 ...]
        // fill() 메서드는 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채웁니다.
        // map 함수의 매개변수 : currentValue, index, array, thisArg
        const shuffle = [];
        while (candidate.length > row * cell - mine){ // 지뢰 갯수만큼 뽑기
            const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
            //splice 함수의 매개변수 : start, deleteCount, item(배열에 추가할 요소)
            shuffle.push(chosen); // 지뢰를 심을 칸
        }
        const data = [];
        for (let i = 0; i<row; i++){
            const rowData = [];
            data.push(rowData);
            for (let j = 0; j < cell; j++){
                rowData.push(CODE.NORMAL);
                // 지뢰 없는 칸으로 전부 다 채운 2차원 배열 생성
            }
        }
        for(let k = 0; k<shuffle.length; k++){
            const ver = Math.floor(shuffle[k] / cell); // 세로 줄 세기. 줄은 정수 단위므로 floor() 사용
            const hor = shuffle[k] % cell; 
            data[ver][hor] = CODE.MINE;
            // shuffle에 있는 랜덤한 숫자를 바탕으로 지뢰를 넣어준다.
        }
        return data;
}
    

export default new Vuex.Store({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true, //게임이 중단된
        result: ''
    },
    getters: {

    },
    mutations: {
        [START_GAME](state, {row, cell, mine}){
            state.data ={
                row,
                cell,
                mine,
            }
             // 객체 안의 개별적인 속성을 바꿀 때는 화면에 반영되지 않을 수 있음. 배열 안의 데이터를 인덱스를 통해  바꾸는 경우와 동일
            // Vue.set(state.data, 'row', row);
            state.tableData = placeMine(row, cell, mine); //지뢰 심는 함수
            state.timer = 0;
            state.halted = false;

 
        },
        [OPEN_CELL](state,{row,cell}){
            Vue.set(state.tableData[row],cell,CODE.OPENED);
            // vue에서 배열의 인덱스에 접근해 값을 바꾸려 하면 화면에 반영되지 않기 때문에 vue.set()을 사용해준다.
            // 두 번째 인덱스는 두 번째 인수로 들어간다.
        },
        [CLICK_MINE](state){

        },
        [FLAG_CELL](state,{row,cell}){
            if(state.tableData[row][cell] === CODE.MINE){
                Vue.set(state.tableData[row],cell,CODE.FLAG_MINE);
            }else{
                Vue.set(state.tableData[row],cell,CODE.FLAG);
            }
        },
        [QUESTION_CELL](state,{row,cell}){
            if(state.tableData[row][cell] === CODE.FLAG_MINE){
                Vue.set(state.tableData[row],cell,CODE.QUESTION_MINE);
            }else{
                Vue.set(state.tableData[row],cell,CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state,{row,cell}){
            if(state.tableData[row][cell] === CODE.QUESTION_MINE){
                Vue.set(state.tableData[row],cell,CODE.MINE);
            }else{
                Vue.set(state.tableData[row],cell,CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state){
            state.timer+=1;
        }
    },
    actions: {
    },
});