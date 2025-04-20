"use client";

import { Todo } from "@/apollo/graphql/_generated_/fragments";
import { useTodoForm } from "@/hooks/useTodoForm";
import { useState } from "react";
import { TodoForm } from "./todo-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Loader2, Pencil } from "lucide-react";

interface EditTodoSheetProps {
  todo: Todo;
  asChild?: boolean;
}

export function EditTodoSheet({ todo, asChild = false }: EditTodoSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { form, onSubmit, isLoading } = useTodoForm(
    {
      id: todo.id,
      title: todo.title,
      description: todo.description ?? "",
      completed: todo.completed,
    },
    () => setIsOpen(false)
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild={asChild}>
        <Button
          variant="ghost"
          className="w-full justify-start px-2 py-1.5 text-sm font-normal"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Todo</SheetTitle>
          <SheetDescription>Make changes to your todo item.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TodoForm className="mr-4 ml-4" />
            <SheetFooter className="sm:justify-end">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
