import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body;
    if (!userData?.email || !userData?.password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );
    }
    //check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;
    const newUser = await User.create(userData);
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
