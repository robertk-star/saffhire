import Script from 'next/script';

export default function ChataraiWidget() {
  return (
    <Script
      id="chatarai-widget"
      src="https://www.chatarai.com/widget.js?v=chatarai-canonical-20260610a"
      data-site-id="saffhire"
      strategy="afterInteractive"
    />
  );
}
