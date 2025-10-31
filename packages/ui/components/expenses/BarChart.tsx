"use client";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../utils/requests/category";
import { BarChart } from "@mui/x-charts/BarChart";
import { getExpenses } from "../../utils/requests/expense";
import dayjs from 'libs/helpers/dayjs.helper'

interface expensesType {
  amount: number;
  month: string;
  categories: {
    name: string;
  };
  date: string;
}

interface sumByCategory {
  [key: string]: number;
}

export const BarChartComponent = () => {
  const dispatch = useAppDispatch();

  useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(dispatch),
  });

  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => getExpenses(),
  });

  let expenses = (data?.expenses as expensesType[]) || [];

  const sumAmountByCategory: sumByCategory = expenses.reduce((acc, cur) => {
    const categoryName = cur.categories.name;
    const amount = Number(cur.amount);

    if (acc[categoryName]) {
      acc[categoryName] += amount;
    } else {
      acc[categoryName] = amount;
    }

    return acc;
  }, {} as sumByCategory);

  const categories = useAppSelector((state) => state.categoy);

  const category_type = categories.data
    ? categories.data.map((c) => {
        return c.name;
      })
    : [];

  const orderedSeriesData: number[] = category_type.map((categoryName) => {
    return sumAmountByCategory[categoryName] ?? 0;
  });

  return (
    <div style={{ width: '350px'}}>
      {category_type.length > 0 && (
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: category_type,
            },
          ]}
          series={[
            {
              data: orderedSeriesData,
            },
          ]}
          yAxis={[{ width: 50 }]}
          height={300}
        />
      )}
    </div>
  );
};


const calculateMonthlyExpenses = (expenses: expensesType[] | undefined) => {
  if (!expenses) {
    return [];
  }

  const monthlyTotals = new Map<string, number>();

  expenses.forEach(expense => {
    const date = dayjs(expense.date); 

    // Convert month to MMM Format like 'Jan','Feb'
    const monthKey = date.format('MMM'); 
    
    const currentTotal = monthlyTotals.get(monthKey) || 0;
    
    // Assuming 'amount' is the property that holds the expense value
    if (expense.categories.name !== 'salary') {
        monthlyTotals.set(monthKey, Number(currentTotal) + Number(expense.amount));
    }
  });

  // Convert the Map into the dataset array format
  const dataset = Array.from(monthlyTotals.entries())
    .map(([month, totalExpense]) => ({
      month: month,
      totalExpense: totalExpense,
    }))
    // Sort the dataset chronologically using Day.js to ensure the chart is ordered correctly
    .sort((a, b) => dayjs(a.month, 'MMM YYYY').valueOf() - dayjs(b.month, 'MMM YYYY').valueOf()); 

  return dataset;
};

// 2. Custom value formatter for the tooltip (optional, but helpful)
const valueFormatter = (value: number | null) => {
    return `${value?.toFixed(2)} THB`; // Format as currency
};



export const BarChartMonthComponent = () => {


  

  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => getExpenses(),
  });

    const monthlyData = calculateMonthlyExpenses(data?.expenses);

    // console.log('monthlyData---->',monthlyData)

    const dataKey = 'totalExpense';
    const chartSetting = {
        xAxis: [{ label: 'Total Expense (THB)' }], 
        height: 400,
        margin: { left: 80 },
    };



  return (
    <div style={{ width: '350px'}}>
        { data?.expenses ? <BarChart
        dataset={monthlyData}
        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: dataKey, label: 'Monthly Total Expense', valueFormatter }]}
        layout="horizontal"
        grid={{ vertical: true }}
        {...chartSetting}
        /> : <h1>404 NOT FOUND</h1>}
    </div>
  );
};

// export default BarChartComponent;
