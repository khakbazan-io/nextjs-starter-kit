import { connectDatabase } from "@/core/config";
import { signinOtpController } from "@/server/models/user";
import { makeError } from "@/server/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDatabase();

    const body = await request.json();

    const otp = await signinOtpController({ phone: body?.phone });

    return NextResponse.json({ ...otp }, { status: 200 });
  } catch (error) {
    return NextResponse.json(makeError(error));
  }
}
