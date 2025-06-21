export interface BlessingOptions {
  scenario: string;
  festival: string;
  targetPerson: string;
  style?: string;
}

export async function generateBlessing(options: BlessingOptions): Promise<string> {
  try {
    const response = await fetch('/api/blessing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '生成祝福语失败');
    }

    const data = await response.json();
    return data.blessing;
  } catch (error) {
    console.error('API调用失败:', error);
    throw error instanceof Error ? error : new Error('生成祝福语失败，请稍后重试');
  }
}