<template>
	<div>
		<navBar></navBar>
		<div class="container">
			<div class="page-header row" style="overflow: hidden;">
				<div class="pull-left">	<h1 class="">Your Lists</h1></div>
				<div class="pull-right" style="margin-top: 25px;">
					<button type="button" class="btn btn-danger btn-md pull-right" data-toggle="modal" data-target="#myModal">Add new List</button>
				</div>
			</div>

			<div class="row">
				<draggable v-model="lists" :options="{group:'lists'}">
					<transition-group>
						<list v-for="(list,index) in lists " :key="list.id" 
						:cards="list.cards ? list.cards : [] " 
						:List_ID="list.id" 
						:name="list.name" :lists="lists" :listIndex="index"></list>
					</transition-group>
				</draggable>
			</div>
		</div>
		<addList :lists="lists"></addList>

	</div>
</template>
<script >
	import Vue from 'vue';
	import VeeValidate from 'vee-validate';
	import draggable from 'vuedraggable'

	Vue.use(VeeValidate);
	import navBar from '../layouts/navbar.vue';

	import List from '../layouts/list.vue';
	import addList from '../layouts/addList.vue';

	export default{
		components:{
			List,
			addList,
			navBar,
			draggable,

		},
		data () {

			return {
				lists:[],
				List:{
					name:'',
				}
			};
		},
		methods:{
			addList(){
				var BoardID = this.$route.params.Board_ID;
				this.$http.post('http://localhost:8000/api/v1/Boards/'+BoardID+'/Lists',this.List).then(res => {
					console.log(res);
					var list = res.body.list;
					list.cards = [];
					this.lists.push(list);
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
		beforeCreate:function(){
			var BoardID = this.$route.params.Board_ID;
			this.$http.get('http://localhost:8000/api/v1/Boards/'+BoardID+'/Lists').then(res => {
				console.log(res);
				this.lists = res.body.Lists;
			}).catch(err => {
				console.log(err);
			});
		},
	}
</script>
<style scoped>
	body{background-color: #FFF;}
	.watch-card{margin-top:50px;margin-bottom:50px;}
	.watch-card > div{max-width:300px;}
	.watch-card:hover .artist-title a, .watch-card:hover .listing-tab .tab-content ul li a{color:#167ac9;}
	.listing-tab .tab-content ul li:hover{cursor:pointer;text-decoration:underline;}
	.artist-title{padding:15px;background: #E2E4E6;color: #4D4D4D;}
	.artist-title a{test-decoration:none;font-size:21px;font-family:arial, san-serif;color: #4D4D4D;}
	.artist-title a:hover{color:#16a3de;}
	.artist-collage img{max-width:100%;}
	.artist-collage{position:relative;max-height:150px;overflow:hidden;}
	.artist-collage,.artist-collage div{padding:0;}
	span.play-mix {
		position: absolute;
		top: 38%;
		z-index: 9;
		left: 30%;
		border: 3px solid rgba(255,255,255,.25);
	}
	span.btn.play-mix-btn {
		background-color: #000;
		padding: 5px 12px;
		border:none;
		border-radius: 2px;
		box-shadow:0 0 70px rgba(255,255,255,.5);
	}
	.collage-rhs img{margin-top:-5px;}
	span.play-mix-btn:hover {
		box-shadow: 0 0 80px rgba(255,255,255,.9);
	}
	.listing-tab{
		padding:0;    
	}.related-artist .artist-next{padding-left:0;}
	.related-artist .col-md-12{padding-right:0;}
	.play-mix-btn span {
		color: #1775bc;
	}
	.related-artist img{width:100%;}
	.related-artist h3 {
		font-size: 17px;
		margin-left: 15px;
		margin-top: 9px;
	}.related-artist{overflow:hidden;padding-bottom:10px;}
	.listing-tab .tab-content ul{padding:0;margin:0;}
	.listing-tab .tab-content ul li {
		list-style-type: none;
		border-bottom: 1px solid #eee;
		padding: 8px;
	}.listing-tab .tab-content ul li {
		list-style-type: none;
		border-bottom: 1px solid #eee;
		padding: 8px;
		padding-left: 20px;
		font-size: 13px;
		color: #F57336;
	}.listing-tab .tab-content ul li a{text-decoration:none;color: #F57336;}
	.listing-tab .tab-content ul li span{display:inline-block;float:right;padding-right:10px;}
	.listing-tab .nav-tabs>li,.nav-tabs>li a:hover{margin-bottom:0;background:none;}
	.listing-tab .nav-tabs>li.active>a, .nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus{border:none;background:none;}
	.listing-tab .nav-tabs>li>a:hover{border-color:none;color:red;}
	.listing-tab .nav-tabs>li>a{border:0;padding:17px 0 7px;color:#333;margin-left:15px;}
	.listing-tab .nav-tabs>li.active>a{border-bottom:2px solid #bb0000;color:#000;}
	.listing-tab{background-color: #E2E4E6;/* border: 1px solid #F57336; */height: auto; margin-bottom: 30px;}
	.container .col-xs-6{
		margin-top:15px;
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

	.list-group-item{
		/*height:60px*/
		padding: 23px 19px;
	}
	.page-header{
		margin: 0 0 50px;
		color:#ffe;
		border: 0;
	}

</style>