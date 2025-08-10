import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3002";

// Configure axios with auth token
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  console.log("Auth token:", token ? "Token exists" : "No token found");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization header set:", config.headers.Authorization);
  }
  return config;
});

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      headers: error.config?.headers,
    });

    // If 401, redirect to login
    if (error.response?.status === 401) {
      console.log("Unauthorized - redirecting to login");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Types
export interface Campaign {
  id?: string;
  name: string;
  platform: "meta" | "google";
  objective: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdCreative {
  id?: string;
  campaignId: string;
  platform: "meta" | "google";
  headline: string;
  description: string;
  imageUrl: string;
  callToAction: string;
  targetAudience: string;
  businessType: string;
  productService: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GenerateCreativeRequest {
  campaignId: string;
  platform: "meta" | "google";
  targetAudience: string;
  businessType: string;
  productService: string;
  callToAction: string;
}

// Campaign Services
export const campaignService = {
  // Get all campaigns
  async getCampaigns(): Promise<Campaign[]> {
    const response = await apiClient.get("/api/creatives/campaigns");
    return response.data;
  },

  // Create a new campaign
  async createCampaign(
    campaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">
  ): Promise<Campaign> {
    console.log("Sending campaign data to backend:", campaign);
    const response = await apiClient.post("/api/creatives/campaigns", campaign);
    console.log("Backend response:", response.data);
    return response.data;
  },

  // Get campaign by ID
  async getCampaign(id: string): Promise<Campaign> {
    const response = await apiClient.get(`/api/creatives/campaigns/${id}`);
    return response.data;
  },

  // Update campaign
  async updateCampaign(
    id: string,
    campaign: Partial<Campaign>
  ): Promise<Campaign> {
    const response = await apiClient.put(
      `/api/creatives/campaigns/${id}`,
      campaign
    );
    return response.data;
  },

  // Delete campaign
  async deleteCampaign(id: string): Promise<void> {
    await apiClient.delete(`/api/creatives/campaigns/${id}`);
  },
};

// Ad Creative Services
export const adCreativeService = {
  // Get all ad creatives for a campaign
  async getCreatives(campaignId: string): Promise<AdCreative[]> {
    const response = await apiClient.get(
      `/api/creatives/campaigns/${campaignId}/creatives`
    );
    return response.data;
  },

  // Generate new ad creative using AI
  async generateCreative(
    request: GenerateCreativeRequest
  ): Promise<AdCreative> {
    const response = await apiClient.post("/api/creatives/generate", request);
    return response.data;
  },

  // Get creative by ID
  async getCreative(id: string): Promise<AdCreative> {
    const response = await apiClient.get(`/api/creatives/${id}`);
    return response.data;
  },

  // Update creative
  async updateCreative(
    id: string,
    creative: Partial<AdCreative>
  ): Promise<AdCreative> {
    const response = await apiClient.put(`/api/creatives/${id}`, creative);
    return response.data;
  },

  // Delete creative
  async deleteCreative(id: string): Promise<void> {
    await apiClient.delete(`/api/creatives/${id}`);
  },

  // Export creative for platform
  async exportCreative(id: string, platform: "meta" | "google"): Promise<any> {
    const response = await apiClient.get(
      `/api/creatives/${id}/export/${platform}`
    );
    return response.data;
  },
};
