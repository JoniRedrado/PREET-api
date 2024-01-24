/*
Tener en cuenta que en el campo "countryId" debe ir el id del pais correspondiente, 
de acuerdo a la siguiente lista:

preet=# SELECT * FROM countries;
 id |       name
----+------------------
  1 | Argentina
  2 | Bolivia
  3 | Brasil
  4 | Chile
  5 | Colombia
  6 | Ecuador
  7 | Guayana Francesa
  8 | Guyana
  9 | Islas Malvinas
 10 | Paraguay
 11 | Peru
 12 | Surinam
 13 | Uruguay
 14 | Venezuela
(14 filas)
*/

const hotels = [
    {
        name: "Hotel San Pedro Del Fuerte",
        address: "Cl. 46 #80-23, La Floresta, Medell¡n, La Am‚rica, Medell¡n, Antioquia",
        address_url: "https://hotelsanpedrodelfuerte.com",
        price: 50,
        email: "reservas@hotelsanpedrodelfuerte.com",
        image: "https://hotelsanpedrodelfuerte.com/wp-content/uploads/2022/02/Hotel_san_Pedro_del_fuerte_hoteles_en_medellin63.jpg",
        countryId: 5
    }, 
    {
        name: "Hotel Estelar La Fontana",
        address: "Avenida 127, Nº 15A – 10 / Bogotá",
        address_url: "https://www.estelarlafontana.com",
        price: 120,
        email: "reservas@hotelestelarlafontana.com",
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/16131364.jpg?k=a1e6f064c6b24726cef2fc81db21367925627b348b1c530932a39b8ddbe3e5b1&o=&hp=1",
        countryId: 5
    },
    {
        name: "Hotel Irotama Resort",
        address: "Calle 115 No. 2-60, Bello Horizonte, Santa Marta, Magdalena",
        address_url: "https://www.irotama.com",
        price: 260,
        email: "reservas@irotama.com",
        image: "https://s16847.pcdn.co/wp-content/uploads/2023/02/Plan-Irotama-op2.jpg",
        countryId: 5
    },
    {
        name: "Regente Palace Hotel",
        address: "Suipacha 964, C1008 CABA, Buenos Aires",
        address_url: "https://www.regente.com",
        price: 60,
        email: "reservas@regentepalace.com",
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/21308922.jpg?k=494cbe9a220d563586ce53fa1b5a00eab7ca183c1a61bcadc8ccf4fd34f57684&o=&hp=1",
        countryId: 1
    },
    {
        name: "Holiday Inn Lima Airport",
        address: "Centro Aereo Comercial, Ave. Tomas Valle S/N Esq, Av. Elmer Faucett, Callao 07041",
        address_url: "https://www.ihg.com/holidayinn/hotels/us/es/lima/limap/hoteldetail",
        price: 100,
        email: "reservas@otphoteles.com",
        image: "https://www.fiesta-tours-peru.com/img/hotels/lima/international-airport/big/holiday-inn-lima-airport.jpg",
        countryId: 11
    },
    {
        name: "Hotel Atlantico Tower",
        address: "Rua Visconde de Inhauma, 95 - Centro, Rio de Janeiro",
        address_url: "https://atlanticotower.com.br",
        price: 80,
        email: "reservas@otphoteles.com",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/a1/60/b6/pool--v5650517.jpg?w=700&h=-1&s=1",
        countryId: 3
    },
    {
        name: "Hotel Uruguay Brasil",
        address: "Sarandí 440, Rivera, Uruguay. CP 40000.",
        address_url: "https://hoteluruguaybrasil.com",
        price: 120,
        email: "recepcion@hoteluruguaybrasil.com",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/90/d2/88/hotel-uruguay-brasil.jpg?w=700&h=-1&s=1",
        countryId: 13
    },
    // {
    //     name: 'Hotel Buenos Aires',
    //     address: '123 Main St, Buenos Aires, Argentina',
    //     address_url: 'https://www.example.com/hotel-buenos-aires',
    //     price: 150.00,
    //     email: 'hotel1@argentina.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 1,
    // },
    // {
    //     name: 'Hotel Rio de Janeiro',
    //     address: '456 Beach Ave, Rio de Janeiro, Brazil',
    //     address_url: 'https://www.example.com/hotel-rio-de-janeiro',
    //     price: 200.00,
    //     email: 'hotel2@brazil.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 2,
    // },
    // {
    //     name: 'Hotel Santiago',
    //     address: '789 Plaza St, Santiago, Chile',
    //     address_url: 'https://www.example.com/hotel-santiago',
    //     price: 250.00,
    //     email: 'hotel3@chile.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 3,
    // },
    // {
    //     name: 'Hotel Bogota',
    //     address: '101 Downtown St, Bogota, Colombia',
    //     address_url: 'https://www.example.com/hotel-bogota',
    //     price: 180.00,
    //     email: 'hotel4@colombia.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 4,
    // },
    // {
    //     name: 'Hotel Quito',
    //     address: '202 Mountain View, Quito, Ecuador',
    //     address_url: 'https://www.example.com/hotel-quito',
    //     price: 160.00,
    //     email: 'hotel5@ecuador.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 5,
    // },
    // {
    //     name: 'Hotel Mexico City',
    //     address: '303 Central Ave, Mexico City, Mexico',
    //     address_url: 'https://www.example.com/hotel-mexico-city',
    //     price: 220.00,
    //     email: 'hotel6@mexico.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 6,
    // },
    // {
    //     name: 'Hotel Lima',
    //     address: '404 Seaside St, Lima, Peru',
    //     address_url: 'https://www.example.com/hotel-lima',
    //     price: 190.00,
    //     email: 'hotel7@peru.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 7,
    // },
    // {
    //     name: 'Hotel Montevideo',
    //     address: '505 Ocean View, Montevideo, Uruguay',
    //     address_url: 'https://www.example.com/hotel-montevideo',
    //     price: 170.00,
    //     email: 'hotel8@uruguay.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 8,
    // },
    // {
    //     name: 'Hotel Caracas',
    //     address: '606 Hillside Ave, Caracas, Venezuela',
    //     address_url: 'https://www.example.com/hotel-caracas',
    //     price: 240.00,
    //     email: 'hotel9@venezuela.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 9,
    // },
    // {
    //     name: 'Hotel Asuncion',
    //     address: '707 Plaza Blvd, Asuncion, Paraguay',
    //     address_url: 'https://www.example.com/hotel-asuncion',
    //     price: 200.00,
    //     email: 'hotel10@paraguay.com',
    //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //     countryId: 10,
    // },

];

module.exports = hotels;