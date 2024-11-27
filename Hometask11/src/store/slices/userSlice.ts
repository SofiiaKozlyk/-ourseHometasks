import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doLogin, doRegister, fetchUserProfile } from '../../api/userActions';
import { UserFormPropsI } from '../../api/userActions';

enum UserState {
    loggedIn = 'loggedIn',
    loggedOut = 'loggedOut',
    tryingLogin = 'tryingLogin',
}

export interface UserStateI {
    key: string | null,
    isAuthenticated: boolean,
    userId: number | null;
    state: UserState
}

export const doLoginThunk = createAsyncThunk('api/auth/login', async (userData: UserFormPropsI) => {
    const response = await doLogin(userData);
    console.log(response);
    return response.data;
});

export const doRegisterThunk = createAsyncThunk('users/register', async (userData: UserFormPropsI) => {
    const response = await doRegister(userData);
    return response.data;
});

// const getKeyValue = () => localStorage.getItem('token') ? localStorage.getItem('token') : null;
const getKeyValue = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') ? localStorage.getItem('token') : null;
    }
    return null;
  };

const getInitialState = async (): Promise<UserStateI> => {
    const token = getKeyValue();

    if (token) {
        try {
            const userProfile = await fetchUserProfile();

            return {
                key: token,
                isAuthenticated: true,
                userId: userProfile.id,
                state: UserState.loggedIn
            };
        }
        catch (error: any) {
            localStorage.removeItem('token');
        }
    }

    return {
        key: null,
        isAuthenticated: false,
        userId: null,
        state: UserState.loggedOut
    };
}

const initialState = await getInitialState();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.key = null;
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.userId = null;
            state.state = UserState.loggedOut;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(doLoginThunk.fulfilled, (state, action) => {
            state.key = action.payload.access_token;
            localStorage.setItem('token', action.payload.access_token);
            state.isAuthenticated = true;
            state.userId = action.payload.userId;
            state.state = UserState.loggedIn;
        });
        builder.addCase(doLoginThunk.rejected, (state, action) => {
            state.key = null;
            state.isAuthenticated = false;
            state.userId = null;
            state.state = UserState.loggedOut;
        });
        builder.addCase(doLoginThunk.pending, (state, action) => {
            state.key = null;
            state.isAuthenticated = false;
            state.userId = null;
            state.state = UserState.tryingLogin;
        });
        builder.addCase(doRegisterThunk.fulfilled, (state, action) => {
            state.key = null;
            state.isAuthenticated = false;
            state.userId = null;
            state.state = UserState.loggedOut;
        });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;