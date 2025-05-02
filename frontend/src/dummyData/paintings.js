export const paintings = [
  // Include all featured paintings here
  {
    _id: "1",
    title: "Autumn Landscape",
    artist: {
      _id: "a1", 
      name: "Emma Johnson"
    },
    price: 1200,
    medium: "Oil on Canvas",
    imageUrl: "/images/paintings/autumn-landscape.jpg",
    description: "A beautiful autumn landscape featuring vibrant fall colors.",
    dimensions: "24 x 36 inches",
    yearCreated: 2023,
    featured: true
  },
  // Add 10-15 more paintings with different details
  // ...
];

export const featuredPaintings = paintings.filter(p => p.featured);