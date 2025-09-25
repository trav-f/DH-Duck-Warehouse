// AI generated test file with 100% coverage
// Reviewed by: @tfells 9/24/25

import { jest } from '@jest/globals';

// Mock the helper functions before importing the controller
const mockGetPackage = jest.fn();
const mockGetPackagingMaterials = jest.fn();

jest.unstable_mockModule('../helpers/helper.js', () => ({
  getPackage: mockGetPackage,
  getPackagingMaterials: mockGetPackagingMaterials,
  SHIPPING_METHODS: {
    LAND: 'land',
    AIR: 'air',
    SEA: 'sea'
  },
  PACKAGE_TYPES: {
    WOOD: 'wood',
    CARDBOARD: 'cardboard',
    PLASTIC: 'plastic'
  }
}));

// Import the controller after mocking
const { getShippingQuote } = await import('../controllers/shippingController.js');

describe('ShippingController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('getShippingQuote', () => {
    describe('Request Validation', () => {
      test('should return 400 when color is missing', async () => {
        mockReq.body = {
          size: 'Large',
          price: 25.99,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Missing required fields: color, size, price, quantity, destination, shippingMethod'
        });
      });

      test('should return 400 when size is missing', async () => {
        mockReq.body = {
          color: 'Red',
          price: 25.99,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Missing required fields: color, size, price, quantity, destination, shippingMethod'
        });
      });

      test('should return 400 when price is missing', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Missing required fields: color, size, price, quantity, destination, shippingMethod'
        });
      });

      test('should return 400 when quantity is missing', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Missing required fields: color, size, price, quantity, destination, shippingMethod'
        });
      });

      test('should return 400 when destination is missing', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 2,
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Missing required fields: color, size, price, quantity, destination, shippingMethod'
        });
      });

      test('should return 400 when shippingMethod is invalid', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'invalid'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Invalid shipping method. Must be one of: land, air, sea'
        });
      });

      test('should return 400 when price is not a number', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 'invalid',
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Price must be a positive number'
        });
      });

      test('should return 400 when price is negative', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: -10,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Price must be a positive number'
        });
      });

      test('should return 400 when price is zero', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 0,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Missing required fields: color, size, price, quantity, destination, shippingMethod'
        });
      });

      test('should return 400 when quantity is not a number', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 'invalid',
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Quantity must be a positive integer'
        });
      });

      test('should return 400 when quantity is negative', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: -5,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Quantity must be a positive integer'
        });
      });

      test('should return 400 when quantity is zero', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 0,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Missing required fields: color, size, price, quantity, destination, shippingMethod'
        });
      });

      test('should return 400 when quantity is not an integer', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 2.5,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Quantity must be a positive integer'
        });
      });
    });

    describe('Successful Quote Calculations', () => {
      beforeEach(() => {
        mockGetPackage.mockReturnValue('wood');
        mockGetPackagingMaterials.mockReturnValue(['polystyrene balls']);
      });

      test('should calculate quote for small quantity with wood package and air shipping to US', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockGetPackage).toHaveBeenCalledWith('Large');
        expect(mockGetPackagingMaterials).toHaveBeenCalledWith('wood', 'air');
        expect(mockRes.json).toHaveBeenCalledWith({
          packageType: 'wood',
          protectionType: ['polystyrene balls'],
          totalPrice: expect.any(Number),
          priceModifiers: expect.any(Array)
        });
      });

      test('should calculate quote for large quantity (>100) with quantity discount', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 10,
          quantity: 150,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$1200.00',
          description: 'Quantity discount'
        });
      });

      test('should calculate quote for wood package with package type cost', async () => {
        mockGetPackage.mockReturnValue('wood');
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 1,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$5.00',
          description: 'Package type cost'
        });
      });

      test('should calculate quote for plastic package with package type cost', async () => {
        mockGetPackage.mockReturnValue('plastic');
        mockReq.body = {
          color: 'Red',
          size: 'Small',
          price: 100,
          quantity: 1,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$10.00',
          description: 'Package type cost'
        });
      });

      test('should calculate quote for cardboard package with package type discount', async () => {
        mockGetPackage.mockReturnValue('cardboard');
        mockReq.body = {
          color: 'Red',
          size: 'Medium',
          price: 100,
          quantity: 1,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$1.00',
          description: 'Package type discount'
        });
      });

      test('should calculate quote for US destination with destination cost', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 1,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$18.00',
          description: 'Destination cost'
        });
      });

      test('should calculate quote for Bolivia destination with destination cost', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 1,
          destination: 'Bolivia',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$13.00',
          description: 'Destination cost'
        });
      });

      test('should calculate quote for India destination with destination cost', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 1,
          destination: 'India',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$19.00',
          description: 'Destination cost'
        });
      });

      test('should calculate quote for other destination with default destination cost', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 1,
          destination: 'Canada',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$15.00',
          description: 'Destination cost'
        });
      });

      test('should calculate quote for sea shipping with fixed cost', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 1,
          destination: 'US',
          shippingMethod: 'sea'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$400.00',
          description: 'Shipping method cost'
        });
      });

      test('should calculate quote for land shipping with per-quantity cost', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 5,
          destination: 'US',
          shippingMethod: 'land'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$50.00',
          description: 'Shipping method cost'
        });
      });

      test('should calculate quote for air shipping with per-quantity cost', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 3,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$90.00',
          description: 'Shipping method cost'
        });
      });

      test('should calculate quote for air shipping with large quantity discount (>1000)', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 100,
          quantity: 1500,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$22500.00',
          description: 'Shipping method discount'
        });
      });

      test('should include base cost in price modifiers', async () => {
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.priceModifiers).toContainEqual({
          amount: '$51.98',
          description: 'Base cost'
        });
      });

      test('should return correct package type and protection type', async () => {
        mockGetPackage.mockReturnValue('cardboard');
        mockGetPackagingMaterials.mockReturnValue(['bubble wrap bags']);
        
        mockReq.body = {
          color: 'Red',
          size: 'Medium',
          price: 25.99,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.packageType).toBe('cardboard');
        expect(response.protectionType).toEqual(['bubble wrap bags']);
      });
    });

    describe('Error Handling', () => {
      test('should handle errors and return 500 status', async () => {
        mockGetPackage.mockImplementation(() => {
          throw new Error('Database connection failed');
        });

        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Error calculating shipping quote',
          error: 'Database connection failed'
        });
      });

      test('should handle non-Error objects in catch block', async () => {
        mockGetPackage.mockImplementation(() => {
          throw 'String error';
        });

        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 25.99,
          quantity: 2,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Error calculating shipping quote',
          error: undefined
        });
      });
    });

    describe('Edge Cases', () => {
      test('should handle very large numbers', async () => {
        mockGetPackage.mockReturnValue('wood');
        mockGetPackagingMaterials.mockReturnValue(['polystyrene balls']);
        
        mockReq.body = {
          color: 'Red',
          size: 'Large',
          price: 999999.99,
          quantity: 10000,
          destination: 'US',
          shippingMethod: 'air'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({
          packageType: 'wood',
          protectionType: ['polystyrene balls'],
          totalPrice: expect.any(Number),
          priceModifiers: expect.any(Array)
        });
      });

      test('should handle decimal prices', async () => {
        mockGetPackage.mockReturnValue('plastic');
        mockGetPackagingMaterials.mockReturnValue(['bubble wrap bags']);
        
        mockReq.body = {
          color: 'Red',
          size: 'Small',
          price: 0.01,
          quantity: 1,
          destination: 'US',
          shippingMethod: 'land'
        };

        await getShippingQuote(mockReq, mockRes);

        const response = mockRes.json.mock.calls[0][0];
        expect(response.totalPrice).toBeGreaterThan(0);
        expect(response.priceModifiers).toContainEqual({
          amount: '$0.01',
          description: 'Base cost'
        });
      });

      test('should handle minimum valid quantity (1)', async () => {
        mockGetPackage.mockReturnValue('cardboard');
        mockGetPackagingMaterials.mockReturnValue(['polystyrene balls']);
        
        mockReq.body = {
          color: 'Red',
          size: 'Medium',
          price: 10,
          quantity: 1,
          destination: 'US',
          shippingMethod: 'sea'
        };

        await getShippingQuote(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({
          packageType: 'cardboard',
          protectionType: ['polystyrene balls'],
          totalPrice: expect.any(Number),
          priceModifiers: expect.any(Array)
        });
      });
    });
  });
});