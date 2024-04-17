//Axios Library: is used to make HTTP requests
import axios from 'axios'; 

// Define a function to fetch data from a given URL using Axios then you have an response with ".then" in a asynchronous way
const fetcher = (url: string) => axios.get(url).then((res) => res.data); 

export default fetcher; 