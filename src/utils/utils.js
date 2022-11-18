export const truncateText = (text, numChars) => {
  return text.length > numChars
    ? text.substring(0, numChars - 1) + "..."
    : text;
};

export const getGenres = (array) => {
  return array?.map((item, i) => (i <= 1 ? item.name : "")).join(", ");
};

export const minutesToHours = (minutes) => {
  if (minutes) {
    const hours = Math.floor(minutes / 60);
    const remMinutes = minutes % 60;
    return `${hours} hr ${remMinutes} min`;
  } else {
    return "";
  }
};
