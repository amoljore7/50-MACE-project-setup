const Sort = (data: any, value: string) => {
  const numberArray = [0, 1, 2, 3, 5, 5, 6, 7, 8, 9];
  let startingWithNumber = [];
  let startingWithoutNumber = [];
  for (let i = 0; i < data.length; i++) {
    if (numberArray.includes(data[i][value] && parseInt(data[i][value][0]))) {
      startingWithNumber.push(data[i]);
    } else {
      startingWithoutNumber.push(data[i]);
    }
  }
  startingWithNumber = startingWithNumber.sort((a, b) => {
    const first = a[value] && a[value].toLowerCase().replace(/ +/g, '');
    const second = b[value] && b[value].toLowerCase().replace(/ +/g, '');
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  });
  startingWithoutNumber = startingWithoutNumber.sort((a, b) => {
    const first = a[value] && a[value].toLowerCase().replace(/ +/g, '');
    const second = b[value] && b[value].toLowerCase().replace(/ +/g, '');
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  });
  return [...startingWithNumber, ...startingWithoutNumber];
};

export default Sort;
