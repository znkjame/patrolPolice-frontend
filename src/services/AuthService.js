import Axios from "axios";

const auth_key = "auth-police";
let auth = JSON.parse(localStorage.getItem(auth_key));
const user = auth ? auth.data.user : "";
const jwt = auth ? auth.data.access_token : "";
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'

export default {
	isAuthen() {
		return user !== "" && jwt !== "";
	},
	isAdmin(role) {
		return role === "ADMIN";
	},
	getApiHeader() {
		if (jwt !== "") {
			return {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			};
		}
		return {};
	},
	getUser() {
		return user;
	},

	getJwt() {
		return jwt;
	},
	async login({ email, password }) {
		try {
			let url = api_endpoint + "/api/auth/login";
			let body = {
				email: email,
				password: password,
			};

			let res = await Axios.post(url, body);

			if (res.status === 200) {
				// console.log(res.data);

				localStorage.setItem(auth_key, JSON.stringify(res));
				return {
					success: true,
					user: res.data.user,
					jwt: res.data.access_token,
				};
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			console.error(e);
			if (e.response.status === 400) {
				// console.log(e.response.data.message[0].messages[0].message);
				return {
					success: false,
					message: e.response.data.message[0].messages[0].message,
				};
			}
		}
	},

	async register({email, password, role,}) {
		try {
			let url = `${api_endpoint}/api/auth/register`;
			let body = {email: email,
				password: password,
				role: role,
			};
			let res = await Axios.post(url, body);
			if (res.status === 201) {
				localStorage.setItem(auth_key, JSON.stringify(res));
				return {
					success: true,
					user: res.data.user,
					jwt: res.data.access_token,
				};
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			if (e.response.status === 400) {
				return {
					success: false,
					message: e.response.data.message[0].messages[0].message,
				};
			} else {
				return;
			}
		}
	},

	async policeRegister({firstName, lastName, phone, rank, user_id}) {
		let url = `${api_endpoint}/api/polices`;
		let headers = this.getApiHeader();
		let body = {
			firstname: firstName,
			lastname: lastName,
			phone: phone,
			rank: rank,
			user_id: user_id
		};
		let res = await Axios.post(url, body, headers);
		return res.data;
			
	},

	async logout() {
		localStorage.removeItem(auth_key);
		// let url = `${api_endpoint}/api/auth/logout`;
	},

	async fetchUser({ id }) {
		let url = api_endpoint + "/users/" + id;
		let header = this.getApiHeader();
		let res = await Axios.get(url, header);
		return res.data;
	},

	async fetchMe(){
		let url = api_endpoint + "/api/auth/me";
		let header = this.getApiHeader();
		let res = await Axios.post(url,"", header);
		// console.log(res);
		return res.data;
	}


	// async editInformation({ name, age, gender }, id) {
	// 	let url = `${api_endpoint}/api/auth/update/${id}`;
	// 	console.log(url)
	// 	let body = {
	// 		name: name,
	// 		age: age,
	// 		gender: gender,
	// 	};
	// 	let header = this.getApiHeader();
	// 	let res = await Axios.put(url, body, header);
	// 	return res;
	// },
};

// export const
