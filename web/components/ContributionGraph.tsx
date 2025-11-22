"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ActivityCalendar } from "react-activity-calendar";

export default function ContributionGraph() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://github-contributions-api.jogruber.de/v4/AnshitSharma?y=last');
                const json = await response.json();

                // Transform data to match react-activity-calendar format if needed
                // The API returns { contributions: [ { date, count, level } ] }
                if (json.contributions) {
                    setData(json.contributions);
                }
            } catch (error) {
                console.error("Failed to fetch GitHub contributions", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-64 bg-zinc-800 rounded mb-8"></div>
                    <div className="h-40 w-full max-w-4xl bg-zinc-900/50 rounded-3xl"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="text-4xl md:text-6xl font-serif text-zinc-100 mb-6">Open Source</h2>
                <div className="h-[1px] w-24 bg-zinc-800 mb-6" />
                <p className="text-zinc-400 max-w-2xl text-lg">
                    Active contributor to the open-source community. Consistency is key.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 overflow-x-auto flex justify-center"
            >
                <ActivityCalendar
                    data={data}
                    theme={{
                        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    colorScheme="dark"
                    labels={{
                        totalCount: '{{count}} contributions in the last year',
                    }}
                    blockSize={12}
                    blockMargin={4}
                    fontSize={14}
                />
            </motion.div>
        </section>
    );
}
