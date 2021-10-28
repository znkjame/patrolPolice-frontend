<template>
  <div id="app">
    <nav-bar></nav-bar>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/assignments">All assignment</router-link> |
      <router-link to="/redboxes/add">add new RedBox</router-link> |
      <router-link to="/redboxes">All RedBox</router-link> |
      <router-link v-if="!isAuthen()" to="/login">Log in</router-link> |
      <router-link v-if="isAuthen()" to="/logout">Log out</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/reports">Make Reports</router-link> |
      <router-link  v-if="!isAuthen()" to="/register">Register</router-link> |
      <router-link  v-if="isAuthen()" to="/assignments/admin/add">Add Assignment</router-link> |
      <router-link  v-if="isAuthen()" to="/assignments/admin/allassignment">Commender Assignment</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import AuthUser from '../src/store/AuthUser'
import NavBar from './components/NavBar.vue'
export default {
  components: { NavBar },
  methods : {
    isAuthen() {
      return AuthUser.getters.isAuthen;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
