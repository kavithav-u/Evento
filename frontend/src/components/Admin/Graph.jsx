import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAdminDashboardMutation } from '../../Slices/adminApiSlice';
import Chart from 'chart.js/auto';

const Graph = () => {
  const [monthlySales, setMonthlySales] = useState([]);
  const [getGraph] = useAdminDashboardMutation();
  const [chart, setChart] = useState(null);

  const labels = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    fetchMonthlySales();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chart]); 

  const fetchMonthlySales = async () => {
    try {
      const salesData = await getGraph().unwrap();
      const sales = salesData.monthlySales;
      const data = labels.map((month) => {
        const matchingEntry = sales.find((entry) => entry._id.month === month);
        return matchingEntry ? matchingEntry.totalSales : 0;
      });
      setMonthlySales(data);

      
      if (chart) {
        chart.destroy();
      }


      setChart(chart);
    } catch (error) {
      console.error('Error fetching monthly sales:', error);
    }
  };


  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Sales',
        data : monthlySales,
        backgroundColor: 'rgba(137, 12, 50, 0.72)',
        borderColor: 'rgba( 1, 1, 1,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        ticks: {
          callback: function (value, index, values) {
            const monthNames = [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            return monthNames[index];
          }
        },
      },
    },
  };

  return (
    <div>
      <h2 className='text-center underline'>Monthly Sales Bar Graph</h2>
      <Bar className='p-7' data={chartData} options={chartOptions} />
    </div>
  );
};

export default Graph;
