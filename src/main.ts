import { createApp } from 'vue';
import App from './App.vue';
import store from './store';  // Import the Vuex store
import 'bootstrap/dist/css/bootstrap.css';
import router from '@/router/router';  // Import the router


const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');