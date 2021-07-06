const title = 'Project Local – Discover local businesses around you right now.';
const description =
  "Project Local helps you discover and find local businesses. View interesting ventures created by fellow Malaysian and filter down to exactly what you're searching for.";

const SEO = {
  title,
  description,
  canonical: 'https://projectlocal.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://projectlocal.vercel.app',
    title,
    description,
    images: [
      {
        url: 'https://projectlocal.vercel.app/og.png',
        alt: title,
        width: 1280,
        height: 734
      }
    ]
  }
};

export default SEO;
