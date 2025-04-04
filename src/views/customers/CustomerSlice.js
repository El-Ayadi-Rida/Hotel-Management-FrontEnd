import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'api';


export const getCustomers = createAsyncThunk("customers/getCustomers",async (rejectWithValue)=>{
    try {
      const response = await api.get('/customers');
      return response?.data
      } catch (error) {
      console.error("Fetching Customers failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching Customers failed. Please try again.");
    }
  })

export const getCustomerById = createAsyncThunk("customers/getCustomerById",async (customerId , { rejectWithValue })=>{
    try {
      const response = await api.get(`/customers/${customerId}`);
      return response?.data
      } catch (error) {
      console.error("Fetching Customers failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching Customers failed. Please try again.");
    }
  })


  const initialState = {
    customers: [],
    singleCustomer: undefined ,
    count:0,
    status:'idle',
    error:null,
    selectedCustomer: null,
  };

  const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
      setSelectedCustomer(state, action){
        state.selectedCustomer = action.payload;
      },
    },
    extraReducers:(builder)=>{
      builder.
      addCase(getCustomers.pending , (state)=>{
        state.status = "loading";
      })
      .addCase(getCustomers.fulfilled , (state , action)=>{
        state.status = "succeded";
        state.customers = action?.payload;
        state.count = action?.payload?.length
      })
      .addCase(getCustomers.rejected , (state , action)=>{
        state.status = "failed";
        state.error = action?.payload;    

      })
      .addCase(getCustomerById.pending , (state)=>{
        state.status = "loading";
      })
      .addCase(getCustomerById.fulfilled , (state,action)=>{
        state.status = "succeded";
        state.singleCustomer = action.payload;
      })
      .addCase(getCustomerById.rejected , (state,action)=>{
        state.status = "failed";
        state.error = action?.payload;    

      })
    }
  });


  export const { setSelectedCustomer } = customerSlice.actions;
  const customerReducer = customerSlice.reducer;
export default customerReducer;