<template>
    <div>
        <div id="screen" v-bind:class="state" v-on:click="onClickScreen"> 
            <!-- class 등의 html 속성에 데이터나 자바스크립트 표현식을 넣어주고 싶다 -> v-bind 사용 -->
            <!-- v-bind는 축약해서  사용 가능. v-bind:class는 :class 로 줄여 사용할 수 있다. -->
            {{message}}
            <!-- 사용자가 클릭하는 화면 -->
        </div>
        <template v-if="result.length">
            <div>평균 시간: {{average}}ms</div>
            
            <button v-on:click.prevent="onReset">리셋</button>
        </template>
    </div>
</template>
<script>


    let startTime = 0; //화면이 보여진 시각
    let endTime = 0; // 화면을 보고 클릭한 시각
    let timeOut = null;
    // 화면에 보이지 않는 데이터는 vue 밖에서 정의!

    export default {
        data(){
            return{
                result: [],
                state: 'waiting', // class 를 나타내는 데이터
                message: '클릭해서 시작하세요.',
            }
        },
        computed: {
            average(){
                return this.result.reduce((a, c)=>a + c, 0) / this.result.length || 0
            //   reduce () 함수로 배열의 각 값을 더해 배열의 길이로 나누어 평균값 구하기
            // 초깃값으로 0을 줌.
            },
        },
        methods: {
            onReset: function(){
                this.result = [];
            },
            onClickScreen: function(){
                // 데이터를 바꿔 주면 화면은 자동으로 바뀐다.
                if (this.state === 'waiting'){
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요';
                    timeOut = setTimeout(()=>{
                        this.state = 'now';
                        this.message = '지금 클릭!';
                        startTime = new Date();
                    }, Math.floor(Math.random() * 1000) + 2000); // 대략 2~3초

                } else if (this.state === 'ready'){
                    this.state = 'waiting';
                    this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요' ;
                    clearTimeout(timeOut);
                } else if (this.state === 'now' ){
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message= '클릭해서 시작하세요.'
                    this.result.push(endTime - startTime);
                }
            }
        },
        
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