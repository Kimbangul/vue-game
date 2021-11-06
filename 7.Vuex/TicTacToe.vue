<template>
<div>
        <table-component v-bind:table-data="tableData" />
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
    import store from './store.js'; // store와 최상위 컴포넌트를 연결
    import TableComponent from './TableComponent.vue';

    export default{
        store,
        components: {
            TableComponent,
        },
        computed: {
            
            ...mapState(['winner', 'turn', 'tableData']),
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