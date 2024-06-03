import { useCallback } from "react";
import moment from "moment";

const useTimeAgo = () => {
  return useCallback((date: string) => {
    const now = moment();
    const createdMoment = moment(date);

    const secondsThreshold = 60;
    const minutesThreshold = 60;
    const hoursThreshold = 24;
    const daysThreshold = 7;

    const diffInSeconds = now.diff(createdMoment, "seconds");
    const diffInMinutes = now.diff(createdMoment, "minutes");
    const diffInHours = now.diff(createdMoment, "hours");
    const diffInDays = now.diff(createdMoment, "days");

    if (diffInSeconds < secondsThreshold) {
      return `${diffInSeconds} secs ago`;
    } else if (diffInMinutes < minutesThreshold) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInHours < hoursThreshold) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < daysThreshold) {
      return `${diffInDays} days ago`;
    } else {
      return createdMoment.format("DD/MM/YY");
    }
  }, []);
};

export default useTimeAgo;
