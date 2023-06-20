import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';

export const createDeliveryStub = (): CreateDeliveryDto => ({
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
  recieverPhone: '09907553785',
});
