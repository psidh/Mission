import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";


connect();

export async function POST(request: NextRequest) {
 try {
    const body =  await request.json();

    const {email , password} = body;

    const user = await User.findOne({email});

    if(!user){
        return NextResponse.json({
               error : "user doesnt exist"
        }, {status: 500})
    }

    console.log("User Exists");

    const validPassword = await bcryptjs.compare(password, user.password)

    if(!validPassword){
        return NextResponse.json({
            error : "check credentials"
     }, {status: 400})
    }


    const token = await jwt.sign({
        id: user._id,
        username:  user.username,
        email : user.email
    }, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

    const response= NextResponse.json({
        message: "Logged in Successfully",
        success: true
    })

    response.cookies.set("token", token, {httpOnly: true})

    return response;


    
 } catch (error : any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
