import { NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export async function POST() {
  try {
    const apiPath = path.join(process.cwd(), '..', 'api', 'app.py')
    const pythonProcess = spawn('python', [apiPath], {
      detached: true,
      stdio: 'ignore'
    });

    pythonProcess.unref();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to start Python server:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
