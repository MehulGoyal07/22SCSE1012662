import axios from 'axios';
import { Log } from './logger';

const API_BASE = 'http://localhost:3001'; 

export const createShortUrl = async (url, validity = 30, shortcode = '') => {
  try {
    const res = await axios.post(`${API_BASE}/shorturls`, { url, validity, shortcode });
    await Log("debug", "api", `Created short URL: ${res.data.shortLink}`);
    return res.data;
  } catch (error) {
    await Log("error", "api", `Create failed: ${error.response?.data?.error || error.message}`);
    throw error;
  }
};

export const getUrlStats = async (shortcode) => {
  try {
    const res = await axios.get(`${API_BASE}/shorturls/${shortcode}`);
    await Log("debug", "api", `Fetched stats for: ${shortcode}`);
    return res.data;
  } catch (error) {
    await Log("error", "api", `Stats fetch failed: ${error.message}`);
    throw error;
  }
};