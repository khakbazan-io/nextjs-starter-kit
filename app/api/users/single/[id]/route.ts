import { NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const dummyUser = {
  id: "1",
  name: "مهران",
  family: "ایرانی",
  phone: "09121234567",
};

export async function GET(request: Request) {
  try {
    await delay(2000);

    return NextResponse.json({ data: dummyUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
