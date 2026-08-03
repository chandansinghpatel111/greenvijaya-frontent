import React from "react";

const Privacypolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        
        <p className="text-gray-700 mb-4">
          Welcome to <strong>USD Unique</strong>. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-4">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">We collect the following information:
          <ul className="list-disc ml-6 mt-2">
            <li>Email Address</li>
            <li>Password (Encrypted & Securely Stored)</li>
            <li>Usage Data & Cookies</li>
            <li>Device Information</li>
            <li>Location Data (if permission granted)</li>
          </ul>
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-4">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">Your data is used for:
          <ul className="list-disc ml-6 mt-2">
            <li>Account Authentication</li>
            <li>Enhancing User Experience</li>
            <li>Security & Fraud Prevention</li>
            <li>Providing Personalized Content</li>
            <li>Improving Our Services</li>
          </ul>
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-4">3. Data Sharing and Disclosure</h2>
        <p className="text-gray-700 mb-4">
          We do not sell or share your personal data with third parties except in the following cases:
          <ul className="list-disc ml-6 mt-2">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect the rights, property, or safety of our users</li>
            <li>With service providers that help us operate our services</li>
          </ul>
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-4">4. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We implement security measures to protect your information. Your password is stored securely, and we do not share your credentials with third parties.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-4">5. User Credentials</h2>
        <p className="text-gray-700 mb-4">For testing purposes, you can use:
          <div className="bg-gray-200 p-4 rounded-md mt-2">
            <p><strong>Email:</strong> test3@gmail.com</p>
            <p><strong>Password:</strong> 123456</p>
          </div>
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-4">6. User Rights</h2>
        <p className="text-gray-700 mb-4">
          You have the right to:
          <ul className="list-disc ml-6 mt-2">
            <li>Access your data</li>
            <li>Update or delete your data</li>
            <li>Opt-out of data collection</li>
            <li>Request a copy of your data</li>
          </ul>
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-4">7. Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-4">8. Contact Us</h2>
        <p className="text-gray-700 mb-4">If you have any questions about this Privacy Policy, please contact us at support@usdunique.com.</p>
      </div>
    </div>
  );
};

export default Privacypolicy;