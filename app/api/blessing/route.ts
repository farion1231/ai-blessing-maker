import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generateBlessing } from "@/lib/ai-service";
import { createBlessingPrompt } from "@/lib/prompt-templates";

interface BlessingRequest {
  scenario: string;
  festival: string;
  targetPerson: string;
  style?: string;
  customDescription?: string;
  useSmartMode?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body: BlessingRequest = await req.json();
    const prompt = createBlessingPrompt(body);
    const blessing = await generateBlessing(prompt);

    return NextResponse.json({ blessing });
  } catch (error) {
    console.error("生成祝福语失败:", error);

    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.error?.message || error.message || "生成祝福语失败，请稍后重试"
      : error instanceof Error 
        ? error.message 
        : "生成祝福语失败，请稍后重试";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
