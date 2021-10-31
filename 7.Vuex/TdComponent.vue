<template>
    <td v-on:click="onClickTd">{{cellData}}</td>
</template>
<script>
    import {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from './store.js'; // mutation 을 변수명으로 빼둔 이유

    export default{
        props: {
            rowIndex: Number,
            cellIndex: Number
        },
        computed:{
            cellData(){
                return this.$store.state.tableData[this.rowIndex][this.cellIndex];
                // 부모 컴포넌트로부터 데이터를 물려받지 않고, 바로 접근 가능.
            },
            // computed를 통해 Vuex state를 가져올 수 있다.
            // Vuex의 state를 쓰기 위해서는 반드시 computed에 연결해 주어야 한다.
            tableData(){
                return this.$store.state.tableData;
            },
            turn(){
                return this.$store.state.turn;
            }
            // Vuex의 state는 computed를 통해 가져온다.
            // mutations는 $store.commit() 을 통해 실행한다.
            // 이렇게 하면 데이터는 Vuex에 있고, 컴포넌트는 Vuex에서 데이터를 가져와 화면을 그리고, mutations으로 데이터를 수정한다.
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
  console.log(this.tableData[this.rowIndex][this.cellIndex]); 
           let win = false;
         
                if (this.tableData[this.rowIndex][0] ===this.turn && this.tableData[this.rowIndex][1] ===this.turn && this.tableData[this.rowIndex][2]){
                    win = true;
                }
                if (this.tableData[0][this.cellIndex] ===this.turn && this.tableData[1][this.cellIndex] ===this.turn && this.tableData[2][this.cellIndex] ===this.turn){
                    win = true;
                }
                if (this.tableData[0][0] === this.turn && this.tableData[1][1] ===this.turn && this.tableData[2][2] ===this.turn){
                    win = true;
                }
                if (this.tableData[0][2] === this.turn && this.tableData[1][1] ===this.turn && this.tableData[2][0] ===this.turn){
                    win = true;
                }
                if (win){
                    // 이긴 경우 : 초기화
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
                    // 두 번째 인자에 데이터를 넣을 수 있다.
                } else{
                    let all = true; //  all이 true 면 무승부 라는 뜻
                    this.tableData.forEach((row) => { // 모든 칸이 다 차 있는지 검사하기!
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
