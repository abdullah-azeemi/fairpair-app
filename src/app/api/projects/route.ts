import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

export async function GET(){

  const projects = await prisma.project.findMany({
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
  return NextResponse.json(projects);
}