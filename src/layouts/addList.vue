<template>
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Add New Board</h4>
        </div>
        <div class="modal-body">
          <form role="form" v-on:submit.prevent="addList">
            <div class="form-group">
              <label for="name">Name </label>
              <input type="text" name="name" 
              class="form-control" id="name" placeholder="Enter Title"
              v-validate="'required|min:3'" 
              :class="{'input': true, 'is-danger': errors.has('name') }"
              v-model="List.name">
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>

      </div>

    </div>
  </div>
</template>
<script>

  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate);
  export default {
    props:['lists'],
    data () {

      return {
        List:{
          name:'',
          description:''
        },
      };
    },
    methods:{
      addList(){
        var BoardID = this.$route.params.Board_ID;
        this.$http.post('http://localhost:8000/api/v1/Boards/'+BoardID+'/Lists',this.List).then(res => {
          console.log(res);
          this.lists.push(res.body.list);
          $(function () {
            $('#myModal').modal('toggle');
          });
          //location.reload();
        }).catch(err => {
          console.log(err);
          //toke expired
          if (err.status==401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_ID');
            localStorage.removeItem('username');
            this.$router.push('/');
          }
        });
      }

    },
  }
</script>
<style >
  .is-danger{
    border: 1px solid #f00
  }
  .help {
    color:#f00;
    border:0;
  }
</style>