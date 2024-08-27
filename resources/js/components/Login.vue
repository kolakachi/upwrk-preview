<template>
  <div class="split-container">
    <!-- Left Side - Blue Background -->
    <div class="left-side">
      <h2>Welcome Back!</h2>
      <p>Enter your credentials to access your account.</p>
    </div>

    <!-- Right Side - Login Form -->
    <div class="right-side">
      <div class="login-form">
        <h2>Login</h2>
         <p v-if="errorMessage" class="alert">{{errorMessage}}</p>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>

          <div class="form-group">
            <button type="submit">Login</button>
          </div>
        </form>

        <div class="signup-link">
          Don't have an account? <a href="/register">Sign Up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '../../css/auth.css';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage:''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('/api/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = error.response.data.message;
        } else {
           this.errorMessage = 'An unexpected error occurred';
        }
      }
    }
  }
};
</script>

<style scoped>
div {
  margin: 20px;
}
</style>
