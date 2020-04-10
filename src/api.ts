import axios from 'axios';
const baseUrl = '/api'

export const getBreeds = () => axios.get(`${baseUrl}/list`);
export const getImages = (breed:string, subBreed?:string) => axios.get(`${baseUrl}/images/${breed}/${subBreed || ''}`);