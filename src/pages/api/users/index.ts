import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../../db/db.json';

let users = data.users;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const newUser = { ...req.body, id: (users.length + 1).toString() };
        users.push(newUser);
        res.status(201).json(newUser);
    }
    if (req.method === 'GET') {
        res.status(200).json({ data: { users } });
    }
}
