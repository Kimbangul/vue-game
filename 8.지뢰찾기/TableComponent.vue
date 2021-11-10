<template>
<table>
    <slot />
    <!-- slot 자리에 상위 컴포넌트에서 정의했던 TableComponent의 자식 태그가 들어간다. -->
    <!-- slot을 여러 개 넣을 수 있고, slot 안에 자식 태그를 넣어 기본값을 설정할 수 있다. -->
    <!-- <slot>
        <tr>
            <td></td>
        </tr>
    </slot>    -->
    <!-- vue의 slot = react의 children -->
</table>
</template>
<script>
export default{

};
</script>
<style>

</style>
