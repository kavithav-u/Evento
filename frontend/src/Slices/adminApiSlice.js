import { apiSlice } from "./apiSlice";
const ADMIN_URL = '/api/users/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),           
    }),
    adminGetUser: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/userlist`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    adminActionUser:builder.mutation({
      query:(userId)=>({
        url:`${ADMIN_URL}/userlist`,
        method:"put",
        body:userId,
        credentials: 'include',
      })
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/events/new`,
        method: 'POST',
        body:data,
        credentials: 'include',
      }),
    }),
    fetchEvents: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/events`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    updateEvent: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/events/edit`,
        method: 'put',
        body:data,
        credentials: 'include',
      }),
    }),

    createHalls: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/halls/new`,
        method: 'POST',
        body:data,
        credentials: 'include',
      }),
    }),
    fetchHalls: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/halls`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    createCatering: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/caterings/new`,
        method: 'POST',
        body:data,
        credentials: 'include',
      }),
    }),
    fetchCatering: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/caterings`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    fetchBanner: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/banner`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    createBanner: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/banner/new`,
        method: 'POST',
        body:data,
        credentials: 'include',
      }),
    }),
    updateBanner: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/banner/edit`,
        method: 'put',
        body:data,
        credentials: 'include',
      }),
    }),
    deleteBanner: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/banner/delete`,
        method: 'post',
        body:data,
        credentials: 'include',
      }),
    }),
    fetchAbout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/about`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    createAbout: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/about/new`,
        method: 'POST',
        body:data,
        credentials: 'include',
      }),
    }),
    updateAbout: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/about/edit`,
        method: 'put',
        body:data,
        credentials: 'include',
      }),
    }),
    deleteAbout: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/about/delete`,
        method: 'post',
        body:data,
        credentials: 'include',
      }),
    }),
    adminlogout: builder.mutation({
        query: () => ({
          url: `${ADMIN_URL}/logout`,
          method: 'POST',
          credentials: 'include',
        }),
      }),
      adminActionCatering:builder.mutation({
        query:(cateringId)=>({
          url:`${ADMIN_URL}/caterings`,
          method:"put",
          body:cateringId,
          credentials: 'include',
        })
      }),
      adminActionEvents:builder.mutation({
        query:(eventId)=>({
          url:`${ADMIN_URL}/events`,
          method:"put",
          body:eventId,
          credentials: 'include',
        })
      }),
      adminActionhall:builder.mutation({
        query:(hallId)=>({
          url:`${ADMIN_URL}/halls`,
          method:"put",
          body:hallId,
          credentials: 'include',
        })
      }),
      fetchEventsToHalls: builder.mutation({
        query: () => ({
          url: `${ADMIN_URL}/halls/new`,
          method: 'GET',
          credentials: 'include',
        }),
      }),
      fetchCateringsToHalls: builder.mutation({
        query: () => ({
          url: `${ADMIN_URL}/caterings/new`,
          method: 'GET',
          credentials: 'include',
        }),
      }),
  }),
});

export const {  useAdminloginMutation, 
useAdminlogoutMutation, 
useAdminGetUserMutation, 
useAdminActionUserMutation,
useCreateEventMutation,
useFetchEventsMutation,
useUpdateEventMutation,
useFetchHallsMutation,
useCreateHallsMutation,
useCreateCateringMutation,
useFetchCateringMutation,
useAdminActionCateringMutation,
useAdminActionEventsMutation,
useAdminActionhallMutation,
useFetchEventsToHallsMutation,
useFetchCateringsToHallsMutation,
useFetchBannerMutation,
useCreateBannerMutation,
useUpdateBannerMutation,
useDeleteBannerMutation,
useFetchAboutMutation,
useCreateAboutMutation,
useUpdateAboutMutation,
useDeleteAboutMutation } = adminApiSlice;           