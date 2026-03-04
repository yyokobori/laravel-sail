import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ForbiddenPage, NotFoundPage, ServerErrorPage } from './view/errors';
import PublicTemplate from './template/PublicTemplate';
import UserTemplate from './template/UserTemplate';
import AdminTemplate from './template/AdminTemplate';

/**
 * 最小構成のプレースホルダー画面を描画する。
 * @param props プレースホルダー文言
 * @returns 画面コンポーネント
 */
function PlaceholderPage(props: { title: string }): JSX.Element {
  return (
    <main>
      <h1>{props.title}</h1>
    </main>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicTemplate>
        <PlaceholderPage title="Home" />
      </PublicTemplate>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicTemplate>
        <PlaceholderPage title="Login" />
      </PublicTemplate>
    ),
  },
  {
    path: '/user/dashboard',
    element: (
      <UserTemplate>
        <PlaceholderPage title="User Dashboard" />
      </UserTemplate>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminTemplate>
        <PlaceholderPage title="Admin Dashboard" />
      </AdminTemplate>
    ),
  },
  {
    path: '/errors/forbidden',
    element: (
      <PublicTemplate>
        <ForbiddenPage />
      </PublicTemplate>
    ),
  },
  {
    path: '/errors/not-found',
    element: (
      <PublicTemplate>
        <NotFoundPage />
      </PublicTemplate>
    ),
  },
  {
    path: '/errors/server-error',
    element: (
      <PublicTemplate>
        <ServerErrorPage />
      </PublicTemplate>
    ),
  },
  {
    path: '*',
    element: (
      <PublicTemplate>
        <NotFoundPage />
      </PublicTemplate>
    ),
  },
]);

/**
 * アプリケーションのルーターを描画する。
 * @returns ルーター描画コンポーネント
 */
export default function App(): JSX.Element {
  return <RouterProvider router={appRouter} />;
}