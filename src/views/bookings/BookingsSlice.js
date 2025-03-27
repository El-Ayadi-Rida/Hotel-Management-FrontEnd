import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'api';


export const getBookings = createAsyncThunk("bookings/getBookings",async (rejectWithValue)=>{
    try {
      const response = await api.get('/bookings');
      return response?.data
      } catch (error) {
      console.error("Fetching Bookings failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching Bookings failed. Please try again.");
    }
  })

  export const book = createAsyncThunk("bookings/book" , async (bookingsData , { rejectWithValue })=>{
    try {
      const response = await api.post(`/bookings/book/${bookingsData.roomId}`,bookingsData);
      return response?.data;  
      } catch (error) {
      console.error("Bookings failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Bookings. Please try again.");
    }
  })

  export const getBookingById = createAsyncThunk("bookings/getBookingById",async (bookingId , { rejectWithValue })=>{
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      return response.data;  
      } catch (error) {
      console.error("Fetching Booking by Id failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching Booking by Id failed. Please try again.");
    }

  });
  export const getBookingByCustomer = createAsyncThunk("bookings/getBookingByCustomer",async (customerId , { rejectWithValue })=>{
    try {
      const response = await api.get(`/bookings/user/${customerId}`);
      return response.data;  
      } catch (error) {
      console.error("Fetching Booking by Id failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching Booking by Id failed. Please try again.");
    }

  });
  
  export const cancelBooking = createAsyncThunk("bookings/cancelBooking",async(bookingId , { rejectWithValue })=>{
    try {
      const repsonse = await api.put(`/bookings/${bookingId}/cancel`);
      return repsonse?.data;  
      } catch (error) {
      console.error("Cancel Booking failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Cancel Booking failed. Please try again.");
    }
  })

  export const updateBooking = createAsyncThunk("bookings/updateBooking",async(bookingData , { rejectWithValue })=>{
    try {
      const repsonse = await api.put(`/bookings/${bookingData?.id}` , bookingData);
      return repsonse?.data;  
      } catch (error) {
      console.error("Update Booking failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Update Booking failed. Please try again.");
    }
  })

  const initialState = {
    bookings: [],
    customerBookings: [],
    count:0,
    status:'idle',
    error:null,
    addEditStatus:'idle',
    addEditError:null,
    deleteStatus:'idle',
    deleteError:null,
    selectedBooking: null,
  };

  const bookingsSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
      setSelectedBooking(state, action){
        state.selectedBooking = action.payload;
      },
    },
    extraReducers:(builder)=>{
      builder.
      addCase(getBookings.pending , (state)=>{
        state.status = "loading";
      })
      .addCase(getBookings.fulfilled , (state , action)=>{
        state.status = "succeded";
        state.bookings = action?.payload;
        state.count = action?.payload?.length
      })
      .addCase(getBookings.rejected , (state , action)=>{
        state.status = "failed";
        state.error = action?.payload;    
      })
      .addCase(getBookingByCustomer.pending , (state)=>{
        state.status = "loading";
      })
      .addCase(getBookingByCustomer.fulfilled , (state , action)=>{
        state.status = "succeded";
        state.bookings = action?.payload.bookings;
        state.count = action?.payload.bookings?.length
      })
      .addCase(getBookingByCustomer.rejected , (state , action)=>{
        state.status = "failed";
        state.error = action?.payload;    
      })
      .addCase(book.pending , (state)=>{
        state.addEditStatus = "loading";
      })
      .addCase(book.fulfilled , (state,action)=>{
        state.addEditStatus = "succeded";
        state.bookings.push(action.payload.booking);
      })
      .addCase(book.rejected , (state,action)=>{
        state.addEditStatus = "failed";
        state.addEditError = action?.payload;    

      })
      .addCase(cancelBooking.pending , (state)=>{
        state.status = "loading";
      })
      .addCase(cancelBooking.fulfilled , (state,action)=>{
        state.status = "succeded";
        const index = state.bookings.findIndex((r)=>r.id === action.payload?.booking?.id);
        state.bookings[index] = action.payload.booking; 
      })
      .addCase(cancelBooking.rejected , (state,action)=>{
        state.status = "failed";
        state.error = action?.payload;    
      })
      .addCase(updateBooking.pending , (state)=>{
        state.addEditStatus = "loading";
      })
      .addCase(updateBooking.fulfilled , (state,action)=>{
        state.addEditStatus = "succeded";
        const index = state.bookings.findIndex((r)=>r.id === action.payload?.booking?.id);
        state.bookings[index] = action.payload.booking; 
      })
      .addCase(updateBooking.rejected , (state,action)=>{
        state.addEditStatus = "failed";
        state.addEditError = action?.payload;    
      })
    }
  });


  export const { setSelectedBooking } = bookingsSlice.actions;
  const bookingsReducer = bookingsSlice.reducer;
export default bookingsReducer;