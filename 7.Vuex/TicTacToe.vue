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