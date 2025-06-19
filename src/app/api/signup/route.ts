import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request){
  try{
    const body = await req.json();
    const { name, username, email, bio, github, linkedin, skills, interests } = body;
    const newUser = await prisma.user.create({
      data: {
        name, 
        username, 
        email, 
        bio, 
        github, 
        linkedin, 
        skills, 
        interests
      },
    });
    return NextResponse.json({succcess: true, user: newUser});

  }catch(error){
    console.log("Signup error", error);
    return NextResponse.json({success:false, error:"Signup Failed"}, {status: 500});
  }
}