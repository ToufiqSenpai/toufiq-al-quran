function formatTime(secs) {
  let hours   = Math.floor(secs / 3600);
  let minutes = Math.floor(secs / 60) % 60;
  let seconds = secs % 60;
  return [hours, minutes, seconds]
      .map(v => ('' + v).padStart(2, '0'))
      .filter((v,i) => v !== '00' || i > 0)
      .join(':');
}

console.log(formatTime(3650))