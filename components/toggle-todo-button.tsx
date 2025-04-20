import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Todo } from "@/apollo/graphql/_generated_/fragments";
import { useTodoForm } from "@/hooks/useTodoForm";

interface ToggleTodoProps {
  todo: Todo;
}

export function ToggleTodoButton({ todo }: ToggleTodoProps) {
  const { onSubmit, isLoading } = useTodoForm({
    id: todo.id,
    title: todo.title,
    description: todo.description ?? "",
    completed: todo.completed,
  });

  const handleToggleComplete = () => {
    onSubmit({
      completed: !todo.completed,
      title: todo.title,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isLoading}
      className={`h-6 w-6 rounded-full ${
        todo.completed
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-400"
      }`}
      onClick={() => handleToggleComplete()}
    >
      {todo.completed && <Check className="h-4 w-4" />}
    </Button>
  );
}
