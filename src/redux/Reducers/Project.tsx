// Packages
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Services
import {
  CreateProjects,
  DeleteProject,
  GetProjects,
  UpdateProjects,
} from "@/model/Projects";
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
  async (_, thunkAPI) => {
    const state: any = thunkAPI?.getState();
    const params = {
      limit: state?.projects?.pagination?.limit,
      page: state?.projects?.pagination?.page,
    };

    const { data = [] }: any = await GetProjects(params);
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

/**
 * Update project to API
 */
export const updateProject = createAsyncThunk<
  Project,
  {
    name: string;
    description: string;
    callback: () => void;
    id: number;
  }
>("projects/updateProject", async (itemData, thunkApi) => {
  const { name, description, id, callback } = itemData;
  try {
    const data: any = await UpdateProjects({ name, description }, id);
    callback();
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.response?.data);
  }
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
  pagination: {
    limit: number;
    page: number;
    total_pages: number;
  };
}

// Initial state
const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
  isRequesting: false,
  pagination: {
    limit: 10,
    page: 1,
    total_pages: 0,
  },
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
      .addCase(updateProject?.pending, (state) => {
        state.isRequesting = true;
      })
      .addCase(updateProject?.fulfilled, (state, action: any) => {
        state.isRequesting = false;
        const index = state?.items?.findIndex((item: any) =>
          IsEqual(item?._id, action?.payload?.project?._id)
        );
        if (!IsEqual(index, -1)) {
          state.items.splice(index, 1, action?.payload?.project);
          toast(action?.payload?.message || "Project updated successfully");
        }
      })
      .addCase(updateProject?.rejected, (state, action: any) => {
        state.isRequesting = false;
        state.error = action?.payload;
        if (HaveValue(action?.payload?.message)) {
          toast(action?.payload?.message);
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
