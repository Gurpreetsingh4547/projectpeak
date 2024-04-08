import httpService from "@/service/http";

/**
 * GetProjects function retrieves projects.
 * @return {Promise<any>} Response data from the API.
 */
export const GetProjects = async () => {
  return await httpService.get("/get/projects", {});
};

/**
 * CreateProject function creates a new project.
 * @return {Promise<any>} Response data from the API.
 */
export const CreateProjects = async (payload: any) => {
  return await httpService.post("/add/project", payload);
};

/**
 * Delete Project function creates a new project.
 * @return {Promise<any>} Response data from the API.
 */
export const DeleteProject = async (id: number) => {
  return await httpService.delete(`/delete/projects/${id}`);
};
