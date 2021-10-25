<template>
    <td v-on:click="onClickTd">{{cellData}}</td>
</template>
<script>
    import {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from './store.js'; // mutation 을 변수명으로 빼둔 이유

    export default{
        props: {
            cellData: String, // O,X가 CellData가 될 것
            rowIndex: Number,
            cellIndex: Number
        },
        data(){
            return{

            }
        },
        methods:{
            onClickTd(){
                if(this.cellData){
                    return; // 남이 이미 누른 칸에는 return 으로 함수 중단하기.
                }
            // this.$store.commit('CLICK_CELL');
            this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell : this.cellIndex});
            //mutation 을 부를 때는 commit 을 사용하여 불러온다.  mutition 이름이 CLICK_CELL 인 것을 실행한다.

           let win = false;
                if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2]){
                    win = true;
                }
                if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn){
                    win = true;
                }
                if (rootData.tableData[0][0] ===  rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn){
                    win = true;
                }
                if (rootData.tableData[0][2] ===  rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn){
                    win = true;
                }
                if (win){
                    // 이긴 경우 : 초기화
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
                    // 두 번째 인자에 데이터를 넣을 수 있다.
                } else{
                    let all = true; //  all이 true 면 무승부 라는 뜻
                    rootData.tableData.forEach((row) => { // 모든 칸이 다 차 있는지 검사하기!
                        // 무승부 검사
                        row.forEach((cell)=>{
                            if (!cell){
                                all = false;
                            }
                        });
                    });
                    if (all){
                        // 무승부인 경우
                        this.$store.commit(NO_WINNER);
                        this.$store.commit(RESET_GAME);
                    } 
                    else{
                        // 게임이 안 끝났을 때는 턴을 다음 사람 턴으로
                        this.$store.commit(CHANGE_TURN);
                    }
                }

            }
        },
        computed:{
            
        }

    }
</script>
<style scoped>

</style>
