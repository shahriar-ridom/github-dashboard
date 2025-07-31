"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  GitFork,
  FileText,
  GitPullRequest,
  Activity,
  Code,
  Calendar,
} from "lucide-react";

interface GitHubStats {
  name: string;
  login: string;
  avatarUrl: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: {
    totalCount: number;
    nodes?: Array<{
      name: string;
      description?: string;
      url: string;
      forkCount: number;
      updatedAt: string;
      createdAt: string;
      primaryLanguage?: {
        name: string;
        color: string;
      };
      languages: {
        edges: Array<{
          size: number;
          node: {
            name: string;
            color: string;
          };
        }>;
      };
    }>;
  };
  gists: { totalCount: number };
  pullRequests: { totalCount: number };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
    };
  };
  topLanguages?: Array<{
    name: string;
    color: string;
    size: number;
  }>;
}

interface GitHubDashboardProps {
  stats: GitHubStats;
}

export function GitHubDashboard({ stats }: GitHubDashboardProps) {
  const statsCards = [
    {
      title: "Followers",
      value: stats.followers.totalCount,
      icon: Users,
      description: "People following you",
    },
    {
      title: "Following",
      value: stats.following.totalCount,
      icon: Users,
      description: "People you follow",
    },
    {
      title: "Repositories",
      value: stats.repositories.totalCount,
      icon: GitFork,
      description: "Public repositories",
    },
    {
      title: "Gists",
      value: stats.gists.totalCount,
      icon: FileText,
      description: "Code snippets",
    },
    {
      title: "Pull Requests",
      value: stats.pullRequests.totalCount,
      icon: GitPullRequest,
      description: "Total contributions",
    },
    {
      title: "Contributions",
      value:
        stats.contributionsCollection.contributionCalendar.totalContributions,
      icon: Activity,
      description: "This year",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-2 ring-blue-500/20 ring-offset-2 ring-offset-slate-900">
              <AvatarImage src={stats.avatarUrl} alt={stats.name} />
              <AvatarFallback className="text-lg font-semibold bg-slate-700 text-slate-100">
                {stats.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-400 rounded-full border-2 border-slate-900 flex items-center justify-center shadow-lg">
              <div className="h-2 w-2 bg-slate-900 rounded-full" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">
              {stats.name}
            </h1>
            <p className="text-slate-400 text-lg">@{stats.login}</p>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              <span>Active GitHub Developer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] border-slate-700/50 bg-slate-800/50 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-400">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight text-slate-100">
                  {stat.value.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Programming Languages */}
      <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-slate-400" />
            <CardTitle className="text-slate-100">
              Top Programming Languages
            </CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Languages used across your repositories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.topLanguages && stats.topLanguages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.topLanguages.map((language, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-700/40 hover:border-slate-600/60 transition-colors bg-slate-900/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full shadow-lg"
                        style={{ backgroundColor: language.color }}
                      />
                      <span className="font-medium text-slate-200">
                        {language.name}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="font-mono bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                    >
                      {language.size}%
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Language Bar Chart */}
              <Separator className="bg-slate-700/50" />
              <div className="space-y-2">
                <p className="text-sm text-slate-400">Usage Distribution</p>
                <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-700/50">
                  {stats.topLanguages.map((language, index) => (
                    <div
                      key={index}
                      className="h-full"
                      style={{
                        backgroundColor: language.color,
                        width: `${language.size}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-slate-400 text-sm">
                {stats.topLanguages === undefined
                  ? "Loading language data..."
                  : "No language data available"}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Debug: topLanguages = {JSON.stringify(stats.topLanguages)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-slate-400" />
            <CardTitle className="text-slate-100">Activity Summary</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Your GitHub activity at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
              <div className="text-2xl font-bold text-blue-400">
                {(
                  stats.pullRequests.totalCount /
                    stats.repositories.totalCount || 0
                ).toFixed(1)}
              </div>
              <div className="text-xs text-slate-500 mt-1">PRs per repo</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
              <div className="text-2xl font-bold text-green-400">
                {(
                  stats.contributionsCollection.contributionCalendar
                    .totalContributions / 365 || 0
                ).toFixed(1)}
              </div>
              <div className="text-xs text-slate-500 mt-1">Daily avg</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
              <div className="text-2xl font-bold text-purple-400">
                {(
                  stats.followers.totalCount / stats.following.totalCount || 0
                ).toFixed(1)}
              </div>
              <div className="text-xs text-slate-500 mt-1">Follow ratio</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
              <div className="text-2xl font-bold text-orange-400">
                {stats.gists.totalCount > 0 ? "🔥" : "💤"}
              </div>
              <div className="text-xs text-slate-500 mt-1">Gist activity</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
