
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";

interface UpcomingTraining {
  id: string;
  title: string;
  date: string;
  assignees: number;
}

interface OverviewUpcomingTableProps {
  trainings: UpcomingTraining[];
}

export const OverviewUpcomingTable: React.FC<OverviewUpcomingTableProps> = ({ trainings }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy", { locale: fr });
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Formation</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Assignés</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell className="font-medium">{training.title}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    {formatDate(training.date)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center gap-1 w-fit">
                    <Users className="h-3 w-3" /> 
                    {training.assignees}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
