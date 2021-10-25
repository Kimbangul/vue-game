<template>
    <tr>
        <td-component v-for=" (cellData, index) in rowData"  v-bind:key="index" v-bind:cell-data="cellData" v-bind:cell-index="index" v-bind:row-index="rowIndex"> </td-component>
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
            return{
                parent: '내가 니 엄마다!',
            }
        },
        methods: {

        },
        computed: {
            
        }
    }
</script>

<style scoped>


</style>