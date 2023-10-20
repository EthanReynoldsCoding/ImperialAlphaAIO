// salesData.js

import { supabase } from 'supabaseClient';

// Function to fetch and format sales data
export async function fetchSalesData(userId) {
  const { data, error } = await supabase
    .from('sales')
    .select('date, count')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching sales data:', error);
    return null;
  }

  const salesData = {
    usedCarSales: Array.from({ length: 12 }, () => 0),
    newCarSales: Array.from({ length: 12 }, () => 0),
  };

  data.forEach((sale) => {
    const date = new Date(sale.date);
    const month = date.getMonth();
    if (sale.count) {
      if (sale.count < 0) {
        // Used Car Sales
        salesData.usedCarSales[month] += sale.count;
      } else {
        // New Car Sales
        salesData.newCarSales[month] += sale.count;
      }
    }
  });

  return salesData;
}
