export const DEMO_SCENARIO = {
  datasets: [
    {
      id: 'd1',
      name: 'Dataset A: Shelter Records',
      problem: 'Missing Address',
      record: 'Dr. A Vet, Ph: 9876543210',
      solution: 'Intern finds address on Google Maps',
      status: 'Needs Fix',
      type: 'shelter'
    },
    {
      id: 'd2',
      name: 'Dataset B: Community Tips',
      problem: 'Duplicate Phone',
      record: 'Dr. B Clinic, Ph: 9876543210',
      solution: 'System flags duplicate -> Merge',
      status: 'Duplicate',
      type: 'vet'
    }
  ]
};

export const RAW_DATA = {
  'WhatsApp': [
    { id: 1, text: 'Hi, new vet at Andheri East. Dr. Sharma. 9820098200. Photo attached.', time: '10:42 AM' },
    { id: 2, text: 'Found a stray dog near Juhu circle. Need help.', time: '11:05 AM' },
    { id: 3, text: 'Pet Grooming salon opening soon in Bandra. Number 9998887776.', time: '11:30 AM' },
  ],
  'Intern Research': [
    { id: 1, text: 'VetFirst Hospital | +91-22-26001234 | Khar West | Verified', time: 'Yesterday' },
    { id: 2, text: 'Happy Tails | 98769876 | Incomplete Address | Needs call', time: 'Yesterday' },
  ],
  'Community Form': [
    { id: 1, text: 'Animal Shelter, Goregaon. Contact: Mr. Patil.', time: '2 days ago' },
    { id: 2, text: 'Emergency Vet near me. Please add to list.', time: '3 days ago' },
  ]
};

export const RED_FLAGS_DATA = {
  'phone': [
    { id: 101, value: '9876', issue: 'Too short (<10 digits)', source: 'WhatsApp' },
    { id: 102, value: '987654321012', issue: 'Too long (>12 digits)', source: 'Form' },
    { id: 103, value: 'N/A', issue: 'Non-numeric characters', source: 'Intern' },
  ],
  'location': [
    { id: 201, value: 'Near the big banyan tree', issue: 'Geocoding failed', source: 'WhatsApp' },
    { id: 202, value: 'Mumbai', issue: 'Too vague', source: 'Form' },
  ]
};

export const FIX_QUEUE = [
  { id: 1, name: 'Dr. A Vet', issue: 'Missing Address', data: 'Ph: 9876543210', suggestion: 'Search Google Maps' },
  { id: 2, name: 'Pet Haven', issue: 'Invalid Phone', data: 'Ph: 987-654', suggestion: 'Call to verify' },
];
