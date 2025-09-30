// seguindo estrutura do backend
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  birthDate: string | Date;
  message: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export interface UseLeadsParams {
  page?: number;
  limit?: number;
  search?: string;
}
export interface ApiResponse {
  success: boolean;
  data: {
    leads: Lead[];
    total: number;
    page: number;
    totalPages: number;
  };
}
