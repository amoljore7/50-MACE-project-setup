import axios from 'axios';
import { AppConfig } from '../config/app-config';

axios.defaults.baseURL = AppConfig.serverUrl;

export default axios;
