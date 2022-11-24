const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// ==================== GET-YIELD-FOR-PLANT  ====================

describe("getYieldForPlant", () => {
  test("Get yield for plant with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
    };

    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environment factor => sunfactor: 'high' ", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
  });

  test("Get yield for plant with environment factors => sunfactor: 'high'  => windfactor: 'high' ", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -25,
          high: -50,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "high",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBeCloseTo(22.5);
  });
});

// ==================== GET-YIELD-FOR-CROP ====================

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });

  test("Get yield for crop with environment factor => sunfactor: 'high' ", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getYieldForCrop(input, environmentFactors)).toBe(450);
  });

  test("Get yield for crop with environment factors => sunfactor: 'high' => windfactor: 'high' ", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -25,
          high: -50,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "high",
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getYieldForCrop(input, environmentFactors)).toBeCloseTo(225);
  });
});

// ==================== GET-TOTAL-YIELD ====================

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const avocado = {
      name: "avocado",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: avocado, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with multiple crops with environment factors => sunfactor: 'high' => windfactor: 'high' ", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -25,
          high: -50,
        },
      },
    };
    const avocado = {
      name: "avocado",
      yield: 4,
      factor: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "high",
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: avocado, numCrops: 2 },
    ];
    expect(getTotalYield({ crops }, environmentFactors)).toBe(16.05);
  });
});

// ==================== GET-COST-FOR-CROP ====================

describe("getCostsForCrop", () => {
  test("Get costs for crop, simple", () => {
    const corn = {
      name: "corn",
      costs: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getCostsForCrop(input)).toBe(30);
  });
});

// ==================== GET-REVENUE-FOR-CROP ====================

describe("getRevenueForCrop", () => {
  test("Get revenue for crop with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 4,
      salePrice: 5,
    };
    const input = {
      crop: corn,
      numCrops: 6,
    };
    expect(getRevenueForCrop(input)).toBe(120);
  });

  test("Calculate revenue for crop with environment factors => sunfactor: 'high' => windfactor: 'high'", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -25,
          high: -50,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "high",
    };

    const crops = { crop: corn, numCrops: 5 };
    expect(getRevenueForCrop(crops, environmentFactors)).toBeCloseTo(22.5);
  });
});

// ==================== GET-PROFIT-FOR-CROP ====================

describe("getProfitForCrop", () => {
  test("Get profit for crop with no environment factors", () => {
    const corn = {
      name: "corn",
      costs: 4,
      yield: 3,
      salePrice: 5,
    };
    const input = {
      crop: corn,
      numCrops: 6,
    };
    expect(getProfitForCrop(input)).toBe(66);
  });

  test("Calculate profit for crop with environment factors => sunfactor: 'high' => windfactor: 'high'", () => {
    const corn = {
      name: "corn",
      costs: 4,
      yield: 3,
      salePrice: 5,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -25,
          high: -50,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "high",
    };

    const crops = { crop: corn, numCrops: 5 };
    expect(getProfitForCrop(crops, environmentFactors)).toBeCloseTo(36.25);
  });
});

// ==================== GET-TOTAL-PROFIT ====================

describe("getTotalProfit", () => {
  const corn = {
    name: "corn",
    costs: 4,
    yield: 3,
    salePrice: 5,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };

  const avocado = {
    name: "avocado",
    costs: 5,
    yield: 4,
    salePrice: 6,
    factor: {
      sun: {
        low: -20,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  test("Get Total profit for various crops with NO environmental factors", () => {
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: avocado, numCrops: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(93);
  });

  test("get Total Profit for various crops with environment factors => sunfactor: 'high' => windfactor: 'high'", () => {
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: avocado, numCrops: 2 },
    ];

    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBeCloseTo(55.05);
  });
});
