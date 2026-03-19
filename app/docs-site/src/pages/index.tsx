import React from 'react';
import GenerateDocsButton from "../components/GenerateDocsButton";
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout title="Home">
      <main>
        <h1>Welcome to Docusaurus!</h1>
        <p>This is the home page.</p>
        <GenerateDocsButton />
      </main>
    </Layout>
  );
}