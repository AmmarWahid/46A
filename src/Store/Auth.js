import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {Api} from '../Utlies/constant/Api';
export let Api = 'https://catullus-6aff42619e86.herokuapp.com/api/v2/';
export const Poemapp = createApi({
  reducerPath: 'Poemapp',
  baseQuery: fetchBaseQuery({
    baseUrl: Api,
    prepareHeaders: headers => {
      headers.set('Accept', 'application/json');
    },
  }),

  endpoints: build => ({
    Signup: build.mutation({
      query(body) {
        console.log('body', body);
        return {
          method: 'POST',
          url: `auth/signup`,
          body,
        };
      },
    }),
    loginUser: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: `auth/login`,
          body,
        };
      },
    }),
    forgetpassword: build.mutation({
      query(body) {
        console.log(body);
        return {
          method: 'POST',
          url: `auth/forget_password`,
          body,
        };
      },
    }),
    Resetpassword: build.mutation({
      query(body) {
        console.log(body.id, body.data);
        return {
          method: 'PATCH',
          url: `auth/Reset_password/${body.id}`,
          body: body.data,
        };
      },
    }),
   
    // Resetpassword: build.query({
    //   query(params) {
    //     console.log(body.id, body.data);
    //     return {
    //       method: 'GET',
    //       url: `users/${params}/notifications`,
    //     };
    //   },
    // }),
  }),
});

export const {
  useSignupMutation,
  useLoginUserMutation,
  useForgetpasswordMutation,
  useResetpasswordMutation
} = Poemapp;
