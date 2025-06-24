/**
 * 祝福语生成选项接口
 * 支持两种模式：经典模板模式和智能描述模式
 */
export interface BlessingOptions {
  // 经典模板模式选项（保留向后兼容）
  scenario: string;        // 场景类型（如生日、结婚等）
  festival: string;        // 节日类型（如春节、中秋等）
  targetPerson: string;    // 目标人群（如朋友、家人等）
  style?: string;          // 祝福语风格（如温馨、正式等）
  
  // 智能描述模式选项
  customDescription?: string;  // 用户自由描述（包含所有场景信息）
  useSmartMode?: boolean;     // 是否启用智能模式
}

/**
 * 生成祝福语函数
 * 通过 API 调用后端服务生成个性化祝福语
 * @param options - 祝福语生成选项，包含场景、风格等信息
 * @returns Promise<string> - 返回生成的祝福语文本
 * @throws Error - 当 API 调用失败或网络错误时抛出异常
 */
export async function generateBlessing(options: BlessingOptions): Promise<string> {
  try {
    // 发送 POST 请求到后端 API
    const response = await fetch('/api/blessing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    // 检查响应状态
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '生成祝福语失败');
    }

    // 解析响应数据并返回祝福语
    const data = await response.json();
    return data.blessing;
  } catch (error) {
    // 记录错误信息并重新抛出
    console.error('API调用失败:', error);
    throw error instanceof Error ? error : new Error('生成祝福语失败，请稍后重试');
  }
}