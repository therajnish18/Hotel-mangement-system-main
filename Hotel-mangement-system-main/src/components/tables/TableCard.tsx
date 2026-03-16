import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Table } from "@/types/index";
import { cn } from "@/lib/utils";
import TableManager from "@/components/tables/TableManager";

interface TableCardProps {
  table: Table;
  setSelectedTable: (table: Table) => void;
  setTables: (tables: Table[]) => void;
  tables: Table[];
}

const TableCard: React.FC<TableCardProps> = ({
  table,
  setSelectedTable,
  setTables,
  tables,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card
          key={table.name as React.Key}
          className={cn(
            "min-w-28 min-h-28 max-w-56 max-h-40 mb-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2",
            table.status === "occupied" && "bg-gradient-to-br from-green-50 to-emerald-100 border-green-400 shadow-lg shadow-green-200/50",
            table.status === "reserved" && "bg-gradient-to-br from-amber-50 to-yellow-100 border-yellow-400 shadow-lg shadow-yellow-200/50",
            table.status === "available" && "bg-white border-gray-200 hover:border-purple-300"
          )}
          onClick={() => setSelectedTable(table)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="text-gray-600">Table</span>
              <span className={cn(
                "text-xl font-bold px-3 py-1 rounded-lg shadow-md",
                table.status === "occupied" && "bg-green-500 text-white",
                table.status === "reserved" && "bg-amber-500 text-white",
                table.status === "available" && "bg-purple-500 text-white"
              )}>
                {table.name}
              </span>
            </CardTitle>
            <div
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold",
                table.status === "occupied" && "bg-green-500 text-white",
                table.status === "reserved" && "bg-amber-500 text-white",
                table.status === "available" && "bg-gray-200 text-gray-700"
              )}
            >
              {table.status === "occupied" ? "🟢" : table.status === "reserved" ? "🟡" : "⚪"}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              {table.status === "occupied"
                ? "Currently in use"
                : table.status === "reserved"
                ? "Reserved"
                : "Available for seating"}
            </p>
            <Button
              className={cn(
                "w-full mt-2 font-semibold transition-all duration-200",
                table.status === "occupied" && "bg-green-600 hover:bg-green-700",
                table.status === "reserved" && "bg-amber-600 hover:bg-amber-700",
                table.status === "available" && "bg-purple-600 hover:bg-purple-700"
              )}
              onClick={() => setSelectedTable(table)}
            >
              Manage Table
            </Button>
          </CardContent>
        </Card>
      </SheetTrigger>
      <TableManager table={table} tables={tables} setTables={setTables} />
    </Sheet>
  );
};

export default TableCard;
