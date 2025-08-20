"use client";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
	{ title: "Risk Analysis", description: "Get detailed risk insights." },
	{ title: "Survey Management", description: "Manage and review surveys." },
	{ title: "User Analytics", description: "Track user activity and stats." },
];

export default function DashboardPage() {
	const [recentActivity] = useState([
		"User John completed a survey.",
		"Risk score updated for Jane.",
		"New survey created.",
	]);

	const stats = useMemo(
		() => [
			{ label: "Total Users", value: 128 },
			{ label: "Surveys", value: 34 },
			{ label: "Avg. Risk Score", value: 72 },
		],
		[]
	);

					return (
						<main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white p-8">
							{/* Header Section */}
							<div className="mb-10 flex items-center justify-between">
								<h1 className="text-4xl font-bold text-white">Dashboard</h1>
								<Button className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-2 rounded-lg shadow font-semibold">New Survey</Button>
							</div>

							{/* Stats Cards */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
								{stats.map((stat) => (
									<Card key={stat.label} className="shadow-lg border border-blue-200 bg-white rounded-lg">
										<CardContent className="p-6 flex flex-col items-center">
											<div className="text-lg font-semibold text-blue-700 mb-2">{stat.label}</div>
											<div className="text-3xl font-bold text-blue-900">{stat.value}</div>
										</CardContent>
									</Card>
								))}
							</div>

							{/* Main Content: Recent Activity & Features */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{/* Recent Activity */}
								<Card className="shadow-md border border-blue-200 bg-white rounded-lg">
									<CardContent className="p-6">
										<h2 className="text-xl font-bold mb-4 text-blue-800">Recent Activity</h2>
										<ul className="space-y-2">
											{recentActivity.map((item, idx) => (
												<li key={idx} className="text-blue-700 text-base">{item}</li>
											))}
										</ul>
									</CardContent>
								</Card>

								{/* Features List */}
								<Card className="shadow-md border border-blue-200 bg-white rounded-lg">
									<CardContent className="p-6">
										<h2 className="text-xl font-bold mb-4 text-blue-800">Features</h2>
										<ul className="space-y-2">
											{features.map((feature) => (
												<li key={feature.title}>
													<div className="font-semibold text-blue-700 text-base">{feature.title}</div>
													<div className="text-blue-600 text-sm">{feature.description}</div>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							</div>

							{/* Quick Actions */}
							<div className="mt-10 flex gap-6">
								<Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg shadow font-semibold">View Reports</Button>
								<Button variant="outline" className="border border-blue-600 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold">Manage Users</Button>
								<Button variant="outline" className="border border-blue-600 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold">Settings</Button>
							</div>
						</main>
					);
	// ...existing code...

			return (
				<main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
					{/* Header Section */}
					<div className="mb-8 flex items-center justify-between">
						<h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
						<Button>New Survey</Button>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						{stats.map((stat) => (
							<Card key={stat.label}>
								<CardContent>
									<div className="text-lg font-semibold text-blue-700">{stat.label}</div>
									<div className="text-2xl font-bold text-blue-900">{stat.value}</div>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Main Content: Recent Activity & Features */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Recent Activity */}
						<Card>
							<CardContent>
								<h2 className="text-xl font-bold mb-4 text-blue-800">Recent Activity</h2>
								<ul className="space-y-2">
									{recentActivity.map((item, idx) => (
										<li key={idx} className="text-blue-700">{item}</li>
									))}
								</ul>
							</CardContent>
						</Card>

						{/* Features List */}
						<Card>
							<CardContent>
								<h2 className="text-xl font-bold mb-4 text-blue-800">Features</h2>
								<ul className="space-y-2">
									{features.map((feature) => (
										<li key={feature.title}>
											<div className="font-semibold text-blue-700">{feature.title}</div>
											<div className="text-blue-600 text-sm">{feature.description}</div>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>

					{/* Quick Actions */}
					<div className="mt-8 flex gap-4">
						<Button>View Reports</Button>
						<Button variant="outline">Manage Users</Button>
						<Button variant="outline">Settings</Button>
					</div>
				</main>
			);
		}
