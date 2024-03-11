import axios from "axios"
const api = process.env.REACT_APP_RECORD_API_URL || "https://65e67ee9d7f0758a76e87953.mockapi.io"

export const getAll = () =>
    axios.get(`${api}/api/v1/records`)

export const create = (body) =>
    axios.post(`${api}/api/v1/records`, body)

export const update = (id, body) =>
    axios.put(`${api}/api/v1/records/${id}`, body);

export const deleteRecord = (id) =>
    axios.delete(`${api}/api/v1/records/${id}`);