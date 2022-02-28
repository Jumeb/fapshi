const search = (text, data, setData, type) => {
  let filteredData = data.filter(p => {
    if (p[type] === undefined) {
      return null;
    }
    let _services = `${p[type].toLowerCase()}`;
    let _text = text.toLowerCase();
    return _services.indexOf(_text) > -1;
  });
  setData(filteredData);
};

export default search;
