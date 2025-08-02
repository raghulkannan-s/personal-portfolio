'use client';

import Head from 'next/head';

export default function SEOHead({
  title = "Raghul Kannan | Full-Stack Developer",
  description = "Full-Stack Developer specializing in MERN stack, Next.js, and modern web technologies. Building innovative solutions with React, Node.js, and MongoDB.",
  keywords = "Raghul Kannan, Full Stack Developer, MERN Stack, Next.js, React, Node.js, MongoDB, JavaScript, TypeScript, Portfolio",
  image = "/og-image.jpg",
  url = "https://raghulkannan.dev",
  type = "website"
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Raghul Kannan",
    "jobTitle": "Full-Stack Developer",
    "description": description,
    "url": url,
    "image": image,
    "email": "raghulkannan005@gmail.com",
    "telephone": "+91 9677605417",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chengalpattu",
      "addressCountry": "India"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "RV Government Arts College"
    },
    "knowsAbout": [
      "Next.js", "React.js", "TypeScript", "JavaScript", "Tailwind CSS",
      "Node.js", "Express.js", "MongoDB", "JWT", "Mongoose", "RESTful APIs"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "MongoDB Node.js Developer",
        "credentialCategory": "Professional Certification"
      },
      {
        "@type": "EducationalOccupationalCredential", 
        "name": "FreeCodeCamp Certifications",
        "credentialCategory": "Professional Certification"
      }
    ],
    "workExample": [
      {
        "@type": "CreativeWork",
        "name": "Waitless Online",
        "description": "Real-time virtual queue system for clinics and salons",
        "url": "https://waitless.online"
      },
      {
        "@type": "CreativeWork",
        "name": "MealMesh",
        "description": "B2B2C meal donation network connecting donors and NGOs",
        "url": "https://mealmesh.vercel.app"
      },
      {
        "@type": "CreativeWork",
        "name": "Cryptoverse",
        "description": "Full-stack cryptocurrency dashboard with real-time tracking",
        "url": "https://cryptoverse-bca.vercel.app"
      }
    ]
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Raghul Kannan" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Raghul Kannan Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@raghulkannan" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1a1a2e" />
      <meta name="msapplication-TileColor" content="#1a1a2e" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}
