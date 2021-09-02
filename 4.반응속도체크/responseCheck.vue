<template>
    <div>
        <div id="screen" v-bind:class="state"> 
            <!-- class 등의 html 속성에 데이터나 자바스크립트 표현식을 넣어주고 싶다 -> v-bind 사용 -->
            <!-- v-bind는 축약해서  사용 가능. v-bind:class는 :class 로 줄여 사용할 수 있다. -->
            {{message}}
            <!-- 사용자가 클릭하는 화면 -->
        </div>
        <div>
            <div>평균 시간: {{}}</div>
            <button v-on:click.prevent="onReset">리셋</button>
        </div>
    </div>
</template>
<script>


    export default {
    
        data(){
            return{
                result: [],
                state: 'waiting', // class 를 나타내는 데이터
                message: '클릭해서 시작하세요.',
            }
        },
        methods: {
            onReset: function(){

            }
        }
    }; 
</script>
<style scoped>
/* scoped 를 붙여 주면 이 컴포넌트에서만 css가 유효해진다.  */
/* class 에 따라 screen div의 색상 변경 */
    #screen{
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting{
        background-color: aqua;
    }
    #screen.ready{
        background-color: red;
    }
    #screen.now{
        background-color: greenyellow;
    }
</style>