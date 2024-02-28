/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      // {
      //   source: "/login",
      //   destination: "/login",
      //   permanent: false,
      // },
      // {
      //   source: "/sign-up",
      //   destination: "/sign-up",
      //   permanent: false,
      // },
      {
        source: "/admin",
        destination: "/admins",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/dashboards",
        permanent: false,
      },
      {
        source: "/table",
        destination: "/tables",
        permanent: false,
      },
      {
        source: "/form",
        destination: "/forms",
        permanent: false,
      },
      {
        source: "/calendar",
        destination: "/calendars",
        permanent: false,
      },
      {
        source: "/blogs",
        destination: "/blog1",
        permanent: false,
      },
      {
        source: "/contacts",
        destination: "/cont",
        permanent: false,
      },
    ];
  },

  images: {
    domains: ["tailwindui.com", "www.w3.org", "images.unsplash.com", "ohio.clbthemes.com", "demo.rivaxstudio.com"],
  },
};

module.exports = nextConfig;
