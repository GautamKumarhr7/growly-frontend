import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  campaignService,
  adCreativeService,
  type Campaign,
  type AdCreative,
  type GenerateCreativeRequest,
} from "../../services/adCreativeServices";
import Button from "../../components/buttons/Button";
import Input from "../../components/forms/Input";
import "./AdCreativeGenerator.css";

interface AdCreativeGeneratorProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdCreativeGenerator({
  setIsAuthenticated,
}: AdCreativeGeneratorProps) {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [creatives, setCreatives] = useState<AdCreative[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Campaign form state
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    platform: "meta" as "meta" | "google",
    objective: "",
  });

  // Creative generation form state
  const [showCreativeForm, setShowCreativeForm] = useState(false);
  const [creativeForm, setCreativeForm] = useState({
    targetAudience: "",
    businessType: "",
    productService: "",
    callToAction: "",
  });

  // Load campaigns on component mount
  useEffect(() => {
    loadCampaigns();
  }, []);

  // Load creatives when campaign is selected
  useEffect(() => {
    if (selectedCampaign?.id) {
      loadCreatives(selectedCampaign.id);
    }
  }, [selectedCampaign]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const data = await campaignService.getCampaigns();
      console.log("Campaigns data received:", data);
      // Ensure data is an array
      const campaignsArray = Array.isArray(data) ? data : [];
      console.log("Campaigns array:", campaignsArray);
      setCampaigns(campaignsArray);
    } catch (error) {
      console.error("Error loading campaigns:", error);
      setMessage("Failed to load campaigns");
      setMessageType("error");
      // Ensure campaigns is always an array even on error
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCreatives = async (campaignId: string) => {
    try {
      setLoading(true);
      const data = await adCreativeService.getCreatives(campaignId);
      console.log("Creatives data received:", data);
      // Ensure data is an array
      const creativesArray = Array.isArray(data) ? data : [];
      console.log("Creatives array:", creativesArray);
      setCreatives(creativesArray);
    } catch (error) {
      console.error("Error loading creatives:", error);
      setMessage("Failed to load ad creatives");
      setMessageType("error");

      setCreatives([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Creating campaign with data:", campaignForm);
      const newCampaign = await campaignService.createCampaign(campaignForm);
      console.log("Campaign created successfully:", newCampaign);
      setCampaigns([...campaigns, newCampaign]);
      setCampaignForm({ name: "", platform: "meta", objective: "" });
      setShowCampaignForm(false);
      setMessage("Campaign created successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error creating campaign:", error);
      setMessage("Failed to create campaign");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCreative = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign?.id) {
      setMessage("Please select a campaign first");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const request: GenerateCreativeRequest = {
        campaignId: selectedCampaign.id,
        platform: selectedCampaign.platform,
        ...creativeForm,
      };

      const newCreative = await adCreativeService.generateCreative(request);
      setCreatives([...creatives, newCreative]);
      setCreativeForm({
        targetAudience: "",
        businessType: "",
        productService: "",
        callToAction: "",
      });
      setShowCreativeForm(false);
      setMessage("Ad creative generated successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error generating creative:", error);
      setMessage("Failed to generate ad creative");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const handleExportCreative = async (
    creativeId: string,
    platform: "meta" | "google"
  ) => {
    try {
      const exportData = await adCreativeService.exportCreative(
        creativeId,
        platform
      );
      // Create download link for export data
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ad-creative-${platform}-${creativeId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting creative:", error);
      setMessage("Failed to export creative");
      setMessageType("error");
    }
  };

  return (
    <div className="ad-creative-generator">
      <header className="header">
        <h1>🎯 Ad Creative Generator</h1>
        <div className="header-actions">
          <Button text="Dashboard" onClick={() => navigate("/")} />
          <Button text="Logout" onClick={handleLogout} />
        </div>
      </header>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}

      <div className="main-content">
        {/* Campaigns Section */}
        <div className="campaigns-section">
          <div className="section-header">
            <h2>📋 Campaigns</h2>
            <Button
              text="+ New Campaign"
              onClick={() => setShowCampaignForm(!showCampaignForm)}
            />
          </div>

          {showCampaignForm && (
            <form onSubmit={handleCreateCampaign} className="campaign-form">
              <Input
                label="Campaign Name"
                type="text"
                name="name"
                value={campaignForm.name}
                onChange={(e) =>
                  setCampaignForm({ ...campaignForm, name: e.target.value })
                }
                required
              />
              <div className="input-group">
                <label>Platform</label>
                <select
                  name="platform"
                  value={campaignForm.platform}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      platform: e.target.value as "meta" | "google",
                    })
                  }
                >
                  <option value="meta">Meta Ads</option>
                  <option value="google">Google Ads</option>
                </select>
              </div>
              <Input
                label="Objective"
                type="text"
                name="objective"
                value={campaignForm.objective}
                onChange={(e) =>
                  setCampaignForm({
                    ...campaignForm,
                    objective: e.target.value,
                  })
                }
                required
              />
              <Button
                type="submit"
                text={loading ? "Creating..." : "Create Campaign"}
              />
            </form>
          )}

          <div className="campaigns-list">
            {Array.isArray(campaigns) &&
              campaigns.map((campaign, index) => {
                const key =
                  campaign?.id ||
                  campaign?.name ||
                  `campaign-${index}-${Date.now()}`;
                return (
                  <div
                    key={key}
                    className={`campaign-card ${
                      selectedCampaign?.id === campaign?.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <h3>{campaign?.name || "Unnamed Campaign"}</h3>
                    <p>
                      <strong>Platform:</strong>{" "}
                      {campaign?.platform === "meta"
                        ? "Meta Ads"
                        : "Google Ads"}
                    </p>
                    <p>
                      <strong>Objective:</strong>{" "}
                      {campaign?.objective || "No objective"}
                    </p>
                    <p>
                      <strong>Created:</strong>{" "}
                      {campaign?.createdAt
                        ? new Date(campaign.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Ad Creatives Section */}
        <div className="creatives-section">
          <div className="section-header">
            <h2>🎨 Ad Creatives</h2>
            {selectedCampaign && (
              <Button
                text="+ Generate Creative"
                onClick={() => setShowCreativeForm(!showCreativeForm)}
              />
            )}
          </div>

          {!selectedCampaign && (
            <div className="no-selection">
              <p>Select a campaign to view and generate ad creatives</p>
            </div>
          )}

          {selectedCampaign && showCreativeForm && (
            <form onSubmit={handleGenerateCreative} className="creative-form">
              <Input
                label="Target Audience"
                type="text"
                name="targetAudience"
                value={creativeForm.targetAudience}
                onChange={(e) =>
                  setCreativeForm({
                    ...creativeForm,
                    targetAudience: e.target.value,
                  })
                }
                placeholder="e.g., Small business owners, 25-45 years old"
                required
              />
              <Input
                label="Business Type"
                type="text"
                name="businessType"
                value={creativeForm.businessType}
                onChange={(e) =>
                  setCreativeForm({
                    ...creativeForm,
                    businessType: e.target.value,
                  })
                }
                placeholder="e.g., E-commerce, SaaS, Restaurant"
                required
              />
              <Input
                label="Product/Service"
                type="text"
                name="productService"
                value={creativeForm.productService}
                onChange={(e) =>
                  setCreativeForm({
                    ...creativeForm,
                    productService: e.target.value,
                  })
                }
                placeholder="e.g., Marketing automation tool"
                required
              />
              <Input
                label="Call to Action"
                type="text"
                name="callToAction"
                value={creativeForm.callToAction}
                onChange={(e) =>
                  setCreativeForm({
                    ...creativeForm,
                    callToAction: e.target.value,
                  })
                }
                placeholder="e.g., Get Started, Learn More, Shop Now"
                required
              />
              <Button
                type="submit"
                text={loading ? "Generating..." : "Generate Creative"}
              />
            </form>
          )}

          <div className="creatives-list">
            {Array.isArray(creatives) &&
              creatives.map((creative, index) => {
                const key =
                  creative?.id ||
                  creative?.headline ||
                  `creative-${index}-${Date.now()}`;
                return (
                  <div key={key} className="creative-card">
                    <div className="creative-image">
                      <img src={creative?.imageUrl || ""} alt="Ad Creative" />
                    </div>
                    <div className="creative-content">
                      <h3>{creative?.headline || "No headline"}</h3>
                      <p>{creative?.description || "No description"}</p>
                      <div className="creative-meta">
                        <span>
                          <strong>CTA:</strong>{" "}
                          {creative?.callToAction || "No CTA"}
                        </span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          {creative?.platform === "meta" ? "Meta" : "Google"}
                        </span>
                      </div>
                      <div className="creative-actions">
                        <Button
                          text="Export Meta"
                          onClick={() =>
                            handleExportCreative(
                              creative?.id || `creative-${index}`,
                              "meta"
                            )
                          }
                        />
                        <Button
                          text="Export Google"
                          onClick={() =>
                            handleExportCreative(
                              creative?.id || `creative-${index}`,
                              "google"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
