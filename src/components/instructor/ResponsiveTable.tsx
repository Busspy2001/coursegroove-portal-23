
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface ResponsiveTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
    isMobileVisible?: boolean;
  }[];
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => React.Key;
  mobileRenderer?: (item: T) => React.ReactNode;
}

export function ResponsiveTable<T>({
  data,
  columns,
  onRowClick,
  keyExtractor,
  mobileRenderer,
}: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {data.map((item) => {
          if (mobileRenderer) {
            return mobileRenderer(item);
          }
          
          return (
            <Card
              key={keyExtractor(item)}
              className={onRowClick ? "cursor-pointer" : ""}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2 flex-1">
                    {columns
                      .filter((col) => col.isMobileVisible !== false)
                      .map((column) => (
                        <div key={String(column.accessorKey)} className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {column.header}
                          </span>
                          <div className="font-medium">
                            {column.cell
                              ? column.cell(item)
                              : String(item[column.accessorKey])}
                          </div>
                        </div>
                      ))}
                  </div>
                  {onRowClick && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.accessorKey)}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={keyExtractor(item)}
              className={onRowClick ? "cursor-pointer" : ""}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column) => (
                <TableCell key={String(column.accessorKey)}>
                  {column.cell ? column.cell(item) : String(item[column.accessorKey])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
