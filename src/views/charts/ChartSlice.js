import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'api';


export const fBookingsOverTime = createAsyncThunk("charts/bookingsOverTime",async (rejectWithValue)=>{
    try {
      const response = await api.get('/analytics/bookings-over-time');
      return response?.data
      } catch (error) {
      console.error("Fetching data failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching data failed. Please try again.");
    }
  })
export const fRoomStatus = createAsyncThunk("charts/roomStatus",async (rejectWithValue)=>{
    try {
      const response = await api.get('/analytics/room-status');
      return response?.data
      } catch (error) {
      console.error("Fetching data failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching data failed. Please try again.");
    }
  })
export const fBookingsByHotel = createAsyncThunk("charts/bookingsByHotel",async (rejectWithValue)=>{
    try {
      const response = await api.get('/analytics/bookings-by-hotel');
      return response?.data
      } catch (error) {
      console.error("Fetching data failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching data failed. Please try again.");
    }
  })
export const fBookingsByHotelC = createAsyncThunk("charts/bookingsByHotelC",async (rejectWithValue)=>{
    try {
      const response = await api.get('/analytics/bookings-by-hotel-customer');
      return response?.data
      } catch (error) {
      console.error("Fetching data failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching data failed. Please try again.");
    }
  })
export const fTopCustomers = createAsyncThunk("charts/topCustomers",async (rejectWithValue)=>{
    try {
      const response = await api.get('/analytics/top-customers');
      return response?.data
      } catch (error) {
      console.error("Fetching data failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching data failed. Please try again.");
    }
  })


  const initialState = {
    bookingsOverTime: [],
    roomStatus: [],
    bookingsByHotel: [],
    topCustomers: [],
    bookingsOverTimeStatus: [],
    roomStatusStatus: [],
    bookingsByHotelStatus: [],
    topCustomersStatus: [],
    bookingsOverTimeError: [],
    roomStatusError: [],
    bookingsByHotelError: [],
    topCustomersError: [],
  };

  const chartsSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
      builder.
      addCase(fBookingsOverTime.pending , (state)=>{
        state.bookingsOverTimeStatus = "loading";
      })
      .addCase(fBookingsOverTime.fulfilled , (state , action)=>{
        state.bookingsOverTimeStatus = "succeded";
        state.bookingsOverTime = action?.payload;
      })
      .addCase(fBookingsOverTime.rejected , (state , action)=>{
        state.bookingsOverTimeStatus = "failed";
        state.bookingsOverTimeError = action?.payload;    
      })
      .addCase(fRoomStatus.pending , (state)=>{
        state.roomStatusStatus = "loading";
      })
      .addCase(fRoomStatus.fulfilled , (state , action)=>{
        state.roomStatusStatus = "succeded";
        state.roomStatus = action?.payload;
      })
      .addCase(fRoomStatus.rejected , (state , action)=>{
        state.roomStatusStatus = "failed";
        state.roomStatusError = action?.payload;    
      })
      .addCase(fBookingsByHotel.pending , (state)=>{
        state.bookingsByHotelStatus = "loading";
      })
      .addCase(fBookingsByHotel.fulfilled , (state , action)=>{
        state.bookingsByHotelStatus = "succeded";
        state.bookingsByHotel = action?.payload;
      })
      .addCase(fBookingsByHotel.rejected , (state , action)=>{
        state.bookingsByHotelStatus = "failed";
        state.bookingsByHotelError = action?.payload;    
      })
      .addCase(fBookingsByHotelC.pending , (state)=>{
        state.bookingsByHotelStatus = "loading";
      })
      .addCase(fBookingsByHotelC.fulfilled , (state , action)=>{
        state.bookingsByHotelStatus = "succeded";
        state.bookingsByHotel = action?.payload;
      })
      .addCase(fBookingsByHotelC.rejected , (state , action)=>{
        state.bookingsByHotelStatus = "failed";
        state.bookingsByHotelError = action?.payload;    
      })
      .addCase(fTopCustomers.pending , (state)=>{
        state.topCustomersStatus = "loading";
      })
      .addCase(fTopCustomers.fulfilled , (state , action)=>{
        state.topCustomersStatus = "succeded";
        state.topCustomers = action?.payload;
      })
      .addCase(fTopCustomers.rejected , (state , action)=>{
        state.topCustomersStatus = "failed";
        state.topCustomersError = action?.payload;    
      })
    }
  });


const chartsReducer = chartsSlice.reducer;
export default chartsReducer;