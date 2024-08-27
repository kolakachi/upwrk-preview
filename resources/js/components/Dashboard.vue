<template>
  <div class="welcome-container">
    <div class="jumbotron">
      <h1>Welcome, {{ user.name }}</h1>
    </div>
    <div class="button-container">
        <button type="button" class="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Welcome',
  data() {
    return {
      user: {
        name: ''
      }
    };
  },
  mounted(){
    let user = localStorage.getItem('user');
    if(user){
        this.user = JSON.parse(user);
    }
  },
  methods: {
    async logout() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`/api/logout`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  text-align: center;
}

.jumbotron {
  background-color: #007bff;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.jumbotron h1 {
  margin: 0;
  font-size: 3rem;
}

.button-container {
  margin-top: 2rem;
}

.button {
  display: inline-block;
  margin: 0 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
}

.button:hover {
  background-color: #0056b3;
}
</style>
