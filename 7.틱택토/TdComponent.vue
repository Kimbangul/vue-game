<template>
    <td v-on:click="onClickTd">{{cellData}}</td>
</template>
<script>
    

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

                // td를 클릭할 때마다 부모 컴포넌트에서 정의했던 turn을 바꿔준다.
                // console.log(this.$root.$data);
                //가장 최상의 부모의 데이터에 접근 가능하다.
                // console.log(this.$parent.$data);
                const rootData = this.$root.$data;
                // rootData.tableData[this.rowIndex][this.cellIndex] = this.$root.data.turn; 
                console.log(rootData.tableData);
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

                // 빙고가 생겼는지 확인하는 코 드 
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
                    rootData.winner = rootData.turn;
                    rootData.turn = 'O';
                    rootData.tableData = [['','',''],['','',''],['','','']];
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
                        rootData.winner = ''; // 승자는 없다.
                        rootData.turn = 'O';
                        rootData.tableData = [['','',''],['','',''],['','','']];
                    } 
                    else{
                        // 게임이 안 끝났을 때는 턴을 다음 사람 턴으로
                        rootData.turn = rootData.turn === 'O' ?  'X' : 'O';  // 현재 턴이 O면 O를 넣고, 현재 턴이 X면 그 칸에 X를 넣는다.
                // 인덱스를 여러 개 쓰는 경우, 마지막 인덱스를 key로 하면 된다.
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
