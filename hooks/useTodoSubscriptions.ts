import {
  TodoFieldsFragmentDoc,
  useTodosAddedSubscription,
  useTodosDeletedSubscription,
  useTodosUpdatedSubscription,
} from "@/src/apollo/graphql/_generated_/hooks";
import { toast } from "sonner";
export function useTodoSubscriptions() {
  useTodosAddedSubscription({
    onData: ({ data, client }) => {
      const newTodo = data.data?.todosAdded;
      if (!newTodo) return;

      const newRef = client.cache.writeFragment({
        data: newTodo,
        fragment: TodoFieldsFragmentDoc,
        fragmentName: "TodoFields",
      });

      client.cache.modify({
        fields: {
          todos(existing = []) {
            return [...existing, newRef];
          },
        },
      });
      toast.success(`A new todo '${newTodo.title}' was created!`);
    },
    onError: (error) => {
      console.error('Error in todos added subscription:', error);
      toast.error('Failed to receive updates for new todos');
    }
  });
}

  useTodosUpdatedSubscription({
    onData: ({ data, client }) => {
      const updated = data.data?.todosUpdated;
      if (!updated) return;

      client.cache.writeFragment({
        id: client.cache.identify({ __typename: "Todo", id: updated.id }),
        fragment: TodoFieldsFragmentDoc,
        fragmentName: "TodoFields",
        data: updated,
      });
      toast.success(`Todo '${updated.title}' was updated!`);
    },
    onError: (error) => {
      console.error('Error in todos updated subscription:', error);
      toast.error('Failed to receive updates for modified todos');
    }
  });

  useTodosDeletedSubscription({
    onData: ({ data, client }) => {
      const deleted = data.data?.todosDeleted;
      if (!deleted) return;

      // The id to use for cache operations
      const todoId = client.cache.identify({
        __typename: "Todo",
        id: deleted.id
      });

      client.cache.modify({
        fields: {
          todos(existingTodos = [], { readField }) {
            return existingTodos.filter(
              (todoRef) =>
                readField("id", todoRef) !== deleted.id
            );
          },
        },
      });

      client.cache.evict({ id: todoId });
      client.cache.gc();

      toast.success(`Todo '${deleted.title}' was deleted!`);
    },
    onError: (error) => {
      console.error('Error in todos deleted subscription:', error);
      toast.error('Failed to receive updates for deleted todos');
    }
  });
}
