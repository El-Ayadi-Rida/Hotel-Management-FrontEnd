import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'api';


export const getRooms = createAsyncThunk("rooms/getRooms",async (rejectWithValue)=>{
    try {
      const response = await api.get('/rooms');
      return response?.data
      } catch (error) {
      console.error("Fetching Rooms failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Fetching Rooms failed. Please try again.");
    }
  })

  export const createRoom = createAsyncThunk("rooms/createRoom" , async (roomData , { rejectWithValue })=>{
    try {
      const response = await api.post(`/rooms/${roomData.hotelId}`,roomData);
      return response?.data;  
      } catch (error) {
      console.error("Create Room failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Create Room failed. Please try again.");
    }
  })

  export const deleteRoom = createAsyncThunk("rooms/deleteRoom",async (roomId , { rejectWithValue })=>{
    try {
      const response = await api.delete(`/rooms/${roomId}`);
      return response.data;  
      } catch (error) {
      console.error("Delete Room failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Delete Room failed. Please try again.");
    }

  });
  
  export const updateRoom = createAsyncThunk("rooms/updateRoom",async(roomData , { rejectWithValue })=>{
    try {
      const repsonse = await api.put(`/rooms/${roomData?.id}`,roomData);
      return repsonse?.data;  
      } catch (error) {
      console.error("Update Room failed:", error);
      // Return a custom error message or the error itself
      return rejectWithValue(error.response?.data?.message || "Update Room failed. Please try again.");
    }
  })

  const initialState = {
    rooms: [],
    count:0,
    status:'idle',
    error:null,
    addEditStatus:'idle',
    addEditError:null,
    deleteStatus:'idle',
    deleteError:null,
    selectedRoom: null,
  };

  const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
      setSelectedRoom(state, action){
        state.selectedRoom = action.payload;
      },
    },
    extraReducers:(builder)=>{
      builder.
      addCase(getRooms.pending , (state)=>{
        state.status = "loading";
      })
      .addCase(getRooms.fulfilled , (state , action)=>{
        state.status = "succeded";
        state.rooms = action?.payload;
        state.count = action?.payload?.length
      })
      .addCase(getRooms.rejected , (state , action)=>{
        state.status = "failed";
        state.error = action?.payload;    

      })
      .addCase(createRoom.pending , (state)=>{
        state.addEditStatus = "loading";
      })
      .addCase(createRoom.fulfilled , (state,action)=>{
        state.addEditStatus = "succeded";
        state.rooms.push(action.payload.room);
      })
      .addCase(createRoom.rejected , (state,action)=>{
        state.addEditStatus = "failed";
        state.addEditError = action?.payload;    

      })
      .addCase(deleteRoom.pending , (state)=>{
        state.deleteStatus = "loading";
      })
      .addCase(deleteRoom.fulfilled , (state,action)=>{
        state.deleteStatus = "succeded";
        state.rooms = state.rooms.filter((r)=>r.id !== action.meta.arg);
      })
      .addCase(deleteRoom.rejected , (state,action)=>{
        state.deleteStatus = "failed";
        state.deleteError = action?.payload;    
      })
      .addCase(updateRoom.pending , (state)=>{
        state.addEditStatus = "loading";
      })
      .addCase(updateRoom.fulfilled , (state,action)=>{
        state.addEditStatus = "succeded";
        const index = state.rooms.findIndex((r)=>r.id === action.payload?.room?.id);
        state.rooms[index] = action.payload.room; 
      })
      .addCase(updateRoom.rejected , (state,action)=>{
        state.addEditStatus = "failed";
        state.addEditError = action?.payload;    
      })
    }
  });


  export const { setSelectedRoom } = roomSlice.actions;
  const roomsReducer = roomSlice.reducer;
export default roomsReducer;