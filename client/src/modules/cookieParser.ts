const cookieParser = str => {
    if(str === "") return null;
    return str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {})
}

export default cookieParser(document.cookie);