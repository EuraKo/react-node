// redux toolkit에서 제공하는 createSlice를 이용하면reducer의 action, payload값을 편하게 설정가능
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		displayName: '',
		uid: '',
		accessToken: '',
	},
	reducers: {
		loginUser: (state, action) => {
			state.displayName = action.payload.displayName;
			state.uid = action.payload.uid;
			state.accessToken = action.payload.accessToken;
		},
		logoutUser: (state) => {
			state.displayName = '';
			state.uid = '';
			state.accessToken = '';
		},
	},
});

// createSlice메서드로 생성한 2개의 loginUSer, logoutUser액션생성 함수를 내보냄
export const { loginUSer, logoutUser } = userSlice.actions; // reducers에 있는 걸 actions로 받아오는것임
export default userSlice.reducer; // 리덕스툴킷에 있는 구문이라 적음
