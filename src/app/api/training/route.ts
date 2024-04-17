import connect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Training from "@/models/trainingModel";
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

    const missions = await Training.find({ user: userID });
    

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

    const newTraining = new Training({
      title,
      description,
      deadline: new Date(),
      isDone: isDone || false,
      user: user._id,
    });

    await newTraining.save();

    return NextResponse.json(
      { message: 'Training added successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error occurred:', error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    
    const {training}  = await request.json();
    console.log("training :" + Training);
    

    if (!training) {
      return NextResponse.json(
        { error: "Training ID doesn't exist" },
        { status: 400 }
      );
    }

    const trainingToDelete = await Training.findById(training);

    if (!trainingToDelete) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
    }
    
    // important
    await Training.deleteOne(trainingToDelete);

    return NextResponse.json(
      { message: 'Training deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting Training:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
