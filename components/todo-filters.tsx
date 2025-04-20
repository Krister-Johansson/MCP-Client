"use client";

import { SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterStatus = "all" | "active" | "completed";
export type SortOption = "name" | "created" | "updated";
export type SortDirection = "asc" | "desc";

interface TodoFiltersProps {
  filterStatus: FilterStatus;
  sortOption: SortOption;
  sortDirection: SortDirection;
  onFilterChange: (status: FilterStatus) => void;
  onSortChange: (option: SortOption) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
}

export function TodoFilters({
  filterStatus,
  sortOption,
  sortDirection,
  onFilterChange,
  onSortChange,
  onSortDirectionChange,
}: TodoFiltersProps) {
  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h3 className="text-sm font-medium mb-2">Filter</h3>
          <Tabs
            value={filterStatus}
            onValueChange={(value) => onFilterChange(value as FilterStatus)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-2 items-end">
          <div>
            <h3 className="text-sm font-medium mb-2">Sort by</h3>
            <Select
              value={sortOption}
              onValueChange={(value) => onSortChange(value as SortOption)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="created">Created date</SelectItem>
                <SelectItem value="updated">Updated date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")
            }
            className="h-10 w-10"
          >
            {sortDirection === "asc" ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
