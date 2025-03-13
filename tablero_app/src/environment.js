// const API_URL = 'http://localhost:8000';
console.log('ENV',process.env)
console.log('AJAJ',process.env.REACT_APP_API_URL)
const API_URL = process.env.REACT_APP_API_URL;
console.log("API URL:", API_URL );
export default API_URL;