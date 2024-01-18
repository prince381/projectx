const PrivacyPolicy = () => {
  return (
    <div className="w-screen h-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[900px] h-full mt-24 p-4 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">
                This Privacy Policy outlines how ProjectX ("we," "our," or "us") collects, uses, and safeguards your personal information when you access and use our website. By using our website, you agree to the terms outlined in this policy.
            </p>
            <h2 className="text-2xl font-bold mb-4">Information We Collect:</h2>
            <ul className="list-disc pl-6 mb-6">
                <li>
                <strong>Google Authentication Data:</strong> If you choose to log in using Google authentication, we may collect basic user information provided by Google, such as your name and email address.
                </li>
                <li>
                <strong>Usage Data:</strong> We may collect information about your interactions with our website, including pages visited, features used, and other relevant analytics.
                </li>
            </ul>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information:</h2>
            <ul className="list-disc pl-6 mb-6">
                <li>
                <strong>Google Authentication:</strong> The information collected through Google authentication is used to create and authenticate your account on our website. We do not have access to your Google password.
                </li>
                <li>
                <strong>Usage Analytics:</strong> We use usage data to improve our website, enhance user experience, and analyze trends.
                </li>
            </ul>
            <p className="mb-4">
                <strong>Information Sharing:</strong> We do not sell, trade, or otherwise transfer your personally identifiable information to third parties. However, we may share aggregated, non-personally identifiable information for statistical purposes.
            </p>
            <p className="mb-4">
                <strong>Data Security:</strong> We prioritize the security of your information and implement reasonable measures to protect it from unauthorized access, disclosure, alteration, and destruction.
            </p>
            <p className="mb-4">
                <strong>Cookies:</strong> Our website may use cookies to enhance your browsing experience. You can configure your browser settings to disable cookies, but this may affect the functionality of certain features.
            </p>
            <p className="mb-4">
                <strong>Third-Party Links:</strong> Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
            </p>
            <p className="mb-4">
                <strong>Updates to Privacy Policy:</strong> We may update this Privacy Policy periodically to reflect changes in our practices. Please review this policy regularly for the latest information.
            </p>
            <p className="mb-4">
                <strong>Your Choices:</strong> You have the right to access, update, or delete your personal information. If you have any concerns or requests regarding your data, please contact us at <a href="mailto:your-email@example.com">your-email@example.com</a>.
            </p>
            <p className="mb-4">
                By using our website, you acknowledge and agree to the terms outlined in this Privacy Policy. If you do not agree with these terms, please refrain from using our website.
            </p>
        </div>
    </div>
  );
};

export default PrivacyPolicy;