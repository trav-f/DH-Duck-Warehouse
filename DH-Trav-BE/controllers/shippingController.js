import { 
  getPackage, 
  getPackagingMaterials, 
  SHIPPING_METHODS,
  PACKAGE_TYPES
} from "../helpers/helper.js";

function toDollars(amount) {
  return `$${amount.toFixed(2)}`;
}

const calculateTotalCost = (price, quantity, packagingMaterials, shippingMethod, destination, packageType) => {
  const baseCost = price * quantity;
  var runningTotal = baseCost;
  const modifiers = [ { amount: toDollars(baseCost), description: "Base cost" } ]; // { amount: string, description: string }[]

  if (quantity > 100) {
    runningTotal = 0.8 * baseCost;
    modifiers.push({ amount: toDollars(0.8 * baseCost), description: "Quantity discount" });
  }

  // Adjust price based on package type
  if (packageType === PACKAGE_TYPES.WOOD) {
    runningTotal += 0.05 * baseCost;
    modifiers.push({ amount: toDollars(0.05 * baseCost), description: "Package type cost" });
  } else if (packageType === PACKAGE_TYPES.PLASTIC) {
    runningTotal += 0.1 * baseCost;
    modifiers.push({ amount: toDollars(0.1 * baseCost), description: "Package type cost" });
  } else { // packageType === PACKAGE_TYPES.CARDBOARD
    runningTotal -= 0.01 * baseCost;
    modifiers.push({ amount: toDollars(0.01 * baseCost), description: "Package type discount" });
  }

  if (destination === 'US') {
    runningTotal += 0.18 * baseCost;
    modifiers.push({ amount: toDollars(0.18 * baseCost), description: "Destination cost" });
  } else if (destination === 'Bolivia') {
    runningTotal += 0.13 * baseCost;
    modifiers.push({ amount: toDollars(0.13 * baseCost), description: "Destination cost" });
  } else if (destination === 'India') {
    runningTotal += 0.19 * baseCost;
    modifiers.push({ amount: toDollars(0.19 * baseCost), description: "Destination cost" });
  } else {
    runningTotal += 0.15 * baseCost;
    modifiers.push({ amount: toDollars(0.15 * baseCost), description: "Destination cost" });
  }
  
  if (shippingMethod === SHIPPING_METHODS.SEA) {
    runningTotal += 400;
    modifiers.push({ amount: toDollars(400), description: "Shipping method cost" });
  } else if (shippingMethod === SHIPPING_METHODS.LAND) {
    runningTotal += 10 * quantity;
    modifiers.push({ amount: toDollars(10 * quantity), description: "Shipping method cost" });
  } else { // shippingMethod === SHIPPING_METHODS.AIR
    runningTotal += 30 * quantity;
    modifiers.push({ amount: toDollars(30 * quantity), description: "Shipping method cost" });
    if (quantity > 1000) {
      runningTotal -= 0.15 * baseCost;
      modifiers.push({ amount: toDollars(0.15 * baseCost), description: "Shipping method discount" });
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
