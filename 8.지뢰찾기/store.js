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
        result: '',
        openedCount: 0, // 연 칸의 갯수
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
            state.openedCount = 0;
            state.result = '';
 
        },
        [OPEN_CELL](state,{row,cell}){
            let openedCount = 0;
            let halted = false;
            let result = '';
            // 칸을 열 때마다 기록

            const checked = [];            
            function checkAround(row, cell) {
                
                if (row < 0 || row>= state.tableData.length || cell < 0 || cell >= state.tableData[0].length){
                    // undefined 에러날까봐 보호!
                    return;
                }
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])){
                    // 주변 칸이 열리거나 지뢰일 경우엔 열 필요 없음, 빈 칸인 경우만 검사함
                    return;
                }                
                if(checked.includes(row + '/' + cell)){
                    // 이미 연 경우는 열지 않기
                    return;
                }else{
                    checked.push(row + '/' + cell); // 연 칸이면 checked 칸에 push 하기
                }
                // 주변 8칸 지뢰인지 검색
                let around = [];
                if (state.tableData[row - 1]){
                    // row-1이 undefined 이면 에러가 발생하기 때문에 if문 사용
                    around = around.concat([
                        state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
                    ]); // concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다.
                }               
                around = around.concat([
                    state.tableData[row][cell - 1], state.tableData[row][cell + 1]
                ]);
                if(state.tableData[row+1]){
                    around = around.concat([
                        state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
                    ]);
                }
                const counted = around.filter(function(v){ //filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v); // includes() 메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다.
                });
                if (counted.length === 0 && row > -1){ //주변 칸에 지뢰가 하나도 없으면
                    const near = [];
                    if (row -1 > -1){
                        near.push([row-1, cell-1]);
                        near.push([row-1, cell]);
                        near.push([row-1, cell+1]);
                    }
                    near.push([row, cell-1]);
                    near.push([row, cell+1]);
                    if (row + 1 < state.tableData.length){
                        near.push([row + 1, cell-1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell+1]);
                    }
                    near.forEach((n)=> { // 주어진 함수를 배열 요소 각각에 대해 실행합니다.
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED){ // 연 칸이 아니면 checkAround 실행
                            checkAround(n[0],n[1]);
                        }
                    });
                } 
                if(state.tableData[row][cell] === CODE.NORMAL){
                    // 현재칸이 빈 칸이면
                    openedCount += 1;
                }
                Vue.set(state.tableData[row], cell, counted.length);
            }
            checkAround(row, cell);
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){ // 방금 연 칸의 갯수까지 더해서
                halted = true; // 승리 시 게임 중단
                result = `${state.timer}초만에 승리하셨습니다.`;
            }
            state.openedCount += openedCount;
            state.halted = halted; // 최종적으로 데이터를 vuex 스토어에 저장
            state.result = result;
        },
        [CLICK_MINE](state,{row,cell}){
            state.halted = true; //지뢰를 밟았으니 게임을 중단
            Vue.set(state.tableData[row],cell,CODE.CLICKED_MINE);
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