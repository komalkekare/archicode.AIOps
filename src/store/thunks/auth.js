import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, { _, rejectWithValue }) => {
    try {
       
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_HOST}/auth/signup`,
        user,
        config
      );
      localStorage.setItem('authToken', data.authToken);
    //   localStorage.setItem('userName', data.userName);
    //   localStorage.setItem('userEmail', data.userEmail);
      
      return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk("auth/signin", async (userCred, {_, rejectWithValue })=>{
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_HOST}/auth/signin`,
            userCred,
            config
        );
        console.log(data)
        localStorage.setItem('authToken', data.authToken);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchSingleUser = createAsyncThunk(
  "genArch/fetchSingleUser",
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
        `${process.env.REACT_APP_API_HOST}/auth/fetchSingleUser`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
