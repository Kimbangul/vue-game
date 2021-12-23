<template>
    <div>
        <!-- 공통적인 부분(레이아웃), 바뀌지 않는 부분 -->
        <router-link to="/number-baseball">숫자야구</router-link>
        <router-link to="/response-check">반응속도</router-link>
        <router-link to="/rock-scissors-paper">가위바위보</router-link>
        <router-link to="/lotto-generator">로또생성기</router-link>
        <!-- a태그로 바뀌지만, a태그처럼 실제로 다른 페이지로 이동하는 것이 아니라 컴포넌트를 불러오는 특수한 기능을 해 줌. -->
        <router-view>
            <!-- 컴포넌트가 뜨는 위치, 바뀌는 부분 -->
        </router-view>
    </div>
</template>
<script>
    import router from './routes.js';
    export default{
        router,
    }
</script>
<style>
    table{
        border-collapse: collapse;
    }
    td{
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>