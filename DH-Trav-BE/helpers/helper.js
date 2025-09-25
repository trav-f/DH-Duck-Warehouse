// Replace wood, cardboard, plastic with the not floating strings
export const PACKAGE_TYPES = {
    WOOD: "wood",
    CARDBOARD: "cardboard",
    PLASTIC: "plastic"
}

export function getPackage(size) {
    if (size.toLowerCase() === "xlarge" || size.toLowerCase() === "large") {
        return PACKAGE_TYPES.WOOD;
    }
    if (size.toLowerCase() === "medium") {
        return PACKAGE_TYPES.CARDBOARD;
    }
    return PACKAGE_TYPES.PLASTIC;
}

export const SHIPPING_METHODS = {
    LAND: "land",
    AIR: "air",
    SEA: "sea"
}

export const PACKAGING_MATERIALS = {
    POLYSTYRENE_BALLS: "polystyrene balls",
    BUBBLE_WRAP_BAGS: "bubble wrap bags",
    MOISTURE_ABSORBING_BEADS: "moisture-absorbing beads"
}


/* 
*              Air, Sea,      Land
* wood,        pb   mab/bwb   pb
* cardboard,   pb   mab/bwb   pb
* plastic      bwb  mab/bwb   pb
*
*/

export function getPackagingMaterials(packageType, shippingMethod) {
    if (shippingMethod === SHIPPING_METHODS.LAND) {
        return [PACKAGING_MATERIALS.POLYSTYRENE_BALLS];
    }
    if (shippingMethod === SHIPPING_METHODS.AIR) {
        return packageType === PACKAGE_TYPES.PLASTIC ? [PACKAGING_MATERIALS.BUBBLE_WRAP_BAGS] : [PACKAGING_MATERIALS.POLYSTYRENE_BALLS];
    }
    // shippingMethod === SHIPPING_METHODS.SEA
    return [PACKAGING_MATERIALS.MOISTURE_ABSORBING_BEADS, PACKAGING_MATERIALS.BUBBLE_WRAP_BAGS];
}
