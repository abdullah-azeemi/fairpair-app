import { NextResponse } from "next/server";
import {prisma} from '../../../lib/prisma';

export async function GET(){

  // supoosition
  const userId = 'cmc4n4nhy00005amoidqqlvft';
  const user = await prisma.user.findUnique({
    where:{ id: userId},
    select:{
      id:true,
      name:true,
      username:true,
      bio:true,
      skills:true,
      interests:true,
      github:true,
      linkedin:true,
      email:true,
      createdAt:true,
    },
  });
  if(!user){
    console.log("User not Found");
    return NextResponse.json({error: 'User not found'}, {status: 404})
  }
  return NextResponse.json(user);

}