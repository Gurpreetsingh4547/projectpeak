// Packages
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// Services
import { GetProjects } from "@/model/Projects";
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

export const addProject = createAsyncThunk<Project, Project>(
  "projects/addProject",
  async (itemData) => {
    const response = await axios.post<Project>("your_api_endpoint", itemData);
    return response.data;
  }
);

export const updateProject = createAsyncThunk<
  Project,
  { id: number; newData: Partial<Project> }
>("projects/updateProject", async ({ id, newData }) => {
  const response = await axios.put<Project>(`your_api_endpoint/${id}`, newData);
  return response.data;
});

export const deleteProject = createAsyncThunk<number, number>(
  "projects/deleteProject",
  async (id) => {
    await axios.delete(`your_api_endpoint/${id}`);
    return id;
  }
);

// Define a type for the slice state
interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: any; // Adjust type as needed
}

// Initial state
const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
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
      .addCase(addProject?.fulfilled, (state, action) => {
        if (IsObjectHaveValue(action?.payload)) {
          state?.items?.push(action?.payload);
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
      .addCase(deleteProject?.fulfilled, (state, action) => {
        state.items = state?.items?.filter(
          (item) => !IsEqual(item.id, action.payload)
        );
      });
  },
});

export default projectsSlice.reducer;
