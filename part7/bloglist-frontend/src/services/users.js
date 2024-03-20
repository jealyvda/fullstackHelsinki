import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

export const getUsers = async () => {
    return axios.get(baseUrl);
}

export const getUser = async (id) => {
    return axios.get(`${baseUrl}/${id}`)
}