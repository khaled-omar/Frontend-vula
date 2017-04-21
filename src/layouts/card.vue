<template>
	<a href="#" class="list-group-item">
		<h5 class="list-group-item-heading"><b>{{card.name}}</b></h5>
		<i v-on:click="removeCard(card.id)" class="fa fa-times " aria-hidden="true"></i>
	</a>
</template>
<script >
	export default{
		props:['card','cards','cardIndex'],
		methods:{
			removeCard(ID){
				var BoardID = this.$route.params.Board_ID;
				var ListID = this.card.mylist_id;

				this.$http.delete('http://localhost:8000/api/v1/Cards/'+this.card.id).then(res => {
					console.log(res);
					this.cards.splice(this.cardIndex,1);

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
</script>
<style scoped>
	h4{
		/*text-align: center*/
	}
	.fa{
		position: absolute;
		top:12px;
		right:9px;
	}
</style>

