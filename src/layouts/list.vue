<template>
	<div class="col-sm-6 col-md-4">
		<div class="artist-title col-md-12">
			<h4 >{{name}}</h4>
			<i  v-on:click="editBoard(ID)" class="fa fa-pencil" aria-hidden="true"></i>
			<span v-on:click="removeList(List_ID)"class="glyphicon glyphicon-remove" aria-hidden="true"></span>
			
		</div>

		<div class="listing-tab col-md-12">
			<!-- Tab panes -->
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane active" id="track">

					<div class="list-group">
						<draggable v-model="cards" :options="{group:'cards'}">
							<transition-group>
								<card v-for="(card,index) in cards" 
								:key="card.id" :card='card'
								:cards="cards" :cardIndex="index"></card>
							</transition-group>
						</draggable>
					</div>
					<form class="form-inline" role="form" v-on:submit.prevent="addCard">
						<div class="form-group">
							<input type="text" class="form-control" 
							id="name" placeholder="Name" v-model="card.name">
						</div>
						<button type="submit" class="btn btn-danger ">Add</button>
					</form>

				</div>

			</div>
		</div>
	</div>

</template>
<script >
	import card from '../layouts/card.vue'
	import VeeValidate from 'vee-validate';
	import draggable from 'vuedraggable'

	export default{
		props:['cards','List_ID','name','lists','listIndex'],
		data(){
			return{
				card:{
					name:''
				}
			}
		},
		components:{
			card,
			draggable,
		},
		methods:{
			addCard(){
				var BoardID = this.$route.params.Board_ID;

				this.$http.post('http://localhost:8000/api/v1/Boards/'+BoardID+'/Lists/'+this.List_ID+'/Cards',this.card).then(res => {
					console.log(res);
					this.cards.push(res.body.card);
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
			},
			removeList(ID){
				//alert(ID);
				if (confirm('Are You Sure u wanna delete list ?')) {

					this.$http.delete('http://localhost:8000/api/v1/Lists/'+ID).then(res => {
						console.log(res);
						this.lists.splice(this.listIndex,1);

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
			}
		}
	}
</script>
<style scoped>
	.form-group{
		width: 84%
	}
	#name{
		width: 100%
	}
	body{background-color: #FFF;}
	.watch-card{margin-top:50px;margin-bottom:50px;}
	.watch-card > div{max-width:300px;}
	.watch-card:hover .artist-title a, .watch-card:hover .listing-tab .tab-content ul li a{color:#167ac9;}
	.listing-tab .tab-content ul li:hover{cursor:pointer;text-decoration:underline;}
	.artist-title{background: #E2E4E6;color: #4D4D4D; padding: 9px 13px}
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
	.listing-tab .nav-tabs>li.active>a{border-bottom:2px solid #bb0000;color:#000; ;}
	.listing-tab{background-color: #E2E4E6;border-radius:10px;height: auto; margin-bottom: 30px;}
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
		padding:18px 13px;
		border-radius: 5px;
	}
	.artist-title{
		cursor: pointer;
	}
	.fa{
		position: absolute;
		top:15px;
		right:28px;
	}
	.glyphicon-remove{
		position: absolute;
		top:15px;
		right:9px;
	}
	.artist-title{
		background:#d9534f !important;
		color:#fff !important;
	}
	.panel{
		border: 0 solid transparent !important;
	}

</style>