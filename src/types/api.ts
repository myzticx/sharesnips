// types/api.ts
export type ApiResponse = {
  message: string;
  // Add other fields if your backend returns more data
};

// Optional: Error type
export type ApiError = {
  error: string;
};
