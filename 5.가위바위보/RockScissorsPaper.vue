<template>
    <div>
        <div id="computer" v-bind:style="computedStyleObject">
            <!-- {backgroundImage:'', fontSize: '14px'} -->
            
        </div>
        <div>
            <button @click="onClickBtn('바위')">바위</button>
            <button @click="onClickBtn('가위')">가위</button>
            <button @click="onClickBtn('보')">보</button>
            <!-- 함수 호출하듯이 인자를 전달해 줄 수 있음! -->
        </div>
        <template>
            <div id="result" v-if="result">{{result}}</div>
            <div class="score">현재 {{score}} 점</div>
        </template>
    </div>
</template>
<script>

const rspPosition = {
            '바위' : '0',
            '가위':  '-142px',
            '보': '-284px'
        };
        // 가위바위보 표

const scores = {
    가위 : 1,
    바위: 0,
    보: -1,
};

const computerChoices = (imgPosition) => {
    return Object.entries(rspPosition).find(function(v){
        return v[1] === imgPosition;
    })[0];
}

let interval = null;

    export default {

        data(){
            return {
                score: 0,
                result: null,
                imgPosition: rspPosition.바위,
            }
        },
        computed:{
            computedStyleObject(){
                return {
                    background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgPosition} 0` 
                    // 데이터만 그대로 쓰는 것이 아니라 이렇게 무언가 붙어있으면 computed에 넣어준다.
                }
            }
        },
        methods: {
            changeHand: function(){
                interval = setInterval(() => {
                // 후에 clearInterval 로 멈춰주기 위해 번수로 저장.
                if (this.imgPosition ===  rspPosition.바위){
                    this.imgPosition = rspPosition.가위;
                } 
                else if (this.imgPosition === rspPosition.가위){
                    this.imgPosition = rspPosition.보;
                }
                else if(this.imgPosition === rspPosition.보){ 
                    this.imgPosition = rspPosition.바위;
                }
            }, 100)
            // 0.1초마다 가위바위보 그림 바꾸기
            }, // 중복을 제거하기 위해 메서드를 사용하기도 함.
            onClickBtn: function(userSelect){
                    clearInterval(interval);
                    // 잠시 컴퓨터의 손이 움직이는 것을 멈춰줌.
                    const myScore = scores[userSelect];
                    const cpuScore = scores[computerChoices(this.imgPosition)];
                    const diff = myScore - cpuScore;
                
                    if (diff === 0){
                        this.result = '비겼습니다!';
                    } else if ([-1, 2].includes(diff) ){
                        this.result = '이겼습니다!';
                        this.score += 1;
                    } else{
                        this.result = '졌습니다.';
                        if(this.score > 0){
                            this.score -= 1;
                        }
                    }

                    setTimeout(this.changeHand, 1000);
                }
            },
        mounted(){
            this.changeHand()
        },
        beforeDestroyed(){
            clearInterval(interval);
            // setInterval은 화면에서 컴포넌트가 사라져도 계속 실행이 된다. 이는 메모리 누수를 유발함.
            // 이를 방지하기 위해 beforeDsetory에서 clearInterval() 에서 최종 정리를 해 준다.
        }
    }; 
</script>
<style scoped>
    #computer{
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>