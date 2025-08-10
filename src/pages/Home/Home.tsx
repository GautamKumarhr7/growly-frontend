import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import "./Home.css";

interface HomeProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Home({ setIsAuthenticated }: HomeProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>🚀 Growly Dashboard</h1>
        <Button text="Logout" onClick={handleLogout} />
      </header>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome to Growly!</h2>
          <p>
            Your AI-powered ad creative generation platform for small
            businesses.
          </p>
        </div>

        <div className="features-grid">
          <div
            className="feature-card"
            onClick={() => navigate("/ad-creatives")}
          >
            <div className="feature-icon">🎯</div>
            <h3>Ad Creative Generator</h3>
            <p>
              Create compelling ad creatives for Meta and Google Ads using AI
            </p>
            <div className="feature-stats">
              <span>• Generate headlines & descriptions</span>
              <span>• AI-powered image generation</span>
              <span>• Platform-specific optimization</span>
            </div>
          </div>

          <div className="feature-card coming-soon">
            <div className="feature-icon">📊</div>
            <h3>Campaign Analytics</h3>
            <p>Track performance and optimize your ad campaigns</p>
            <div className="feature-stats">
              <span>• Performance metrics</span>
              <span>• A/B testing results</span>
              <span>• ROI tracking</span>
            </div>
            <div className="coming-soon-badge">Coming Soon</div>
          </div>

          <div className="feature-card coming-soon">
            <div className="feature-icon">🎨</div>
            <h3>Creative Templates</h3>
            <p>Pre-built templates for different industries and ad types</p>
            <div className="feature-stats">
              <span>• Industry-specific templates</span>
              <span>• Seasonal campaigns</span>
              <span>• Brand customization</span>
            </div>
            <div className="coming-soon-badge">Coming Soon</div>
          </div>

          <div className="feature-card coming-soon">
            <div className="feature-icon">📱</div>
            <h3>Multi-Platform Export</h3>
            <p>Export your creatives directly to advertising platforms</p>
            <div className="feature-stats">
              <span>• Direct platform integration</span>
              <span>• Bulk export options</span>
              <span>• Format optimization</span>
            </div>
            <div className="coming-soon-badge">Coming Soon</div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Button
              text="Create New Campaign"
              onClick={() => navigate("/ad-creatives")}
            />
            <Button
              text="View Recent Creatives"
              onClick={() => navigate("/ad-creatives")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
