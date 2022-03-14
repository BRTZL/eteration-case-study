import axios, { AxiosRequestHeaders } from 'axios';

const BASE_URL = 'https://5fc9346b2af77700165ae514.mockapi.io';

const HEADERS = {};

export async function get(url: string, headers?: AxiosRequestHeaders) {
  return axios
    .get(BASE_URL + url, {
      headers: {
        ...headers,
        ...HEADERS,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data ? error.response.data : error.toJSON();
    });
}

export async function post(
  url: string,
  body: any,
  headers?: AxiosRequestHeaders,
) {
  return axios
    .post(BASE_URL + url, body, {
      headers: {
        ...headers,
        ...HEADERS,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data ? error.response.data : error.toJSON();
    });
}

export async function postFormData(
  url: string,
  formData: any,
  headers?: AxiosRequestHeaders,
) {
  return axios({
    method: 'post',
    url: BASE_URL + url,
    data: formData,
    headers: {
      ...headers,
      ...HEADERS,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data ? error.response.data : error.toJSON();
    });
}

export async function put(
  url: string,
  body: any,
  headers?: AxiosRequestHeaders,
) {
  return axios
    .put(BASE_URL + url, body, {
      headers: {
        ...headers,
        ...HEADERS,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data ? error.response.data : error.toJSON();
    });
}

export async function patch(
  url: string,
  body: any,
  headers?: AxiosRequestHeaders,
) {
  return axios
    .patch(BASE_URL + url, body, {
      headers: {
        ...headers,
        ...HEADERS,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data ? error.response.data : error.toJSON();
    });
}

export async function del(
  url: string,
  body: any,
  headers?: AxiosRequestHeaders,
) {
  return axios
    .delete(BASE_URL + url, {
      data: body,
      headers: {
        ...headers,
        ...HEADERS,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data ? error.response.data : error.toJSON();
    });
}
