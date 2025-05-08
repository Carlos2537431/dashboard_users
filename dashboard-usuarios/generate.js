import { faker, th } from "@faker-js/faker";
import lodash from "lodash";
import fs from 'fs';

const peoples = lodash.times(50, function (n) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        id: n,
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName, lastName),
        avatar: faker.image.avatar(),
        address: faker.location.streetAddress(),
        email: faker.internet.email({firstName:firstName.toLowerCase(), lastName:lastName.toLowerCase()}),
    }; 
});
const data = {};
data.peoples = peoples;
fs.writeFile('db.json', JSON.stringify(data), (err) => {
    if (err) throw err;{
        console.error(err);
        console.log('Finalizado...');
    }
});