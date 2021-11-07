<template>
<div>
        <table-component>
           <!-- <table-component v-bind:table-data="tableData"/> -->
           <!-- props 말고, 태그 안에 자식 태그를 만들어  데이터를 넘겨주는 방법-->
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex" :rowData="rowData">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
            </tr>
            <!--  TableComponent의 데이터가 아닌 TicTacToe.vue의 데이터를 사용하고 있다. -->
            <!-- slot을 사용함으로써 컴포넌트마다 computed, methods를 사용하는 것이 아니라
                하나의 컴포넌트에 computed, methods를 사용하는 식으로 중앙 통제가 가능해진다. 자식 컴포넌트를 부모 컴포넌트가 컨트롤(제어의 역전)
             -->
        </table-component>
        <!-- 자식 컴포넌트에게 데이터를 전달해 줄 때엔 v-bind를 사용한다. -->
        <div>
            {{turn}} 님의 턴입니다.
        </div>
        <div v-if="winner"> 
            <!-- 승자가 있을 때만 보여주기 -->
            {{turnMessage}}
        </div>
</div>

</template>
<script>
import {mapGetters, mapState} from 'vuex';
    import store, {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from './store.js'; // store와 최상위 컴포넌트를 연결
    import TableComponent from './TableComponent.vue';

    export default{
        store,
        components: {
            TableComponent,
        },
        computed: {
            
            ...mapState(
                {                   
                    winner : state => state.winner,
                    turn: state => state.turn,
                    tableData: state => state.tableData,                    
                    
                }),
            ...mapGetters(['turnMessage'])
            // ...mapState({
            //     winner: state => state.winner, // 회살표 함수는 this 사용 불가, 일반 함수는 this 사용 가능
            //     turnState: 'turn', //이름을 바꿔서 가져올 수 있음. 
            // }),
            // tableData(){
            // return this.$store.state.tableData;  
            // },
            // turn(){
            //     return this.$store.state.turn;
            // },
            // winner(){
            //     return this.$store.state.winner;
            // }
        },
         methods:{
            onClickTd(rowIndex, cellIndex){ 
                console.log(this.cellData);
       
                if(this.cellData){
                    return; // 남이 이미 누른 칸에는 return 으로 함수 중단하기.
                }
            this.$store.commit(CLICK_CELL, {row: rowIndex, cell : cellIndex});
            //mutation 을 부를 때는 commit 을 사용하여 불러온다.  mutition 이름이 CLICK_CELL 인 것을 실행한다.
           
            let win = false;          
         
                if (this.tableData[rowIndex][0] ===this.turn && this.tableData[rowIndex][1] ===this.turn && this.tableData[rowIndex][2]){
                    win = true;
                }
                if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] ===this.turn && this.tableData[2][cellIndex] ===this.turn){
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
    }
</script>
<style>
        table{
        border-collapse: collapse;
    }
    td{
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>