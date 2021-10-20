import numberHelper from "./numberHelper";
const { getRandomNumber } = numberHelper;

const getRandomId = () => {
  return `${getRandomNumber()}_${getRandomNumber()}_${getRandomNumber()}`;
}

const stringHelper = {
  getRandomId,
}

export default stringHelper;
