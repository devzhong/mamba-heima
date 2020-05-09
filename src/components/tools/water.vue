<template>

</template>

<script>
    export default {
        data(){
          return{
            value: '',
            cuid: ''
          }
        },
      methods:{
         async gatherWater(cuid, value){
           const that = this
           const res = this.$http.get('/usermanage/api/v1/waters?cuid='+this.cuid+'&value='+this.value).catch(function () {
             that.$message.error(that.SERVE_RERROR)
           })
           const {status,errorMessage}=res.data
           if (status ==='SUCCEED') {

           }
          }
      }
    }
</script>

<style scoped>

</style>
