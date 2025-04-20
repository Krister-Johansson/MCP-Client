"use client";
import { CreateTodoDialog } from "@/components/create-todo-dialog";
import {
  FilterStatus,
  SortDirection,
  SortOption,
  TodoFilters,
} from "@/components/todo-filters";
import { TodoList } from "@/components/todo-list";
import TodoListSkeleton from "@/components/todo-list-skeleton";
import { Button } from "@/components/ui/button";
import { useTodosQuery } from "@/src/apollo/graphql/_generated_/hooks";

import { useMemo, useState } from "react";

export default function Home() {
  const [showAIChat, setShowAIChat] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortOption, setSortOption] = useState<SortOption>("created");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const { data, loading } = useTodosQuery();
  const filteredAndSortedTodos = useMemo(() => {
    // First filter
    let filtered = [...(data?.todos ?? [])];
    if (filterStatus === "active") {
      filtered = filtered.filter((todo) => !todo.completed);
    } else if (filterStatus === "completed") {
      filtered = filtered.filter((todo) => todo.completed);
    }

    // Then sort
    return filtered.sort((a, b) => {
      let comparison = 0;

      if (sortOption === "name") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortOption === "created") {
        comparison =
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortOption === "updated") {
        comparison =
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      return sortDirection === "asc" ? -comparison : comparison;
    });
  }, [data?.todos, filterStatus, sortOption, sortDirection]);

  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Todo App</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAIChat(!showAIChat)}>
            {showAIChat ? "Hide AI Chat" : "Show AI Chat"}
          </Button>
          <CreateTodoDialog />
        </div>
      </div>

      <TodoFilters
        filterStatus={filterStatus}
        sortOption={sortOption}
        sortDirection={sortDirection}
        onFilterChange={setFilterStatus}
        onSortChange={setSortOption}
        onSortDirectionChange={setSortDirection}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${showAIChat ? "md:col-span-2" : "md:col-span-3"}`}>
          <TodoListSkeleton isLoading={loading} />
          <TodoList todos={filteredAndSortedTodos} />
        </div>

        {showAIChat && (
          <div className="md:col-span-1">{/* <AIChat todos={todos} /> */}</div>
        )}
      </div>
    </main>
  );
}
