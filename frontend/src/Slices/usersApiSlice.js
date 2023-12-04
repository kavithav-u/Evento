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
      fetchHome: builder.mutation({
        query: () => ({
          url: `${USERS_URL}`,
          method: 'get',
          credentials: 'include',
        }),
      }),
      fetchProfile: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/profile`,
          method: 'get',
        }),
      }),
      updateProfile: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile`,
          method: 'PUT',
          body: data,
        }),
      }),
      updatePassword: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/updatePassword`,
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
      fetchBookings: builder.mutation({
        query: (userId) => ({
          url: `${USERS_URL}/bookings/${userId}`,
          method: 'get',
          credentials: 'include',
        }),
      }),
      createBookings: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/bookings`,
          method: 'post',
          body:data,
          credentials: 'include',
        }),
      }),
      createBookings: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/bookings`,
          method: 'post',
          body:data,
          credentials: 'include',
        }),
      }),
      cancelBookings: builder.mutation({
        query: (bookingId) => ({
          url: `${USERS_URL}/cancelBooking`,
          method: 'put',
          body:{ _id: bookingId },
          credentials: 'include',
        }),
      }),
      fetchGallery: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/gallery`,
          method: 'get',
          credentials: 'include',
        }),
      }),
      fetchSearch: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/search`,
          method: 'get',
          credentials: 'include',
        }),
      }),
      filterSearch: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/search`,
          method: 'post',
          body:data,
          credentials: 'include',
        }),
      }),
  }),
});

export const { useLoginMutation, 
              useLogoutMutation, 
              useRegisterMutation,
              useFetchHomeMutation,
              useFetchProfileMutation,
              useUpdateProfileMutation, 
              useUpdatePasswordMutation,
              useGoogleAuthMutation,
              useServicesMutation,
              useFetchListingMutation, 
              useFetchDetailsMutation,
              useAboutMutation,
            useFetchCateringDetailsMutation,
          useVerifyOTPMutation,
        useCreateBookingsMutation,
        useCancelBookingsMutation,
      useFetchBookingsMutation,
    useFetchGalleryMutation,
  useFetchSearchMutation,
useFilterSearchMutation} = userApiSlice;