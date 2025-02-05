import { spawn } from 'child_process';

export async function startServer(): Promise<boolean> {
  try {
    const response = await fetch('/api/server', {
      method: 'POST',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Failed to start Python server:', error);
    return false;
  }
}

export async function stopServer(): Promise<boolean> {
  try {
    const response = await fetch('/api/server/stop', {
      method: 'POST',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Failed to stop Python server:', error);
    return false;
  }
}