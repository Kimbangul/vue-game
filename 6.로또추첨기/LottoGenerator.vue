<template>
    <div>
        <div>당첨 숫자</div>
        <div id="result">
            <lotto-ball v-for="ball in winBalls" v-bind:key="ball.number" v-bind:number="ball"></lotto-ball>
            <!-- props 도 bind가 가능하다! -->
        </div>
        <div>보너스</div>
         <lotto-ball  v-if="bonus"  v-bind:number="bonus" > </lotto-ball>
         <button v-if="redo" @click="onClickRedo">한번 더!</button>
    </div>
</template>
<script>
    import LottoBall from './LottoBall.vue';

        function getWinNumbers(){
            // 셔플 정렬 후 랜덤으로 숫자 7개 뽑기.(앞에서부터 7개를 자름)
            const candidate = Array(45).fill().map((value, index) => index + 1);
            // 45개의 빈 슬롯을 가진 Array 객체 생성 후 index에 1을 더하기. 즉, 1부터 45까지 뽑는 코드.
            // map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
            const shuffle = [];
            while (candidate.length > 0){
                shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]); // 무작위 인덱스 뽑기, candidate 배열에 들어 있는 값을 꺼내어 shuffle 배열에 넣기
            }
            //  반복이 끝나면 candidate 배열에는 아무 값이 없고, shuffle 배열에 1부터 45까지의 숫자가 랜덤한 순서로 들어간다.
            const bonusNumber = shuffle[shuffle.length - 1];
            const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
            // sort() 메서드는 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환합니다. 정렬은 stable sort가 아닐 수 있습니다. 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따릅니다.
            // 문자열 대신 숫자를 비교하기 위해 compare 함수는 a에서 b를 뺄 수 있습니다. 다음 함수는 배열을 오름차순으로 정렬합니다 (Infinity 및 NaN이 포함되어 있지 않은 경우)
            return [...winNumbers, bonusNumber];
        }

        const timeOuts = [];

        export default {
            components: {
                // 불러온 자식 컴포넌트를 등록하기.
                'lotto-ball': LottoBall, // 컴포넌트의 이름, 실제 export default한 객체. 파스칼케이스와  케밥케이스가 호환되는 경우에는 LottoBall 로만 생략하여 적어도 된다.
            },
        data (){
            return {
                winNumbers: getWinNumbers(),
                winBalls: [], // 뽑은 공들
                // 시각적 재미를 위해 공을 전부 뽑아놓고, winBalls 배열에 1초마다 winNumbers 에 있는 값을 집어넣는다.
                bonus: null, // 보너스 공
                redo: false, // '한번 더 ' 버튼이 보이는지 안 보이는 지를 판단하는 변수
            }
        },
        methods: {
            showBalls(){
                // 중복되는 부분을 method로 빼 준다.
                 for (let i = 0; i < this.winNumbers.length - 1; i++){ // winNumbers에는 보너스 공까지 7개를 뽑아뒀기 때문에 6개만 뽑기!
                timeOuts[i] = setTimeout(() => {
                    // let을 쓰면 클로저 문제가 생기지 않기 때문에 반복문 안에 setTimeOut을 사용해도 된다. 
                    this.winBalls.push(this.winNumbers[i]);
                } , (i+1) * 1000);
            }
            timeOuts[timeOuts.length+1] = setTimeout(() => {
                this.bonus = this.winNumbers[this.winNumbers.length - 1];
                this.redo = true;
            }, (this.winNumbers.length + 1) * 1000 );
            },
            onClickRedo(){
                // 모든 데이터 초기화
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
                this.showBalls();
            }
        },
        mounted(){
           this.showBalls();
        },
        beforeDestroy(){
            timeOuts.forEach((t) => {
                clearTimeout(t);
                // forEach() 메서드는 주어진 함수를 배열 요소 각각에 대해 실행합니다.
            });
        },
        watch: {

        }

    }
</script>
<style>
    .ball{
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px;
    }
</style>