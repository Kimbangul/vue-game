<template>
<table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex"  :style="cellDataStyle(rowIndex, cellIndex)" @click="onClickTd(rowIndex,cellIndex)" @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)">{{cellDataText(rowIndex, cellIndex)}}</td>
        <!-- rowIndex, cellIndex가 칸마다 달라지는데, 그걸 알아차리기 힘들기 때문에 각 칸별로 따로 계산할 수 있도록 함수 형식으로 바인드 -->
        <!-- prevent를 붙여 주어야 브라우저에서 오른쪽 클릭 시 기본으로 나오는 메뉴가 출력되지 않음 -->
    </tr>
    <!-- 2차원 배열 데이터를 가져와 v-for로 렌더링 -->
</table>
</template>
<script>
import {
    mapState
} from 'vuex';
import { CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL } from './store.js';

export default {
    computed: {
        ...mapState(['tableData','halted']),
        cellDataStyle(state) {
            // 고차함수: 함수를 확장하는 행위, 기능을 추가하는 행위 cellDataStyle: (state) => (row,cell) => {}
            // 화살표 함수를 사용하면 this를 사용하지 못하므로 일반 함수로 돌려준다.
            // computed에 두는 이유 : cellData를 기반으로 style을 만들어 내는 것이기 때문에.
            return (row, cell) => {
                // this 관계 때문에 내부는 화살표 함수 사용!
                switch (this.$store.state.tableData[row][cell]) {
                    case CODE.NORMAL:
                    case CODE.MINE:
                        // 열지 않은 칸
                        return {
                            background: '#444',
                        };
                    case CODE.OPENED:
                        // 연 칸
                        return {
                            background: '#fff',
                        };
                    case CODE.FLAG_MINE:
                    case CODE.FLAG:
                        // 깃발을 꽂았을 때
                        return {
                            background: 'red',
                        };
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return {
                            // 물음표
                            background: 'yellow',
                        };
                    default:
                        return {

                        };
                }
            }
        },
        cellDataText(state) {
            return (row, cell) => {
                switch (this.$store.state.tableData[row][cell]) {
                    case CODE.MINE:
                        return 'X';
                    case CODE.NORMAL:
                        return '';
                    case CODE.FLAG_MINE:
                    case CODE.FLAG:
                        return '!';
                    case CODE.QUESTION_MINE:
                    case CODE.QUESTION:
                        return '?';
                    case CODE.CLICKED_MINE:
                        return '펑';
                    default:
                        return '';
                }
            }
        }
    },
    methods:{
        onClickTd(row, cell){
            if (this.halted){
                return; //게임이 중단되었을 때는 칸을 클릭하지 못하게
            }
            this.$store.commit(OPEN_CELL,{row, cell}); // 두번째 인수로 데이터 전달
        },
        onRightClickTd(row, cell){
            console.log(row, cell, this.halted);
            if (this.halted){
                return;
            }
            console.log(this.tableData[row][cell]);
            switch (this.tableData[row][cell]){
                case CODE.NORMAL:
                case CODE.MINE:
                    // 지뢰가 심어져 있거나 빈 칸에 오른쪽 마우스 클릭을 한 경우
                    this.$store.commit(FLAG_CELL, {row, cell});
                    return;
                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    this.$store.commit(QUESTION_CELL, {row, cell});
                     return;
               case CODE.QUESTION:
                case CODE.QUESTION_MINE:                    
                    this.$store.commit(NORMALIZE_CELL, {row, cell});
                     return;
                default:
                    return; //칸이 열렸얼 때
           }
        }
    }
    };
</script>
<style>

</style>
