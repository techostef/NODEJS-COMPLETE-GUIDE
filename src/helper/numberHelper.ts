const getRandomNumber = () => {
  return parseInt((Math.random() * 101).toString(), 10)
}

const numberHelper = {
  getRandomNumber,
}

export default numberHelper;
