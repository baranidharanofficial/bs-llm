"use client"


export default function Privacy() {


    return (
        <div className="bg-slate-100 text-slate-900 flex flex-col items-center justify-start overflow-auto">
            <div className="py-[50px] w-full flex items-center justify-center bg-slate-200">
                <p className="text-[32px] font-bold text-[#143F8D]">Privacy Policy</p>
            </div>

            <div className="mx-[15%] overflow-x-hidden py-8">

                <p className="mb-2"><strong>1. Introduction</strong></p>
                <p className="mb-8">BuildSuite ("we," "our," or "us") is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your
                    information when you use our website and services. By accessing or using our website
                    or services, you agree to the terms of this Privacy Policy.</p>

                <p className="mb-2"><strong>2. Information We Collect</strong></p>

                <ul className="mb-8">
                    <li><strong>Personal Information:</strong>

                        When you register an account with BuildSuite, we may collect personal information such as your name,
                        email address, phone number, and other details.</li><li>
                        <strong>Usage Data:</strong>
                        We collect information about your interactions with our website and services,
                        including your IP address, browser type, and device information.</li><li>
                        <strong>Cookies:</strong> We use cookies to enhance your experience on our website.
                        Cookies are small files stored on your device that help us improve our services.</li>
                </ul>


                <p className="mb-2"><strong>3. How We Use Your Information</strong>
                </p><p>We use the information we collect for the following purposes:</p>
                <ul className="mb-8"><li><strong>To Provide and Maintain Our Services:</strong>
                    We use your information to deliver our services, process transactions, and maintain your account.</li>
                    <li><strong>To Improve Our Services:</strong>
                        Your information helps us understand how you use our services and enables us to
                        enhance and expand our offerings.</li><li><strong>To Communicate With You:</strong>
                        We may use your email address to send you updates, newsletters, or other relevant information.</li></ul>


                <p><strong>4. Information Sharing</strong></p>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties.
                    However, we may share your information in the following circumstances:</p>
                <ul className="mb-8">
                    <li><strong>With Service Providers:</strong> We may engage third-party service providers to help us deliver our services, and your information may be shared
                        with them.</li>

                    <li><strong>For Legal and Safety Reasons:</strong> We may disclose your information to comply with legal
                        obligations, enforce our policies, or protect the rights, property, or safety of ourselves and others.</li></ul>


                <p className="mb-2"><strong>5. Your Choices</strong></p><p>You have the right to:</p><ul className="mb-8"><li>Access, correct, or delete
                    your personal information.</li><li>Opt out of receiving promotional emails.</li><li>Delete your account, subject
                        to our Terms and Conditions.</li></ul><p className="mb-2"><strong>6. Data Security</strong></p><p className="mb-8">We implement industry-standard
                            security measures to protect your personal information. However, no method of transmission or storage on the
                            internet is 100% secure, and we cannot guarantee absolute security.</p><p className="mb-2"><strong>7. Changes to This Privacy
                                Policy</strong></p>
                <p className="mb-8">We reserve the right to update this Privacy Policy to reflect changes in our datacollection and usage practices. You will be notified of any significant changes.</p>
                <p className="mb-2"><strong>8. Contact Us</strong></p>
                <p className="mb-8">If you have any questions or concerns about this Privacy Policy,please contact us at sales@buildsuite.io.</p>
                <p>&zwj;</p>
            </div>

        </div>
    );
}