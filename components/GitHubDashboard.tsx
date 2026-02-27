"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Contrib = {
  date: string;
  count: number;
  level: number;
};

type TopRepo = {
  name: string;
  stars: number;
  language: string;
  url: string;
};

type Language = {
  lang: string;
  count: number;
};

type MonthlyCommit = {
  month: string;
  count: number;
};

type GHData = {
  user: {
    name: string;
    login: string;
    publicRepos: number;
    followers: number;
  };
  stats: {
    totalStars: number;
    totalCommitsThisYear: number;
    publicRepos: number;
  };
  weeklyDist: number[];
  monthlyCommits: MonthlyCommit[];
  languages: Language[];
  topRepos: TopRepo[];
  contributions: Contrib[];
};

const LEVELS = ["#1a1a1a", "#2e2e2e", "#474747", "#6e6e6e", "#f5f5f5"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type TooltipProps = {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
};

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-surface border border-border rounded px-3 py-1.5 font-mono text-[11px] text-white">
      <span className="text-muted">{label} </span>
      {payload[0].value}
    </div>
  );
}

export default function GitHubDashboard() {
  const [data, setData] = useState<GHData | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d: GHData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setErr(true);
        setLoading(false);
      });
  }, []);

  function up(delay: number) {
    return {
      initial: { opacity: 0, y: 14 },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: { delay, duration: 0.45 },
    };
  }

  // Build contribution grid
  const grid: Contrib[][] = [];
  if (data?.contributions?.length) {
    const flat = [...data.contributions];
    const firstDate = flat[0].date;
    const pad = new Date(firstDate).getDay();
    for (let i = 0; i < pad; i++) {
      flat.unshift({ date: "", count: 0, level: 0 });
    }
    for (let w = 0; w < Math.ceil(flat.length / 7); w++) {
      grid.push(flat.slice(w * 7, w * 7 + 7));
    }
  }

  const weeklyData = data
    ? data.weeklyDist.map((count, i) => ({ day: DAYS[i], commits: count }))
    : [];

  const statCards = data
    ? [
        { label: "Commits this year", value: data.stats.totalCommitsThisYear },
        { label: "Public repos",      value: data.stats.publicRepos          },
        { label: "Total stars",       value: data.stats.totalStars           },
        { label: "Followers",         value: data.user.followers             },
      ]
    : [];

  return (
    <section id="github" ref={ref} className="border-t border-border">
      <div className="section-wrap">
        <p className="font-mono text-[11px] text-muted mb-2">03 github</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-8">
          Activity Dashboard
        </h2>

        {loading && (
          <p className="font-mono text-xs text-muted animate-pulse">
            fetching github.com/Hawariii…
          </p>
        )}

        {err && (
          <p className="font-mono text-xs text-soft">
            failed to load. add GITHUB_TOKEN to .env.local
          </p>
        )}

        {data && (
          <div className="space-y-3">

            {/* Stat cards */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
              {...up(0.05)}
            >
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-surface border border-border rounded-lg px-4 py-4"
                >
                  <p className="font-mono text-[10px] text-muted mb-1">
                    {card.label}
                  </p>
                  <p className="font-mono text-2xl font-semibold text-white">
                    {card.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Contribution graph */}
            <motion.div
              className="bg-surface border border-border rounded-lg p-5"
              {...up(0.1)}
            >
              <p className="font-mono text-[11px] text-muted mb-4">
                contribution graph · last 52 weeks
              </p>
              <div className="flex gap-[3px] overflow-x-auto pb-1">
                {grid.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px] shrink-0">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={day.date ? `${day.date}: ${day.count}` : ""}
                        className="w-[10px] h-[10px] rounded-[2px] transition-transform hover:scale-125 cursor-default"
                        style={{ background: LEVELS[day.level] ?? LEVELS[0] }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-3 justify-end">
                <span className="font-mono text-[10px] text-muted">less</span>
                {LEVELS.map((color, i) => (
                  <div
                    key={i}
                    className="w-[10px] h-[10px] rounded-[2px]"
                    style={{ background: color }}
                  />
                ))}
                <span className="font-mono text-[10px] text-muted">more</span>
              </div>
            </motion.div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-3">
              <motion.div
                className="bg-surface border border-border rounded-lg p-5"
                {...up(0.15)}
              >
                <p className="font-mono text-[11px] text-muted mb-4">
                  monthly commits · {new Date().getFullYear()}
                </p>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={data.monthlyCommits}>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1a1a1a" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10, fill: "#555", fontFamily: "monospace" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#555", fontFamily: "monospace" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#f5f5f5"
                      strokeWidth={1.5}
                      dot={{ fill: "#f5f5f5", r: 2.5 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                className="bg-surface border border-border rounded-lg p-5"
                {...up(0.2)}
              >
                <p className="font-mono text-[11px] text-muted mb-4">
                  weekly commit distribution
                </p>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid
                      strokeDasharray="2 4"
                      stroke="#1a1a1a"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 10, fill: "#555", fontFamily: "monospace" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#555", fontFamily: "monospace" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar
                      dataKey="commits"
                      fill="#f5f5f5"
                      radius={[3, 3, 0, 0]}
                      opacity={0.75}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Languages + Top repos */}
            <div className="grid md:grid-cols-2 gap-3">
              <motion.div
                className="bg-surface border border-border rounded-lg p-5"
                {...up(0.25)}
              >
                <p className="font-mono text-[11px] text-muted mb-4">
                  top languages
                </p>
                <div className="space-y-3">
                  {data.languages.map((lang, i) => {
                    const total = data.languages.reduce((a, b) => a + b.count, 0);
                    const pct = Math.round((lang.count / total) * 100);
                    return (
                      <div key={lang.lang}>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono text-xs text-white">
                            {lang.lang}
                          </span>
                          <span className="font-mono text-[10px] text-muted">
                            {pct}%
                          </span>
                        </div>
                        <div className="h-[2px] bg-subtle rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white rounded-full"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${pct}%` } : {}}
                            transition={{ delay: 0.4 + i * 0.07, duration: 0.7 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                className="bg-surface border border-border rounded-lg p-5"
                {...up(0.3)}
              >
                <p className="font-mono text-[11px] text-muted mb-4">
                  top repositories
                </p>
                <div className="space-y-2">
                  {data.topRepos.map((repo) => (
                    
                      <a
                      href={repo.url}
                      key={repo.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2.5 bg-subtle border border-border rounded hover:border-soft transition-all group"
                    >
                      <span className="font-mono text-xs text-white group-hover:text-soft transition-colors truncate">
                        {repo.name}
                      </span>
                      <span className="font-mono text-[11px] text-muted shrink-0 ml-3">
                        ⭐ {repo.stars}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}