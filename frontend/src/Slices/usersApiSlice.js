import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/register`,
          method: 'POST',
          body: data,
        }),
      }),
      verifyOTP: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/otp`,
          method: 'POST',
          body: data,
          credentials: 'include',
        }),
      }),
    logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
        }),
      }),
      updateProfile: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile`,
          method: 'PUT',
          body: data,
        }),
      }),
      googleAuth: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/googleAuth`,
          method: 'POST',
          body: data,
        }),
      }),
      services: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/services`,
          method: 'get',
          credentials: 'include',
        }),
      }),
      fetchListing: builder.mutation({
        query: (eventId) => ({
          url: `${USERS_URL}/listing/${eventId}`,
          method: 'get',
          credentials: 'include',
        }),
      }),
      fetchDetails: builder.mutation({
        query: (hallId) => ({
          url: `${USERS_URL}/details/${hallId}`,
          method: 'get',
          credentials: 'include',
        }),
      }),
      fetchCateringDetails: builder.mutation({
        query: (cateringId) => ({
          url: `${USERS_URL}/details/${cateringId}`,
          method: 'get',
          
          credentials: 'include',
        }),
      }),
      about: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/about`,
          method: 'get',
          credentials: 'include',
        }),
      }),
  }),
});

export const { useLoginMutation, 
              useLogoutMutation, 
              useRegisterMutation, 
              useUpdateProfileMutation, 
              useGoogleAuthMutation,
              useServicesMutation,
              useFetchListingMutation, 
              useFetchDetailsMutation,
              useAboutMutation,
            useFetchCateringDetailsMutation,
          useVerifyOTPMutation} = userApiSlice;