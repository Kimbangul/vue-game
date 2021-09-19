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

            <li v-for="t in tries" v-bind:key="t.try">
                <!-- try는 예약어라서 쓸 수 없음. -->
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
            <!-- v-for를 이용해 배열의 내용을 반복해서 써 줌 -->
        </ul>
    </div>
</template>
<script>
// 데이터나 화면과 크게 관련이 없기 때문에, 굳이 methods에 적지 않음. 다른 컴포넌트에서도 쓸 수 있음.
    const getNumbers = () =>{
        const candidates = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for (let i = 0; i < 4; i+=1){
            const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            array.push(chosen);
        }
        return array;
    }

    export default {
        // export default 한 객체를 main.js에서 import 로 불러온다.
        data(){
            return{
                answer: getNumbers(), // 랜덤한 숫자를 정답으로 지정. ex) [1,2,3,4]
                tries: [], // 시도.  '입력'  버튼을 누를 때마다  배열에 어떤 시도를 했는지 push로 기록한다.
                value: '',
                result: ''
            }
        },
        methods: {
            onSubmitForm(e){
                // e.preventDefault();
                if (this.value ===  this.answer.join('')){ //value 는 문자열이지만 answer는 배열이다.
                    //  정답을 맞췄으면
                    this.tries.push({
                        // tries 안에 객체 넣기
                    try: this.value,
                    result: '홈런',
                });
                this.result = '홈런';
                alert('게임을 다시 실행합니다.');
                // 초기화
                this.value = '';
                this.answer = getNumbers();
                this.tries= [];
                this.$refs.answer.focus();
                }
                else{
                    // 정답을 틀렸을 때
                    if(this.tries.length >= 9){ // 10번째 시도
                        this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')} 였습니다!`
                        alert('게임을 다시 시작합니다.');
                        this.value = '';
                        this.answer = getNumbers();
                        this.tries = [];
                        this.$refs.answer.focus();

                    }
                    else{

                    }
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v)); // 문자열을 숫자 배열로 바꾸는 코드. 배열을 순회하며 요소를 정수화하여 새로운 배열로 반환.

                    for (let i = 0; i<4; i++){
                        if (answerArray[i] === this.answer[i]){ // 숫자 자릿수 모두 정답
                            strike++;
                        }
                        else if (this.answer.includes(answerArray[i])) { // 숫자만 정답,  includes는 배열이 특정 요소를 포함하고 있는지 판별
                            ball++;
                        }
                    }

                    this.tries.push({
                        try : this.value,
                        result : `${strike} 스트라이크, ${ball} 볼`
                    });
                     this.value = '';
                     this.$refs.answer.focus();
                }
            }
        }
    }; 
</script>
<style>

</style>