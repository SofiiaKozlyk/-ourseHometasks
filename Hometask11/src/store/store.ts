import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
    }
  })
}
export const wrapper = createWrapper(makeStore);


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


// import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import userSlice from './slices/userSlice';

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       user: userSlice,
//     },
//   });

// export type RootState = ReturnType<typeof makeStore>['getState'];
// export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

// const store = makeStore();
// export default store;
// export const wrapper = createWrapper(makeStore);



// import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import userSlice from './slices/userSlice';

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       user: userSlice, 
//     },
//   });

// export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
// export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

// const store = makeStore();
// export default store;
// export const wrapper = createWrapper(makeStore);

