import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const CardComponent = ({
  title,
  value,
  valueClass,
}: {
  title: string;
  value: string;
  valueClass: string;
}) => (
  <Card className="min-w-60 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
    <CardHeader>
      <CardTitle className="text-gray-700">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className={cn("font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r", valueClass)}>{value}</p>
    </CardContent>
  </Card>
);

const SelectComponent = ({
  label,
  options,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-col">
    <Select onValueChange={onChange}>
      <SelectTrigger className="p-2 border border-gray-300 rounded-md">
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonthlyRevenue, setSelectedMonthlyRevenue] = useState(0);
  const [selectedMonthlyExpenses, setSelectedMonthlyExpenses] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateRevenue, setSelectedDateRevenue] = useState(0);
  const [selectedDateExpenses, setSelectedDateExpenses] = useState(0);

  const fetchSelectedDateData = async () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const dailyRevenue = await window.restaurant.revenue.getDailyRevenue(
      year,
      month,
      day
    );
    const expenses = await window.restaurant.expenses.getExpensesForFullDay(
      selectedDate.toISOString()
    );
    const dailyExpenses = expenses.reduce(
      (sum: number, expense: { price: number }) => sum + expense.price,
      0
    );
    setSelectedDateRevenue(dailyRevenue);
    setSelectedDateExpenses(dailyExpenses);
  };
  useEffect(() => {
    fetchSelectedDateData();
  }, [selectedDate]);
  const fetchData = async () => {
    const orders = await window.restaurant.order.getOrders();
    const expenses = await window.restaurant.expenses.getExpenses();

    const totalRevenue = orders.reduce(
      (sum: number, order: { amountPaid: number }) => sum + order.amountPaid,
      0
    );
    const totalExpenses = expenses.reduce(
      (sum: number, expense: { price: number }) => sum + expense.price,
      0
    );
    setTotalRevenue(totalRevenue);
    setTotalExpenses(totalExpenses);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchSelectedMonthlyData = async () => {
    if (!selectedMonth || !selectedYear) return;

    const monthlyRevenue = await window.restaurant.revenue.getMonthlyRevenue(
      selectedYear,
      selectedMonth
    );
    const monthlyExpenses = await window.restaurant.expenses.getMonthlyExpenses(
      selectedYear,
      selectedMonth
    );

    setSelectedMonthlyRevenue(monthlyRevenue);
    setSelectedMonthlyExpenses(monthlyExpenses);
  };

  useEffect(() => {
    fetchSelectedMonthlyData();
  }, [selectedMonth, selectedYear]);

  const monthOptions = Array.from({ length: 12 }).map((_, i) => {
    const month = i + 1;
    return {
      value: `${new Date().getFullYear()}-${month}`,
      label: new Date(new Date().getFullYear(), i).toLocaleString("default", {
        month: "long",
      }),
    };
  });

  const yearOptions = Array.from({ length: 5 }).map((_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <div className="p-2 space-y-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track your restaurant's performance</p>
      </div>
      
      <div className="flex flex-col flex-wrap gap-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Daily Overview{" "}
            <span className="text-purple-500">{selectedDate.toDateString()}</span>
          </h2>
        <div className="mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[280px] justify-start text-left font-normal hover:shadow-lg transition-all ${
                  !selectedDate && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                //@ts-ignore
                selected={selectedDate}
                //@ts-ignore
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex justify-between w-1/2 items-center gap-4 mt-4">
          <CardComponent
            title="Daily Revenue"
            value={`₹${selectedDateRevenue}`}
            valueClass="from-green-500 to-emerald-500"
          />
          <CardComponent
            title="Daily Expenses"
            value={`₹${selectedDateExpenses}`}
            valueClass="from-red-500 to-rose-500"
          />
          <CardComponent
            title="Daily Net Profit"
            value={`₹${selectedDateRevenue - selectedDateExpenses}`}
            valueClass={
              selectedDateRevenue - selectedDateExpenses > 0
                ? "from-green-500 to-emerald-500"
                : "from-red-500 to-rose-500"
            }
          />
        </div>
      </div>
        
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
        <div className="flex gap-4">
          <SelectComponent
            label="Month"
            options={monthOptions}
            onChange={(value) =>
              setSelectedMonth(parseInt(value.split("-")[1]))
            }
          />
          <SelectComponent
            label="Year"
            options={yearOptions}
            onChange={(value) => setSelectedYear(parseInt(value))}
          />
        </div>
        <div className="flex justify-between w-1/2 items-center gap-4 mt-4">
          <CardComponent
            title="Monthly Revenue"
            value={`₹${selectedMonthlyRevenue}`}
            valueClass="from-green-500 to-emerald-500"
          />
          <CardComponent
            title="Monthly Expenses"
            value={`₹${selectedMonthlyExpenses}`}
            valueClass="from-red-500 to-rose-500"
          />
          <CardComponent
            title="Monthly Net Profit"
            value={`₹${selectedMonthlyRevenue - selectedMonthlyExpenses}`}
            valueClass={
              selectedMonthlyRevenue - selectedMonthlyExpenses > 0
                ? "from-green-500 to-emerald-500"
                : "from-red-500 to-rose-500"
            }
          />
        </div>
      </div>
        
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Overview From Jan 1, 2025</h2>
        <div className="flex justify-between w-1/2 items-center gap-4 mt-4">
          <CardComponent
            title="Total Revenue"
            value={`₹${totalRevenue}`}
            valueClass="from-green-500 to-emerald-500"
          />
          <CardComponent
            title="Total Expenses"
            value={`₹${totalExpenses}`}
            valueClass="from-red-500 to-rose-500"
          />
          <CardComponent
            title="Net Profit"
            value={`₹${totalRevenue - totalExpenses}`}
            valueClass={
              totalRevenue - totalExpenses > 0
                ? "from-green-500 to-emerald-500"
                : "from-red-500 to-rose-500"
            }
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
