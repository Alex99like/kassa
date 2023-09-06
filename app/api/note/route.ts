import { NextResponse } from "next/server";
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  res: Response
) {
  try {
    const notes = await db.transaction.findMany({
      orderBy: {
        date: 'asc'
      }
    })
    
    return NextResponse.json({ notes });
  } catch (error) {
    console.log("CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }  
}

export async function POST(
  req: Request,
  res: Response
) {
  try {
    const { note } = await req.json()
    
    const res = await db.transaction.create({
      data: note
    })

    return NextResponse.json({ res });
  } catch (error) {
    console.log("CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }  
}