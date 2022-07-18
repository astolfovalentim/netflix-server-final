import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { cpf } from 'cpf-cnpj-validator';

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'Astolfo',
    email: 'astolfo@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: true,
  },
  {
    name: 'Astolfo2',
    email: 'astolfo2@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: false,
  },
  {
    name: 'Astolfo3',
    email: 'astolfo3@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: false,
  },
  {
    name: 'Astolfo4',
    email: 'astolfo4@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: true,
  },
  {
    name: 'Astolfo5',
    email: 'astolfo5@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: true,
  },
];

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.user.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
        password: await bcrypt.hash(obj.password, 10),
      },
    });
  }
};
