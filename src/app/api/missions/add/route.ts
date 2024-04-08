import connect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Mission from '@/models/missionModel';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);

    if (!userID) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { title, description, isDone, deadline, category } = body;

    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }


    const newMission = new Mission({
      title,
      description,
      deadline: new Date(deadline),
      category,
      isDone: isDone || false,
      user: user._id,
    });

    await newMission.save();

    return NextResponse.json(
      { message: 'Mission added successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error occurred:', error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
