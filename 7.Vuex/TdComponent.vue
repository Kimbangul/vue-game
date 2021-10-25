<template>
    <td v-on:click="onClickTd">{{cellData}}</td>
</template>
<script>
    import EventBus from './EventBus.js';

    export default{
        props: {
            cellData: String, // O,X가 CellData가 될 것
            rowIndex: Number,
            cellIndex: Number
        },
        data(){
            return{

            }
        },
        methods:{
            onClickTd(){
                if(this.cellData){
                    return; // 남이 이미 누른 칸에는 return 으로 함수 중단하기.
                }
                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
                // clickTd 이벤트를 명시적으로 실행시킨다.
                // this.cellIndex와 this.rowIndex는 부모 컴포넌트에서 props로 받았는데, $emit을 통해 넘겨줄 수 있다.
            }
        },
        computed:{
            
        }

    }
</script>
<style scoped>

</style>
