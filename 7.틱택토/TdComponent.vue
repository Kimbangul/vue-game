<template>
    <td>{{cellData}}</td>
</template>
<script>
    export default{
        props: {
            cellData: String, // O,X가 CellData가 될 것
            index: Number,
            rowIndex: Number
        },
        data(){

        },
        methods:{

        },
        computed:{
            
        }
    }
</script>
<style scoped>

</style>
