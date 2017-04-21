<template>
  <div id="app">
    <navBar></navBar>
    <div class="container">

      <div class="page-header row" style="overflow: hidden;">
        <div class="pull-left"> <h1 class="">Your boards</h1></div>
        <div class="pull-right" style="margin-top: 25px;">
          <button type="button" class="btn btn-danger btn-md pull-right" data-toggle="modal" data-target="#myModal">Add new Board</button>
        </div>
      </div>



      <div class="clearfix">
      </div>
      <draggable v-model="boards" >
        <transition-group>
          <Board v-for="(board,index) in Boards" 
          :key="board.id"
          :name="board.name" 
          :description="board.description"
          :ID="board.id" :Boards="Boards" :boardIndex="index"></Board>
        </transition-group>
      </draggable>
      <!-- Modal -->
      <addBoardModal :Boards="Boards"></addBoardModal>

    </div>
  </div>
</template>

<script>
  import navBar from './layouts/navbar.vue'
  import Board from './layouts/Board.vue'
  import addBoardModal from './layouts/addBoard.vue'
  import draggable from 'vuedraggable'

  export default {
    components:{
      navBar,
      Board,
      addBoardModal,
      draggable,
    },
    data () {
      return {
        Boards:[],
      };
    },
    beforeCreate:function(){
      if (this.$route.params.User_ID != localStorage.getItem('user_ID')) {
        this.$router.push('/');

      }
      this.$http.get('http://localhost:8000/api/v1/Boards').then(res => {
        console.log(res);
        this.Boards = res.body.Boards;
      }).catch(err => {
        console.log(err);
        if (err.status==401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user_ID');
          localStorage.removeItem('username');
          this.$router.push('/');
        }
      });
    },

  }
</script>

<style scoped>


  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .container .col-xs-6{
    /*margin-top:15px;
    /* border: 1px solid #104; */
  }

  .list-group-item{
    color: #2C3E50 !important;
    border: 1px solid  #CCC;
  }
  .form-inline {
    margin: 5px
  }
  .list-group{
    margin: 0
  }
  .page-header{
    margin: 0 0 50px;
    color:#ffe;
    border: 0;
  }
</style>
