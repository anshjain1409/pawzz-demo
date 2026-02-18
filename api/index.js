const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory seed data
let listings = [
  { id: 1, name: 'Dr. Mehta Clinic', phone: '+919876543210', address: 'Shop 5, Shanti Nagar', status: 'Submitted', category: 'vet', source: 'WhatsApp', createdAt: '2026-02-18T08:00:00Z' },
  { id: 2, name: 'Happy Paws Shelter', phone: '+919876512345', address: '123, Gandhi Road', status: 'Needs Fix', category: 'shelter', source: 'Community Form', createdAt: '2026-02-18T07:30:00Z' },
  { id: 3, name: 'Pawzz Grooming', phone: '+919876598765', address: '45, Linking Road', status: 'Ready', category: 'groomer', source: 'Intern Research', createdAt: '2026-02-18T06:00:00Z' },
  { id: 4, name: 'City Vet Hospital', phone: '+919876500001', address: '12, MG Road', status: 'Verified', category: 'vet', source: 'Intern Research', createdAt: '2026-02-17T14:00:00Z' },
  { id: 5, name: 'Animal Aid NGO', phone: '+919876577777', address: '78, Bandra West', status: 'Published', category: 'ngo', source: 'Community Form', createdAt: '2026-02-17T10:00:00Z' },
  { id: 6, name: 'PetCare Plus', phone: '+919876566666', address: '90, Andheri East', status: 'Published', category: 'vet', source: 'WhatsApp', createdAt: '2026-02-16T12:00:00Z' },
  { id: 7, name: 'Furry Friends Kennel', phone: '+919876555555', address: '34, Juhu Lane', status: 'Verified', category: 'shelter', source: 'WhatsApp', createdAt: '2026-02-16T09:00:00Z' },
  { id: 8, name: 'Wagging Tails Spa', phone: '+919876544444', address: '', status: 'Needs Fix', category: 'groomer', source: 'Community Form', createdAt: '2026-02-15T16:00:00Z' },
];

let nextId = listings.length + 1;

// Names pool for simulated entries
const namePool = {
  'Intern Research': ['Paws & Claws Clinic', 'VetFirst Hospital', 'Lucky Pet Store', 'Bark Avenue Grooming', 'TailWaggers Kennel'],
  'WhatsApp': ['Dr. Sharma Pet Clinic', 'New shelter near park', 'Groomer on Hill Road', 'Vet at Malad station', 'NGO for strays'],
  'Community Form': ['Pet Paradise', 'HelpAnimals NGO', 'QuickVet Clinic', 'Fluffy Care Center', 'Street Dog Rescue'],
};

const categories = ['vet', 'shelter', 'groomer', 'ngo'];

// GET all listings
app.get('/api/listings', (req, res) => {
  res.json(listings);
});

// GET single listing
app.get('/api/listings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const listing = listings.find(l => l.id === id);
  if (!listing) return res.status(404).json({ error: 'Not found' });
  res.json(listing);
});

// PATCH update a listing
app.patch('/api/listings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = listings.findIndex(l => l.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  listings[index] = { ...listings[index], ...req.body };
  res.json(listings[index]);
});

// POST simulate incoming data
app.post('/api/incoming', (req, res) => {
  const { source } = req.body;
  const names = namePool[source] || namePool['WhatsApp'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  const newListing = {
    id: nextId++,
    name: randomName,
    phone: '+9198765' + String(Math.floor(Math.random() * 100000)).padStart(5, '0'),
    address: Math.random() > 0.4 ? '' : `${Math.floor(Math.random() * 200)}, Example Road`,
    status: 'Submitted',
    category: randomCategory,
    source: source,
    createdAt: new Date().toISOString(),
  };

  listings.push(newListing);
  res.status(201).json(newListing);
});

const PORT = process.env.PORT || 5050;
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Pawzz API running on port ${PORT}`));
}

module.exports = app;
