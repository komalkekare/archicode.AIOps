import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveGenArch = createAsyncThunk(
  "genArch/saveGenArch",
  async (arch, { _, rejectWithValue }) => {
    try {

        const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "authToken": token ? token:null
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_HOST}/genArch/saveArch`,
        arch,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGenArch = createAsyncThunk(
    "genArch/fetchGenArch",
    async (_, {rejectWithValue }) => {
      try {

        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            "Content-Type": "application/json",
            "authToken": token ? token:null
          },
        };
  
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_HOST}/genArch/fetchArch`,
          config
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteGenArch = createAsyncThunk(
    "genArch/deleteGenArch",
    async (archId, { _, rejectWithValue }) => {
      try {

        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            "Content-Type": "application/json",
            "authToken": token ? token:null
          },
        };
  
        const { data } = await axios.delete(
          `${process.env.REACT_APP_API_HOST}/genArch/deleteArch/${archId}`,
          config
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const fetchSingleGenArch = createAsyncThunk(
    "genArch/fetchSingleGenArch",
    async (archId, { _, rejectWithValue }) => {
      try {

        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            "Content-Type": "application/json",
            "authToken": token ? token:null
          },
        };
  
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_HOST}/genArch/fetchSingleArch/${archId}`,
          config
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );