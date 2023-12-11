import {createSlice} from '@reduxjs/toolkit';



const searchSlice = createSlice ({
    name: 'search',
  initialState: {
    selectedHallId: null,
  },
  reducers: {
    setSelectedHallId: (state, action) => {
      state.selectedHallId = action.payload;
    },
    }
});


export const { setSelectedHallId  } = searchSlice.actions;
export const selectSelectedHallId = (state) => state.search.selectedHallId;


export default searchSlice.reducer;