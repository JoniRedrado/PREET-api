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
        address: "Cl. 46 #80-23, La Floresta, Medellin",
        stars: 4,
        address_url: "https://hotelsanpedrodelfuerte.com",
        price: 50,
        email: "reservas@hotelsanpedrodelfuerte.com",
        image: ["https://hotelsanpedrodelfuerte.com/wp-content/uploads/2022/02/Hotel_san_Pedro_del_fuerte_hoteles_en_medellin63.jpg"],
        countryId: 5
    }, 
    {
        name: "Hotel Estelar La Fontana",
        address: "Avenida 127, Nº 15A – 10 / Bogotá",
        stars: 4,
        address_url: "https://www.estelarlafontana.com",
        price: 120,
        email: "reservas@hotelestelarlafontana.com",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/16131364.jpg?k=a1e6f064c6b24726cef2fc81db21367925627b348b1c530932a39b8ddbe3e5b1&o=&hp=1"],
        countryId: 5
    },
    {
        name: "Hotel Irotama Resort",
        address: "Calle 115 No. 2-60, Bello Horizonte",
        stars: 4,
        address_url: "https://www.irotama.com",
        price: 260,
        email: "reservas@irotama.com",
        image: ["https://s16847.pcdn.co/wp-content/uploads/2023/02/Plan-Irotama-op2.jpg"],
        countryId: 5
    },
    {
        name: "Regente Palace Hotel",
        address: "Suipacha 964, C1008 CABA, Buenos Aires",
        stars: 4,
        address_url: "https://www.regente.com",
        price: 60,
        email: "reservas@regentepalace.com",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/21308922.jpg?k=494cbe9a220d563586ce53fa1b5a00eab7ca183c1a61bcadc8ccf4fd34f57684&o=&hp=1"],
        countryId: 1
    },
    {
        name: "Holiday Inn Lima Airport",
        address: "Centro Aereo Comercial, Ave. Tomas Valle S/N Esq, Av. Elmer Faucett, Callao 07041",
        stars: 4,
        address_url: "https://www.ihg.com/holidayinn/hotels/us/es/lima/limap/hoteldetail",
        price: 100,
        email: "reservas@otphoteles.com",
        image: ["https://www.fiesta-tours-peru.com/img/hotels/lima/international-airport/big/holiday-inn-lima-airport.jpg"],
        countryId: 11
    },
    {
        name: "Hotel Atlantico Tower",
        address: "Rua Visconde de Inhauma, 95 - Centro, Rio de Janeiro",
        stars: 4,
        address_url: "https://atlanticotower.com.br",
        price: 80,
        email: "reservas@otphoteles.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/a1/60/b6/pool--v5650517.jpg?w=700&h=-1&s=1"],
        countryId: 3
    },
    {
        name: "Hotel Uruguay Brasil",
        address: "Sarandí 440, Rivera",
        stars: 4,
        address_url: "https://hoteluruguaybrasil.com",
        price: 120,
        email: "recepcion@hoteluruguaybrasil.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/90/d2/88/hotel-uruguay-brasil.jpg?w=700&h=-1&s=1"],
        countryId: 13
    }
    ,
    {
        name: "Los Silos Hotel ",
        address: "Dique I Puerto de Santa Fe, Santa Fe",
        stars: 4,
        address_url: "https://www.google.com/maps/place/Los+Silos+Hotel/",
        price: 130,
        email: "recepcion.ls@hotellossilos.com.ar",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/417842792.jpg?k=4ebd03d854fe8a5d8798bd278b56d6e75332888dfcba96b3660a7ca1a61172a9&o=&hp=1"],
        countryId: 1
    }
    ,
    {
        name: "Gran Lourdes Hotel",
        address: "CASSAFFOUSTH 63, Villa Carlos Paz",
        stars: 3,
        address_url: "https://www.google.com/maps/place/Hotel+Gran+Lourdes/",
        price: 60,
        email: "recepcion@granlourdeshotel.com",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/285522052.jpg?k=e2e16e1d809a909efd8ac046ca16dab25f14b227b57d2a4c1ae84f114460571e&o=&hp=1"],
        countryId: 1
    }
    ,
    {
        name: "Sofitel La Reserva Cardales",
        address: "Ruta Panamericana Nr. 9 Km 61, Río Luján",
        stars: 5,
        address_url: "https://www.google.com/maps/place/Sofitel+La+Reserva+Cardales/",
        price: 200,
        email: "sofitellareservacardales@sofitel.com",
        image: ["https://www.ahstatic.com/photos/6519_ho_00_p_1024x768.jpg"],
        countryId: 1
    }
    ,
    {
        name: "Hotel Patagonia",
        address: "Fagnano Nº 54, Z9405CBC Río Gallegos",
        stars: 4,
        address_url: "https://www.google.com/maps/place/Hotel+Patagonia/",
        price: 140,
        email: "info@hotel-patagonia.com",
        image: ["https://hotel-patagonia.com/wp-content/uploads/2023/05/SUITE-4.jpg"],
        countryId: 1
    },
    {
        name: "Bolivia Palace Hotel",
        address: "Av. Bolívar #200, La Paz",
        stars: 4,
        address_url: "https://boliviapalacehotel.com",
        price: 80,
        email: "reservas@boliviapalacehotel.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/71/48/53/hotel-casa-antigua.jpg?w=700&h=-1&s=1"],
        countryId: 2
    },
    {
        name: "Amazon Rainforest Lodge",
        address: "Puerto Maldonado, Pando",
        stars: 3,
        address_url: "https://amazonrainforestlodge.com",
        price: 65,
        email: "reservas@amazonrainforestlodge.com",
        image: ["https://media-cdn.tripadvisor.com/media/photo-s/05/47/59/82/hotel-bolivia.jpg"],
        countryId: 2
    },
    {
        name: "Salar de Uyuni Retreat",
        address: "Calle Ferroviaria #150, Uyuni",
        stars: 4,
        address_url: "https://salardeuyuniretreat.com",
        price: 90,
        email: "reservas@salardeuyuniretreat.com",
        image: ["https://boliviamia.net/Images/Hotelpics/Hotel_Regal_Oruro_04.jpg"],
        countryId: 2
    },
    {
        name: "Andes View Hotel",
        address: "Av. Sucre #300, Sucre",
        stars: 3,
        address_url: "https://andesviewhotel.com",
        price: 75,
        email: "reservas@andesviewhotel.com",
        image: ["https://media-cdn.tripadvisor.com/media/photo-s/09/bf/4d/8e/gran-hotel-bolivia.jpg"],
        countryId: 2
    },
    {
        name: "Lake Titicaca Resort",
        address: "Isla del Sol, Copacabana",
        stars: 5,
        address_url: "https://laketiticacaresort.com",
        price: 120,
        email: "reservas@laketiticacaresort.com",
        image: ["https://c.otcdn.com/imglib/hotelfotos/8/623/hotel-marriott-santa-cruz-de-la-sierra-000.jpg"],
        countryId: 2
    },
    {
        name: "Carnival Beach Resort",
        address: "Av. Copacabana #500, Rio de Janeiro",
        stars: 5,
        address_url: "https://carnivalbeachresort.com",
        price: 150,
        email: "reservas@carnivalbeachresort.com",
        image: ["https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/306834049.jpg?k=d16d69f6623388e716703416bdb2a0b10754aae4c7b36c28098d8bf434fd5b56&o="],
        countryId: 3
    },
    {
        name: "Amazon Rainforest Eco Lodge",
        address: "Manaus, Amazonas",
        stars: 4,
        address_url: "https://amazonrainforestecolodge.com",
        price: 120,
        email: "reservas@amazonrainforestecolodge.com",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/190439958.jpg?k=b38c90503c92096bdca96e9139abc963feb1e7a56f6e3742bd01bdc1cce95217&o=&hp=1"],
        countryId: 3
    },
    {
        name: "Iguazu Falls View Hotel",
        address: "Av. Cataratas #300, Foz do Iguaçu",
        stars: 4,
        address_url: "https://iguazufallsviewhotel.com",
        price: 110,
        email: "reservas@iguazufallsviewhotel.com",
        image: ["https://www.atrapalo.com/hoteles/picture/s/226/6/7/306608313.jpg"],
        countryId: 3
    },
    {
        name: "Pantanal Wetlands Lodge",
        address: "Estrada Transpantaneira, Corumbá, Mato Grosso do Sul",
        stars: 3,
        address_url: "https://pantanalwetlandslodge.com",
        price: 80,
        email: "reservas@pantanalwetlandslodge.com",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/170873634.jpg?k=7fa3068e6bc60bf881cdaa07cd04c64656b03147cf53a761850ed875b79bffa4&o=&hp=1"],
        countryId: 3
    },
    {
        name: "Hotel Ayenda Estadio",
        address: "Cl. 46 #80-23, Medellín",
        stars: 4,
        address_url: "https://ayendaEstadio.com",
        price: 50,
        email: "reservas@ayendaEstadio.com",
        image: ["https://hotelsanpedrodelfuerte.com/wp-content/uploads/2022/02/Hotel_san_Pedro_del_fuerte_hoteles_en_medellin63.jpg"],
        countryId: 5
    },
    {
        name: "Santiago Skyline Suites",
        address: "Calle Providencia #200, Región Metropolitana",
        stars: 4,
        address_url: "https://santiagoskylinesuites.com",
        price: 110,
        email: "reservas@santiagoskylinesuites.com",
        image: ["https://dynl.mktgcdn.com/p/k6GFYNdnl1bISeU6ha9yFGIiGQshPekTfVmGt10Ieww/600x450.jpg"],
        countryId: 4
    },
    {
        name: "Valparaíso Seaside Resort",
        address: "Paseo Yugoslavo #150, Valparaíso",
        stars: 4,
        address_url: "https://valparaisoseasideresort.com",
        price: 120,
        email: "reservas@valparaisoseasideresort.com",
        image: ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Avenida_de_Mayo_Hotel_Chile.jpg/1200px-Avenida_de_Mayo_Hotel_Chile.jpg"],
        countryId: 4
    },
    {
        name: "Aconcagua Mountain Retreat",
        address: "Av. Aconcagua #300, Viña del Mar",
        stars: 3,
        address_url: "https://aconcaguamountainretreat.com",
        price: 85,
        email: "reservas@aconcaguamountainretreat.com",
        image: ["https://dynl.mktgcdn.com/p/k6GFYNdnl1bISeU6ha9yFGIiGQshPekTfVmGt10Ieww/600x450.jpg"],
        countryId: 4
    },
    {
        name: "Galápagos Island Resort",
        address: "Isla Santa Cruz, Galápagos",
        stars: 5,
        address_url: "https://galapagosislandresort.com",
        price: 180,
        email: "reservas@galapagosislandresort.com",
        image: ["https://images.trvl-media.com/lodging/5000000/4470000/4461000/4460935/b4b21e0a.jpg?impolicy=resizecrop&rw=500&ra=fit"],
        countryId: 6
    },
    {
        name: "Quito Colonial Boutique Hotel",
        address: "Calle de la Ronda #75, Quito, Pichincha",
        stars: 4,
        address_url: "https://quitocolonialhotel.com",
        price: 110,
        email: "reservas@quitocolonialhotel.com",
        image: ["https://cache.marriott.com/content/dam/marriott-renditions/UIODT/uiodt-guestroom-0080-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"],
        countryId: 6
    },
    {
        name: "Cotopaxi Mountain Lodge",
        address: "Av. Cotopaxi #200, Latacunga",
        stars: 3,
        address_url: "https://cotopaximountainlodge.com",
        price: 80,
        email: "reservas@cotopaximountainlodge.com",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/303791135.jpg?k=bde33eca4681160514fba8cabdebd92c3f0aa79c133e6eea8c7891347c0ba955&o=&hp=1"],
        countryId: 6
    },
    {
        name: "Amazon Rainforest Retreat",
        address: "Río Napo, Tena, Napo",
        stars: 4,
        address_url: "https://amazonrainforestretreat.com",
        price: 120,
        email: "reservas@amazonrainforestretreat.com",
        image: ["https://static.mashpilodge.com/wp-content/uploads/2019/06/mashpi-lodge-full-view.jpg"],
        countryId: 6
    },
    {
        name: "Kourou Seaside Retreat",
        address: "Boulevard de l'Espace, Kourou",
        stars: 4,
        address_url: "https://kourouseasideretreat.com",
        price: 120,
        email: "reservas@kourouseasideretreat.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/59/ba/f2/grand-hotel-montabo.jpg?w=1200&h=-1&s=1"],
        countryId: 7
    },
    {
        name: "Saint-Laurent Riverside Hotel",
        address: "Quai des Pirogues, Saint-Laurent-du-Maroni",
        stars: 3,
        address_url: "https://saintlaurentriversidehotel.com",
        price: 85,
        email: "reservas@saintlaurentriversidehotel.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/56/73/ed/prise-sous-le-carbet.jpg?w=1200&h=-1&s=1"],
        countryId: 7
    },
    {
        name: "Maripasoula Rainforest Lodge",
        address: "Rue des Papillons, Maripasoula",
        stars: 4,
        address_url: "https://maripasoularainforestlodge.com",
        price: 110,
        email: "reservas@maripasoularainforestlodge.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/9a/45/82/hotel-ker-alberte.jpg?w=1200&h=-1&s=1"],
        countryId: 7
    },
    {
        name: "Georgetown City Hotel",
        address: "Main Street, Georgetown",
        stars: 4,
        address_url: "https://georgetowncityhotel.com",
        price: 100,
        email: "reservas@georgetowncityhotel.com",
        image: ["https://cache.marriott.com/content/dam/marriott-renditions/GEOMC/geomc-king-guestroom-9673-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"],
        countryId: 8
    },
    {
        name: "Kaieteur Falls Lodge",
        address: "Pakaraima Mountains, Potaro-Siparuni",
        stars: 3,
        address_url: "https://kaieteurfallslodge.com",
        price: 80,
        email: "reservas@kaieteurfallslodge.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/44/fe/48/exterior.jpg?w=1200&h=-1&s=1"],
        countryId: 8
    },
    {
        name: "Essequibo River Resort",
        address: "Karasabai Village, Upper Takutu-Upper Essequibo",
        stars: 4,
        address_url: "https://essequiboriverresort.com",
        price: 120,
        email: "reservas@essequiboriverresort.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/35/b0/a7/outdoor-pool.jpg?w=1200&h=-1&s=1"],
        countryId: 8
    },
    {
        name: "Stanley Harbor Hotel",
        address: "Ross Road, Stanley",
        stars: 3,
        address_url: "https://stanleyharborhotel.com",
        price: 80,
        email: "reservas@stanleyharborhotel.com",
        image: ["https://tandemluxurytravel.com/wp-content/uploads/2019/10/4239_Soneva-Jani-Resort-1-Bedroom-Water-Retreat-with-Slide_1100x550.jpeg"],
        countryId: 9
    },
    {
        name: "Falkland Islands Lodge",
        address: "Cape Pembroke, Falkland Islands",
        stars: 4,
        address_url: "https://falklandislandslodge.com",
        price: 110,
        email: "reservas@falklandislandslodge.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/19/dd/ff/grand-water-villas-with.jpg?w=1200&h=-1&s=1"],
        countryId: 9
    },
    {
        name: "Malvinas Retreat Resort",
        address: "Port Howard, West Falkland",
        stars: 5,
        address_url: "https://malvinasretreatresort.com",
        price: 150,
        email: "reservas@malvinasretreatresort.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/10/0a/5f/jacuzzi-water-villas.jpg?w=1200&h=-1&s=1"],
        countryId: 9
    },
    {
        name: "Asunción City Suites",
        address: "Av. Mariscal López #1500, Asunción",
        stars: 3,
        address_url: "https://asuncioncitysuites.com",
        price: 70,
        email: "reservas@asuncioncitysuites.com",
        image: ["https://media-cdn.tripadvisor.com/media/photo-s/11/43/54/af/gran-hotel-del-paraguay.jpg"],
        countryId: 10
    },
    {
        name: "Ciudad del Este Riverside Hotel",
        address: "Ruta Internacional, Ciudad del Este",
        stars: 4,
        address_url: "https://ciudaddelesteriversidehotel.com",
        price: 100,
        email: "reservas@ciudaddelesteriversidehotel.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/67/c0/9f/entrada.jpg?w=1200&h=-1&s=1"],
        countryId: 10
    },
    {
        name: "Encarnación Beach Resort",
        address: "Costanera, Encarnación",
        stars: 5,
        address_url: "https://encarnacionbeachresort.com",
        price: 150,
        email: "reservas@encarnacionbeachresort.com",
        image: ["https://media-cdn.tripadvisor.com/media/photo-s/1c/25/1a/06/paramanta-life-style.jpg"],
        countryId: 10
    },
    {
        name: "Machu Picchu View Lodge",
        address: "Calle Hermanos Ayar, Aguas Calientes",
        stars: 4,
        address_url: "https://machupicchuviewlodge.com",
        price: 120,
        email: "reservas@machupicchuviewlodge.com",
        image: ["https://content.r9cdn.net/himg/20/89/6f/ice-66750-60167410_3XL-181506.jpg"],
        countryId: 11
    },
    {
        name: "Lima Coastal Retreat",
        address: "Malecón de la Reserva #500, Lima",
        stars: 5,
        address_url: "https://limacoastalretreat.com",
        price: 180,
        email: "reservas@limacoastalretreat.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/02/36/d7/courtyard.jpg?w=1200&h=-1&s=1"],
        countryId: 11
    },
    {
        name: "Cusco Historical Mansion",
        address: "Plaza de Armas, Cusco",
        stars: 4,
        address_url: "https://cuscohistoricalmansion.com",
        price: 150,
        email: "reservas@cuscohistoricalmansion.com",
        image: ["https://www.hotelvinasqueirolo.com/blog/wp-content/uploads/2019/07/que-podemos-esperar-de-un-hotel-de-liujo-en-peru-A-1066x546.jpg"],
        countryId: 11
    },
    {
        name: "Paramaribo City Center Hotel",
        address: "Waterkant St, Paramaribo",
        stars: 3,
        address_url: "https://paramaribocitycenterhotel.com",
        price: 80,
        email: "reservas@paramaribocitycenterhotel.com",
        image: ["https://media-cdn.tripadvisor.com/media/photo-s/12/2f/df/f2/swimmingpool.jpg"],
        countryId: 12
    },
    {
        name: "Jungle Retreat Lodge",
        address: "Kabalebo River, Surinam",
        stars: 4,
        address_url: "https://jungleretreatlodge.com",
        price: 120,
        email: "reservas@jungleretreatlodge.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/03/f6/3a/royal-torarica.jpg?w=1200&h=-1&s=1"],
        countryId: 12
    },
    {
        name: "Montevideo Waterfront Hotel",
        address: "Rambla República de México, Montevideo",
        stars: 4,
        address_url: "https://montevideowaterfronthotel.com",
        price: 110,
        email: "reservas@montevideowaterfronthotel.com",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/367444050.jpg?k=3e64828b7747ee5810eaba00fb00b0ac8b268c92d345dbb8c58ed02888e07327&o=&hp=1"],
        countryId: 13
    },
    {
        name: "Punta del Este Beach Resort",
        address: "Av. Gorlero, Punta del Este, Maldonado",
        stars: 5,
        address_url: "https://puntadelestebeachresort.com",
        price: 160,
        email: "reservas@puntadelestebeachresort.com",
        image: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/10016329.jpg?k=7eebd017034cfba8e82c8b037d87296a3a189b1851086b09570e35fad87f79d1&o=&hp=1"],
        countryId: 13
    },
    {
        name: "Caracas City Center Hotel",
        address: "Av. Bolívar, Caracas",
        stars: 3,
        address_url: "https://caracascitycenterhotel.com",
        price: 80,
        email: "reservas@caracascitycenterhotel.com",
        image: ["https://media-cdn.tripadvisor.com/media/photo-s/0b/75/d4/42/piscina-atardecer.jpg"],
        countryId: 14
    },
    {
        name: "Angel Falls Lodge",
        address: "Canaima National Park, Bolívar",
        stars: 4,
        address_url: "https://angelfallslodge.com",
        price: 120,
        email: "reservas@angelfallslodge.com",
        image: ["https://media-cdn.tripadvisor.com/media/photo-s/23/74/7e/9a/margarita-village.jpg"],
        countryId: 14
    },
    {
        name: "Maracaibo Lakeside Resort",
        address: "Av. El Milagro, Maracaibo, Zulia",
        stars: 5,
        address_url: "https://maracaibolakesideresort.com",
        price: 150,
        email: "reservas@maracaibolakesideresort.com",
        image: ["https://media-cdn.tripadvisor.com/media/photo-s/0e/a7/fc/e0/sunsol-isla-caribe.jpg"],
        countryId: 14
    },
    {
        name: "Mérida Mountain Retreat",
        address: "Calle de los Pájaros, Mérida",
        stars: 4,
        address_url: "https://meridamountainretreat.com",
        price: 110,
        email: "reservas@meridamountainretreat.com",
        image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/8f/e4/3b/hesperia-isla-margarita.jpg?w=1200&h=-1&s=1"],
        countryId: 14
    },
];

module.exports = hotels;