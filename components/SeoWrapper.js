import { NextSeo } from 'next-seo';

const SeoWrapper = ({ name, path, children }) => {
  const title = `Project Local – ${name}`;
  const url = `https://projectlocal.vercel.app${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      {children}
    </>
  );
};

export default SeoWrapper;
