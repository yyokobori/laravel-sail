import React, { useState } from 'react';
import {
  Input,
  Radio,
  DEFAULT_INPUT_STYLES,
  ERROR_INPUT_STYLES,
  SUCCESS_INPUT_STYLES,
  DEFAULT_RADIO_STYLES,
  ERROR_RADIO_STYLES,
} from '../../../component/form';

type TabName = 'input' | 'radio';

/**
 * フォームコンポーネントの動作確認画面。
 * @returns 確認画面コンポーネント
 */
export function FormDemoPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabName>('input');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successInput, setSuccessInput] = useState('validated@example.com');
  const [gender, setGender] = useState('');
  const [plan, setPlan] = useState('standard');
  const [showError, setShowError] = useState(false);

  /**
   * 送信ボタン押下時の処理（デモ用）。
   */
  function handleSubmit(): void {
    setShowError(true);
  }

  /**
   * タブボタンのスタイルを生成する。
   * @param tabName タブ名
   * @returns スタイルオブジェクト
   */
  function getTabStyle(tabName: TabName): React.CSSProperties {
    const isActive = activeTab === tabName;
    return {
      display: 'block',
      width: '100%',
      padding: '0.75rem 1rem',
      marginBottom: '0.5rem',
      backgroundColor: isActive ? '#000000' : '#ffffff',
      color: isActive ? '#ffffff' : '#000000',
      border: '2px solid #000000',
      borderRight: isActive ? 'none' : '2px solid #000000',
      borderRadius: '0.5rem 0 0 0.5rem',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.875rem',
      textAlign: 'left',
      position: 'relative',
      transition: 'all 0.2s',
    };
  }

  /**
   * Input タブのコンテンツを描画する。
   * @returns Input デモコンテンツ
   */
  function renderInputTab(): JSX.Element {
    return (
      <>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Input Component
        </h2>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            基本スタイル
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Input
              name="email"
              value={email}
              label="Email Address"
              placeholder="your@example.com"
              kind="email"
              required
              status={showError && email === '' ? 'error' : 'default'}
              errorMessage="メールアドレスを入力してください"
              styleClasses={showError && email === '' ? ERROR_INPUT_STYLES : DEFAULT_INPUT_STYLES}
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
              required
              status={showError && password === '' ? 'error' : 'default'}
              errorMessage="パスワードを入力してください"
              styleClasses={showError && password === '' ? ERROR_INPUT_STYLES : DEFAULT_INPUT_STYLES}
              onValueChange={setPassword}
            />
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            状態別スタイル
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Input
              name="errorExample"
              value=""
              label="エラー状態"
              placeholder="必須項目です"
              required
              status="error"
              errorMessage="この項目は必須です"
              styleClasses={ERROR_INPUT_STYLES}
              onValueChange={() => {}}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <Input
              name="successExample"
              value={successInput}
              label="成功状態"
              placeholder="検証済み"
              styleClasses={SUCCESS_INPUT_STYLES}
              onValueChange={setSuccessInput}
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
              styleClasses={ERROR_INPUT_STYLES}
              onValueChange={() => {}}
            />
            <p style={{
              color: '#dc2626',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginTop: '0.375rem',
            }}>
              ← 親コンポーネントで管理するエラーメッセージ
            </p>
          </div>
        </section>

        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#000000',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem',
          }}
        >
          Submit（バリデーションテスト）
        </button>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          border: '2px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            現在の入力値
          </h3>
          <p style={{ marginBottom: '0.5rem' }}>Email: {email || '（未入力）'}</p>
          <p style={{ marginBottom: '0.5rem' }}>
            Password: {password ? '●'.repeat(password.length) : '（未入力）'}
          </p>
          <p>Success Input: {successInput}</p>
        </div>
      </>
    );
  }

  /**
   * Radio タブのコンテンツを描画する。
   * @returns Radio デモコンテンツ
   */
  function renderRadioTab(): JSX.Element {
    return (
      <>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Radio Component
        </h2>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            基本スタイル
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Radio
              name="gender"
              value={gender}
              label="性別"
              options={[
                { value: 'male', label: '男性' },
                { value: 'female', label: '女性' },
                { value: 'other', label: 'その他' },
              ]}
              required
              status={showError && gender === '' ? 'error' : 'default'}
              errorMessage="性別を選択してください"
              styleClasses={showError && gender === '' ? ERROR_RADIO_STYLES : DEFAULT_RADIO_STYLES}
              onValueChange={setGender}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <Radio
              name="plan"
              value={plan}
              label="プラン選択"
              options={[
                { value: 'free', label: '無料プラン' },
                { value: 'standard', label: 'スタンダード' },
                { value: 'premium', label: 'プレミアム' },
              ]}
              styleClasses={DEFAULT_RADIO_STYLES}
              onValueChange={setPlan}
            />
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            エラー状態
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Radio
              name="errorExample"
              value=""
              label="必須項目"
              options={[
                { value: 'option1', label: '選択肢1' },
                { value: 'option2', label: '選択肢2' },
              ]}
              required
              status="error"
              errorMessage="いずれかを選択してください"
              styleClasses={ERROR_RADIO_STYLES}
              onValueChange={() => {}}
            />
          </div>
        </section>

        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#000000',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem',
          }}
        >
          Submit（バリデーションテスト）
        </button>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          border: '2px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            現在の選択値
          </h3>
          <p style={{ marginBottom: '0.5rem' }}>Gender: {gender || '（未選択）'}</p>
          <p>Plan: {plan}</p>
        </div>
      </>
    );
  }

  return (
    <main style={{ display: 'flex', minHeight: '100vh', padding: '2rem', gap: 0 }}>
      {/* 左側：タブナビゲーション */}
      <aside style={{ width: '200px', flexShrink: 0 }}>
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          paddingLeft: '1rem',
        }}>
          Form Demo
        </h1>
        <nav>
          <button
            type="button"
            onClick={() => setActiveTab('input')}
            style={getTabStyle('input')}
          >
            Input
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('radio')}
            style={getTabStyle('radio')}
          >
            Radio
          </button>
        </nav>
      </aside>

      {/* 右側：コンテンツエリア */}
      <div style={{
        flex: 1,
        padding: '0 2rem 2rem 3rem',
        borderLeft: '2px solid #e5e7eb',
      }}>
        {activeTab === 'input' && renderInputTab()}
        {activeTab === 'radio' && renderRadioTab()}
      </div>
    </main>
  );
}
