// /*!

// =========================================================
// * Vision UI Free React - v1.0.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/vision-ui-free-react
// * Copyright 2021 Creative Tim (https://www.creative-tim.com/)
// * Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

// * Design and Coded by Simmmple & Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

// const newCarsCount = {
//   1: 0,
//   2: 0,
//   3: 0,
//   4: 0,
//   5: 0,
//   6: 0,
//   7: 0,
//   8: 0,
//   9: 0,
//   10: 0,
//   11: 0,
//   12: 0,
// };

// const usedCarsCount = {
//   1: 0,
//   2: 0,
//   3: 0,
//   4: 0,
//   5: 0,
//   6: 0,
//   7: 0,
//   8: 0,
//   9: 0,
//   10: 0,
//   11: 0,
//   12: 0,
// };

// let demo;
// (async () => {
//   const { data: newCars } = await supabase.from("sales").select("date").eq("condition", "new");

//   newCars.map((d) => {
//     const month = d.date.slice(5, 7);
//     newCarsCount[month] += 1;
//   });

//   const { data: usedCars } = await supabase.from("sales").select("date").eq("condition", "used");

//   usedCars.map((d) => {
//     const month = d.date.slice(5, 7);
//     usedCarsCount[month] += 1;
//   });

//   demo = [
//     {
//       name: "New Cars",
//       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//     },
//     {
//       name: "Used Cars",
//       data: [
//         usedCarsCount[1],
//         usedCarsCount[2],
//         usedCarsCount[3],
//         usedCarsCount[4],
//         usedCarsCount[5],
//         usedCarsCount[6],
//         usedCarsCount[7],
//         usedCarsCount[8],
//         usedCarsCount[9],
//         usedCarsCount[10],
//         usedCarsCount[11],
//         usedCarsCount[12],
//       ],
//     },
//   ];

//   console.log("usedCarsCount", usedCarsCount);
// })();

// export const lineChartDataDashboard = [
//   {
//     name: "New Cars",
//     data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//   },
//   {
//     name: "Used Cars",
//     data: [
//       usedCarsCount[1],
//       usedCarsCount[2],
//       usedCarsCount[3],
//       usedCarsCount[4],
//       usedCarsCount[5],
//       usedCarsCount[6],
//       usedCarsCount[7],
//       usedCarsCount[8],
//       usedCarsCount[9],
//       usedCarsCount[10],
//       usedCarsCount[11],
//       usedCarsCount[12],
//     ],
//   },
// ];

// export const lineChartDataDashboard = [
//   {
//     name: "New Cars",
//     data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//   },
//   {
//     name: "Used Cars",
//     data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//   },
// ];

// import { supabase } from "supabaseClient";

// export const lineChartDataDashboard = async () => {
//   const newCarsCount = {
//     1: 0,
//     2: 0,
//     3: 0,
//     4: 0,
//     5: 0,
//     6: 0,
//     7: 0,
//     8: 0,
//     9: 0,
//     10: 0,
//     11: 0,
//     12: 0,
//   };

//   const { data: newCars } = await supabase.from("sales").select("date").eq("condition", "new");

//   newCars.map((d) => {
//     const month = d.date.slice(5, 7);
//     newCarsCount[month] += 1;
//   });

//   return [
//     {
//       name: "New Cars",
//       data: [newCarsCount[1], newCarsCount[2], 3, 4, 5, 6, 7, 8, 9, newCarsCount[10], 11, 12],
//     },
//     {
//       name: "Used Cars",
//       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//     },
//   ];
// };

export const lineChartDataDashboard = [
  {
    name: "New Cars",
    data: [3, 5, 1, 3, 8, 3, 9, 5, 7, 8, 2, 7],
  },
  {
    name: "Used Cars",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];
