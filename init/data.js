const sampleListings = [
  {
    title: "Listing 1",
    description: "Nice place to stay",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    price: 1000,
    location: "Goa",
    country: "India",
  },
  {
    title: "Listing 2",
    description: "Peaceful and calm",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    price: 1200,
    location: "Manali",
    country: "India",
  },
  {
    title: "Listing 3",
    description: "Beautiful mountain view",
    image: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
    price: 900,
    location: "Darjeeling",
    country: "India",
  },
  {
    title: "Listing 4",
    description: "Luxury stay",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    price: 3000,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Listing 5",
    description: "Budget friendly",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    price: 700,
    location: "Birbhum",
    country: "India",
  },

  {
    title: "Listing 6",
    description: "Sea facing house",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 2000,
    location: "Puri",
    country: "India",
  },
  {
    title: "Listing 7",
    description: "Forest stay",
    image: {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    },
    price: 850,
    location: "Coorg",
    country: "India",
  },
  {
    title: "Listing 8",
    description: "Modern apartment",
    image: {
      url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b0",
    },
    price: 1800,
    location: "Bangalore",
    country: "India",
  },
  {
    title: "Listing 9",
    description: "City center home",
    image: {
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    },
    price: 1600,
    location: "Kolkata",
    country: "India",
  },
  {
    title: "Listing 10",
    description: "Hilltop view",
    image: {
      url: "https://images.unsplash.com/photo-1500534314209-a26db0f5d38e",
    },
    price: 1400,
    location: "Shillong",
    country: "India",
  },

  {
    title: "Beach House 1",
    description: "Beautiful beach house",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    price: 1500,
    location: "Goa",
    country: "India",
  },
  {
    title: "Mountain Cabin 2",
    description: "Peaceful mountain stay",
    image: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
    price: 1200,
    location: "Manali",
    country: "India",
  },
  {
    title: "City Apartment 3",
    description: "Modern city apartment",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    price: 1800,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Lake House 4",
    description: "Relax near the lake",
    image: {
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    },
    price: 1100,
    location: "Nainital",
    country: "India",
  },
  {
    title: "Forest Retreat 5",
    description: "Stay close to nature",
    image: {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    },
    price: 900,
    location: "Coorg",
    country: "India",
  },
  {
    title: "Luxury Villa 6",
    description: "Premium luxury villa",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    price: 3500,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Desert Camp 7",
    description: "Desert night experience",
    image: {
      url: "https://images.unsplash.com/photo-1500534314209-a26db0f5d38e",
    },
    price: 800,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Hill View Resort 8",
    description: "Hilltop resort",
    image: {
      url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b0",
    },
    price: 2000,
    location: "Shillong",
    country: "India",
  },
  {
    title: "Island Stay 9",
    description: "Island beach stay",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 2500,
    location: "Andaman",
    country: "India",
  },
  {
    title: "Countryside Home 10",
    description: "Quiet countryside home",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    price: 700,
    location: "Birbhum",
    country: "India",
  },
   {
    title: "Cozy Beach House",
    description: "Beautiful beach house with sea view",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    price: 1500,
    location: "Goa",
    country: "India"
  },
  {
    title: "Luxury City Apartment",
    description: "Modern apartment in city center",
    image: {
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
    },
    price: 2200,
    location: "Mumbai",
    country: "India"
  },
  {
    title: "Mountain Cabin",
    description: "Peaceful cabin surrounded by mountains",
    image: {
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6"
    },
    price: 1200,
    location: "Manali",
    country: "India"
  },
  {
    title: "Modern Villa",
    description: "Private villa with swimming pool",
    image: {
      url: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1"
    },
    price: 4000,
    location: "Bali",
    country: "Indonesia"
  },
  {
    title: "Lake View Cottage",
    description: "Relaxing stay near the lake",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    },
    price: 1800,
    location: "Nainital",
    country: "India"
  }
];

// 👉 10 × 10 = 100 (NO LOOP)
// const finalListings =
//   sampleListings
//     .concat(sampleListings)
//     .concat(sampleListings)
//     .concat(sampleListings)
//     .concat(sampleListings)
//     .concat(sampleListings)
//     .concat(sampleListings)
//     .concat(sampleListings)
//     .concat(sampleListings)
//     .concat(sampleListings);

// module.exports = { data: finalListings };

/* 👉 same pattern follow kore Listing 11 → Listing 100  
     title শুধু number বাড়াবে  
     image url repeat থাকলেও OK  
     MongoDB accept করবে */

module.exports = { data: sampleListings };
