interface APIError {
  message: string;
  error: boolean;
  statusCode: number;
}

interface APIErrorResponse extends Error {
  data?: APIError | APIError[];
  status?: number;
  statusText?: string;
}

type Request = Omit<RequestInit, "method">;

export class API {
  private url_base: string;
  private jwt: string | null = null;

  constructor() {
    this.url_base = import.meta.env.VITE_API_BASE_URL;
  }

  createSession(token: string) {
    this.jwt = token;

    return;
  }

  get<T>(
    endpoint: string,
    options?: Request & { params?: Record<string, unknown> },
  ) {
    return this.api<T>("GET", endpoint, options);
  }

  post<T>(endpoint: string, options?: Request) {
    return this.api<T>("POST", endpoint, options);
  }

  put<T>(endpoint: string, options?: Request) {
    return this.api<T>("PUT", endpoint, options);
  }

  patch<T>(endpoint: string, options?: Request) {
    return this.api<T>("PATCH", endpoint, options);
  }

  delete<T>(endpoint: string, options?: Request) {
    return this.api<T>("DELETE", endpoint, options);
  }

  private async api<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    endpoint: string,
    options?: Request & { params?: Record<string, unknown> },
  ): Promise<T> {
    let url = `${this.url_base}${endpoint}`;
    const { params, ...fetchOptions } = options ?? {};

    // Add query params
    if (params && method === "GET") {
      const searchParams = new URLSearchParams(
        params as Record<string, string>,
      ).toString();
      url += `?${searchParams}`;
    }

    const response = await fetch(url, {
      method,
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${this.jwt}`,
        ...(fetchOptions.headers ?? {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error: APIErrorResponse = new Error(
        data.message || "Ocorreu um erro na requisição à API.",
      );
      error.data = data;
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    return data as T;
  }
}
