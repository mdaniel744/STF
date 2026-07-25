import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;
const hasBase44Config = Boolean(appId);

function createLocalConfigError(action) {
  const error = new Error(`Base44 app id is not configured; cannot ${action} in local mode.`);
  error.status = 503;
  return error;
}

const localEntity = {
  list: async () => [],
  filter: async () => [],
  create: async () => {
    throw createLocalConfigError("create records");
  },
  update: async () => {
    throw createLocalConfigError("update records");
  },
  delete: async () => {
    throw createLocalConfigError("delete records");
  },
};

const localBase44 = {
  entities: new Proxy({}, { get: () => localEntity }),
  functions: {
    invoke: async () => {
      throw createLocalConfigError("invoke functions");
    },
  },
  integrations: {
    Core: {
      SendEmail: async () => {
        throw createLocalConfigError("send email");
      },
    },
  },
  auth: {
    me: async () => {
      throw createLocalConfigError("load the current user");
    },
    loginViaEmailPassword: async () => {
      throw createLocalConfigError("log in");
    },
    loginWithProvider: () => {
      throw createLocalConfigError("log in with a provider");
    },
    register: async () => {
      throw createLocalConfigError("register");
    },
    verifyOtp: async () => {
      throw createLocalConfigError("verify an account");
    },
    resendOtp: async () => {
      throw createLocalConfigError("resend an OTP");
    },
    resetPasswordRequest: async () => {},
    resetPassword: async () => {
      throw createLocalConfigError("reset a password");
    },
    setToken: () => {},
    logout: () => {},
    redirectToLogin: (returnTo) => {
      if (typeof window !== "undefined") {
        window.location.href = `/login${returnTo ? `?from=${encodeURIComponent(returnTo)}` : ""}`;
      }
    },
  },
};

//Create a client with authentication required
export const base44 = hasBase44Config ? createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
}) : localBase44;
