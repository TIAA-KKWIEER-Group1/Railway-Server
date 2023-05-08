export const getStringFromDate = (date) => {
  const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  let t = `${date.getHours()}:${date.getMinutes()}`;

  if (t.split(':')[0].length == 1) {
    t = '0' + '' + t;
  }
  if (t.split(':')[1].length == 1) {
    t = t.split(':')[0] + ':' + '0' + '' + t.split(':')[1];
  }

  console.log(d, t);
  return [d, t];
};
