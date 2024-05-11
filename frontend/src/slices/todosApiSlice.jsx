import { apiSlice } from './apiSlice'
const TODOS_URL = '/api/profile'

export const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => ({
                url: `${TODOS_URL}`,
                method: 'GET'
            }),
            providesTags: ['Todo']
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: `${TODOS_URL}/newTodo`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: builder.mutation({
            query: (todoId) => ({
                url: `${TODOS_URL}/${todoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todo']
        }),
        getTodoById: builder.query({
            query: (todoId) => ({
                url: `${TODOS_URL}/${todoId}`,
            })
        })
    })
})

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useGetTodoByIdQuery } = todosApiSlice