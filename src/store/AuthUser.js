import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import AuthService from '../services/AuthService'

const end_point =
	process.env.SHOP_VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

Vue.use(Vuex);

let auth_key = "auth-police";
let auth = JSON.parse(localStorage.getItem(auth_key));
const initialStateUser = {
	user: auth ? auth.data.user : "",
	jwt: auth ? auth.data.access_token : "",
	isAuthen: auth ? true : false,
	isAdmin: auth ? auth.data.user.role === "ADMIN" : false,
};

export default new Vuex.Store({
	state: {
		currentUser: initialStateUser,
	},
	getters: {
		getCurrentUser: (state) => state.currentUser,
		isAuthen: (state) => state.currentUser.isAuthen,
		isAdmin: (state) => state.currentUser.isAdmin,
	},
	mutations: {
		setCurrentUser(state, body) {
			(state.currentUser.user = body.user),
				(state.currentUser.jwt = body.jwt),
				(state.currentUser.isAuthen = true);
			state.currentUser.isAdmin = AuthService.isAdmin(body.user.role);
		},

		setUser(state, body) {
			console.log(state.currentUser);
			(state.currentUser.user = body.user), console.log(3);
			console.log(state.currentUser);
		},

		logoutSuccess(state) {
			(state.currentUser.user = ""),
				(state.currentUser.jwt = ""),
				(state.currentUser.isAuthen = false);
			state.currentUser.isAdmin = false;
		},
	},
	actions: {
		async login({ commit }, { email, password }) {
			let res = await AuthService.login({ email, password });
			let body = {
				user: res.user,
				jwt: res.jwt,
			};

			if (res.success) {
				commit("setCurrentUser", body);
			}
			return res;
		},

		async register({ commit },{ email, password, role}) {
			let res = await AuthService.register({
				email,
				password,
				role,
			});
			if (res.success) {
				commit("setCurrentUser", res);
			}
			return res;
		},

		// async policeRegister({ commit },{ firstName, lastName, phone, rank, user_id}) {
		// 	let res = await AuthService.policeRegister({
		// 		firstName,
		// 		lastName,
		// 		phone,
		// 		rank,
		// 		user_id
		// 	});
		// 	if (res.success) {
		// 		commit("loginSuccess", res);
		// 	}
		// 	return res;
		// },
		
		async logout({ commit }) {
			AuthService.logout();
			commit("logoutSuccess");
		},

		async setUser({ commit }, user) {
			commit("setUser", user);
		},
	},
	modules: {},
});
