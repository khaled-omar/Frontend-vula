<template>
	<!-- Top content -->
	<div class="top-content">

		<div class="container">

			<div class="row">
				<div class="col-sm-5">

					<login></login>	

					<div class="social-login">
						<h3>...or login with:</h3>
						<div class="social-login-buttons">
							<a class="btn btn-link-2" href="#">
								<i class="fa fa-facebook"></i> Facebook
							</a>
							<a class="btn btn-link-2" href="#">
								<i class="fa fa-twitter"></i> Twitter
							</a>
							<a class="btn btn-link-2" href="#">
								<i class="fa fa-google-plus"></i> Google Plus
							</a>
						</div>
					</div>

				</div>

				<div class="col-sm-1 middle-border"></div>
				<div class="col-sm-1"></div>

				<div class="col-sm-5">

					<register></register>

				</div>
			</div>

		</div>

	</div>
</template>

<script>
	
	import login from '../layouts/login.vue'
	import register from '../layouts/register.vue'
	export default{
		components:{
			login,
			register,

		},
		beforeCreate:function(){
			var token;
			if(token = localStorage.getItem('token') )
			{
				var userID = localStorage.getItem("user_ID");
					//alert(res.body.token);
					this.$router.push('/home/'+userID);
				}
			}
			//this.$router.push('/');
		}
	</script>
	<style>
		body {
			font-family: 'Roboto', sans-serif;
			background:url('../assets/1.jpg');
			background-size:cover;                      /* <------ */
			background-repeat:no-repeat;

		}
	</style>
	<style scoped>


		.top-content{
			font-size: 16px;
			font-weight: 300;
			color: #888;
			line-height: 30px;
			text-align: center;
		}
		strong { font-weight: 500; }

		a, a:hover, a:focus {
			color: #19b9e7;
			text-decoration: none;
			-o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
		}

		h1, h2 {
			margin-top: 10px;
			font-size: 38px;
			font-weight: 100;
			color: #555;
			line-height: 50px;
		}

		h3 {
			font-size: 22px;
			font-weight: 300;
			color: #555;
			line-height: 30px;
		}

		img { max-width: 100%; }

		::-moz-selection { background: #19b9e7; color: #fff; text-shadow: none; }
		::selection { background: #19b9e7; color: #fff; text-shadow: none; }


		.btn-link-1 {
			display: inline-block;
			height: 50px;
			margin: 5px;
			padding: 16px 20px 0 20px;
			background: #19b9e7;
			font-size: 16px;
			font-weight: 300;
			line-height: 16px;
			color: #fff;
			-moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
		}
		.btn-link-1:hover, .btn-link-1:focus, .btn-link-1:active { outline: 0; opacity: 0.6; color: #fff; }

		.btn-link-1.btn-link-1-facebook { background: #4862a3; }
		.btn-link-1.btn-link-1-twitter { background: #55acee; }
		.btn-link-1.btn-link-1-google-plus { background: #dd4b39; }

		.btn-link-1 i {
			padding-right: 5px;
			vertical-align: middle;
			font-size: 20px;
			line-height: 20px;
		}

		.btn-link-2 {
			display: inline-block;
			height: 50px;
			margin: 5px;
			padding: 15px 20px 0 20px;
			background: rgba(0, 0, 0, 0.3);
			border: 1px solid #fff;
			font-size: 16px;
			font-weight: 300;
			line-height: 16px;
			color: #fff;
			-moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
		}
		.btn-link-2:hover, .btn-link-2:focus, 
		.btn-link-2:active, .btn-link-2:active:focus { outline: 0; opacity: 0.6; background: rgba(0, 0, 0, 0.3); color: #fff; }

		.btn-link-2 i {
			padding-right: 5px;
			vertical-align: middle;
			font-size: 20px;
			line-height: 20px;
		}



	</style>