<template>
<div>
    <mine-form></mine-form>
    <div>{{timer}}</div>
    <table-component></table-component>
    <div>{{result}}</div>
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
         ...mapState(['timer','result']),
        },
        methods:{
         
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