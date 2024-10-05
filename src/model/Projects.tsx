import httpService from "@/service/http";

// Interfaces
import { GetProjectInterface } from "@/Interfaces/ProjectsModal";

/**
 * GetProjects function retrieves projects.
 * @return {Promise<any>} Response data from the API.
 */
export const GetProjects = async (params: GetProjectInterface) => {
  return await httpService.get("/get/projects", params);
};

/**
 * CreateProject function creates a new project.
 * @return {Promise<any>} Response data from the API.
 */
export const CreateProjects = async (payload: any) => {
  return await httpService.post("/add/projects", payload);
};

/**
 * Delete Project function creates a new project.
 * @return {Promise<any>} Response data from the API.
 */
export const DeleteProject = async (id: number) => {
  return await httpService.delete(`/delete/projects/${id}`);
};

/**
 * Upate Project function udates a project.
 * @return {Promise<any>} Response data from the API.
 */
export const UpdateProjects = async (payload: any, id: number) => {
  return await httpService.put(`/update/projects/${id}`, payload);
};

/**
 * Get Project Status
 * @returns Promise
 */
export const GetProjectStatus = async () => {
  return await httpService.get("/project/status");
};
