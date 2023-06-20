import { createDeliveryResponseStub } from '../test/stubs';

export const deliveryRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createDeliveryResponseStub()),
  save: jest.fn().mockResolvedValue(createDeliveryResponseStub()),
});
