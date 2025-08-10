# 🎯 Growly - AI-Powered Ad Creative Generator

A modern SaaS platform that helps small businesses generate compelling ad creatives (images + text + headlines) using AI for Meta and Google Ads.

## ✨ Features

- **🤖 AI-Powered Generation**: Create headlines, descriptions, and images using advanced AI
- **📱 Multi-Platform Support**: Generate creatives optimized for Meta Ads and Google Ads
- **🎨 Campaign Management**: Organize and manage your advertising campaigns
- **📤 Export Functionality**: Export creatives in platform-specific formats
- **🔐 Secure Authentication**: JWT-based authentication system
- **📊 Modern Dashboard**: Beautiful, responsive interface

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express + MongoDB
- **AI Integration**: OpenAI GPT, DALL-E, Stable Diffusion
- **Authentication**: JWT tokens
- **Styling**: CSS3 with modern gradients and animations

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on `http://localhost:3002`

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd growly-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Usage

### 1. Authentication

- Register a new account or login with existing credentials
- JWT tokens are automatically managed for API requests

### 2. Campaign Management

- Create campaigns for Meta Ads or Google Ads
- Set campaign objectives and target platforms
- Organize your advertising efforts

### 3. AI Creative Generation

- Select a campaign to work with
- Provide target audience, business type, and product details
- Generate AI-powered headlines, descriptions, and images
- Customize call-to-action buttons

### 4. Export & Deploy

- Export creatives for Meta Ads platform
- Export creatives for Google Ads platform
- Download JSON files ready for platform integration

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── buttons/        # Button components
│   └── forms/          # Form components
├── pages/              # Page components
│   ├── login/          # Authentication pages
│   ├── Home/           # Dashboard
│   └── AdCreativeGenerator/  # Main feature
├── services/           # API services
│   ├── authServices.tsx      # Authentication
│   └── adCreativeServices.tsx # Ad creative API
└── routes.tsx          # Application routing
```

### API Integration

The frontend communicates with a backend API that provides:

- **Authentication endpoints**: `/login`, `/register`
- **Campaign management**: `/api/creatives/campaigns`
- **AI generation**: `/api/creatives/generate`
- **Export functionality**: `/api/creatives/export`

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: CSS animations and transitions for better UX
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔒 Security

- JWT token-based authentication
- Secure API communication
- Protected routes for authenticated users
- Automatic token refresh handling

## 🚧 Future Features

- [ ] Campaign Analytics Dashboard
- [ ] A/B Testing Tools
- [ ] Creative Templates Library
- [ ] Direct Platform Integration
- [ ] Performance Tracking
- [ ] Bulk Export Options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for small businesses looking to scale their advertising efforts with AI.**
