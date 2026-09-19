import type { NextConfig } from "next";

const repoName = "GitaVerseofDay";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repoName}` : "",
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
