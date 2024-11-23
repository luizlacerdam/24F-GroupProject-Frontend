import axios from 'axios';

const HOST = import.meta.env.VITE_HOST;
const PROTOCOL = import.meta.env.VITE_PROTOCOL;

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestDataWithToken = async (endpoint, token) => {
  const { data } = await api.get(endpoint, { headers: { Authorization: token } });
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const data = await api.post(endpoint, body);
  return data;
};

export const requestPostWithToken = async (endpoint, body, token) => {
  const { data } = await api.post(endpoint, body, { headers: { Authorization: token } });
  return data;
};

export const requestPatchWithToken = async (endpoint, body, token) => {
  const { data } = await api.patch(endpoint, body, { headers: { Authorization: token } });
  return data;
};

export const requestDeleteWithToken = async (endpoint, token) => {
  const data = await api.delete(endpoint, { headers: { Authorization: token } });
  return data;
};

export default api;
