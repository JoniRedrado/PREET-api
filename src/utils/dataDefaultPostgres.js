const arrayHotels = require('./constants/hotels.js');
const getRandomUsers = require('./constants/users.js');
const arrayCountries = require('./constants/countries.js');
const { roomsType, roomImages } = require('./constants/typeRooms.js');
const { User, Hotel, Country, Room, HotelImages, RoomImages } = require('../../db.js');

const findOrCreateUsers = () => {
  User.findAll()
  .then(response => {
    if(response.length === 0){
      Promise.all(getRandomUsers()).then(users => {
        User.bulkCreate(users).then(createUser =>{

        })
      })
    }
  })
  .catch(error => {
    console.log(error.message);
  })
}

const createRooms = (idHotel) => {
    const descripciones = [];
    roomsType.forEach((tipo, index) => {
      const numDescripciones = Math.floor(Math.random() * 3);
  
      for (let i = 0; i < numDescripciones; i++) {
        let cama, bano, espacio, vista;
  
        if (tipo.includes("Estandar")) {
          cama = Math.random() < 0.5 ? "cama sencilla" : "cama doble";
          bano = Math.random() < 0.5 ? "baño estandar" : "baño doble";
          espacio = "incluye minibar";
          vista = Math.random() < 0.5 ? "con vista interna" : "con vista a la calle";
        } else if (tipo.includes("Superior") || tipo.includes("Deluxe")) {
          const camasSuperiorDeluxe = ["cama doble", "cama queen", "cama king Size"];
          cama = camasSuperiorDeluxe[Math.floor(Math.random() * camasSuperiorDeluxe.length)];
          bano = ["baño doble", "baño con tina", "baño con tina de hidromasaje"][Math.floor(Math.random() * 3)];
          espacio = Math.random() < 0.5 ? "incluye minibar" : "incluye cocina pequeña";
          vista = Math.random() < 0.5 ? "con vista a la calle" : "con vista externa a la playa";
        } else if (tipo.includes("Junior Suite") || tipo.includes("Suite Estandar")) {
          const camasJuniorSuiteSuiteEstandar = ["cama queen", "cama king Size"];
          cama = camasJuniorSuiteSuiteEstandar[Math.floor(Math.random() * camasJuniorSuiteSuiteEstandar.length)];
          bano = ["baño con tina", "baño con tina de hidromasaje", "baño con jacuzzi"][Math.floor(Math.random() * 3)];
          espacio = Math.random() < 0.5 ? "incluye cocina y sala" : "incluye cocina, sala y comedor";
          vista = Math.random() < 0.5 ? "con vista externa a la playa" : "con vista externa a la calle";
        } else if (tipo.includes("Suite Presidencial")) {
          cama = Math.random() < 0.5 ? "cama queen" : "cama king Size";
          bano = Math.random() < 0.5 ? "baño con tina" : "baño con jacuzzi";
          espacio = "incluye cocina, sala y comedor";
          vista = Math.random() < 0.5 ? "con vista externa a la playa" : Math.random() < 0.5 ? "con vista a la calle" : "con vista a la calle y a la playa";
        }
  
        descripciones.push({
          type: tipo, 
          hotelId: idHotel,
          numeration: Math.floor(Math.random() * 20) + (Math.floor(Math.random() * 9) + 1)*100,
          price: Math.floor(Math.random() * (index+1) * 50) + (index+1) * 20,
          description: `Habitacion ${tipo} con ${cama}, ${bano}, ${espacio}, ${vista}`
        });
      }
    });
  
    return descripciones;
}

const findOrCreateRooms = (hotelsId) => {
  Room.findAll()
  .then(response => {
    if(response.length === 0){
      const roomsCreate = hotelsId.map(id_hotel => Room.bulkCreate(createRooms(id_hotel)));
      Promise.all(roomsCreate).then(() => { 
        Room.max('id').then((max) => {
          const imageRooms = Array.from({length: max}, (_, index) => ({
            roomId: index + 1,
            image: roomImages[Math.floor(Math.random() * roomImages.length)]
          }))

          RoomImages.bulkCreate(imageRooms).then(() => findOrCreateUsers());
        });
      });
    }else{
      findOrCreateUsers();
    }
  })
  .catch(error => {
    console.log(error.message);
  })
}

const findOrCreateHotels = () => {
    Hotel.findAll()
    .then(response => {
      if(response.length === 0){
        Hotel.bulkCreate(arrayHotels)
        .then((response) => {
          const imageHotels = response.flatMap((hotel, index) => 
            arrayHotels[index].image.map(img => ({hotelId: hotel.id, image: img})));
          
          HotelImages.bulkCreate(imageHotels)
          .then(() => findOrCreateRooms(arrayHotels.map((_, id) => id+1)));
        });
      }else findOrCreateRooms(response.map(hotel => hotel.dataValues.id));
    })
    .catch(error => {
      console.log(error.message);
    })
}

const findOrCreateCountries = () => {
    Country.findAll().
    then(response => {
      if(response.length === 0) Country.bulkCreate(arrayCountries).then(() => findOrCreateHotels())
      else findOrCreateHotels();
    })
    .catch(error => {
      console.log(error.message);
    })
}

module.exports = () => findOrCreateCountries();