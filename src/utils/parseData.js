export const parseFile = str => {
  if(!str){
    return;
  }
  const images = str.replace(/[\\"{}]/g, '').split(',');
  return images.map(img => process.env.REACT_APP_SERVER_STATIC + img);
};
