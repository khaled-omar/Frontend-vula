<template>
	<div class="mycard col-md-3">
    <div class="panel panel-default ">
      <div class="panel-heading clearfix">

        <h3 class="panel-title pull-left">{{name}}</h3>
        <i v-on:click="removeBoard(ID)"class="fa fa-times pull-right" aria-hidden="true"></i>
        <i  v-on:click="editBoard(ID)" class="fa fa-pencil-square-o 2x pull-right" aria-hidden="true"></i>

      </div>
      <div class="list-group">
        <a :href="link" class="list-group-item router-link">
          <p class="list-group-item-text">{{description}}</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
	export default{
		props:['name','description','ID','Boards','boardIndex'],
    data () {

      return {
        link:'',
      };
    },
    mounted:function(){
      this.link = '/Home/'+this.$route.params.User_ID +'/Boards/'+this.ID;
    },
    methods:{
      editBoard(ID){
        alert('editBoard ' + ID);

      },
      removeBoard(ID){
        //alert('removeBoard ' + ID);
        if (confirm('Are You Sure u wanna delete Board ?')) {
            this.$http.delete('http://localhost:8000/api/v1/Boards/'+ID).then(res => {
              console.log(res);
              this.Boards.splice(this.boardIndex,1);

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
  }
</script>
<style>

  .fa{
   cursor: pointer;
  }
  .panel-heading{
    background:#d9534f !important;
    color:#fff !important;
  }
  .panel{
    border: 0 solid transparent !important;
  }
  .list-group{
    font-weight: bold
  }
</style>