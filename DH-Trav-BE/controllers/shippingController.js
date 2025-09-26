import { 
  getPackage, 
  getPackagingMaterials, 
  SHIPPING_METHODS,
  PACKAGE_TYPES
} from "../helpers/helper.js";

// Pricing constants
const QUANTITY_DISCOUNT_THRESHOLD = 100;
const QUANTITY_DISCOUNT_RATE = 0.8;

const PACKAGE_TYPE_MULTIPLIERS = {
  [PACKAGE_TYPES.WOOD]: 0.05,
  [PACKAGE_TYPES.PLASTIC]: 0.1,
  [PACKAGE_TYPES.CARDBOARD]: -0.01
};

const DESTINATION_MULTIPLIERS = {
  'US': 0.18,
  'Bolivia': 0.13,
  'India': 0.19,
  'default': 0.15
};

const SHIPPING_METHOD_COSTS = {
  [SHIPPING_METHODS.SEA]: { fixed: 400, perUnit: 0 },
  [SHIPPING_METHODS.LAND]: { fixed: 0, perUnit: 10 },
  [SHIPPING_METHODS.AIR]: { fixed: 0, perUnit: 30 }
};

const AIR_SHIPPING_DISCOUNT_THRESHOLD = 1000;
const AIR_SHIPPING_DISCOUNT_RATE = 0.15;

function toDollars(amount) {
  return `$${amount.toFixed(2)}`;
}

const calculateTotalCost = (price, quantity, packagingMaterials, shippingMethod, destination, packageType) => {
  const baseCost = price * quantity;
  let runningTotal = baseCost;
  const modifiers = [{ amount: toDollars(baseCost), description: "Base cost" }];

  // Apply quantity discount
  if (quantity > QUANTITY_DISCOUNT_THRESHOLD) {
    runningTotal = QUANTITY_DISCOUNT_RATE * baseCost;
    modifiers.push({ 
      amount: toDollars(QUANTITY_DISCOUNT_RATE * baseCost), 
      description: "Quantity discount" 
    });
  }

  // Apply package type multiplier
  const packageMultiplier = PACKAGE_TYPE_MULTIPLIERS[packageType];
  if (packageMultiplier !== undefined) {
    const packageAdjustment = packageMultiplier * baseCost;
    runningTotal += packageAdjustment;
    const description = packageMultiplier > 0 ? "Package type cost" : "Package type discount";
    modifiers.push({ 
      amount: toDollars(Math.abs(packageAdjustment)), 
      description 
    });
  }

  // Apply destination multiplier
  const destinationMultiplier = DESTINATION_MULTIPLIERS[destination] || DESTINATION_MULTIPLIERS.default;
  const destinationCost = destinationMultiplier * baseCost;
  runningTotal += destinationCost;
  modifiers.push({ 
    amount: toDollars(destinationCost), 
    description: "Destination cost" 
  });

  // Apply shipping method costs
  const shippingCosts = SHIPPING_METHOD_COSTS[shippingMethod];
  if (shippingCosts) {
    const shippingCost = shippingCosts.fixed + (shippingCosts.perUnit * quantity);
    runningTotal += shippingCost;
    modifiers.push({ 
      amount: toDollars(shippingCost), 
      description: "Shipping method cost" 
    });

    // Apply air shipping discount for large quantities
    if (shippingMethod === SHIPPING_METHODS.AIR && quantity > AIR_SHIPPING_DISCOUNT_THRESHOLD) {
      const discount = AIR_SHIPPING_DISCOUNT_RATE * baseCost;
      runningTotal -= discount;
      modifiers.push({ 
        amount: toDollars(discount), 
        description: "Shipping method discount" 
      });
    }
  }

  return {
    packageType,
    protectionType: packagingMaterials,
    totalPrice: runningTotal,
    priceModifiers: modifiers
  };
};

// Get shipping quote
export const getShippingQuote = async (req, res) => {
  try {
    // Expect color, size, price, and quantity of ducks
    // destination country
    // Shipping method: Land, Air, Sea
    const { color, size, price, quantity, destination, shippingMethod } = req.body;
    
    // Request validation
    if (!color || !size || !price || !quantity || !destination || !shippingMethod) {
      return res.status(400).json({ 
        message: "Missing required fields: color, size, price, quantity, destination, shippingMethod" 
      });
    }
    
    if (!Object.values(SHIPPING_METHODS).includes(shippingMethod)) {
      return res.status(400).json({ 
        message: "Invalid shipping method. Must be one of: land, air, sea" 
      });
    }
    
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }
    
    if (typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
      return res.status(400).json({ message: "Quantity must be a positive integer" });
    }
    
    const packageType = getPackage(size);
    const packagingMaterials = getPackagingMaterials(packageType, shippingMethod);
    
    // Calculate total cost
    const costBreakdown = calculateTotalCost(
      price, 
      quantity, 
      packagingMaterials, 
      shippingMethod, 
      destination, 
      packageType
    );
    
    res.json(costBreakdown);
    
  } catch (error) {
    console.error("Error calculating shipping quote:", error);
    res.status(500).json({ message: "Error calculating shipping quote", error: error.message });
  }
};
