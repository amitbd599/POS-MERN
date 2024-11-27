import React, { useEffect, useState } from "react";
import DashboardStore from "../store/DashboardStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";
const DashBoard = () => {
  let { allDashboardDataRequest } = DashboardStore();
  let [dashboardData, setDashboardData] = useState([]);
  const [chartSeries, setChartSeries] = useState([
    { name: "This month", data: [] },
  ]);
  const [barChartSeries, setBarChartSeries] = useState([]);

  useEffect(() => {
    (async () => {
      await allDashboardDataRequest().then((res) => {
        if (res) {
          setDashboardData(res);
          setChartSeries([
            {
              name: "This month",
              data: res?.orderModelChart,
            },
          ]);

          console.log(res?.ordersByStatusData?.Completed?.count);

          const seriesData = [
            {
              x: "Completed",
              y: res?.ordersByStatusData?.Completed?.count || 0,
            },
            { x: "Pending", y: res?.ordersByStatusData?.Pending?.count || 0 },
            { x: "Returned", y: res?.ordersByStatusData?.Returned?.count || 0 },
            {
              x: "Cancelled",
              y: res?.ordersByStatusData?.Cancelled?.count || 0,
            },
          ];

          setBarChartSeries([{ name: "Order status", data: seriesData }]);
        }
      });
    })();
  }, []);

  let chartOptions = {
    chart: {
      height: 264,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: false,
        top: 6,
        left: 0,
        blur: 4,
        color: "#000",
        opacity: 0.1,
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#487FFF"], // Specify the line color here
      width: 3,
    },
    markers: {
      size: 0,
      strokeWidth: 3,
      hover: {
        size: 8,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
      y: {
        show: false,
      },
      z: {
        show: false,
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
      borderColor: "#D1D5DB",
      strokeDashArray: 3,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "৳" + value + "k";
        },
        style: {
          fontSize: "12px",
        },
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      tooltip: {
        enabled: false,
      },
      labels: {
        formatter: function (value) {
          return value;
        },
        style: {
          fontSize: "14px",
        },
      },
      axisBorder: {
        show: false,
      },
      crosshairs: {
        show: true,
        width: 20,
        stroke: {
          width: 0,
        },
        fill: {
          type: "solid",
          color: "#487FFF40",
        },
      },
    },
  };

  let barChartOptions = {
    chart: {
      type: "bar",
      height: 264,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: 25,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: "gradient",
      colors: ["#487FFF"], // Set the starting color (top color) here
      gradient: {
        shade: "light", // Gradient shading type
        type: "vertical", // Gradient direction (vertical)
        shadeIntensity: 0.5, // Intensity of the gradient shading
        gradientToColors: ["#487FFF"], // Bottom gradient color (with transparency)
        inverseColors: false, // Do not invert colors
        opacityFrom: 1, // Starting opacity
        opacityTo: 1, // Ending opacity
        stops: [0, 100],
      },
    },
    grid: {
      show: false,
      borderColor: "#487FFF",
      strokeDashArray: 4, // Use a number for dashed style
      position: "back",
      padding: {
        top: -10,
        right: -10,
        bottom: -10,
        left: -10,
      },
    },
    xaxis: {
      type: "category",
      categories: ["Completed", "Pending", "Returned", "Cancelled"],
    },
    yaxis: {
      show: false,
    },
  };

  // console.log(dashboardData.categories?.[0]?.totalCategories);
  console.log(dashboardData.ordersByStatusData?.Completed);
  console.log(!!dashboardData.ordersByStatusData?.Pending);

  return (
    <section>
      <div className='row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4'>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-1 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Total Role Users
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.users?.[0]?.totalUsers}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--gridicons text-white text-2xl mb-0'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M24 14.6c0 .6-1.2 1-2.6 1.2c-.9-1.7-2.7-3-4.8-3.9c.2-.3.4-.5.6-.8h.8c3.1-.1 6 1.8 6 3.5M6.8 11H6c-3.1 0-6 1.9-6 3.6c0 .6 1.2 1 2.6 1.2c.9-1.7 2.7-3 4.8-3.9zm5.2 1c2.2 0 4-1.8 4-4s-1.8-4-4-4s-4 1.8-4 4s1.8 4 4 4m0 1c-4.1 0-8 2.6-8 5c0 2 8 2 8 2s8 0 8-2c0-2.4-3.9-5-8-5m5.7-3h.3c1.7 0 3-1.3 3-3s-1.3-3-3-3c-.5 0-.9.1-1.3.3c.8 1 1.3 2.3 1.3 3.7c0 .7-.1 1.4-.3 2M6 10h.3C6.1 9.4 6 8.7 6 8c0-1.4.5-2.7 1.3-3.7C6.9 4.1 6.5 4 6 4C4.3 4 3 5.3 3 7s1.3 3 3 3'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-2 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Total Customers
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.customers?.[0]?.totalCustomers}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--fa-solid text-white text-2xl mb-0'
                    width='0.75em'
                    height='1em'
                    viewBox='0 0 384 512'
                  >
                    <path
                      fill='currentColor'
                      d='M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85c-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58c-19.5 0-37.82-7.59-51.61-21.37M382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32c-21.07 5.64-16.45 3.18-25.12 11.85c-13.79 13.78-32.12 21.37-51.62 21.37c-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28l52.69 2.01c11.62.44 19.82-11.27 15.43-22.03M263 340c15.28-15.55 17.03-14.21 38.79-20.14c13.89-3.79 24.75-14.84 28.47-28.98c7.48-28.4 5.54-24.97 25.95-45.75c10.17-10.35 14.14-25.44 10.42-39.58c-7.47-28.38-7.48-24.42 0-52.83c3.72-14.14-.25-29.23-10.42-39.58c-20.41-20.78-18.47-17.36-25.95-45.75c-3.72-14.14-14.58-25.19-28.47-28.98c-27.88-7.61-24.52-5.62-44.95-26.41c-10.17-10.35-25-14.4-38.89-10.61c-27.87 7.6-23.98 7.61-51.9 0c-13.89-3.79-28.72.25-38.89 10.61c-20.41 20.78-17.05 18.8-44.94 26.41c-13.89 3.79-24.75 14.84-28.47 28.98c-7.47 28.39-5.54 24.97-25.95 45.75c-10.17 10.35-14.15 25.44-10.42 39.58c7.47 28.36 7.48 24.4 0 52.82c-3.72 14.14.25 29.23 10.42 39.59c20.41 20.78 18.47 17.35 25.95 45.75c3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.68 39.68 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82M97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02s-42.24 96.02-94.34 96.02s-94.34-42.99-94.34-96.02'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-3 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Total Products
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.products?.[0]?.totalProducts}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--fluent text-white text-2xl mb-0'
                    width='1em'
                    height='1em'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fill='currentColor'
                      d='M6.75 10a3.25 3.25 0 1 0 0-6.5a3.25 3.25 0 0 0 0 6.5m5.687 5.145c.53.217 1.204.355 2.062.355c4 0 4-3 4-3A1.5 1.5 0 0 0 17 11h-4.628c.393.476.629 1.085.629 1.75v.356a3 3 0 0 1-.017.252a5 5 0 0 1-.546 1.787M17 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0M1.5 13a2 2 0 0 1 2-2H10a2 2 0 0 1 2 2s0 4-5.25 4s-5.25-4-5.25-4m11.5.106l-.003.064Z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-4 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Total Categories
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.categories?.[0]?.totalCategories}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--solar text-white text-2xl mb-0'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                  >
                    <g
                      fill='currentColor'
                      fillRule='evenodd'
                      clipRule='evenodd'
                    >
                      <path d='M21.1 8.004q-.085-.005-.181-.004h-2.525c-2.068 0-3.837 1.628-3.837 3.75s1.77 3.75 3.837 3.75h2.525q.096.001.182-.004a1.755 1.755 0 0 0 1.645-1.628c.004-.06.004-.125.004-.185V9.817c0-.06 0-.125-.004-.185a1.755 1.755 0 0 0-1.645-1.628m-2.928 4.746c.532 0 .963-.448.963-1s-.431-1-.963-1c-.533 0-.964.448-.964 1s.431 1 .964 1' />
                      <path d='M20.918 17a.22.22 0 0 1 .221.278c-.2.712-.519 1.32-1.03 1.83c-.749.75-1.698 1.081-2.87 1.239c-1.14.153-2.595.153-4.433.153h-2.112c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87C2 15.099 2 13.644 2 11.806v-.112C2 9.856 2 8.4 2.153 7.26c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238C7.401 3 8.856 3 10.694 3h2.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.511.512.83 1.119 1.03 1.831a.22.22 0 0 1-.221.278h-2.524c-2.837 0-5.337 2.24-5.337 5.25s2.5 5.25 5.337 5.25zM5.75 7a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z' />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-5 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Total Orders Amount
                  </p>
                  <h6 className='mb-0'>
                    ৳ {dashboardData.orders?.[0]?.totalAmount}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--fa6-solid text-white text-2xl mb-0'
                    width='0.75em'
                    height='1em'
                    viewBox='0 0 384 512'
                  >
                    <path
                      fill='currentColor'
                      d='M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0zm192 0v128h128zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4c13.6 4.6 24.6 8.4 36.3 8.7c9.1.3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7v-17.3c0-8.8 7.2-16 16-16z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-5 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Total Orders
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.orders?.[0]?.totalOrder}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--fa6-solid text-white text-2xl mb-0'
                    width='0.75em'
                    height='1em'
                    viewBox='0 0 384 512'
                  >
                    <path
                      fill='currentColor'
                      d='M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0zm192 0v128h128zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4c13.6 4.6 24.6 8.4 36.3 8.7c9.1.3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7v-17.3c0-8.8 7.2-16 16-16z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-5 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Orders Completed
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.ordersByStatusData?.Completed?.count || 0}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--fa6-solid text-white text-2xl mb-0'
                    width='0.75em'
                    height='1em'
                    viewBox='0 0 384 512'
                  >
                    <path
                      fill='currentColor'
                      d='M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0zm192 0v128h128zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4c13.6 4.6 24.6 8.4 36.3 8.7c9.1.3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7v-17.3c0-8.8 7.2-16 16-16z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-5 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Orders Pending
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.ordersByStatusData?.Pending?.count || 0}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--fa6-solid text-white text-2xl mb-0'
                    width='0.75em'
                    height='1em'
                    viewBox='0 0 384 512'
                  >
                    <path
                      fill='currentColor'
                      d='M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0zm192 0v128h128zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4c13.6 4.6 24.6 8.4 36.3 8.7c9.1.3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7v-17.3c0-8.8 7.2-16 16-16z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-5 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Orders Returned
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.ordersByStatusData?.Returned?.count || 0}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--fa6-solid text-white text-2xl mb-0'
                    width='0.75em'
                    height='1em'
                    viewBox='0 0 384 512'
                  >
                    <path
                      fill='currentColor'
                      d='M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0zm192 0v128h128zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4c13.6 4.6 24.6 8.4 36.3 8.7c9.1.3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7v-17.3c0-8.8 7.2-16 16-16z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-5 h-100'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>
                    Orders Cancelled
                  </p>
                  <h6 className='mb-0'>
                    {dashboardData.ordersByStatusData?.Cancelled?.count || 0}
                  </h6>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='iconify iconify--fa6-solid text-white text-2xl mb-0'
                    width='0.75em'
                    height='1em'
                    viewBox='0 0 384 512'
                  >
                    <path
                      fill='currentColor'
                      d='M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0zm192 0v128h128zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4c13.6 4.6 24.6 8.4 36.3 8.7c9.1.3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7v-17.3c0-8.8 7.2-16 16-16z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-28'>
        <div className='col-xxl-6 col-xl-12'>
          <div className='card h-100'>
            <div className='card-body'>
              <div className='d-flex flex-wrap align-items-center gap-2 mt-8'>
                <h6 className='mb-0'>
                  ৳ {dashboardData.orders?.[0]?.totalAmount}
                </h6>
                <span className='text-sm fw-semibold rounded-pill bg-success-focus text-success-main border br-success px-8 py-4 line-height-1 d-flex align-items-center gap-1'>
                  10% <Icon icon='bxs:up-arrow' className='text-xs' />
                </span>
                <span className='text-xs fw-medium'>+ $1500 Per Day</span>
              </div>
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type='area'
                height={264}
              />
            </div>
          </div>
        </div>
        <div className='col-xxl-3 col-xl-6'>
          <div className='card h-100 radius-8 border'>
            <div className='card-body p-24'>
              <h6 className='mb-12 fw-semibold text-lg mb-16'>
                Order Bar Chart
              </h6>
              <div className='d-flex align-items-center gap-2 mb-20'>
                <p className='fw-semibold mb-0'>Pending order</p>
                <p className='text-sm mb-0'>
                  <span className='bg-danger-focus border br-danger px-8 py-2 rounded-pill fw-semibold text-danger-main text-sm d-inline-flex align-items-center gap-1'>
                    {dashboardData.ordersByStatusData?.Pending?.count || 0}
                    <Icon icon='iconamoon:arrow-down-2-fill' className='icon' />
                  </span>
                </p>
              </div>
              <ReactApexChart
                options={barChartOptions}
                series={barChartSeries}
                type='bar'
                height={264}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
