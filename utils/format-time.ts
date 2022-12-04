const formatTime = (second: number) => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor(second / 60) % 60;
  const seconds = second % 60;
  return [hours, minutes, seconds]
    .map(v => ('' + v).padStart(2, '0'))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
}

export default formatTime