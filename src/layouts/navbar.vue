<template>
	<nav class="navbar navbar-default">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<a class="navbar-brand" href="/">Vula</a>
			</div>

			<div class="navbar-header pull-right">
				<a  v-on:click.prevent="logout" class="navbar-brand" href="#">Logout</a>
			</div>
		</div><!-- /.container-fluid -->
	</nav>
</template>
<script>
	export default {

		name: 'navbar',

		data () {
			return {

			};
		},
		methods:{
			logout(){
				localStorage.removeItem('token');
				localStorage.removeItem('user_ID');
				localStorage.removeItem('username');
				this.$router.push('/');
			}
		}
	};
</script>
<style>
	.navbar-default{
		background:#333;
		border:0px;
	}

	.navbar-default a{
		color: #d9534f !important;
	}
</style>