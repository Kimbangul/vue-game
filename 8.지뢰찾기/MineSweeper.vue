<template>
<div>
    <mine-form></mine-form> 
    <!-- 사용자가 마인 설정할 form -->
    <div>{{timer}}</div>
    <table-component></table-component>
    <div>{{result}}</div>
</div>
</template>
<script>
import {mapGetters, mapState} from 'vuex';
    import store, {CHANGE_TURN, CLICK_CELL, INCREMENT_TIMER, NO_WINNER, RESET_GAME, SET_WINNER} from './store.js'; // store와 최상위 컴포넌트를 연결
    import TableComponent from './TableComponent.vue';
    import MineForm from './MineForm.vue'

    export default{
        store,
        components: {
            TableComponent,
            MineForm,
        },       
        computed: {
         ...mapState(['timer','result', 'halted']),
        },
        methods:{
         
        },    
        watch:{
            // 통제된 환경에서는 watch를 써도 무방
            halted(value, oldvalue){
                if (value === false){
                    // false 일 때 게임 시작
                    interval = setInterval(() => { // 메모리 누수를 막기 위해 변수로 저장
                        this.$store.commit(INCREMENT_TIMER);
                    }, 1000); //게임이 시작되면 1초마다 타이머 1씩 증가
                }
                else{ //게임 중단
                    clearInterval(interval);
                }
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