export interface BlessingOptions {
  // 快速模板选项（保留向后兼容）
  scenario: string;
  festival: string;
  targetPerson: string;
  style?: string;
  
  // 新增：智能描述模式
  customDescription?: string;  // 用户自由描述（包含所有信息）
  useSmartMode?: boolean;     // 是否启用智能模式
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