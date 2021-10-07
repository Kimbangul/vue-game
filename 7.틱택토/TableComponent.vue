<template>
<table>
        <tr-component v-for="( rowData , index ) in tableData"  v-bind:key="index" v-bind:row-data="rowData" v-bind:row-index="index">
    </tr-component>
</table>
</template>
<script>
import TrComponent from './TrComponent.vue';

export default{
        components:{
        TrComponent,
    },
    props:{
        // 부모 컴포넌트에서 넘겨받은 데이터를 props로 받아 줌.
        tableData: Array,
    },
    data(){
        return{

        }
    },
    methods: {

    },
    computed:{

    }
}

</script>
<style>

</style>
