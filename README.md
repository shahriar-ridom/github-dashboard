# 🚀 GitHub Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-New_York-black?style=for-the-badge" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/GitHub_API-GraphQL-purple?style=for-the-badge&logo=github&logoColor=white" alt="GitHub API" />
</div>

<div align="center">
  <h3>🌟 A modern, beautiful, and feature-rich GitHub analytics dashboard built with Next.js</h3>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-demo">Demo</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-configuration">Configuration</a> •
    <a href="#-deployment">Deployment</a>
  </p>
</div>

---

## 📸 Screenshots

<!-- Add your screenshots here -->

> **Note:** Add screenshots of your dashboard here to showcase the beautiful dark theme and features

## ✨ Features

### 🎨 **Beautiful Dark Theme**

- **Modern Design**: Sleek dark theme with glassmorphism effects
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions for better UX
- **Eye-friendly**: Carefully chosen colors to reduce eye strain

### 📊 **Comprehensive Analytics**

- **User Statistics**: Followers, following, repositories, gists, and contributions
- **Language Analysis**: Top programming languages with visual bar charts
- **Activity Metrics**: Daily contribution averages and activity ratios
- **Real-time Data**: Live data fetching from GitHub's GraphQL API

### 📁 **Repository Management**

- **Repository Listing**: Display all your repositories with detailed information
- **Lazy Loading**: Smooth infinite scroll with automatic loading
- **Sorting**: Repositories sorted by last updated date
- **Rich Metadata**: Language indicators, fork counts, and timestamps

### 🚀 **Performance Optimized**

- **Server-Side Rendering**: Fast initial page loads with Next.js 15
- **Intersection Observer**: Efficient lazy loading implementation
- **GraphQL Integration**: Optimized data fetching with minimal requests
- **Type Safety**: Full TypeScript support for better development experience

## 🎯 Demo

🔗 **[Live Demo](https://your-dashboard-url.vercel.app)** _(Replace with your actual URL)_

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- GitHub Personal Access Token

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shahriar-ridom/github-dashboard.git
   cd github-dashboard
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your GitHub token to `.env.local`:

   ```env
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

4. **Update configuration**

   Edit `app/api/stats/route.ts` and change the username:

   ```typescript
   const USERNAME = "your-github-username"; // Replace with your GitHub username
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### GitHub Personal Access Token

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Select the following scopes:
   - `read:user` - Read user profile data
   - `read:org` - Read organization data
   - `repo` - Access repository data

### Customization

#### 🎨 **Theme Colors**

Modify the theme in `app/globals.css`:

```css
:root {
  --primary: your-primary-color;
  --secondary: your-secondary-color;
  /* ... */
}
```

#### 📊 **Repository Display**

Adjust lazy loading settings in `components/github-repo.tsx`:

```typescript
<GitHubRepoList
  repositories={stats.repositories.nodes}
  initialDisplayCount={10} // Initial repos to show
  loadMoreCount={5} // Repos to load per batch
/>
```

#### 🔢 **Language Limit**

Change the number of top languages in `app/api/stats/route.ts`:

```typescript
.slice(0, 8); // Show top 8 languages instead of 5
```

## 🏗️ Project Structure

```
github-dashboard/
├── 📁 app/
│   ├── 📁 api/stats/
│   │   └── 📄 route.ts          # GitHub API integration
│   ├── 📄 globals.css           # Global styles & theme
│   ├── 📄 layout.tsx            # Root layout
│   └── 📄 page.tsx              # Home page
├── 📁 components/
│   ├── 📁 ui/                   # shadcn/ui components
│   ├── 📄 github-dashboard.tsx  # Main dashboard component
│   └── 📄 github-repo.tsx       # Repository list component
├── 📁 lib/
│   └── 📄 utils.ts              # Utility functions
└── 📄 package.json
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**

   ```bash
   pnpm dlx vercel
   ```

2. **Add environment variables**

   - Go to your Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add `GITHUB_TOKEN` with your token value

3. **Deploy**
   ```bash
   pnpm dlx vercel --prod
   ```

### Other Platforms

The dashboard works on any platform that supports Next.js:

- **Netlify**: Use the `@netlify/plugin-nextjs`
- **Railway**: Connect your GitHub repo
- **AWS Amplify**: Deploy from GitHub
- **Self-hosted**: Build with `pnpm build` and serve the `out` directory

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible components
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[GitHub GraphQL API](https://docs.github.com/en/graphql)** - Data source
- **[date-fns](https://date-fns.org/)** - Date formatting and manipulation
- **[react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)** - Lazy loading implementation

## 📈 API Usage

The dashboard uses GitHub's GraphQL API to fetch:

- User profile information
- Repository data with languages
- Contribution statistics
- Follower/following counts
- Gist information

**Rate Limits**: GitHub allows 5000 requests per hour for authenticated requests.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Vercel](https://vercel.com/) for the deployment platform
- [GitHub](https://github.com/) for the comprehensive GraphQL API
- The open-source community for inspiration and tools

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/shahriar-ridom">Shahriar</a></p>

  <p>
    <a href="https://github.com/shahriar-ridom/github-dashboard/stargazers">⭐ Star this repo</a> if you found it helpful!
  </p>
</div>
