// 확장자는 vue 지만 자바스크립트 파일!
// 뷰 컴포넌트가 바로 Vue 파일!

<template>
    <div>
        <h1>{{result}}</h1>
        <form v-on:submit.prevent="onSubmitForm">
            <!-- v-on: 은 @로 대체할 수 있다. -->
            <!-- preventDefault() 를 사용하기 귀찮으면 .prevent 장식자를 붙여주면 된다. -->
            <input ref="answer" minlength="4" maxlength="4" v-model="value">
            <button type="submit">입력</button>
        </form>   
        <div>시도: {{tries.length}}</div>
        <!-- 배열의 갯수 표시 -->

            <li v-for="t in tries">
                <!-- try는 예약어라서 쓸 수 없음. -->
                <div>{{t.try}}</div>
                {<div>{{t.result}}</div>
            </li>
            <!-- v-for를 이용해 배열의 내용을 반복해서 써 줌 -->
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                tries: [], // 시도.  '입력' 버튼을 누를 때마다  배열에 어떤 시도를 했는지 push로 기록한다.
                value: '',
                result: ''
            }
        },
        methods: {
            onSubmitForm(e){
                // e.preventDefault();
                this.tries.push({
                    try: this.value,
                    result: '',
                });
                // tries 안에 객체 넣기
                this.value = '';
                this.$refs.answer.focus();
            }
        }
    }; 
</script>
<style>

</style>