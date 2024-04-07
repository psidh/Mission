import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, username, password } = body;

    console.log('Request body : ' + email + username + password);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          error: 'User already exists',
        },
        { status: 500 }
      );
    } else {
      
      const hashPassword = await bcryptjs.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashPassword,
      });

      const savedUser = await newUser.save()

      console.log('Saved User: ' + savedUser);

      await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

      return NextResponse.json({
        message: 'User registered successfully',
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
