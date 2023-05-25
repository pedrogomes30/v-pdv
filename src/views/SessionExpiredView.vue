<template>
    <div >
        <h1>EXPIROU

        </h1>
    </div>
</template>
<script>
    import router from '@/router';
    export default {
        name:'SessionExpiredView',
        mounted(){
            setTimeout(() => {
                router.push("/login");
            }, 1000)
        }
    }
</script>