import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

// =================== 接口定义 ===================
interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, any>;
  data?: any;
}

// =================== 全局 loading 状态 ===================
let loadingCount = 0;

const showLoading = () => {
  if (loadingCount === 0) {
    console.log('显示全局 loading...');
  }
  loadingCount++;
};

const hideLoading = () => {
  loadingCount--;
  if (loadingCount <= 0) {
    console.log('隐藏全局 loading');
  }
};

// =================== 获取 token 和权限校验 ===================
const getToken = (): string | null => localStorage.getItem('token');

const handleUnauthorized = (status: number): void => {
  if (status === 401) {
    console.warn('未授权，请重新登录');
    // 跳转到登录页
    window.location.href = '/login';
  } else if (status === 403) {
    console.warn('无权限访问此资源');
  }
};

// =================== 创建请求实例 ===================
const createRequest = (baseURL: string = ''): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000
  });

  // 设置自动重试：最多重试 3 次
  axiosRetry(instance, {
    retries: 3,
    retryCondition: (error) => {
      return (
        error.code === 'ECONNABORTED' ||
        error.response?.status === 503 ||
        error.response?.status === 500 ||
        axiosRetry.isNetworkError(error)
      );
    },
    retryDelay: (retryCount) => {
      return retryCount * 1000; // 每次延迟递增
    }
  });

  // =================== 请求拦截器 ===================
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      showLoading();

      // 注入 token 到 headers
      const token = getToken();
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      // 可扩展的 beforeEach 钩子
      if (requestInterceptor.beforeEach) {
        requestInterceptor.beforeEach(config);
      }

      return config;
    },
    (error) => {
      hideLoading();
      return Promise.reject(error);
    }
  );

  // =================== 响应拦截器 ===================
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      hideLoading();

      // 可扩展的 afterEach 钩子
      if (responseInterceptor.afterEach) {
        responseInterceptor.afterEach(response);
      }

      return response;
    },
    (error) => {
      hideLoading();

      // 统一处理权限问题
      if (error.response) {
        const status = error.response.status;
        handleUnauthorized(status);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// =================== 可扩展的拦截器接口 ===================
const requestInterceptor = {
  beforeEach: (config: InternalAxiosRequestConfig) => {
    console.log('Before Request:', config.url);
  }
};

const responseInterceptor = {
  afterEach: <T>(response: AxiosResponse<T>) => {
    console.log('After Response:', response.data);
  }
};

// =================== 导出通用请求函数 ===================
const request = createRequest(import.meta.env.VITE_API_BASE_URL || '');

export default <T>(options: RequestOptions): Promise<T> => {
  return request({
    url: options.url,
    method: options.method,
    params: options.params,
    data: options.data
  }).then((res) => res.data as T);
};
