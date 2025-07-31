import { GitHubDashboard } from "@/components/github-dashboard";
import { GitHubRepoList } from "@/components/github-repo";
import { fetchGitHubStats } from "@/lib/github";

// Revalidate the page every hour
export const revalidate = 3600;

export default async function Home() {
  // Direct function call instead of API fetch for build-time data fetching
  const stats = await fetchGitHubStats();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-100">
                Developer Dashboard
              </h1>
            </div>
            <div className="text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Section Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              GitHub Analytics
            </h2>
            <p className="text-muted-foreground">
              Comprehensive overview of your GitHub activity and contributions
            </p>
          </div>
          {/* GitHub Dashboard */}
          <GitHubDashboard stats={stats} />
          {/* GitHub Repositories List */}
          <GitHubRepoList repositories={stats.repositories.nodes} />
        </div>
      </main>
    </div>
  );
}
