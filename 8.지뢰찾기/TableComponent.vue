<template>
<table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex"  :style="cellDataStyle(rowIndex, cellIndex)">{{cellDataText(rowIndex, cellIndex)}}</td>
        <!-- rowIndex, cellIndex가 칸마다 달라지는데, 그걸 알아차리기 힘들기 때문에 각 칸별로 따로 계산할 수 있도록 함수 형식으로 바인드 -->
    </tr>
    <!-- 2차원 배열 데이터를 가져와 v-for로 렌더링 -->
</table>
</template>
<script>
import {
    mapState
} from 'vuex';
import { CODE } from './store.js';

export default {
    computed: {
        ...mapState(['tableData']),
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
                    case CODE.QUSETION:
                    case CODE.QUSETION_MINE:
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
                    case CODE.QUSETION_MINE:
                    case CODE.QUSETION:
                        return '?';
                    case CODE.CLICKED_MINE:
                        return '펑';
                    default:
                        return '';
                }
            }
        }
    }
    };
</script>
<style>

</style>
