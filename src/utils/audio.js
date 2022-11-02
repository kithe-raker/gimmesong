export function durationToStr(duration) {
  if (isNaN(duration)) return;
  return (
    Math.floor(duration / 60) +
    ":" +
    Math.floor(duration % 60 ? duration % 60 : "00")
      .toString()
      .padStart(2, "00")
  );
}
