const bcrypt = require('bcrypt');
const countries = (require('./countries.js'));

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
const imageUrls = [
    'https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/swv4oyp72koikhjkwyoq',
    'https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/ds1l81ac0iymt3v2erhg',
    'https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/rxt0zrrf784nvq5iwhc6',
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/iywooni90qpaxbure1jw",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/tm6i8cv7lh4prq4soowz",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/dkygnajvb26tyyw8ihzs",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/xznrbnq42qdriuelcpog",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/nwfmmti9efmxdkxeztrw",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/grdifnq6fvq7s25pluqz",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/bvwxdju6beznjcbpawhi",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/zf80m0wdpxmsbw8asoi2",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/lnwed8uzzaeypbxrjp7m",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/h3pzlvdoqznlu7llune5",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/j7ydigjcmd7raen7edko",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/f2fmb9hg7xkkcscr3hje",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/g9dmyeq3gxvajs8hqyyd",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/rlzkxuqul9kveacmuk3b",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/onvivcfnespmdivqbq9w",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/bgezebn1v4nq42ncwuxl",
    "https://res.cloudinary.com/dcposqieu/image/upload/f_auto,q_auto/v1/ImageUsers/eogi2ytf4avvrhtia0j7"
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
                nationality: countries[Math.floor(Math.random()*countries.length)].name,
                password: `${name}_${data.last_name}_123`,
                profile_picture: imageUrls[Math.floor(Math.random() * imageUrls.length)]
            }
        });

        users = users.concat(user);
    }

    return users.map(async (user) => ({ ...user, password: await bcrypt.hash(user.password, 10) }));
}

module.exports = getRandomUser;