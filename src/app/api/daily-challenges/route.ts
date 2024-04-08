import connect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import DailyChallenge from "@/models/dailyChallengeModel";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);

    if (!userID) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const missions = await DailyChallenge.find({ user: userID });
    

    return NextResponse.json({ data: missions }, { status: 200 });
  } catch (error: any) {
    console.error('Error occurred:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

    const { title, description, isDone } = body;

    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newDailyChallenge = new DailyChallenge({
      title,
      description,
      deadline: new Date(),
      isDone: isDone || false,
      user: user._id,
    });

    await newDailyChallenge.save();

    return NextResponse.json(
      { message: 'Daily Challenge added successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error occurred:', error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const {dailyChallenge}  = await request.json();
    console.log("logged :" + dailyChallenge);
    

    if (!dailyChallenge) {
      return NextResponse.json(
        { error: "dailyChallenge ID doesn't exist" },
        { status: 400 }
      );
    }

    const dailyChallengeToDelete = await DailyChallenge.findById(dailyChallenge);

    if (!dailyChallengeToDelete) {
      return NextResponse.json({ error: 'dailyChallenge not found' }, { status: 404 });
    }
    
    // important
    await DailyChallenge.deleteOne(dailyChallengeToDelete);

    return NextResponse.json(
      { message: 'dailyChallenge deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting dailyChallenge:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
