"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-400 to-pink-600 text-white text-center">
      <h2 className="text-4xl font-bold">Ready to Take Control?</h2>
      <p className="mt-4 text-lg">
        Join thousands of users building financial freedom with FinWell.
      </p>
      <div className="mt-8">
        <Link
          href="/signup"
          className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-2xl shadow-md hover:bg-pink-100"
        >
          Start Free Today
        </Link>
      </div>
    </section>
  );
}
