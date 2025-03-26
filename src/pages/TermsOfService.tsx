
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Clockify. These Terms of Service govern your use of our website and services. By accessing or using Clockify, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">2. User Accounts</h2>
                <p className="text-gray-600 mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p className="text-gray-600 mb-4">
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Clockify and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Clockify.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">4. User Content</h2>
                <p className="text-gray-600 mb-4">
                  Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>
                <p className="text-gray-600 mb-4">
                  By posting content to the Service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service. You retain any and all of your rights to any content you submit, post or display on or through the Service and you are responsible for protecting those rights.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Age Restrictions</h2>
                <p className="text-gray-600 mb-4">
                  Clockify is specifically designed for teenagers aged 13-18. Users under the age of 13 are not permitted to use the Service. If you are between the ages of 13 and 18, you may only use the Service under the supervision of a parent or legal guardian who agrees to be bound by these Terms.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Termination</h2>
                <p className="text-gray-600 mb-4">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-gray-600 mb-4">
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  In no event shall Clockify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Changes</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-gray-600 mb-4">
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>By email: terms@clockify.com</li>
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

export default TermsOfService;
