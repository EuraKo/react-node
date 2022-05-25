import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

export default configureStore({
	reducer: {
		// userSlice를 통해서 반환이 될 loginUser, logoutUser중 하나의 액션 객체가 상황에 따라 user키값에 저장이 되면서 store생성
		user: userSlice,
	},
});
