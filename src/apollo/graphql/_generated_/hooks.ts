import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {"context":{"clientName":"apiGraph"}} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type CreateTodoInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type UpdateTodoInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TodoFieldsFragment = (
  { id: string, title: string, description?: string | null, completed: boolean, createdAt: Date, updatedAt: Date }
  & { __typename?: 'Todo' }
);

export type CreateTodoMutationVariables = Exact<{
  createTodoInput: CreateTodoInput;
}>;


export type CreateTodoMutation = (
  { createTodo: (
    { id: string, title: string, description?: string | null, completed: boolean, createdAt: Date, updatedAt: Date }
    & { __typename?: 'Todo' }
  ) }
  & { __typename?: 'Mutation' }
);

export type DeleteTodoMutationVariables = Exact<{
  deleteTodoId: Scalars['String']['input'];
}>;


export type DeleteTodoMutation = (
  { deleteTodo: boolean }
  & { __typename?: 'Mutation' }
);

export type UpdateTodoMutationVariables = Exact<{
  updateTodoId: Scalars['String']['input'];
  updateTodoInput: UpdateTodoInput;
}>;


export type UpdateTodoMutation = (
  { updateTodo: (
    { id: string, title: string, description?: string | null, completed: boolean, createdAt: Date, updatedAt: Date }
    & { __typename?: 'Todo' }
  ) }
  & { __typename?: 'Mutation' }
);

export type TodoQueryVariables = Exact<{
  todoId: Scalars['String']['input'];
}>;


export type TodoQuery = (
  { todo: (
    { id: string, title: string, description?: string | null, completed: boolean, createdAt: Date, updatedAt: Date }
    & { __typename?: 'Todo' }
  ) }
  & { __typename?: 'Query' }
);

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = (
  { todos: Array<(
    { id: string, title: string, description?: string | null, completed: boolean, createdAt: Date, updatedAt: Date }
    & { __typename?: 'Todo' }
  )> }
  & { __typename?: 'Query' }
);

export type TodosAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TodosAddedSubscription = (
  { todosAdded: (
    { id: string, title: string, description?: string | null, completed: boolean, createdAt: Date, updatedAt: Date }
    & { __typename?: 'Todo' }
  ) }
  & { __typename?: 'Subscription' }
);

export type TodosDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TodosDeletedSubscription = (
  { todosDeleted: (
    { id: string, title: string, description?: string | null, completed: boolean, createdAt: Date, updatedAt: Date }
    & { __typename?: 'Todo' }
  ) }
  & { __typename?: 'Subscription' }
);

export type TodosUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TodosUpdatedSubscription = (
  { todosUpdated: (
    { id: string, title: string, description?: string | null, completed: boolean, createdAt: Date, updatedAt: Date }
    & { __typename?: 'Todo' }
  ) }
  & { __typename?: 'Subscription' }
);

export const TodoFieldsFragmentDoc = gql`
    fragment TodoFields on Todo {
  id
  title
  description
  completed
  createdAt
  updatedAt
}
    `;
export const CreateTodoDocument = gql`
    mutation CreateTodo($createTodoInput: CreateTodoInput!) {
  createTodo(createTodoInput: $createTodoInput) {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      createTodoInput: // value for 'createTodoInput'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($deleteTodoId: String!) {
  deleteTodo(id: $deleteTodoId)
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      deleteTodoId: // value for 'deleteTodoId'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($updateTodoId: String!, $updateTodoInput: UpdateTodoInput!) {
  updateTodo(id: $updateTodoId, updateTodoInput: $updateTodoInput) {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      updateTodoId: // value for 'updateTodoId'
 *      updateTodoInput: // value for 'updateTodoInput'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const TodoDocument = gql`
    query Todo($todoId: String!) {
  todo(id: $todoId) {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useTodoQuery__
 *
 * To run a query within a React component, call `useTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoQuery({
 *   variables: {
 *      todoId: // value for 'todoId'
 *   },
 * });
 */
export function useTodoQuery(baseOptions: Apollo.QueryHookOptions<TodoQuery, TodoQueryVariables> & ({ variables: TodoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodoQuery, TodoQueryVariables>(TodoDocument, options);
      }
export function useTodoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodoQuery, TodoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodoQuery, TodoQueryVariables>(TodoDocument, options);
        }
export function useTodoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TodoQuery, TodoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TodoQuery, TodoQueryVariables>(TodoDocument, options);
        }
export type TodoQueryHookResult = ReturnType<typeof useTodoQuery>;
export type TodoLazyQueryHookResult = ReturnType<typeof useTodoLazyQuery>;
export type TodoSuspenseQueryHookResult = ReturnType<typeof useTodoSuspenseQuery>;
export type TodoQueryResult = Apollo.QueryResult<TodoQuery, TodoQueryVariables>;
export const TodosDocument = gql`
    query Todos {
  todos {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useTodosQuery__
 *
 * To run a query within a React component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQuery(baseOptions?: Apollo.QueryHookOptions<TodosQuery, TodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodosQuery, TodosQueryVariables>(TodosDocument, options);
      }
export function useTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodosQuery, TodosQueryVariables>(TodosDocument, options);
        }
export function useTodosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TodosQuery, TodosQueryVariables>(TodosDocument, options);
        }
export type TodosQueryHookResult = ReturnType<typeof useTodosQuery>;
export type TodosLazyQueryHookResult = ReturnType<typeof useTodosLazyQuery>;
export type TodosSuspenseQueryHookResult = ReturnType<typeof useTodosSuspenseQuery>;
export type TodosQueryResult = Apollo.QueryResult<TodosQuery, TodosQueryVariables>;
export const TodosAddedDocument = gql`
    subscription TodosAdded {
  todosAdded {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useTodosAddedSubscription__
 *
 * To run a query within a React component, call `useTodosAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTodosAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTodosAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TodosAddedSubscription, TodosAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TodosAddedSubscription, TodosAddedSubscriptionVariables>(TodosAddedDocument, options);
      }
export type TodosAddedSubscriptionHookResult = ReturnType<typeof useTodosAddedSubscription>;
export type TodosAddedSubscriptionResult = Apollo.SubscriptionResult<TodosAddedSubscription>;
export const TodosDeletedDocument = gql`
    subscription TodosDeleted {
  todosDeleted {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useTodosDeletedSubscription__
 *
 * To run a query within a React component, call `useTodosDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTodosDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTodosDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TodosDeletedSubscription, TodosDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TodosDeletedSubscription, TodosDeletedSubscriptionVariables>(TodosDeletedDocument, options);
      }
export type TodosDeletedSubscriptionHookResult = ReturnType<typeof useTodosDeletedSubscription>;
export type TodosDeletedSubscriptionResult = Apollo.SubscriptionResult<TodosDeletedSubscription>;
export const TodosUpdatedDocument = gql`
    subscription TodosUpdated {
  todosUpdated {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useTodosUpdatedSubscription__
 *
 * To run a query within a React component, call `useTodosUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTodosUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTodosUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TodosUpdatedSubscription, TodosUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TodosUpdatedSubscription, TodosUpdatedSubscriptionVariables>(TodosUpdatedDocument, options);
      }
export type TodosUpdatedSubscriptionHookResult = ReturnType<typeof useTodosUpdatedSubscription>;
export type TodosUpdatedSubscriptionResult = Apollo.SubscriptionResult<TodosUpdatedSubscription>;