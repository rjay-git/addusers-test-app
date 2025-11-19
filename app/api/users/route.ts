import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/types/user';

const usersFilePath = path.join(process.cwd(), 'public', 'users.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(usersFilePath, 'utf8');
    const users: User[] = JSON.parse(fileContents);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newUser: Omit<User, 'id'> = await request.json();

    const fileContents = fs.readFileSync(usersFilePath, 'utf8');
    const users: User[] = JSON.parse(fileContents);

    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const userWithId: User = {
      ...newUser,
      id: newId,
    };

    users.push(userWithId);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json(userWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
