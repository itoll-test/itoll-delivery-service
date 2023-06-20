import { Business } from 'src/delivery/entities/business.entity';

export const BusinessStub = (): Business => {
  return {
    id: '84d10006-2327-4ea8-b035-cd710c4cee68',
    name: 'itoll',
    password: 'hashedpassword',
    webhook: 'https://webhook.site/d5779899-4662-4f55-bf1a-bf95cc565d90',
  };
};
