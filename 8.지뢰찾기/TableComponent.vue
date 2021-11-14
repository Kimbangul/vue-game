<template>
<table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
    </tr>
    <!-- 2차원 배열 데이터를 가져와 v-for로 렌더링 -->
</table>
</template>
<script>
import {mapState} from 'vuex';

export default{
    computed:{
        ...mapState(['tableData']),
    }
};
</script>
<style>

</style>
