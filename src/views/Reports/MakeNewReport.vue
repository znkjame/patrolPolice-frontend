<template>
  <div>
      Assignment ID : {{this.assignment_id}}
      RedBox ID : {{ this.red_box_id }}
  </div>
</template>

<script>
export default {
    data(){
        return {
            assignment_id:"",
            red_box_id:""
        }
    },
    created(){
        this.assignment_id = this.$route.params.assignment_id;
        this.red_box_id = this.$route.params.red_box_id;
    }
}
</script>

<style>

</style>