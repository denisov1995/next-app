// import { PrismaClient } from '@prisma/client';
// import { hash } from 'bcryptjs';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Метод не разрешен' });
//   }

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email и пароль обязательны' });
//   }

//   const existingUser = await prisma.user.findUnique({ where: { email } });

//   if (existingUser) {    
//     return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
//   }

//   const hashedPassword = await hash(password, 10);

//   const user = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword
//     }
//   });

//   return res.status(201).json(user);
// }


let questions = [{
    question: "What's the currency of the USA?",
    choices: ["US dollar", "Ruble", "Horses", "Gold"],
    corAnswer: 0
}, {
    question: "Where was the American Declaration of Independence signed?",
    choices: ["Philadelphia", "At the bottom", "Frankie's Pub", "China"],
    corAnswer: 0
}];


questions = questions.map(el => {
    return {
        ...el,
        usersAnswer: null
    }
}
);

console.log('questions', questions);
