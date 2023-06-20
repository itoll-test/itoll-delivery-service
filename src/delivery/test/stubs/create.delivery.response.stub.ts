import { Delivery, State } from 'src/delivery/entities/delivery.entity';
import { BusinessStub } from './business.stub';

export const createDeliveryResponseStub = (): Delivery => {
  return {
    id: '448c8232-cab3-4054-ac27-fd0710554979',
    senderLocation: { type: 'Point', coordinates: [35.697269, 51.386981] },
    senderAddress:
      'Tehran, mahale jamalzadeh, khiaban yaser, kooche lashkari, pelak 4, vahed 4',
    senderName: 'Milad Hashemi',
    senderPhone: '09907553785',
    recieverLocation: {
      type: 'Point',
      coordinates: [35.70136937742684, 51.38529491902777],
    },
    recieverAddress: 'Tehran, mahale jamalzadeh, khiaban jamalzade shomali',
    recieverName: 'Itoll',
    recieverPhone: '02189518010',
    currentLocation: { type: 'Point', coordinates: [35.697269, 51.386981] },
    state: State.NOT_ACCPTED_BY_COURIER,
    businessId: BusinessStub().id,
  };
};
