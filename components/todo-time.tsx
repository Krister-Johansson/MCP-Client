import { format } from "date-fns";
import { Todo } from "@/apollo/graphql/_generated_/fragments";

interface TodoTimeProps {
  todo: Todo;
}

export function TodoTime({ todo }: TodoTimeProps) {
  return (
    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
      <span>Created: {format(new Date(todo.createdAt), "MMM d, yyyy")}</span>
      {todo.createdAt !== todo.updatedAt && (
        <>
          <span>•</span>
          <span>
            Updated: {format(new Date(todo.updatedAt), "MMM d, yyyy")}
          </span>
        </>
      )}
    </div>
  );
}
