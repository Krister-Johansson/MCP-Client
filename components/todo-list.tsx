"use client";

import { Todo } from "@/apollo/graphql/_generated_/fragments";
import { MoreHorizontal } from "lucide-react";
import { DeleteTodoAlertDialog } from "./delete-todo-alert-dialog";
import { EditTodoSheet } from "./edit-todo-sheet";
import { TodoTime } from "./todo-time";
import { ToggleTodoButton } from "./toggle-todo-button";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTodoSubscriptions } from "@/hooks/useTodoSubscriptions";

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  useTodoSubscriptions();
  if (todos.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No todos yet</h3>
        <p className="text-muted-foreground">
          Create a new todo to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card key={todo.id} className="relative">
          <CardHeader className="pb-2 flex flex-row items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <ToggleTodoButton todo={todo} />
                <CardTitle
                  className={`text-lg ${
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {todo.title}
                </CardTitle>
              </div>
              <TodoTime todo={todo} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <EditTodoSheet todo={todo} asChild />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <DeleteTodoAlertDialog todo={todo} asChild />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          {todo.description && (
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                {todo.description}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
