"use client";

import { BarChart3, Gamepad2, ClipboardList, User } from "lucide-react";

const features = [
  {
    title: "Dashboard",
    description:
      "Track spending, investments, and savings with interactive charts.",
    icon: BarChart3,
  },
  {
    title: "Risk Simulation Game",
    description:
      "Experience real-world scenarios and learn financial decision-making.",
    icon: Gamepad2,
  },
  {
    title: "Onboarding Survey",
    description:
      "Answer quick questions to personalize your financial journey.",
    icon: ClipboardList,
  },
  {
    title: "Profile & Insights",
    description:
      "Get tailored reports and AI-driven recommendations for growth.",
    icon: User,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Powerful Features, Simplified
        </h2>
        <p className="mt-4 text-gray-600">
          Everything you need to master your financial wellness.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition"
            >
              <feature.icon className="h-10 w-10 mx-auto text-pink-500" />
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
