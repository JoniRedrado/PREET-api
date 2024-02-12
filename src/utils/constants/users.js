const bcrypt = require('bcrypt');
//const countries = (require('./countries.js')).length;

const names = [
    'Juan', 
    'María', 
    'Pedro', 
    'Laura', 
    'Carlos', 
    'Ana', 
    'Luis', 
    'Sofía', 
    'Diego', 
    'Elena',
    'Rafael',
    'Eduardo',
    'Maria Jose',
    'Stepanie',
    'Isabela',
    'Jimmy',
    'Dina',
    'Elias',
    'Eveling',
    'Sofia'
];
const lastNames = [
    'García', 
    'Rodríguez', 
    'Martínez', 
    'López', 
    'Pérez', 
    'González', 
    'Hernández', 
    'Sánchez', 
    'Díaz', 
    'Torres',
    'Perez',
    'Londoño',
    'Romero',
    'Salazar',
    'Acuña',
    'Thorrens',
    'Cruz',
    'Ariza',
    'Muñoz',
    'Blanco'
];

const createLastNameAndEmail = (name, users) => {
    let email;
    let last_name;
    let repeatedEmail = [];

    do{
        last_name = lastNames[Math.floor(Math.random() * lastNames.length)];
        email = `${name}${last_name.charAt(0).toUpperCase() + last_name.slice(1)}@gmail.com`;
        repeatedEmail = users.filter(user => user.email === email);
    }while(repeatedEmail.length > 0);

    return {last_name, email}
}

const getRandomUser = () => {
    let users = [];

    for(let i=0; i<5; i++){
        const user = names.map(name => {
            const data = createLastNameAndEmail(name, users);

            return {
                name,
                last_name: data.last_name, 
                rol: 'client',
                email: data.email,
                password: `${name}_${data.last_name}_123`,
            }
        });

        users = users.concat(user);
    }

    return users.map(async (user) => ({ ...user, password: await bcrypt.hash(user.password, 10) }));
}

module.exports = getRandomUser;