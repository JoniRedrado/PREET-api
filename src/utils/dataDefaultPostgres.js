const arrayHotels = require('./constants/hotels.js');
const getRandomUsers = require('./constants/users.js');
const arrayCountries = require('./constants/countries.js');
const { roomsType, roomImages } = require('./constants/typeRooms.js');
const { User, Hotel, Country, Room, HotelImages, RoomImages, Booking } = require('../../db.js');

const createDataForRoom = (datesBooking, nights) => {
  const mesActual = (new Date()).getMonth() + 1;
  const typeTimeDate = Math.ceil(Math.random()*3);
  const year = typeTimeDate < 2 ? 2023 : 2024;
  const month = typeTimeDate < 2 ? Math.ceil(Math.random()*12) : 
                  typeTimeDate === 2 ? mesActual : Math.floor(Math.random()*(12-mesActual)+mesActual);
  const day = Math.ceil(Math.random()*28);

  const dateInit = new Date(year, month, day);
  const dateFinal = new Date(dateInit);

  dateFinal.setDate(dateInit.getDate() + nights);

  const repeatedDate = datesBooking?.some(date => {
    return ((dateInit >= date.dateInit && dateInit < date.dateFinel) ||
      (dateFinal > date.dateInit && dateFinal <= date.dateFinal))
  });

  if(repeatedDate) return createDataForRoom(datesBooking, nights);

  return {
    dateInit,
    dateFinal
  }
}

const createBookingForUser = (userIds, maxIdRoom) => {
  const dataBokingRooms = [];

  return userIds.flatMap(id => {
    const totalBooking = Array.from({length: Math.floor(Math.random()*20 + 1)});

    return totalBooking.map(async () => {
      const nights = Math.ceil(Math.random()*10) + 1;
      const roomId = Math.ceil(Math.random()*maxIdRoom);

      const dataRoom = await Room.findByPk(roomId, {attributes: ['price']});
     
      const amount = nights*dataRoom.price;
      const { dateInit, dateFinal } = createDataForRoom(dataBokingRooms?.filter(booking => booking.id === id), nights);

      dataBokingRooms.push({id, dateInit, dateFinal});

      return {
        pay: "",
        nights,
        amount,
        commission: amount*0.005,
        userId: id,
        roomId,
        dateInit,
        dateFinal
      }
    })
  })
}

const findOrCreateUsers = () => {
  User.findAll().then(response => {
    if(response.length === 0){
      Promise.all(getRandomUsers()).then(users => {
        User.bulkCreate(users).then(createUser =>{
          Room.max('id').then(max => {
            Promise.all(createBookingForUser(createUser.map(dataUser => dataUser.id), max))
            .then(dataBookings => Booking.bulkCreate(dataBookings).then(() => console.log('Datos creados')))
          })
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
        let cama, bano, espacio, vista, guest;
  
        if (tipo.includes("Estandar")) {
          cama = Math.random() < 0.5 ? "cama sencilla" : "cama doble";
          bano = Math.random() < 0.5 ? "baño estandar" : "baño doble";
          espacio = "incluye minibar";
          vista = Math.random() < 0.5 ? "con vista interna" : "con vista a la calle";
          guest = Math.ceil(Math.random()*3);
        } else if (tipo.includes("Superior") || tipo.includes("Deluxe")) {
          const camasSuperiorDeluxe = ["cama doble", "cama queen", "cama king Size"];
          cama = camasSuperiorDeluxe[Math.floor(Math.random() * camasSuperiorDeluxe.length)];
          bano = ["baño doble", "baño con tina", "baño con tina de hidromasaje"][Math.floor(Math.random() * 3)];
          espacio = Math.random() < 0.5 ? "incluye minibar" : "incluye cocina pequeña";
          vista = Math.random() < 0.5 ? "con vista a la calle" : "con vista externa a la playa";
          guest = Math.ceil(Math.random()*3);
        } else if (tipo.includes("Junior Suite") || tipo.includes("Suite Estandar")) {
          const camasJuniorSuiteSuiteEstandar = ["cama queen", "cama king Size"];
          cama = camasJuniorSuiteSuiteEstandar[Math.floor(Math.random() * camasJuniorSuiteSuiteEstandar.length)];
          bano = ["baño con tina", "baño con tina de hidromasaje", "baño con jacuzzi"][Math.floor(Math.random() * 3)];
          espacio = Math.random() < 0.5 ? "incluye cocina y sala" : "incluye cocina, sala y comedor";
          vista = Math.random() < 0.5 ? "con vista externa a la playa" : "con vista externa a la calle";
          guest = Math.ceil(Math.random()*4);
        } else if (tipo.includes("Suite Presidencial")) {
          cama = Math.random() < 0.5 ? "cama queen" : "cama king Size";
          bano = Math.random() < 0.5 ? "baño con tina" : "baño con jacuzzi";
          espacio = "incluye cocina, sala y comedor";
          vista = Math.random() < 0.5 ? "con vista externa a la playa" : Math.random() < 0.5 ? "con vista a la calle" : "con vista a la calle y a la playa";
          guest = Math.floor(Math.random()*3) + 4;
        }
  
        descripciones.push({
          type: tipo, 
          guest: guest,
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
  Room.findAll().then(response => {
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
    Hotel.findAll().then(response => {
      if(response.length === 0){
        Hotel.bulkCreate(arrayHotels).then((response) => {
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
    Country.findAll().then(response => {
      if(response.length === 0) Country.bulkCreate(arrayCountries).then(() => findOrCreateHotels())
      else findOrCreateHotels();
    })
    .catch(error => {
      console.log(error.message);
    })
}

module.exports = () => findOrCreateCountries();
