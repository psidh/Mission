import connect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Mission from '@/models/missionModel';
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

    const missions = await Mission.find({ user: userID });

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

    const { title, description, deadline, category } = body;

    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newMission = new Mission({
      title,
      description,
      deadline: new Date(deadline),
      category,
      isDone: false,
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

export async function PUT(request: NextRequest) {
  try {
    const { mission } = await request.json();

    if (!mission) {
      return NextResponse.json(
        { error: "Mission ID doesn't exist" },
        { status: 400 }
      );
    }

    const missionToUpdate = await Mission.findById(mission);

    if (!missionToUpdate) {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    }

    // Update the mission's isDone property
    missionToUpdate.isDone = true;

    // Save the updated mission
    await missionToUpdate.save();

    return NextResponse.json(
      { message: 'Mission updated successfully', mission: missionToUpdate },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating mission:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { mission } = await request.json();
    console.log('logged :' + mission);

    if (!mission) {
      return NextResponse.json(
        { error: "Mission ID doesn't exist" },
        { status: 400 }
      );
    }

    const missionToDelete = await Mission.findById(mission);

    if (!missionToDelete) {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    }

    // important
    await Mission.deleteOne(missionToDelete);

    return NextResponse.json(
      { message: 'Mission deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting mission:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
