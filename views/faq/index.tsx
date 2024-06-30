'use client';

const FAQView = () => {
  return (
    <iframe
      src="https://metastablelabs.notion.site/How-Launchbox-works-2e8612854e054c1e8bf0e1ff025b8af4?pvs=25"
      className="w-full min-h-screen"
      onError={(e) => console.error('Iframe failed to load:', e)}
    />
  );
};

export default FAQView;
