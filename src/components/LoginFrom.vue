<template>
	<div class="bg-white main-container min-h-screen">
		<div class="font-prompt">
			<div class="mt-48">
				<div class="text-center py-4 text-green-600">
					<h2 class="text-7xl">Log in</h2>
				</div>
				<div class="flex justify-center">
					<form class="w-3/12 max-w-4xl" @submit.prevent="login">
						<div class="flex flex-wrap -mx-3 mb-5 mt-4">
							<div class="w-full md:w-full px-3 md:mb-0">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-green-600 text-xl
										mb-2
									"
								>
									Email
								</label>
								<div class="relative">
									<input
										class="
											appearance-none
											block
											w-full
											bg-gray-200
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											mb-3
											leading-tight
											focus:outline-none focus:bg-white
										"
										type="text"
										v-model="loginFrom.email"
										placeholder="Email"
									/>
								</div>
							</div>
							<div class="w-full md:w-full px-3 md:mb-0">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-green-600 text-xl
										mb-2
									"
								>
									Password
								</label>
								<div class="relative">
									<input
										class="
											appearance-none
											block
											w-full
											bg-gray-200
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											leading-tight
											focus:outline-none focus:bg-white
										"
										type="password"
										v-model="loginFrom.password"
										placeholder="Password"
									/>
								</div>
							</div>
						</div>
						<span
							class="
								lg:flex
								text-base
								lg:text-lg
								text-green-600
								float-right
								-mt-3
								cursor-default
							"
							>Don’t have an account?&nbsp;<button
								@click="signup()"
								class="
									text-red-700
									font-semibold
									hover:text-red-500 hover:underline
								"
							>
								Sign up
							</button>
						</span>
						<div class="py-3 text-center mt-10 text-black">
							<button
								class="
									font-normal
									rounded-full
									text-2xl
									p-2
									w-44
									bg-black
									text-white
									hover:bg-gray-800
									transition
									duration-250
								"
							>
								Log in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import ShopStore from '@/store/Shop'
import AuthService from '../services/AuthService'
import AuthUser from '../store/AuthUser';
export default {
	data() {
		return {
			currentUser: "",
			loginFrom: {
				email: "",
				password: "",
			},
			policeInfo:""
		};
	},
	methods: {
		async login() {
			if (this.loginFrom.email !== "" && this.loginFrom.password !== "")
			{
				let res = await AuthUser.dispatch("login", this.loginFrom);
				console.log(res.success);
				console.log(res.status)
				if (res.success) {
					let res1 = await AuthService.fetchUser(res.user.id);
					this.$swal(
						"Login Success",
						`Welcome, ${res1.rank} ${res1.firstname} ${res1.lastname} `,
						"success"
					);
					this.currentUser = res.user;
					this.$router.push("/");
				} else if (!res.success && res.status === 401){
					this.$swal("Login Failed", "Invalid username or password.", "error");
				} else if (!res.success && res.status === 422){
					this.$swal("Login Failed", "The email must be a valid email address. \nThe password must be at least 6 characters.", "error");
				}
			} else {
				this.$swal(
					"Login Failed",
					"please enter you email or password",
					"error"
				);
			}
		},
		// async fetchUser(){
      	// 	let res = await AuthService.fetchUser(this.currentUser.user.id);
      	// 	this.policeInfo = res;
    	// },
		clearFrom() {
			this.loginFrom.email = "";
			this.loginFrom.password = "";
		},
		signup() {
			this.$router.push("/register");
		},
	},
	// created() {
	// 	this.fetchUser();
	// },
};
</script>

<style lang="scss" scoped></style>
>
