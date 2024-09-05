import axios from "axios";
// Configurer Axios pour inclure les informations d'identification et l'en-tête d'autorisation

//const token = localStorage.getItem("jwt") || null;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
//axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.baseURL = "https://natours-express.onrender.com";
//https://natours-express.onrender.com
//axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axios;
