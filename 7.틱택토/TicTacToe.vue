<template>
<div>
        <table-component v-bind:table-data="tableData" />
        <!-- 자식 컴포넌트에게 데이터를 전달해 줄 때엔 v-bind를 사용한다. -->
        <div>
            {{turn}} 님의 턴입니다.
        </div>
</div>

</template>
<script>
    // import Vue from 'vue';
    import TableComponent from './TableComponent.vue';

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
            };
        },
        computed: {
            
        },
        methods: {
            onChangeData(){
                // this.tableData[1][0] = 'X'; << 작동하지 않는다.
                this.$set(this.tableData[1], 0, 'X'); // 바꾸고 싶은 값, 키.1,0 에 X를 넣는다. Vue.set과 동일
            }
        }
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