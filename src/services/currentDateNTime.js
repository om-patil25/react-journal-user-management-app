// adding 1 in month since its index starts from 0
// export const getDate =
//   currentDate.getFullYear() +
//   "-" +
//   (currentDate.getMonth() + 1 < 10
//     ? "0" + (currentDate.getMonth() + 1)
//     : currentDate.getMonth() + 1) +
//   "-" +
//   (currentDate.getDate() < 10
//     ? "0" + currentDate.getDate()
//     : currentDate.getDate());

export const getDate = () => {
  return new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const getTime12hr = () => {
  return new Date().toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTime24hr = () => {
  return new Date().toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
