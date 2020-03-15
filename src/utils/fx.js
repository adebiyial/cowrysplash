import axios from "axios";

export const uuid = (seed = 100) =>
  Math.random()
    .toString(36)
    .substring(2, 2 + seed);

export const BaseUrl = axios.create({
  baseURL: `https://api.unsplash.com/photos/`
});
