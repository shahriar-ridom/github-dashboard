"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitFork, Calendar, Clock, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Repository {
  id: string;
  name: string;
  url: string;
  description?: string;
  primaryLanguage?: {
    name: string;
    color: string;
  };
  forkCount: number;
  updatedAt: string;
  createdAt: string;
}

interface GitHubRepoListProps {
  repositories: Repository[];
  initialDisplayCount?: number;
  loadMoreCount?: number;
}

export function GitHubRepoList({
  repositories,
  initialDisplayCount = 5,
  loadMoreCount = 5,
}: GitHubRepoListProps) {
  const [displayedRepos, setDisplayedRepos] = useState<Repository[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Initialize with first batch
  useEffect(() => {
    const initial = repositories.slice(0, initialDisplayCount);
    setDisplayedRepos(initial);
    setHasMore(repositories.length > initialDisplayCount);
  }, [repositories, initialDisplayCount]);

  // Load more when intersection observer triggers
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMore();
    }
  }, [inView, hasMore, isLoading]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const currentLength = displayedRepos.length;
    const nextBatch = repositories.slice(
      currentLength,
      currentLength + loadMoreCount
    );

    setDisplayedRepos((prev) => [...prev, ...nextBatch]);
    setHasMore(currentLength + nextBatch.length < repositories.length);
    setIsLoading(false);
  };

  const loadMoreManually = () => {
    loadMore();
  };
  return (
    <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center space-x-2">
          <span>GitHub Repositories</span>
          <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
            {repositories.length}
          </Badge>
        </CardTitle>
        <CardDescription className="text-slate-400">
          Your public repositories and their details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedRepos.length > 0 ? (
            <>
              {displayedRepos.map((repo, index) => (
                <div
                  key={repo.id || index}
                  className="group p-4 rounded-lg border border-slate-700/40 hover:border-slate-600/60 transition-all duration-200 bg-slate-900/30 hover:bg-slate-900/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      {/* Repository Name and URL */}
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                          {repo.name}
                        </h3>
                        <Link
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>

                      {/* Description */}
                      {repo.description && (
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {repo.description}
                        </p>
                      )}

                      {/* Repository Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        {/* Primary Language */}
                        {repo.primaryLanguage && (
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: repo.primaryLanguage.color,
                              }}
                            />
                            <span className="text-slate-400">
                              {repo.primaryLanguage.name}
                            </span>
                          </div>
                        )}

                        {/* Fork Count */}
                        {repo.forkCount > 0 && (
                          <div className="flex items-center space-x-1">
                            <GitFork className="h-3 w-3" />
                            <span>{repo.forkCount}</span>
                          </div>
                        )}

                        {/* Updated At */}
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            Updated{" "}
                            {formatDistanceToNow(new Date(repo.updatedAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>

                        {/* Created At */}
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Created{" "}
                            {formatDistanceToNow(new Date(repo.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator and trigger */}
              {hasMore && (
                <div ref={ref} className="py-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-slate-400 mr-2" />
                      <span className="text-slate-400">
                        Loading more repositories...
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        onClick={loadMoreManually}
                        className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100"
                      >
                        Load More Repositories
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* End of results indicator */}
              {!hasMore && displayedRepos.length > initialDisplayCount && (
                <div className="text-center py-4">
                  <span className="text-slate-500 text-sm">
                    You've reached the end of your repositories
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-slate-400 text-sm">
                No repositories found
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
