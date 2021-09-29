<template>
    <table-component v-bind="tableData">
        <!-- 자식 컴포넌트에게 데이터를 전달해 줄 때엔 v-bind를 사용한다. -->
    </table-component>
</template>
<script>
    import TableComponent from './TableComponent';

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
                ]
            };
        },
        computed: {

        },
        methods: {

        }
    }
</script>
<style scoped>

</style>