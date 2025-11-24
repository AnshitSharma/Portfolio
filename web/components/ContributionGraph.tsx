"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { GitCommit, GitPullRequest, Star, Zap } from "lucide-react";

export default function ContributionGraph() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [repoCount, setRepoCount] = useState(0);
    const [totalStars, setTotalStars] = useState(0);

    // Stats
    const stats = [
        { label: "Total Contributions", value: totalContributions, icon: GitCommit, color: "text-emerald-400" },
        { label: "Current Streak", value: currentStreak, icon: Zap, color: "text-yellow-400" },
        { label: "Repositories", value: repoCount, icon: GitPullRequest, color: "text-blue-400" },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                // 1. Fetch Contributions & Streak
                const contribResponse = await fetch('https://github-contributions-api.jogruber.de/v4/AnshitSharma?y=last');
                const contribJson = await contribResponse.json();

                if (contribJson.contributions) {
                    setData(contribJson.contributions);

                    // Calculate Total Contributions
                    const total = contribJson.contributions.reduce((acc: number, curr: any) => acc + curr.count, 0);
                    setTotalContributions(total);

                    // Calculate Current Streak
                    let streak = 0;
                    // Iterate backwards from the last day
                    // Note: The API returns the full year, ending today/yesterday.
                    // We need to check from the end.
                    const reversed = [...contribJson.contributions].reverse();
                    // Check if today has contributions, if not, check if yesterday has.
                    // If neither, streak is 0.
                    // Actually, let's just count consecutive days with count > 0 from the end.
                    // However, if today is 0, the streak might still be valid if yesterday was > 0 (streak didn't break yet).
                    // But for simplicity, let's just count consecutive days from the end that have count > 0.
                    // Wait, if today is 0, we should skip it if we want to be lenient, but strictly speaking streak is active if we contributed today OR yesterday.

                    // Let's find the index of the last contribution.
                    // If the last day in the array is today, and count is 0, we check yesterday.

                    let i = 0;
                    // Skip today if it has 0 contributions (streak might be from yesterday)
                    if (reversed[0].count === 0) {
                        i = 1;
                    }

                    for (; i < reversed.length; i++) {
                        if (reversed[i].count > 0) {
                            streak++;
                        } else {
                            break;
                        }
                    }
                    setCurrentStreak(streak);
                }

                // 2. Fetch User Info (Repo Count)
                const userResponse = await fetch('https://api.github.com/users/AnshitSharma');
                const userJson = await userResponse.json();
                if (userJson.public_repos) {
                    setRepoCount(userJson.public_repos);
                }

                // 3. Fetch Stars (Iterate over repos)
                // Note: This might hit rate limits if user has MANY repos, but for < 100 it's one call.
                const reposResponse = await fetch('https://api.github.com/users/AnshitSharma/repos?per_page=100&type=owner');
                const reposJson = await reposResponse.json();
                if (Array.isArray(reposJson)) {
                    const stars = reposJson.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
                    setTotalStars(stars);
                }

            } catch (error) {
                console.error("Failed to fetch GitHub data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <LoadingSkeleton />;

    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-zinc-950 to-zinc-950 -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

            <div className="flex flex-col gap-16">
                {/* Header & Stats */}
                <div className="space-y-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
                            Open Source
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            Contributing to the ecosystem that built the web.
                            <span className="text-emerald-400/80 block mt-2 font-mono text-sm">
                                &gt; git commit -m "make it better"
                            </span>
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        {stats.map((stat, index) => (
                            <StatCard key={index} stat={stat} index={index} />
                        ))}
                    </div>
                </div>

                {/* Graph */}
                <motion.div
                    className="relative w-full max-w-5xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50" />
                    <div className="relative p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
                        <div className="flex justify-center w-full">
                            {/* Responsive Wrapper */}
                            <div className="w-full max-w-full overflow-hidden flex justify-center">
                                <ActivityCalendar
                                    data={data}
                                    theme={{
                                        light: ['#18181b', '#064e3b', '#047857', '#10b981', '#34d399'],
                                        dark: ['#18181b', '#064e3b', '#047857', '#10b981', '#34d399'],
                                    }}
                                    colorScheme="dark"
                                    labels={{
                                        totalCount: '{{count}} contributions in the last year',
                                    }}
                                    blockSize={12}
                                    blockMargin={3}
                                    fontSize={14}
                                    showWeekdayLabels
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        </div>

                        {/* Decorative scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent h-[200%] w-full animate-scan pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function StatCard({ stat, index }: { stat: any, index: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, stat.value, { duration: 2, delay: index * 0.1 });
        return animation.stop;
    }, [stat.value, count, index]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all group"
        >
            <div className={`mb-2 p-2 w-fit rounded-lg bg-zinc-900 ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <motion.div className="text-2xl font-bold text-zinc-100 font-mono">
                {rounded}
            </motion.div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                {stat.label}
            </div>
        </motion.div>
    );
}

function LoadingSkeleton() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="space-y-8">
                    <div className="h-12 w-48 bg-zinc-800/50 rounded animate-pulse" />
                    <div className="h-24 w-full bg-zinc-800/30 rounded animate-pulse" />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-zinc-800/30 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-2 h-80 bg-zinc-800/30 rounded-3xl animate-pulse" />
            </div>
        </section>
    );
}
