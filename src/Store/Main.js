import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Api} from './Auth';

export const getBaseQuery = fetchBaseQuery({
  baseUrl: Api,
  prepareHeaders: (headers, {getState}) => {
    const token = getState().Slice.accestoken;
    headers.set('Accept', 'application/json');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
console.log(getBaseQuery);
export const getMainApis = createApi({
  baseQuery: getBaseQuery,
  tagTypes: ['UPDATE', 'IMAGEID'],
  endpoints: builder => ({
    getimageid: builder.query({
      query(id) {
        console.log(id, 'mutation');
        return {
          method: 'GET',
          url: `auth/getimageId/${id}`,
        };
      },
      invalidatesTags: ['IMAGEID'],
    }),
    
    getfavdata: builder.query({
      query() {
        return {
          method: 'GET',
          url: `auth/getFavourites`,
        };
      },
      providesTags: ['UPDATE'],
    }),

    updatefavdata: builder.mutation({
      query(id) {
       

        console.log('==>>>>', id);
        return {
          method: 'POST',
          url: `auth/favourites/${id}}`,
        };
      },
      invalidatesTags: ['UPDATE'],
    }),

    getnotifications: builder.query({
      query(id) {
        
        return {
          method: 'GET',
          url: `auth/users/${id}/notifications`,
        };
      },
      providesTags: ['IMAGEID'],
    }),
    getusers: builder.query({
      query(id) {
        return {
          method: 'GET',
          url: `auth/profile/${id}`,
        };
      },
    }),
    DeleteUser: builder.mutation({
      query(id) {
        console.log("mut",id)
        return {
          method: 'DELETE',
          url: `auth/users/${id}`,
        };
      },
    }),
    // getAlltrainer: builder.query({
    //   query() {
    //     return {
    //       method: 'GET',
    //       url: `admin/trainer`,
    //     };
    //   },
    // }),
    // gettrainer: builder.query({
    //   query() {
    //     return {
    //       method: 'GET',
    //       url: `admin/trainee/messagedTrainer`,
    //     };
    //   },
    // }),
    // deleteuser: builder.mutation({
    //   query(id) {
    //     return {
    //       method: 'PATCH',
    //       url: `user/deleteMe/${id}`,
    //     };
    //   },
    // }),
  }),
});

export const {
  useGetimageidQuery,
  useGetfavdataQuery,
  useUpdatefavdataMutation,
  useGetnotificationsQuery,
  useGetusersQuery,useDeleteUserMutation
} = getMainApis;
