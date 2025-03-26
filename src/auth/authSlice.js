import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import api from 'api';
import { notify } from 'routing/helper';
import { DEFAULT_USER } from 'config.js';


const cookies = new Cookies(null, { path: '/' });

export const login = createAsyncThunk("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response?.data;
  } catch (error) {
    console.error("Login failed:", error);
    // Return a custom error message or the error itself
    return rejectWithValue(error.response?.data?.message || "Login failed. Please try again.");
  }
});


export const register = createAsyncThunk("auth/register" , async (registerData , { rejectWithValue })=>{
  try {
    const response = await api.post('/auth/register',registerData);
    return response?.data;
    } catch (error) {
    console.error("Register failed:", error);
    // Return a custom error message or the error itself
    return rejectWithValue(error.response?.data?.message || "Register failed. Please try again.");
  }
});


const getuserFromToken = () => {
  const accessToken = cookies.get('token');
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const user = {...decoded}
    console.log("user::",user);
    
    return user; // Make sure the payload contains the 'role' you set on the server side
  }
  return null;
};


const initialState = {
  isLogin: !!getuserFromToken(),
  accessToken: cookies.get('token')|| null,
  currentUser: getuserFromToken(),
  status:'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    logOut(state, action) {
      state.currentUser = DEFAULT_USER;
      state.isLogin = false;
      cookies.remove('token');
    },
  },
  extraReducers:(builder)=>{
    builder.
    addCase(login.pending , (state)=>{
      state.status = "loading";
    })
    .addCase(login.fulfilled , (state , action)=>{
      state.status = "succeded";
      state.accessToken = action?.payload?.token;
      cookies.set('token', action?.payload?.token);
      state.isLogin = true;
      state.currentUser = getuserFromToken();
      

    })
    .addCase(login.rejected , (state , action)=>{
      state.status = "failed";
      state.error = action?.payload;  
      notify(action?.payload?.toString() , 'danger');  
  
    })
    .addCase(register.pending , (state)=>{
      state.status = "loading";
    })
    .addCase(register.fulfilled , (state , action)=>{
      state.status = "succeded";
      notify('Register successfully');


    })
    .addCase(register.rejected , (state , action)=>{
      state.status = "failed";
      state.error = action?.payload;    
      notify(action?.payload?.toString() , 'danger');

    })

  }

});

export const { setCurrentUser , logOut } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
