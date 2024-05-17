import { apiSlice } from './apiSlice'
const TODOS_URL = '/api/profile'
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState()


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
            }),
            providesTags: ['Todo']
        }),
        markComplete: builder.mutation({
            query: (id) => ({
                url: `${TODOS_URL}/mark/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Todo']
        }),
        unMarkComplete: builder.mutation({
            query: (id) => ({
                url: `${TODOS_URL}/unmark/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Todo']
        })
    })
})

export const selectTodos = todosApiSlice.endpoints.getTodos.select()

const emptyArray = []

export const completedTodosSelector = createSelector(
    selectTodos,
    todos => todos?.data?.filter(todo => todo.isCompleted === true) ?? emptyArray 
)

export const inCompletedTodosSelector = createSelector(
    selectTodos,
    todos => todos?.data?.filter(todo => todo.isCompleted === false) ?? emptyArray
)
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useGetTodoByIdQuery, useMarkCompleteMutation, useUnMarkCompleteMutation } = todosApiSlice