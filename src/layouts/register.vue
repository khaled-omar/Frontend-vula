<template>
	<div class="form-box">
		<div class="form-top">
			<div class="form-top-left">
				<h3>Sign up now</h3>
				<p>Fill in the form below to get instant access:</p>
			</div>
			<div class="form-top-right">
				<i class="fa fa-pencil"></i>
			</div>
		</div>
		<div class="form-bottom">
			<div v-if="credentialsErrors.length > 0" class="alert ">
				<ul>
					<li v-for="(value,key) in credentialsErrors[0]">
							{{ value[0] }}
					</li>
				</ul>
			</div>
			<form role="form" class="registration-form" v-on:submit.prevent="submit">
				<div class="form-group">
					<label class="sr-only" for="username">username</label>
					<input type="text" name="name" placeholder="username" class="form-first-name form-control" id="form-first-name"
					v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name') }"
					v-model="user.name">
					<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
				</div>
				<div class="form-group">
					<label class="sr-only" for="form-email">Email</label>
					<input type="email" name="email" placeholder="Email" class="form-email form-control" id="form-email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
					v-model="user.email" >
					<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
				</div>
				<div class="form-group">
					<label class="sr-only" for="password">Password</label>
					<input type="password"  
					name="password" 
					placeholder="Enter password" 
					class="form-last-name form-control" 
					id="password"
					v-validate="'required|alpha_num|min:5'" 
					:class="{'input': true, 'is-danger': errors.has('password') }"
					v-model="user.password">
					<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>

				</div>
				
				<button v-if="!errors.errors.length" type="submit" class="btn">Sign me up!</button>
			</form>
		</div>
	</div>


</template>
<script >
	import Vue from 'vue';
	import VeeValidate from 'vee-validate';
	Vue.use(VeeValidate);

	export default {

		name: 'register',

		data () {
			return {
				credentialsErrors:[],

				user:{
					name:'',
					password:'',
					email:''
				}
			};
		},
		methods:{
			submit() {
				//alert(this.user.email);
				this.$http.post('http://localhost:8000/api/v1/register',this.user).then(res => {
					//console.log(res);
					localStorage.setItem("token", res.body.token);
					localStorage.setItem("username", res.body.user.name);
					localStorage.setItem("user_ID", res.body.user.id);
					alert(res.body.token);
					this.$router.push('/home/'+res.body.user.id);
				}).catch(err => {
					if (err.status==422) {
						this.credentialsErrors.splice(0,this.credentialsErrors.length);
						this.credentialsErrors.push(err.body);
					}
					//console.log(err);
				});
			},
		}
	};

