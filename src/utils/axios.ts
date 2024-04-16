import axios from 'axios';

const R = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST_URL,
});

R.interceptors.response.use((res: any) => {
  return res.data;
});

export default R;

const QLR = axios.create({});

// All Graphql request will response with 200
QLR.interceptors.response.use((res: any) => {
  if (res.data.errors) {
    return Promise.reject({
      message: res.data.errors?.[0]?.message || 'Error',
    });
  }
  return res.data;
});

export const QLRequest = (args: any) => {
  console.log('args', args);
  return QLR.post(import.meta.env.VITE_APP_GRAPHQL_URL, ...args);
};

