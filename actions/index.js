import axios from 'axios';
import Cookies from 'js-cookie';

import { getCookieFromReq } from '../helpers/utils';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 3000
})

const setAuthHeader = (req) => {
  const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON("jwt");

  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` }
    };
  }
  return undefined;
}

const rejectPromise = (responseError) => {
  let error = {};

  if (responseError && responseError.response && responseError.response.data) {
    error = responseError.response.data
  } else {
    error = responseError;
  }

  return Promise.reject(error);
}

export const getSecretData = async (req) => {
  const url = "/secret";

  return await axiosInstance
    .get(url, setAuthHeader(req))
    .then(response => response.data);
}

export const getPortfolios = async () => {
  return await axiosInstance.get('/portfolios')
  .then(response => response.data);
}

export const createPortfolio = async (portfolioData) => {
  return await axiosInstance.post('/portfolios', portfolioData, setAuthHeader())
  .then(response => response.data)
  .catch(error => rejectPromise(error));
}

export const getPortfolioById = async (id) => {
  return await axiosInstance.get(`/portfolios/${id}`)
  .then(response => response.data);
}

export const updatePortfolio = async (portfolioData) => {
  return await axiosInstance
    .patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
}

export const deletePortfolio = (portfolioId) => {
  return axiosInstance.delete(`/portfolios/${portfolioId}`, setAuthHeader())
  .then(response => response.data);
}

export const createWork = async (workData) => {
  return await axiosInstance.post('/works', workData, setAuthHeader())
  .then(response => response.data)
  .catch(error => rejectPromise(error));
}