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
        { to: '/typedoc/index.html', label: 'TypeDoc', position: 'right' },
        { to: '/phpdoc/index.html', label: 'PHPDoc', position: 'right' },
      ],
    },
  },
};
