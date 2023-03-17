import moment from "moment";

export function formatTimeAgo(time) {
  const diff = moment().diff(moment.utc(time));
  const duration = moment.duration(diff);
  const seconds = duration.asSeconds();
  const days = duration.asDays();
  if (days > 7) {
    return moment.utc(time).format("MMMM Do YYYY, h:mm:ss a");
  } else if (days >= 1) {
    return moment.utc(time).format("dddd [at] h:mm a");
  } else if (seconds >= 60) {
    return moment.utc(time).startOf("minute").fromNow();
  } else {
    return moment.utc(time).format("ss [seconds ago]");
  }
}