</script>
<style scoped>
	/***** Top content *****/
	.is-danger{
		border: 1px solid #f00
	}
	.help {
		color:#f00;
		font-weight: 500;
		border:0;
	}
	.inner-bg {
		padding: 60px 0 80px 0;
	}

	.top-content .text {
		color: #fff;
	}

	.top-content .text h1 { color: #fff; }

	.top-content .description {
		margin: 20px 0 10px 0;
	}

	.top-content .description p { opacity: 0.8; }

	.top-content .description a {
		color: #fff;
	}
	.top-content .description a:hover, 
	.top-content .description a:focus { border-bottom: 1px dotted #fff; }

	.form-box {
		margin-top: 70px;
	}

	.form-top {
		overflow: hidden;
		padding: 0 25px 15px 25px;
		background: #444;
		background: rgba(0, 0, 0, 0.35);
		-moz-border-radius: 4px 4px 0 0; -webkit-border-radius: 4px 4px 0 0; border-radius: 4px 4px 0 0;
		text-align: left;
	}

	.form-top-left {
		float: left;
		width: 75%;
		padding-top: 25px;
	}

	.form-top-left h3 { margin-top: 0; color: #fff; }
	.form-top-left p { opacity: 0.8; color: #fff; }

	.form-top-right {
		float: left;
		width: 25%;
		padding-top: 5px;
		font-size: 66px;
		color: #fff;
		line-height: 100px;
		text-align: right;
		opacity: 0.3;
	}

	.form-bottom {
		padding: 25px 25px 30px 25px;
		background: #444;
		background: rgba(0, 0, 0, 0.3);
		-moz-border-radius: 0 0 4px 4px; -webkit-border-radius: 0 0 4px 4px; border-radius: 0 0 4px 4px;
		text-align: left;
	}

	.form-bottom form textarea {
		height: 100px;
	}

	.form-bottom form button.btn {
		width: 100%;
	}

	.form-bottom form .input-error {
		border-color: #19b9e7;
	}

	.social-login {
		margin-top: 35px;
	}

	.social-login h3 {
		color: #fff;
	}

	.social-login-buttons {
		margin-top: 25px;
	}

	.middle-border {
		min-height: 300px;
		margin-top: 170px;
		border-right: 1px solid #fff;
		border-right: 1px solid rgba(255, 255, 255, 0.6);
	}


	/***** Footer *****/

	footer {
		padding-bottom: 70px;
		color: #fff;
	}

	footer .footer-border {
		width: 200px;
		margin: 0 auto;
		padding-bottom: 30px;
		border-top: 1px solid #fff;
		border-top: 1px solid rgba(255, 255, 255, 0.6);
	}

	footer p { opacity: 0.8; }

	footer a {
		color: #fff;
	}
	footer a:hover, footer a:focus { color: #fff; border-bottom: 1px dotted #fff; }


	/***** Media queries *****/

	@media (min-width: 992px) and (max-width: 1199px) {}

	@media (min-width: 768px) and (max-width: 991px) {}

	@media (max-width: 767px) {

		.middle-border { min-height: auto; margin: 65px 30px 0 30px; border-right: 0; 
			border-top: 1px solid #fff; border-top: 1px solid rgba(255, 255, 255, 0.6); }

		}

		@media (max-width: 415px) {

			h1, h2 { font-size: 32px; }

		}

		input[type="text"], 
		input[type="password"], 
		input[type="email"], 
		textarea, 
		textarea.form-control {
			height: 50px;
			margin: 0;
			padding: 0 20px;
			vertical-align: middle;
			background: #fff;
			border: 3px solid #fff;
			font-family: 'Roboto', sans-serif;
			font-size: 16px;
			font-weight: 300;
			line-height: 50px;
			color: #888;
			-moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
			-moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
			-o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
		}

		textarea, 
		textarea.form-control {
			padding-top: 10px;
			padding-bottom: 10px;
			line-height: 30px;
		}

		input[type="text"]:focus, 
		input[type="password"]:focus, 
		textarea:focus, 
		textarea.form-control:focus {
			outline: 0;
			background: #fff;
			border: 3px solid #fff;
			-moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
		}

		input[type="text"]:-moz-placeholder, input[type="password"]:-moz-placeholder, 
		textarea:-moz-placeholder, textarea.form-control:-moz-placeholder { color: #888; }

		input[type="text"]:-ms-input-placeholder, input[type="password"]:-ms-input-placeholder, 
		textarea:-ms-input-placeholder, textarea.form-control:-ms-input-placeholder { color: #888; }

		input[type="text"]::-webkit-input-placeholder, input[type="password"]::-webkit-input-placeholder, 
		textarea::-webkit-input-placeholder, textarea.form-control::-webkit-input-placeholder { color: #888; }



		button.btn {
			height: 50px;
			margin: 0;
			padding: 0 20px;
			vertical-align: middle;
			background: #19b9e7;
			border: 0;
			font-family: 'Roboto', sans-serif;
			font-size: 16px;
			font-weight: 300;
			line-height: 50px;
			color: #fff;
			-moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
			text-shadow: none;
			-moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
			-o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
		}

		button.btn:hover { opacity: 0.6; color: #fff; }

		button.btn:active { outline: 0; opacity: 0.6; color: #fff; -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none; }

		button.btn:focus { outline: 0; opacity: 0.6; background: #19b9e7; color: #fff; }

		button.btn:active:focus, button.btn.active:focus { outline: 0; opacity: 0.6; background: #19b9e7; color: #fff; }
		.alert   {
			padding: 0
		}
		.alert ul  {
			padding: 0
		}
		.alert ul li {
			color:#f00;
			font-weight: 500;
			list-style-type: none;
			overflow: hidden;;
		}

	</style>