module.exports = {
  title: 'My Docs',
  url: 'http://localhost:3000',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'my-org', // GitHub org/user name.
  projectName: 'my-docs', // Repo name.
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: { sidebarPath: require.resolve('./sidebars.js') },
        blog: { showReadingTime: true },
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'My Docs',
      items: [
        { href: '/typedoc/', label: 'TypeDoc', position: 'right' }, // toはspaのルーティングで、hrefは通常のリンク
        { href: '/phpdoc/', label: 'PHPDoc', position: 'right' },
        // http://localhost:8080/ で起動しているswagger-uiのURLを指定
        { href: 'http://localhost:8080/', label: 'Swagger UI', position: 'right' },
      ],
    },
  },
};
