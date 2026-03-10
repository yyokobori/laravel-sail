import React, { useState } from 'react';
import { Input, DEFAULT_INPUT_STYLES } from '../../component/form';

/**
 * フォームコンポーネントの動作確認画面。
 * @returns 確認画面コンポーネント
 */
export function FormDemoPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  /**
   * 送信ボタン押下時の処理（デモ用）。
   */
  function handleSubmit(): void {
    setShowError(true);
  }

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Form Component Demo</h1>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <Input
          name="email"
          value={email}
          label="Email Address"
          placeholder="your@example.com"
          kind="email"
          status={showError && email === '' ? 'error' : 'default'}
          errorMessage="メールアドレスを入力してください"
          styleClasses={DEFAULT_INPUT_STYLES}
          onValueChange={setEmail}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <Input
          name="password"
          value={password}
          label="Password"
          placeholder="パスワードを入力"
          kind="password"
          status={showError && password === '' ? 'error' : 'default'}
          errorMessage="パスワードを入力してください"
          styleClasses={DEFAULT_INPUT_STYLES}
          onValueChange={setPassword}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <Input
          name="customInput"
          value=""
          label="カスタムスタイル例"
          placeholder="スタイルをオーバーライド"
          styleClasses={{
            ...DEFAULT_INPUT_STYLES,
            input: 'block w-full border-2 border-blue-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700',
          }}
          onValueChange={() => {}}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <Input
          name="noErrorDisplay"
          value=""
          label="エラー非表示例"
          placeholder="エラーはコンポーネント外で表示"
          status="error"
          errorMessage="このエラーは表示されません"
          showErrorMessage={false}
          styleClasses={DEFAULT_INPUT_STYLES}
          onValueChange={() => {}}
        />
        <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          親コンポーネントで管理するエラーメッセージ
        </p>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        Submit (エラー表示テスト)
      </button>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>入力値:</h2>
        <p>Email: {email}</p>
        <p>Password: {password ? '●'.repeat(password.length) : ''}</p>
      </div>
    </main>
  );
}
