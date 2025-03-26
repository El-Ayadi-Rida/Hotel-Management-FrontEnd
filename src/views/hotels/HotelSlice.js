import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'api';


export const getHotels = createAsyncThunk("hotels/getHotels",async (rejectWithValue)=>{
    try {
      const response = await api.get('/hotels');
      return response?.data
      } catch (error) {
      console.error("Fetching Hotels failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching Hotels failed. Please try again.");
    }
  })

  export const createHotel = createAsyncThunk("hotels/createHotel" , async (hotelData , { rejectWithValue })=>{
    try {
      const response = await api.post('/hotels',hotelData);
      return response?.data;  
      } catch (error) {
      console.error("Create FAQ failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Create Hotel failed. Please try again.");
    }
  })

  export const deleteHotel = createAsyncThunk("hotels/deleteHotel",async (hotelId , { rejectWithValue })=>{
    try {
      const response = await api.delete(`/hotels/${hotelId}`);
      return response.data;  
      } catch (error) {
      console.error("Delete FAQ failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Delete FAQ failed. Please try again.");
    }

  });
  
  export const updateHotel = createAsyncThunk("hotels/updateHotel",async(hotelData , { rejectWithValue })=>{
    try {
      const repsonse = await api.put(`/hotels/${hotelData?.id}`,hotelData);
      return repsonse?.data;  
      } catch (error) {
      console.error("Update FAQ failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Update FAQ failed. Please try again.");
    }
  })

  const initialState = {
    hotels: [],
    count:0,
    status:'idle',
    error:null,
    addEditStatus:'idle',
    addEditError:null,
    deleteStatus:'idle',
    deleteError:null,
    selectedHotel: null,
  };

  const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
      setSelectedHotel(state, action){
        state.selectedHotel = action.payload;
      },
    },
    extraReducers:(builder)=>{
      builder.
      addCase(getHotels.pending , (state)=>{
        state.status = "loading";
      })
      .addCase(getHotels.fulfilled , (state , action)=>{
        state.status = "succeded";
        state.hotels = action?.payload;
        state.count = action?.payload?.length
      })
      .addCase(getHotels.rejected , (state , action)=>{
        state.status = "failed";
        state.error = action?.payload;    

      })
      .addCase(createHotel.pending , (state)=>{
        state.addEditStatus = "loading";
      })
      .addCase(createHotel.fulfilled , (state,action)=>{
        state.addEditStatus = "succeded";
        state.hotels.push(action.payload.hotel);
      })
      .addCase(createHotel.rejected , (state,action)=>{
        state.addEditStatus = "failed";
        state.addEditError = action?.payload;    

      })
      .addCase(deleteHotel.pending , (state)=>{
        state.deleteStatus = "loading";
      })
      .addCase(deleteHotel.fulfilled , (state,action)=>{
        state.deleteStatus = "succeded";
        state.hotels = state.hotels.filter((r)=>r.id !== action.meta.arg);
      })
      .addCase(deleteHotel.rejected , (state,action)=>{
        state.deleteStatus = "failed";
        state.deleteError = action?.payload;    
      })
      .addCase(updateHotel.pending , (state)=>{
        state.addEditStatus = "loading";
      })
      .addCase(updateHotel.fulfilled , (state,action)=>{
        state.addEditStatus = "succeded";
        const index = state.hotels.findIndex((r)=>r.id === action.payload?.hotel?.id);
        state.hotels[index] = action.payload.hotel; 
      })
      .addCase(updateHotel.rejected , (state,action)=>{
        state.addEditStatus = "failed";
        state.addEditError = action?.payload;    
      })
    }
  });


  export const { setSelectedHotel } = hotelSlice.actions;
  const hotelsReducer = hotelSlice.reducer;
export default hotelsReducer;