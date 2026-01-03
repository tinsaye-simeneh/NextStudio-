import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authServices'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  messages: '',
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      
      return await authService.login(user)
    } catch (error) {
      const messages =
        (error.response && error.response.data && error.response.data.messages) ||
        error.messages ||
        error.toString()
      return thunkAPI.rejectWithValue(messages)
    }
  })

export const updatePassword = createAsyncThunk('auth/updatePassword', async (user, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.updatePassword(user,token)
    
  } catch (error) {
    const messages =
      (error.response && error.response.data && error.response.data.messages) ||
      error.messages ||
      error.toString()
    return thunkAPI.rejectWithValue(messages)
  }
})

  export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
  })
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.messages = ''
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
          state.messages = action.payload
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.messages = action.payload
          state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null
        })
        .addCase(updatePassword.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(updatePassword.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.messages = action.payload
        })
    },
  })
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer
  