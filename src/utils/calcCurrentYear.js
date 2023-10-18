import dayjs from "dayjs";

const calcCurrentYear = () => {
  const today = new Date();
  const crntYear = dayjs(today).format("YYYY");

  return crntYear;
};

export default calcCurrentYear;
