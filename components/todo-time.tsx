import { Todo } from "@/apollo/graphql/_generated_/fragments";
import TimeAgo from "react-timeago";
interface TodoTimeProps {
  todo: Todo;
}

export function TodoTime({ todo }: TodoTimeProps) {
  return (
    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
      <span>
        Created: <TimeAgo date={new Date(todo.createdAt)} />
      </span>
      {todo.createdAt !== todo.updatedAt && (
        <>
          <span>•</span>
          <span>
            Updated: <TimeAgo date={new Date(todo.updatedAt)} />
          </span>
        </>
      )}
    </div>
  );
}
