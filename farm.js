// ==================== GET-FACTOR-FOR-PLANT  ====================
const getFactorForPlant = (produce, environmentFactors) => {
  const produceFactor = Object.keys(produce.factor);
  const envrFactor = Object.keys(environmentFactors);

  let factor = 1;

  envrFactor.forEach((item) => {
    if (produceFactor.includes(item)) {
      const produceFactorArray = produce.factor[item];
      const produceFactorValue = produceFactorArray[environmentFactors[item]];
      factor = ((100 + produceFactorValue) / 100) * factor;
    }
  });
  return factor;
};

// ==================== GET-YIELD-FOR-PLANT  ====================
const getYieldForPlant = (produce, environmentFactors) => {
  if (environmentFactors) {
    let result = produce.yield * getFactorForPlant(produce, environmentFactors);
    return result;
  } else {
    return produce.yield;
  }
};

// ==================== GET-YIELD-FOR-CROP ====================
const getYieldForCrop = (produce, environmentFactors) =>
  getYieldForPlant(produce.crop, environmentFactors) * produce.numCrops;

// ==================== GET-TOTAL-YIELD ====================
const getTotalYield = (produce, environmentFactors) => {
  return produce.crops.reduce((currentValue, crop) => {
    return getYieldForCrop(crop, environmentFactors) + currentValue;
  }, 0);
};

// ==================== GET-COST-FOR-CROP ====================
const getCostsForCrop = (produce) => produce.crop.costs * produce.numCrops;

// ==================== GET-REVENUE-FOR-CROP ====================
const getRevenueForCrop = (produce, environmentFactors) =>
  getYieldForCrop(produce, environmentFactors) * produce.crop.salePrice;

// ==================== GET-PROFIT-FOR-CROP ====================
const getProfitForCrop = (produce, environmentFactors) =>
  getRevenueForCrop(produce, environmentFactors) - getCostsForCrop(produce);

// ==================== GET-TOTAL-PROFIT ====================
const getTotalProfit = (produce, environmentFactors) => {
  return produce.crops.reduce((currentValue, crop) => {
    return getProfitForCrop(crop, environmentFactors) + currentValue;
  }, 0);
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
