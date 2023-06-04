import { faker } from "@faker-js/faker";

const generateMockDrivers = (count) => {
  const drivers = [];
  for (let i = 0; i < count; i++) {
    const driver = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      phoneNumber: faker.phone.number('+234 ### ### ####'),
      car: {
        vehicle: faker.vehicle.vehicle(),
        color: faker.vehicle.color(),
        vrm: faker.vehicle.vrm(),
      },
    };
    drivers.push(driver);
  }
  return drivers
};

const mockDrivers = generateMockDrivers(100);

export default mockDrivers;