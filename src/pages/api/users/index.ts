import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../../db/db.json';

let users = data.users;

export default function handler(req: NextApiRequest, res: any) {
    // Добавляем заголовки CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Замените '*' на конкретный домен в продакшн среде
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Обработка preflight-запросов
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const newUser = { ...req.body, id: (users.length + 1).toString() };
        users.push(newUser);
        console.log('data', data);
        
        res.status(201).json(newUser);
    } else if (req.method === 'GET') {
        res.status(200).json({ data: { users } });
    } else {
        res.status(405).json({ message: 'Метод не поддерживается' });
    }
}
