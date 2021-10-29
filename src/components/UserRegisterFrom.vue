<template>
<div class="mt-5">
	<h2 class="text-4xl mt-5 font-bold">สร้างบัญชี</h2>
		<div class="mt-5">
			<label>ชื่อ</label>
			<input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
			 type="text" v-model="policeForm.firstName" autocomplete="off" placeholder="ชื่อ">
		</div>

		<div class="mt-3">
			<label>นามสกุล</label>
			<input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
			 type="text" v-model="policeForm.lastName" autocomplete="off" placeholder="นามสกุล">
		</div>

		<div class="mt-3">
			<label>รหัสประจำตัว</label>
			<input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
			 type="text" v-model="policeForm.phone" autocomplete="off" placeholder="รหัสประจำตัว">
		</div>

		<div class="mt-3">
			<label>ยศ</label>
			<select
			class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
			v-model="policeForm.rank">
  				<option disabled value="">เลือกยศของคุณ</option>
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

		<div class="mt-3">
			<label>อีเมล</label>
			<input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" 
			type="text" v-model="registerForm.email" autocomplete="off" placeholder="อีเมล">
		</div>

		<div class="mt-3">
			<label>รหัสผ่าน</label>
			<input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" 
			type="password" v-model="registerForm.password" autocomplete="off" placeholder="รหัสผ่าน">
		</div>

		<div class="mt-3">
			<label>ยืนยันรหัสผ่าน</label>
			<input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" 
			type="password" v-model="confirm_password" autocomplete="off" placeholder="ยืนยันรหัสผ่าน">
		</div>

		<div class="mt-10">
			<button
			class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg 
          	hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300"
			@click="register( registerForm, policeForm)">
				สร้างบัญชี
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
