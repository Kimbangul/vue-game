<template>
<table>
        <tr-component v-for="( rowData , index ) in tableData"  v-bind:key="index"  v-bind:row-index="index">
    </tr-component>
</table>
</template>
<script>
import {mapState} from 'vuex';
import TrComponent from './TrComponent.vue';

export default{
        components:{
        TrComponent,
    },
    data(){
        return{

        }
    },
    methods: {

    },
    computed:{
        
        ...mapState(['tableData',]),
        // tableData(){
        //     return this.$store.state.tableData;
        // }
    }
}

</script>
<style>

</style>
