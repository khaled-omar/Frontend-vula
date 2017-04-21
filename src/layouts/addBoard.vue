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
         <div v-if="credentialsErrors.length > 0" class="alert alert-danger ">
          <ul>
            <li v-for="(value,key) in credentialsErrors[0]">
              {{ value[0] }}
            </li>
          </ul>
        </div>
        <form role="form" v-on:submit.prevent="addBoard">
          <div class="form-group">
            <label for="name">Name </label>
            <input type="text" name="name" 
            class="form-control" id="name" placeholder="Enter Title"
            v-validate="'required|min:3'" 
            :class="{'input': true, 'is-danger': errors.has('name') }"
            v-model="Board.name">
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
          </div>
          <div class="form-group">
            <label for="">Description: </label>
            <textarea name="description" id="input" class="form-control" 
            rows="3" required="required"
            v-validate="'required|min:5'" 
            :class="{'input': true, 'is-danger': errors.has('description') }"
            v-model="Board.description"></textarea>
            <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
          </div>


          <button v-if="!errors.errors.length" type="submit" class="btn btn-primary">Submit</button>
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
    props:['Boards'],

    data () {
      return {
        credentialsErrors:[],
        Board:{
          name:'',
          description:''
        },
      };
    },
    methods:{
      addBoard(){
       this.$http.post('http://localhost:8000/api/v1/Boards',this.Board).then(res => {
        console.log(res);
        this.Boards.push(res.body.board);

        $(function () {
          $('#myModal').modal('toggle');
        });
      }).catch(err => {
        console.log(err);
        //toke expired
        if (err.status==401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user_ID');
          localStorage.removeItem('username');
          this.$router.push('/');
        }
        if (err.status==422) {
            this.credentialsErrors.splice(0,this.credentialsErrors.length);
            this.credentialsErrors.push(err.body);
          }
      });
    }

  }
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