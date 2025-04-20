"use client";

import { Todo } from "@/apollo/graphql/_generated_/fragments";
import { useTodoForm } from "@/hooks/useTodoForm";
import { Trash } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface DeleteTodoAlertDialogProps {
  todo: Todo;
  asChild?: boolean;
}

export function DeleteTodoAlertDialog({
  todo,
  asChild = false,
}: DeleteTodoAlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleDelete, isLoading } = useTodoForm(
    {
      id: todo.id,
      title: todo.title,
      description: todo.description ?? "",
      completed: todo.completed,
    },
    () => setIsOpen(false)
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild={asChild}>
        <Button
          variant="ghost"
          className="w-full justify-start px-2 py-1.5 text-sm font-normal text-red-600 hover:text-red-700"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this todo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete &quot;{todo.title}&quot; and cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
