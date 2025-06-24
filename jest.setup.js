import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock window.navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
})

// Mock fetch
global.fetch = jest.fn()

// Mock Web APIs for Next.js API routes
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Request and Response for Next.js API testing
global.Request = class Request {
  constructor(input, init = {}) {
    this.url = typeof input === 'string' ? input : input.url
    this.method = init.method || 'GET'
    this.headers = new Headers(init.headers)
    this.body = init.body
  }
  
  async json() {
    return JSON.parse(this.body || '{}')
  }
}

global.Response = class Response {
  constructor(body, init = {}) {
    this.body = body
    this.status = init.status || 200
    this.statusText = init.statusText || 'OK'
    this.headers = new Headers(init.headers)
  }
  
  json() {
    return Promise.resolve(JSON.parse(this.body))
  }
}

global.Headers = class Headers {
  constructor(init = {}) {
    this._headers = {}
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this._headers[key.toLowerCase()] = value
      })
    }
  }
  
  get(name) {
    return this._headers[name.toLowerCase()]
  }
  
  set(name, value) {
    this._headers[name.toLowerCase()] = value
  }
}

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data, init = {}) => {
      return new global.Response(JSON.stringify(data), {
        status: init.status || 200,
        headers: {
          'Content-Type': 'application/json',
          ...init.headers
        }
      })
    }
  },
  NextRequest: global.Request
}))

// Mock console.error to avoid noise in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})