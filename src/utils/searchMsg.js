const searchMsg = (text, data) => {
  let position = data.toLowerCase().search(text);
  return position;
};

export default searchMsg;
