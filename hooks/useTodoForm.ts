"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "@/src/apollo/graphql/_generated_/hooks";

export const todoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean(),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

export function useTodoForm(
  defaultValues?: Partial<TodoFormValues> & { id?: string },
  onDone?: () => void
) {
  const [createTodo, { loading: createTodoLoading }] = useCreateTodoMutation();
  const [updateTodo, { loading: updateTodoLoading }] = useUpdateTodoMutation();
  const [deleteTodo, { loading: deleteTodoLoading }] = useDeleteTodoMutation();

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
      ...defaultValues,
    },
  });

  const isEditMode = Boolean(defaultValues?.id);
  const isLoading = createTodoLoading || updateTodoLoading || deleteTodoLoading;

  const onSubmit = async (values: TodoFormValues) => {
    try {
      if (isEditMode && defaultValues?.id) {
        await updateTodo({
          variables: {
            updateTodoId: defaultValues.id,
            updateTodoInput: values,
          },
        });
      } else {
        await createTodo({
          variables: {
            createTodoInput: values,
          },
        });
      }

      onDone?.();
    } catch (error) {
      toast.error(
        isEditMode
          ? `Failed to update '${defaultValues?.title}'`
          : `Failed to create '${values.title}'`
      );
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!defaultValues?.id) return;

    try {
      await deleteTodo({
        variables: {
          deleteTodoId: defaultValues.id,
        },
      });

      onDone?.();
    } catch (error) {
      toast.error(`Failed to delete '${defaultValues?.title}'`);
      console.error(error);
    }
  };

  return {
    form,
    onSubmit,
    handleDelete,
    isEditMode,
    isLoading,
  };
}
