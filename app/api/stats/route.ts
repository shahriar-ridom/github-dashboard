import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = "shahriar-ridom";

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  };
  // GraphQL query to fetch user stats
  const body = {
    query: `
      query {
        user(login: "${USERNAME}"){
          name
          login
          avatarUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            nodes {
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
              name
              description
              url
              forkCount
              updatedAt
              createdAt
              primaryLanguage {
                name
                color
              }
            }
          }
          gists {
            totalCount
          }
          pullRequests {
            totalCount
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `,
  };

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });

    if (!response.ok) {
      // Log the error for debugging on the server
      console.error("GitHub API Error:", await response.text());
      return NextResponse.json(
        { error: "Error fetching from GitHub API" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Check for GraphQL-specific errors
    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return NextResponse.json(
        { error: "GraphQL query failed", details: data.errors },
        { status: 400 }
      );
    }

    // Process language data
    const languageMap = new Map();
    let totalSize = 0;

    console.log("Repository nodes:", data.data.user.repositories.nodes.length);

    data.data.user.repositories.nodes.forEach((repo: any) => {
      if (repo.languages && repo.languages.edges) {
        repo.languages.edges.forEach((edge: any) => {
          const { name, color } = edge.node;
          const size = edge.size;

          if (languageMap.has(name)) {
            languageMap.set(name, {
              ...languageMap.get(name),
              size: languageMap.get(name).size + size,
            });
          } else {
            languageMap.set(name, { name, color, size });
          }
          totalSize += size;
        });
      }
    });

    console.log("Language map:", Array.from(languageMap.values()));
    console.log("Total size:", totalSize);

    // Calculate percentages and get top languages
    const topLanguages = Array.from(languageMap.values())
      .map((lang: any) => ({
        ...lang,
        size:
          totalSize > 0
            ? Math.round((lang.size / totalSize) * 100 * 100) / 100
            : 0, // Round to 2 decimal places
      }))
      .sort((a: any, b: any) => b.size - a.size)
      .slice(0, 5); // Top 5 languages

    console.log("Top languages:", topLanguages);

    return NextResponse.json({
      ...data.data.user,
      topLanguages,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "An internal error occurred" },
      { status: 500 }
    );
  }
}
