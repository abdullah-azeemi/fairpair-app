import { NextResponse } from "next/server";
import {prisma} from "../../../../lib/prisma";

export async function GET(){

  const userId = "cmc4n4nhy00005amoidqqlvft";

  const projects = await prisma.project.findMany({
    where: {authorId: userId},
    select:{
      id:true,
      title:true,
      description:true,
      skillsNeeded:true,
      createdAt:true,
      status:true,
    },
    orderBy: {createdAt: 'desc'}
  });

  if (!projects){
    return NextResponse.json({message: "Projects not Found"}, {status: 404});
  }

  const mapped = projects.map((p:any) => ({
    id: p.id,
    title:p.title,
    description:p.description,
    skills:p.skills,
    createdAt: new Date(p.createdAt).toLocaleDateString(),
    views: Math.floor(Math.random() * 100),
    collaborators: Math.floor(Math.random() * 5),
    status: p.status,
  }));
  return NextResponse.json(mapped);

}