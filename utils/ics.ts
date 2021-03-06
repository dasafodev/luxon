// const { writeFileSync } = require("fs");
// const ics = require("ics");

// export const createEvent = () => {
//   ics.createEvent(
//     {
//       title: "Dinner",
//       description: "Nightly thing I do",
//       busyStatus: "FREE",
//       start: [2018, 1, 15, 6, 30],
//       duration: { minutes: 50 },
//     },
//     (error, value) => {
//       if (error) {
//         console.log(error);
//       }

//       writeFileSync(`${__dirname}/event.ics`, value);
//     }
//   );
// };
