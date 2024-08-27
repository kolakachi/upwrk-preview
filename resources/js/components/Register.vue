<template>
  <div class="split-container">
    <!-- Left Side - Blue Background -->
    <div class="left-side">
      <h2>Welcome Back!</h2>
      <p>Enter your credentials to register your account.</p>
    </div>

    <!-- Right Side - Login Form -->
    <div class="right-side">
      <div class="login-form">
        <h2>Register</h2>
        <ul v-if="errors.email" class="alert">
            <li v-for="(email_error, email_index) in errors.email" :key="email_index">{{email_error}}</li>
        </ul>
        <ul v-if="errors.password" class="alert">
            <li v-for="(password_error, password_index) in errors.password" :key="password_index">{{password_error}}</li>
        </ul>
         <ul v-if="errors.name" class="alert">
            <li v-for="(name_error, name_index) in errors.name" :key="name_index">{{name_error}}</li>
        </ul>
        <p v-if="errorMessage" class="alert">{{errorMessage}}</p>

        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required>
          </div>

           <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>

          <div class="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" v-model="password_confirmation" required>
          </div>

          <div class="form-group">
            <button type="submit">Register</button>
          </div>
        </form>

        <div class="signup-link">
          Have an account? <a href="/login">Sign In</a>
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
      name: '',
      email: '',
      password: '',
      password_confirmation:'',
      errorMessage: '',
      errors: {
        email: [],
        password:[],
        name:[]
      },
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data;
        } else {
           this.errorMessage = 'An unexpected error occurred';
        }
      }
    },
  }
};
</script>

<style scoped>
div {
  margin: 20px;
}
</style>
