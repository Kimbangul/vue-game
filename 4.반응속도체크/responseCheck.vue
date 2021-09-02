// 확장자는 vue 지만 자바스크립트 파일!
// 뷰 컴포넌트가 바로 Vue 파일!

<template>
    <div>
        <div id="screen">
            {{message}}
            <!-- 사용자가 클릭하는 화면 -->
        </div>
        <div>
            <div>평균 시간: {{}}</div>
            <button v-on:click="onReset">리셋</button>
        </div>
    </div>
</template>
<script>


    export default {
    
        data(){
            return{
                result: [],
                state: 'waiting',
                message: '클릭해서 시작하세요.',
            }
        },
        methods: {
            onReset: function(){

            }
        }
    }; 
</script>
<style>

</style>