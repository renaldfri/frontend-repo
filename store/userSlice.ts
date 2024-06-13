import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from "../apis/userApi"

interface User {
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    return await userApi.getUsers();
  } catch (error: any) {
    console.log(error)
    if (error.response && error.response.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    } else {
      throw new Error('Failed to fetch users. Please try again later.');
    }
  }
});

// Async thunk for adding a new user
export const addUser = createAsyncThunk('users/addUser', async (userData: Omit<User, 'id'>) => {
  try {
    const response = await userApi.createUser(userData);
    return response;
  } catch (error: any) {
    console.error('Error adding user:', error);
    if (error.response && error.response.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    } else {
      throw new Error('Failed to add user. Please try again later.');
    }
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add user';
      });
  },
});

export default userSlice.reducer;
