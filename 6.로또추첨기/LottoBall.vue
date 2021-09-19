<template>
    <div class="ball" v-bind:style="styleObject">
        <!-- 공 숫자와 공의 배경 색상 -->
        {{number}}
    </div>
</template>
<script>
    export default{
        name: 'LottoBall',
        props: {
            number: Number,
            // 주의할 점: props는 바꿀 수 없다.
        },
        computed: {
            styleObject(){
                   let background;
            if (this.number <= 10){
                // this.number를 통해 계산하는 것이므로 computed. 기존 값을 통해 새로운 값을 도출해내는 경우 computed를 사용한다.
                background = "red";
            } else if (this.number <= 20){
                background = "orange";
            } else if (this.number <= 30){
                background = "yellow";
            }
            else if (this.number <=40){
                background = "blue";
            }
            else{
                background ="green";
            }
            return{
                background,
            }
            }
        },
        methods: {

        }
    }
</script>
<style scoped>

</style>