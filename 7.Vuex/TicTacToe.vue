<template>
<div>
        <table-component v-bind:table-data="tableData" />
        <!-- 자식 컴포넌트에게 데이터를 전달해 줄 때엔 v-bind를 사용한다. -->
        <div>
            {{turn}} 님의 턴입니다.
        </div>
        <div v-if="winner"> 
            <!-- 승자가 있을 때만 보여주기 -->
            {{winner}}님의 승리!
        </div>
</div>

</template>
<script>
    // import Vue from 'vue';
    import TableComponent from './TableComponent.vue';
    import EventBus from './EventBus.js';

    export default{
        components: {
            TableComponent,
        },
        data(){
            return {
                tableData: [
                    ['','',''], 
                    ['','',''], 
                    ['','','']
                    // 2차원 배열: 배열 안에 배열이 또 들어가 있음!
                ],
                turn: 'O', // 클릭할 때마다 턴이 O에서 X로, X에서 O로 넘어감.
                winner: '',
            };
        },
        computed: {
            
        },
        methods: {
            onChangeData(){
                // this.tableData[1][0] = 'X'; << 작동하지 않는다.
                this.$set(this.tableData[1], 0, 'X'); // 바꾸고 싶은 값, 키.1,0 에 X를 넣는다. Vue.set과 동일
            },
            onClickTd(rowIndex, cellIndex){
                
                this.$set(this.tableData[rowIndex], cellIndex, this.turn);
                //매개변수로 바뀌었으므로 this.rowIndex에서 rowIndex로 변경.

                // 빙고가 생겼는지 확인하는 코 드 
                let win = false;
                if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2]){
                    win = true;
                }
                if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn){
                    win = true;
                }
                if (this.tableData[0][0] ===  this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn){
                    win = true;
                }
                if (this.tableData[0][2] ===  this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn){
                    win = true;
                }
                if (win){
                    // 이긴 경우 : 초기화
                    this.winner = this.turn;
                    this.turn = 'O';
                    this.tableData = [['','',''],['','',''],['','','']];
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
                        this.winner = ''; // 승자는 없다.
                        this.turn = 'O';
                        this.tableData = [['','',''],['','',''],['','','']];
                    } 
                    else{
                        // 게임이 안 끝났을 때는 턴을 다음 사람 턴으로
                        this.turn = this.turn === 'O' ?  'X' : 'O';  // 현재 턴이 O면 O를 넣고, 현재 턴이 X면 그 칸에 X를 넣는다.
                // 인덱스를 여러 개 쓰는 경우, 마지막 인덱스를 key로 하면 된다.
                    }
                }
            }
        },
        created(){
            EventBus.$on('clickTd', this.onClickTd);
            // 사용자 정의 이벤트를 등록해줄 수 있음.
            // clickTd 이벤트가 발생하면, onClickTd를 실행시키도록 예약

            //EventBus.$on('clickTr', this.onClickTr);
            // EventBus.$on('clickTable, this.onClickTable);
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