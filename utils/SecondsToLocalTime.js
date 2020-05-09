exports.secondsToLocalTime = (seconds) => {
  const sec = seconds;
  const date = new Date(sec * 1000);
  const timestr = date.toLocaleTimeString();

  return timestr;
};
