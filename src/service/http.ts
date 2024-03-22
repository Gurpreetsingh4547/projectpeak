/* eslint-disable no-useless-catch */

// Packages
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Services
import { API_BASE_URL } from '@/config/const';

// Your API base URL
const baseURL = API_BASE_URL;

// Create an axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 100000, // Adjust timeout as needed
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

interface HttpService {
  get<T>(url: string, params?: any): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

const httpService: HttpService = {

  /**
   * Perform a GET request
   * @param url URL to request
   * @param params Query parameters to pass
   * @returns The response data
   */
  get: async function<T>(url: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get<T>(url, { params }); // Call the API
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Rethrow any exceptions
    }
  },

  /**
   * Perform a POST request
   * @param url URL to request
   * @param data Data to send
   * @returns The response data
   */
  post: async function<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post<T>(url, data); // Call the API
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Rethrow any exceptions
    }
  },

  /**
   * Perform a PUT request
   * @param url URL to request
   * @param data Data to send
   * @returns The response data
   */
  put: async function<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Perform a Delete request
   * @param url URL to request
   * @returns The response data
   */
  delete: async function<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete<T>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default httpService;
