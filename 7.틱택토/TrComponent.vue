<template>
    <tr>
        <td-component v-for=" (cellData, index) in rowData" v-bind:cell-data="cellData" v-bind:cell-index="index" v-bind:row-index="rowIndex"> </td-component>
    </tr>
</template>
<script>
  import TdComponent from './TdComponent.vue';
    export default{
      
        components:{
            TdComponent,
        },
        props:{
            rowData: Array,
            rowIndex: Number
        },
        data(){
            
        },
        methods: {

        },
        computed: {
            
        }
    }
</script>

<style scoped>


</style>