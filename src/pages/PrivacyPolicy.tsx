
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true after a short delay to trigger animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Smooth scroll behavior for the page
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Clockify's Privacy Policy. This policy describes how Clockify ("we," "our," or "us") collects, uses, and shares your personal information when you use our website and services.
                </p>
                <p className="text-gray-600 mb-4">
                  We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect several different types of information for various purposes to provide and improve our Service to you.
                </p>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Data</h3>
                <p className="text-gray-600 mb-4">
                  While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Usage Data</li>
                </ul>
                
                <h3 className="text-lg font-medium text-gray-800 mb-2">Usage Data</h3>
                <p className="text-gray-600 mb-4">
                  We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the collected data for various purposes:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information so that we can improve our Service</li>
                  <li>To monitor the usage of our Service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Retention of Data</h2>
                <p className="text-gray-600 mb-4">
                  We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Transfer of Data</h2>
                <p className="text-gray-600 mb-4">
                  Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
                </p>
                <p className="text-gray-600 mb-4">
                  Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                <p className="text-gray-600 mb-4">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>By email: privacy@clockify.com</li>
                  <li>By visiting the contact page on our website</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
