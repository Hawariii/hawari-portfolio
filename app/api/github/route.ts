import { NextResponse } from "next/server";

const USERNAME = "Hawariii";

const ghHeaders: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

export async function GET() {
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: ghHeaders,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
        { headers: ghHeaders, next: { revalidate: 3600 } }
      ),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
        { next: { revalidate: 3600 } }
      ),
    ]);

    const user      = await userRes.json();
    const repos: any[] = await reposRes.json();
    const contrib   = await contribRes.json();

    // ── Stats ─────────────────────────────────────────────
    const totalStars = repos.reduce((s: number, r: any) => s + r.stargazers_count, 0);
    const thisYear   = String(new Date().getFullYear());
    const totalCommitsThisYear = contrib?.total?.[thisYear] ?? 0;

    // ── Weekly distribution (Sun–Sat) ─────────────────────
    const weeklyDist: number[] = [0, 0, 0, 0, 0, 0, 0];
    (contrib?.contributions ?? []).forEach((d: any) => {
      const dow = new Date(d.date).getDay();
      weeklyDist[dow] += d.count;
    });

    // ── Monthly commits (last 12) ──────────────────────────
    const monthMap: Record<string, number> = {};
    (contrib?.contributions ?? []).forEach((d: any) => {
      const key = d.date.slice(0, 7);
      monthMap[key] = (monthMap[key] ?? 0) + d.count;
    });
    const monthlyCommits = Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12)
      .map(([m, count]) => ({
        month: new Date(m + "-01").toLocaleString("en", { month: "short" }),
        count,
      }));

    // ── Languages ─────────────────────────────────────────
    const langMap: Record<string, number> = {};
    repos.forEach((r: any) => {
      if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
    });
    const languages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, count]) => ({ lang, count }));

    // ── Top repos ─────────────────────────────────────────
    const topRepos = repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((r: any) => ({
        name:      r.name,
        stars:     r.stargazers_count,
        forks:     r.forks_count,
        language:  r.language,
        url:       r.html_url,
        updatedAt: r.updated_at,
      }));

    // ── Contribution grid (last 364 days) ─────────────────
    const contributions = (contrib?.contributions ?? []).slice(-364);

    return NextResponse.json({
      user: {
        name:        user.name ?? USERNAME,
        login:       user.login,
        bio:         user.bio,
        avatar:      user.avatar_url,
        followers:   user.followers,
        publicRepos: user.public_repos,
        url:         user.html_url,
      },
      stats: {
        totalStars,
        totalForks:        repos.reduce((s: number, r: any) => s + r.forks_count, 0),
        totalCommitsThisYear,
        publicRepos:       user.public_repos,
      },
      weeklyDist,
      monthlyCommits,
      languages,
      topRepos,
      contributions,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}