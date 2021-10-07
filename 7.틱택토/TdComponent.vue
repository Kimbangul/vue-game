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
                // td를 클릭할 때마다 부모 컴포넌트에서 정의했던 turn을 바꿔준다.
                // console.log(this.$root.$data);
                //가장 최상의 부모의 데이터에 접근 가능하다.
                // console.log(this.$parent.$data);
                const rootData = this.$root.$data;
                // rootData.tableData[this.rowIndex][this.cellIndex] = this.$root.data.turn; 
                console.log(rootData.tableData);
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
                rootData.turn = rootData.turn === 'O' ?  'X' : 'O';  // 현재 턴이 O면 O를 넣고, 현재 턴이 X면 그 칸에 X를 넣는다.
                // 인덱스를 여러 개 쓰는 경우, 마지막 인덱스를 key로 하면 된다.
               
            }
        },
        computed:{
            
        }

    }
</script>
<style scoped>

</style>
