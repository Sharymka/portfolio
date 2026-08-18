import { describe, expect, it, vi, beforeEach } from 'vitest';

const streamTextMock = vi.fn();
const limitMock = vi.fn();

vi.mock('ai', () => ({
  streamText: (...args: unknown[]) => streamTextMock(...args),
  convertToModelMessages: async (messages: unknown) => messages,
}));

vi.mock('@ai-sdk/google', () => ({
  google: vi.fn((modelId: string) => ({ modelId })),
}));

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: class {
    static slidingWindow = vi.fn(() => 'sliding-window-config');
    limit = (...args: unknown[]) => limitMock(...args);
  },
}));

vi.mock('@upstash/redis', () => ({
  Redis: { fromEnv: vi.fn(() => ({})) },
}));

import { POST } from './route';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'x-forwarded-for': '1.2.3.4' },
  });
}

describe('POST /api/chat', () => {
  beforeEach(() => {
    streamTextMock.mockReset();
    limitMock.mockReset();
  });

  it('streams a response with the right system prompt language when under the rate limit', async () => {
    limitMock.mockResolvedValue({ success: true });
    const toUIMessageStreamResponse = vi.fn(() => new Response('ok'));
    streamTextMock.mockReturnValue({ toUIMessageStreamResponse });

    const request = makeRequest({
      messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'Привет' }] }],
      lang: 'ru',
    });

    const response = await POST(request);

    expect(limitMock).toHaveBeenCalledWith('1.2.3.4');
    expect(streamTextMock).toHaveBeenCalledTimes(1);
    const call = streamTextMock.mock.calls[0][0] as { system: string };
    expect(call.system).toMatch(/русском/);
    expect(toUIMessageStreamResponse).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Response);
  });

  it('returns 429 without calling the model when the rate limit is exceeded', async () => {
    limitMock.mockResolvedValue({ success: false });

    const request = makeRequest({
      messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'Привет' }] }],
      lang: 'ru',
    });

    const response = await POST(request);

    expect(response.status).toBe(429);
    expect(streamTextMock).not.toHaveBeenCalled();
  });

  it('returns 400 without calling the model when the last message is too long', async () => {
    limitMock.mockResolvedValue({ success: true });
    const longText = 'a'.repeat(501);

    const request = makeRequest({
      messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: longText }] }],
      lang: 'ru',
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(streamTextMock).not.toHaveBeenCalled();
  });

  it('returns 400 without calling the model when the body is malformed JSON', async () => {
    limitMock.mockResolvedValue({ success: true });

    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: '{not valid json',
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(streamTextMock).not.toHaveBeenCalled();
  });

  it('returns 400 without calling the model when messages is missing or not an array', async () => {
    limitMock.mockResolvedValue({ success: true });

    const request = makeRequest({ lang: 'ru' });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(streamTextMock).not.toHaveBeenCalled();
  });
});
