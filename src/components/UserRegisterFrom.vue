<template>
<div>
	<h2>Register</h2>
		<div>
			<label>First Name</label>
			<input type="text" v-model="policeForm.firstName" autocomplete="off" placeholder="First Name">
		</div>

		<div>
			<label>Last Name</label>
			<input type="text" v-model="policeForm.lastName" autocomplete="off" placeholder="Last Name">
		</div>

		<div>
			<label>phone</label>
			<input type="text" v-model="policeForm.phone" autocomplete="off" placeholder="phone">
		</div>

		<div>
			<label>rank</label>
			<select v-model="policeForm.rank">
  				<option disabled value="">Select your rank</option>
  				<option>General</option>
  				<option>Lieutenant General</option>
  				<option>Major General</option>
				<option>Colonel</option>
				<option>Lieutenant Colonel</option>
				<option>Major</option>
				<option>Captain</option>
				<option>Lieutenant</option>
				<option>Sub-Lieutenant</option>
				<option>Senior Sergeant Major</option>
				<option>Sergeant Major</option>
				<option>Sergeant</option>
				<option>Corporal</option>
				<option>Lance Corporal</option>

			</select>
		</div>

		<div>
			<label>Email</label>
			<input type="text" v-model="registerForm.email" autocomplete="off" placeholder="Email">
		</div>

		<div>
			<label>Password</label>
			<input type="password" v-model="registerForm.password" autocomplete="off" placeholder="Password">
		</div>

		<div>
			<label>Confirm Password</label>
			<input type="password" v-model="confirm_password" autocomplete="off" placeholder="Confirm Password">
		</div>

		<div>
			<button
			@click="register( registerForm, policeForm)">
				register
			</button>
		</div>

</div>
</template>

<script>
import AuthService from '../services/AuthService';
import AuthUser from '../store/AuthUser';
export default {
	data() {
		return {
			allUser: [],
			currentUser: "",
			edit: false,
			confirm_password: "",
			registerForm: {
		
				email: "",
				password: "",
				role: "USER",
			},
			policeForm: {
				firstName: "",
				lastName: "",
				// TO EDIT
				phone: "",
				rank: "",
				user_id: ""
			}
		};
	},
	methods: {
		async register(register, police) {
			console.log("this is register form",register)
			console.log("this is police form",police)
			if (this.checkNull()) {
				if (this.registerForm.password === this.confirm_password) {
					let res = await AuthUser.dispatch("register",this.registerForm);
					console.log("this is user res",res);	
					if (res.success) {
						police.user_id = res.user.id
						let policeRes = await AuthService.policeRegister(police)
						console.log("this is police res",policeRes)
						this.$swal("Register Success",`Welcome ${policeRes.data.firstname}`,"success");
						this.$router.push("/");
					} else {
						this.$swal("Register Failed", res.message, "error");
					}
				} else {
					this.$swal(
						"Register Failed",
						"Your password and confirm password is not match!",
						"error"
					);
				}
			} else {
				this.$swal(
					"Register Failed",
					"Please check that the information you have entered is complete.",
					"error"
				);
			}
		},
		login() {
			this.$router.push("/login");
		},

		checkNull() {
			return (
				this.registerForm.email !== "" &&
				this.registerForm.password !== "" &&
				this.registerForm.confirm_password !== "" &&
				this.registerForm.role !== ""
			);
		},
	},
};
</script>

<style lang="scss" scoped></style>
>
