export const truncateText = (text, numChars) => {
  return text.length > numChars
    ? text.substring(0, numChars - 1) + "..."
    : text;
};

export const getGenres = (array) => {
  if (array) {
    if (array.length >= 2) {
      return array[0].name + ", " + array[1].name;
    } else {
      return array[0].name;
    }
  }
};

export const getYear = (movie) => {
  return movie?.release_date?.split("-")[0] + " .";
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

export const debounce = (callback, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};