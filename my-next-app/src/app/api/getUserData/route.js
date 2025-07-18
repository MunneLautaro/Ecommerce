import { NextResponse } from "next/server";
import { connectWithSSH } from "../../../dbMongo";
import User from "../../../models/userModel";

export async function POST(request) {
  try {
    await connectWithSSH();
    const r = await request.json();
    const { user } = r;
    const userData = await User.findOne({ user });
    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "The user does not exist" },
      { status: 404 }
    );
  }
}
