// Blog data - Add new posts here (newest first)
const blogPosts = [
    {
        id: 7,
        title: "Autofill via Microsoft Authenticator ends in July 2025",
        date: "2025-05-27",
        tags: ["Security", "Notice"],
        content: [
            "As of July 2025, Microsoft will discontinue the Autofill feature in the Microsoft Authenticator app. This feature allowed users to save and autofill passwords across devices.",
            "This is the perfect time to review your password management strategy and ensure you have a secure and reliable solution in place.",
            "We help our customers with password management solutions, so if you need assistance, feel free to reach out to us.",
            "According to Microsoft:",
            "<code>Starting June 2025, you will no longer be able to save new passwords in Authenticator.</code>",
            "<code>During July 2025, you will not be able to use autofill with Authenticator.</code>",
            "<code>From August 2025, your saved passwords will no longer be accessible in Authenticator.</code>",
        ],
         image: "./media/2025-05/deadphone.jpeg",
        // moreLink: {
        //     text: "Link to the antiphishing settings",
        //     url: "https://security.microsoft.com/antiphishing?"
        // },
        source: {
            text: "Changes to Microsoft Authenticator autofill",
            url: "https://support.microsoft.com/en-us/account-billing/changes-to-microsoft-authenticator-autofill-09fd75df-dc04-4477-9619-811510805ab6"
        }
    },
        {
        id: 6,
        title: "Impersonation Protection",
        date: "2025-05-26",
        tags: ["Security"],
        content: [
            "Great tip for every company under 350 employees: If you are using Microsoft 365, you can enable impersonation protection to prevent attackers from impersonating your domain and users.",
            "This feature is available in Microsoft 365 Defender and can be enabled by following these steps:",
            "1. Go to the Microsoft 365 Defender portal.",
            "2. Navigate to the Email & Collaboration section.",
            "3. Click on Policies & Rules.",
            "4. Select Threat Policies.",
            "5. Under the Anti-phishing section, open your policy",
            "6. Enable the feature and configure the settings as needed.",
        ],
        image: "./media/2025-05/impersonationProtection.png",
        moreLink: {
            text: "Link to the antiphishing settings",
            url: "https://security.microsoft.com/antiphishing?"
        },
        // source: {
        //     text: "SANS Stormcast Friday, May 16th, 2025",
        //     url: "https://isc.sans.edu/podcastdetail/9454"
        // }
    },
        {
        id: 5,
        title: "RVTools Compromise: Security Advisory",
        date: "2025-05-20",
        tags: ["Security", "Notice"],
        content: [
            "Sans Institute confirmed the RVTools compromise today.",
            "The situation seems to be like this:",
            "The attackers have gained access to the RVTools website and are using it to distribute malware. The site is currently down for maintenance with the following message [see added screenshot].",
            "Today we checked if any of our customers are affected, we do trust our EDR detection capabilities, and we have not seen any alerts related to this incident. However, we recommend that all users of RVTools take steps to ensure their systems are secure.",
            "It is possible to compare the hash of the downloaded file with the known good hash. If you have downloaded RVTools in the past, you can check the hash of the file you have against the known good hash. The bad hash has been seen as malicious on Virustotal.",
        ],
        image: "./media/2025-05/rvtools.png",
        // moreLink: {
        //     text: "Read the complete security guide",
        //     url: "https://example.com/security-guide-2025"
        // },
        source: {
            text: "SANS Stormcast Friday, May 16th, 2025",
            url: "https://isc.sans.edu/podcastdetail/9454"
        }
    },
    {
        id: 4,
        title: "Test post: Essential Productivity Tips for Remote Work",
        date: "2025-05-20",
        tags: ["Tips and Tricks"],
        content: [
            "Working remotely has become the new normal for many professionals. These proven productivity techniques will help you maintain focus, manage your time effectively, and create a healthy work-life balance.",
            "The Pomodoro Technique remains one of the most effective time management methods. Work in 25-minute focused intervals, followed by 5-minute breaks.",
            "Creating a dedicated workspace is crucial. Even in small apartments, having a specific area designated for work helps maintain the psychological boundary between work and personal life."
        ],
        moreLink: {
            text: "Download our complete remote work toolkit",
            url: "https://example.com/remote-work-toolkit"
        }
    },
    {
        id: 3,
        title: "Test post: Understanding Modern Web Development Trends",
        date: "2025-05-18",
        tags: ["Development"],
        content: [
            "The web development landscape is constantly evolving. From new JavaScript frameworks to emerging design patterns, staying current is essential for developers.",
            "Server-side rendering (SSR) and static site generation (SSG) continue to gain popularity as developers seek to optimize both performance and SEO.",
            "Web Components are finally reaching mainstream adoption, offering a standardized way to create reusable UI elements across different frameworks."
        ],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
    },
    {
        id: 2,
        title: "Test post: The Rise of AI in Everyday Applications",
        date: "2025-05-16",
        tags: ["AI"],
        content: [
            "Artificial Intelligence is no longer confined to research labs and tech giants. It's becoming an integral part of applications we use daily.",
            "From smart email filtering to personalized content recommendations, AI is quietly improving user experiences across the digital landscape."
        ],
        source: {
            text: "Research from MIT Technology Review",
            url: "https://www.technologyreview.com"
        }
    },
    {
        id: 1,
        title: "Test post: Cybersecurity Fundamentals Everyone Should Know",
        date: "2025-05-15",
        tags: ["Security", "Tips and Tricks"],
        content: [
            "Cybersecurity isn't just for IT professionals anymore. Every internet user should understand these fundamental concepts to protect themselves online.",
            "Password management is the cornerstone of personal cybersecurity. Using unique, complex passwords for each account is essential, but managing them manually is impossible.",
            "Phishing attacks have become increasingly sophisticated. Learning to identify suspicious emails, links, and websites is a critical skill in today's digital world."
        ]
    }
];
