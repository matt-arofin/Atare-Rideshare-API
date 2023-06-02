import { faker } from "@faker-js/faker";

const generateMockUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
    };
    users.push(user);
  }
  return users;
};

const mockUsers = generateMockUsers(10);


export default mockUsers;