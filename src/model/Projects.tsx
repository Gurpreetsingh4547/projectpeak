import httpService from "@/service/http";

/**
 * GetProjects function retrieves projects.
 * @return {Promise<any>} Response data from the API.
 */
export const GetProjects = async () => {
  return await httpService.get("/get/projects", {});
};
