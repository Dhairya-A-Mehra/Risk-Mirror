"use client";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Trusted by Early Users
        </h2>
        <p className="mt-4 text-gray-600">
          See how FinWell is helping people take charge of their finances.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Aarav Mehta",
              text: "The dashboard helped me cut unnecessary expenses by 20%.",
            },
            {
              name: "Sanya Kapoor",
              text: "The simulation game made finance fun and educational!",
            },
            {
              name: "Rahul Verma",
              text: "I finally understand my risk profile. Highly recommend!",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl shadow-md bg-gray-50 hover:shadow-lg"
            >
              <p className="italic text-gray-700">“{testimonial.text}”</p>
              <h4 className="mt-4 font-semibold text-pink-600">
                - {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
