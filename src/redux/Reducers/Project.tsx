// Packages
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// Services
import { CreateProjects, DeleteProject, GetProjects } from "@/model/Projects";
import { HaveValue, IsEqual, IsObjectHaveValue } from "@/service/helper";

/**
 * Project model
 * @property {number} id Project ID
 * @property {string} name Project name
 * @typedef {object} Project
 */
interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
  callback: () => void;
}

/**
 * Fetch projects from API
 */
export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async () => {
    const { data = [] }: any = await GetProjects();
    return data;
  }
);

/**
 * Add project to API
 */
export const addProject = createAsyncThunk<
  Project,
  {
    name: string;
    description: string;
    callback: () => void;
  }
>("projects/addProject", async (itemData, thunkApi) => {
  const { name, description, callback } = itemData;
  try {
    const data: any = await CreateProjects({ name, description });
    callback();
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.response?.data);
  }
});

export const updateProject = createAsyncThunk<
  Project,
  { id: number; newData: Partial<Project> }
>("projects/updateProject", async ({ id, newData }) => {
  const response = await axios.put<Project>(`your_api_endpoint/${id}`, newData);
  return response.data;
});

/**
 * Delete project from API
 */
export const deleteProject = createAsyncThunk<
  Project,
  {
    id: number;
    callback: () => void;
  }
>("projects/deleteProject", async (payload: any, thunkApi) => {
  const { id, callback } = payload;
  try {
    const data: any = await DeleteProject(id);
    callback();
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.response?.data);
  }
});

// Define a type for the slice state
interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: any; // Adjust type as needed
  isRequesting: boolean;
}

// Initial state
const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
  isRequesting: false,
};

// Reducers
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects?.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects?.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action?.payload;
        state.error = null;
      })
      .addCase(fetchProjects?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error;
        if (HaveValue(action?.error?.message)) {
          toast(action?.error?.message);
        }
      })
      .addCase(addProject?.pending, (state) => {
        state.isRequesting = true;
      })
      .addCase(addProject?.fulfilled, (state, action: any) => {
        state.isRequesting = false;
        if (IsObjectHaveValue(action?.payload?.project)) {
          state?.items?.push(action?.payload?.project);

          toast(action?.payload?.message || "Project added successfully");
        }
      })
      .addCase(addProject?.rejected, (state, action: any) => {
        state.isRequesting = false;
        state.error = action?.payload;
        if (HaveValue(action?.payload?.message)) {
          toast(action?.payload?.message);
        }
      })
      .addCase(updateProject?.fulfilled, (state, action) => {
        const index = state?.items?.findIndex((item) =>
          IsEqual(item?.id, action?.payload?.id)
        );
        if (!IsEqual(index, -1)) {
          state.items[index] = action?.payload;
        }
      })
      .addCase(deleteProject?.pending, (state) => {
        state.isRequesting = true;
      })
      .addCase(deleteProject?.rejected, (state, action: any) => {
        state.isRequesting = false;
        state.error = action?.payload;
        if (HaveValue(action?.payload?.message)) {
          toast(action?.payload?.message);
        }
      })
      .addCase(deleteProject?.fulfilled, (state, action: any) => {
        state.isRequesting = false;
        if (HaveValue(action?.meta?.arg?.id)) {
          state.items = state?.items?.filter(
            (item: any) => !IsEqual(item._id, action?.meta?.arg?.id)
          );
          toast(action?.payload?.message || "Project deleted successfully");
        }
      });
  },
});

export default projectsSlice.reducer;
