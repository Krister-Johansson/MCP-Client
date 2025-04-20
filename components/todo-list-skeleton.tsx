import { Skeleton } from "./ui/skeleton";

interface TodoListSkeletonProps {
  isLoading: boolean;
  count?: number;
}

export default function TodoListSkeleton({
  isLoading,
  count = 3,
}: TodoListSkeletonProps) {
  if (!isLoading) return null;

  return (
    <div className="flex flex-col space-y-3">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="h-[125px] rounded-xl" />
      ))}
    </div>
  );
}
