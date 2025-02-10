import { NextApiRequest, NextApiResponse } from 'next';

// Переносим данные из db.json в этот файл
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890"
  },
  {
    id: 2,
    name: "Doe Jane",
    email: "jane@example.com",
    phone: "098-765-4321"
  },
  {
    id: 3,
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "234-567-8901"
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "345-678-9012"
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "456-789-0123"
  },
  {
    id: 6,
    name: "Jessica Davis",
    email: "jessica.davis@example.com",
    phone: "567-890-1234"
  },
  {
    id: 7,
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    phone: "678-901-2345"
  },
  {
    id: 8,
    name: "Sarah Martinez",
    email: "sarah.martinez@example.com",
    phone: "789-012-3456"
  },
  {
    id: 9,
    name: "David Anderson",
    email: "david.anderson@example.com",
    phone: "890-123-4567"
  },
  {
    id: 10,
    name: "Laura Thomas",
    email: "laura.thomas@example.com",
    phone: "901-234-5678"
  }
];

export default function handler(req: NextApiRequest, res: any) {
    // Добавляем заголовки CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const newUser = { ...req.body, id: (users.length + 1).toString() };
        users.push(newUser);
        console.log('User added:', newUser);
        res.status(201).json(newUser);
    } else if (req.method === 'GET') {
        res.status(200).json({ message: 'Users fetched successfully!', data: { users } });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
