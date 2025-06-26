import { getClientIP } from '@/lib/rate-limit';

// Mock Vercel KV
jest.mock('@vercel/kv', () => ({
  kv: {
    incr: jest.fn(),
    expire: jest.fn(),
    get: jest.fn(),
  }
}));

describe('Rate Limit Service', () => {
  describe('getClientIP', () => {
    const createMockRequest = (headers: Record<string, string>): Request => {
      const mockHeaders = new Headers();
      Object.entries(headers).forEach(([key, value]) => {
        mockHeaders.set(key, value);
      });
      
      return {
        headers: mockHeaders,
      } as Request;
    };

    it('应该优先使用 x-vercel-forwarded-for 头', () => {
      const request = createMockRequest({
        'x-vercel-forwarded-for': '192.168.1.1',
        'x-forwarded-for': '10.0.0.1',
        'x-real-ip': '172.16.0.1'
      });

      expect(getClientIP(request)).toBe('192.168.1.1');
    });

    it('应该在 vercel 头不存在时使用 x-forwarded-for', () => {
      const request = createMockRequest({
        'x-forwarded-for': '10.0.0.1, 192.168.1.1',
        'x-real-ip': '172.16.0.1'
      });

      expect(getClientIP(request)).toBe('10.0.0.1');
    });

    it('应该处理逗号分隔的IP列表，取第一个', () => {
      const request = createMockRequest({
        'x-forwarded-for': '10.0.0.1, 192.168.1.1, 172.16.0.1'
      });

      expect(getClientIP(request)).toBe('10.0.0.1');
    });

    it('应该跳过无效的IP地址', () => {
      const request = createMockRequest({
        'x-forwarded-for': 'invalid-ip',
        'x-real-ip': '192.168.1.1'
      });

      expect(getClientIP(request)).toBe('192.168.1.1');
    });

    it('应该在所有头都无效时返回 anonymous', () => {
      const request = createMockRequest({
        'x-forwarded-for': 'invalid-ip',
        'x-real-ip': 'also-invalid'
      });

      expect(getClientIP(request)).toBe('anonymous');
    });

    it('应该在没有任何IP头时返回 anonymous', () => {
      const request = createMockRequest({});
      expect(getClientIP(request)).toBe('anonymous');
    });

    it('应该正确验证IPv4地址', () => {
      const request = createMockRequest({
        'x-forwarded-for': '192.168.1.1'
      });

      expect(getClientIP(request)).toBe('192.168.1.1');
    });

    it('应该正确处理IPv6地址', () => {
      const request = createMockRequest({
        'x-forwarded-for': '2001:db8::1'
      });

      expect(getClientIP(request)).toBe('2001:db8::1');
    });

    it('应该处理CF代理的IP头', () => {
      const request = createMockRequest({
        'cf-connecting-ip': '203.0.113.1',
        'x-forwarded-for': '10.0.0.1'
      });

      expect(getClientIP(request)).toBe('203.0.113.1');
    });

    it('应该去除IP地址周围的空格', () => {
      const request = createMockRequest({
        'x-forwarded-for': '  192.168.1.1  , 10.0.0.1  '
      });

      expect(getClientIP(request)).toBe('192.168.1.1');
    });
  });
});