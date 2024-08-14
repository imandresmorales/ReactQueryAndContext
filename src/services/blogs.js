import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl).catch((error) => console.log("error"));
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const put = async (object) => {
  const config = {
    headers: { Authorization: token },
  };
  const blog = {
    user: object.user.id,
    title: object.title,
    likes: object.likes,
    author: object.author,
    url: object.url,
  };

  const response = await axios.put(`${baseUrl}/${object.id}`, blog, config);
  return response.data;
};

const eliminar = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, setToken, create, put, eliminar };
