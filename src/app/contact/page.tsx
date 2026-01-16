import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
    title: "Contact | Kyle Wegner",
    description: "Get in touch with Kyle Wegner for consulting, fractional leadership, speaking opportunities, and collaborations.",
};

export default function ContactPage() {
    return (
        <div className="py-16 md:py-24">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600">
                        Have a project in mind or want to chat? I&apos;d love to hear from you.
                    </p>
                </div>

                {/* Contact Form */}
                <ContactForm />
            </div>
        </div>
    );
}
