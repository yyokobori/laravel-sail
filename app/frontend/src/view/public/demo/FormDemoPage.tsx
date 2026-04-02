import React, { useState } from 'react';
import {
  Select,
  Input,
  Radio,
  Checkbox,
  Textarea,
  Datapicker,
  DEFAULT_INPUT_STYLES,
  ERROR_INPUT_STYLES,
  SUCCESS_INPUT_STYLES,
  DEFAULT_RADIO_STYLES,
  ERROR_RADIO_STYLES,
  DEFAULT_CHECKBOX_STYLES,
  ERROR_CHECKBOX_STYLES,
  DEFAULT_TEXTAREA_STYLES,
  ERROR_TEXTAREA_STYLES,
  DEFAULT_DATAPICKER_STYLES,
} from '../../../components/form';

type TabName = 'input' | 'radio' | 'checkbox' | 'textarea' | 'select' | 'datapicker';


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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeNewsLetter, setAgreeNewsLetter] = useState(false);
  const [description, setDescription] = useState('');
  const [memo, setMemo] = useState('初期状態では拡大縮小できません');
  const [showError, setShowError] = useState(false);
  const [country, setCountry] = useState('');
  // チェックアイコン付きSelect用
  const [fruit, setFruit] = useState('');
  const fruitOptions = [
    { value: 'apple', label: 'りんご' },
    { value: 'banana', label: 'バナナ' },
    { value: 'orange', label: 'オレンジ' },
    { value: 'grape', label: 'ぶどう' },
    { value: 'other', label: 'その他' },
  ];
  // 複数選択用
  const [colors, setColors] = useState<string[]>([]);
  const colorOptions = [
    { value: 'red', label: '赤' },
    { value: 'blue', label: '青' },
    { value: 'green', label: '緑' },
    { value: 'yellow', label: '黄' },
    { value: 'black', label: '黒' },
  ];
  const [animals, setAnimals] = useState<string[]>([]);
  const animalOptions = [
    { value: 'dog', label: '犬' },
    { value: 'cat', label: '猫' },
    { value: 'bird', label: '鳥' },
    { value: 'rabbit', label: 'うさぎ' },
    { value: 'other', label: 'その他' },
  ];
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2026, 3, 2));

  function renderDatapickerTab(): JSX.Element {
    return (
      <>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Datapicker Component
        </h2>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            基本スタイル
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Datapicker
              name="birthday"
              label="誕生日"
              value={birthday}
              onChange={setBirthday}
              locale="ja"
              startOfWeek="sun"
              format="YYYY/MM/DD(ddd)"
              placeholder="YYYY/MM/DD"
              styleClasses={DEFAULT_DATAPICKER_STYLES}
            />
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            日付範囲と週始まり指定
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Datapicker
              name="startDate"
              label="開始日（2026年のみ選択可）"
              value={startDate}
              onChange={setStartDate}
              locale="en"
              startOfWeek="mon"
              format="YYYY/MM/DD(ddd)"
              placeholder="YYYY/MM/DD"
              minDate={new Date(2026, 0, 1)}
              maxDate={new Date(2026, 11, 31)}
              weekendColors={{ sunday: 'text-red-500', saturday: 'text-blue-500' }}
              styleClasses={DEFAULT_DATAPICKER_STYLES}
            />
          </div>
        </section>

        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        >
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            現在の選択値
          </h3>
          <p style={{ marginBottom: '0.5rem' }}>
            誕生日: {birthday === null ? '（未選択）' : birthday.toLocaleDateString('ja-JP')}
          </p>
          <p>
            開始日: {startDate === null ? '（未選択）' : startDate.toLocaleDateString('ja-JP')}
          </p>
        </div>
      </>
    );
  }

  function renderSelectTab(): JSX.Element {
    return (
      <>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Select Component
        </h2>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            基本スタイル
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Select
              name="country"
              value={country}
              label="国籍"
              placeholder="国を選択してください"
              required
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
                { value: 'cn', label: '中国' },
                { value: 'fr', label: 'フランス' },
                { value: 'other', label: 'その他' },
              ]}
              status={showError && country === '' ? 'error' : 'default'}
              errorMessage="国を選択してください"
              onValueChange={v => typeof v === 'string' && setCountry(v)}
            />
          </div>

          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            チェックアイコン表示例
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <Select
              name="fruit"
              value={fruit}
              label="好きな果物"
              placeholder="果物を選択してください"
              options={fruitOptions}
              onValueChange={v => typeof v === 'string' && setFruit(v)}
              showCheckIcon={true}
            />
          </div>

          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            複数選択（チェックアイコンなし）
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <Select
              name="colors"
              value={colors}
              label="好きな色（複数選択可）"
              placeholder="色を選択してください"
              options={colorOptions}
              onValueChange={v => Array.isArray(v) && setColors(v)}
              multiple
            />
          </div>

          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            複数選択（チェックアイコンあり）
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <Select
              name="animals"
              value={animals}
              label="好きな動物（複数選択可）"
              placeholder="動物を選択してください"
              options={animalOptions}
              onValueChange={v => Array.isArray(v) && setAnimals(v)}
              multiple
              showCheckIcon
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
          <p style={{ marginBottom: '0.5rem' }}>国籍: {country || '（未選択）'}</p>
          <p style={{ marginBottom: '0.5rem' }}>好きな果物: {fruit || '（未選択）'}</p>
          <p style={{ marginBottom: '0.5rem' }}>好きな色: {colors.length > 0 ? colors.join(', ') : '（未選択）'}</p>
          <p style={{ marginBottom: '0.5rem' }}>好きな動物: {animals.length > 0 ? animals.join(', ') : '（未選択）'}</p>
        </div>
      </>
    );
  }

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
      backgroundColor: isActive ? '#4b5563' : '#ffffff',
      color: isActive ? '#ffffff' : '#000000',
      border: '2px solid #9ca3af',
      borderRight: isActive ? 'none' : '2px solid #9ca3af',
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
            <p
              style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                marginBottom: '0.5rem',
              }}
            >
              ※「プラン選択」は、ラジオボタンON時に別マーク（SVG）を使えるサンプルです。
            </p>
            <Radio
              name="plan"
              value={plan}
              label="プラン選択（ON時カスタムマーク例）"
              options={[
                { value: 'free', label: '無料プラン' },
                { value: 'standard', label: 'スタンダード' },
                { value: 'premium', label: 'プレミアム' },
              ]}
              radioIconSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 12.5 9.2 17.5 20 6.5' fill='none' stroke='black' stroke-width='4.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
              radioMarkColor="#111827"
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

  /**
   * Checkbox タブのコンテンツを描画する。
   * @returns Checkbox デモコンテンツ
   */
  function renderCheckboxTab(): JSX.Element {
    return (
      <>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Checkbox Component
        </h2>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            基本スタイル（デフォルトSVG）
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Checkbox
              name="agreeTerms"
              checked={agreeTerms}
              label="利用規約"
              optionLabel="利用規約に同意する"
              required
              status={showError && !agreeTerms ? 'error' : 'default'}
              errorMessage="同意が必要です"
              styleClasses={showError && !agreeTerms ? ERROR_CHECKBOX_STYLES : DEFAULT_CHECKBOX_STYLES}
              onCheckedChange={setAgreeTerms}
            />
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            カスタムSVG + チェック色変更
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Checkbox
              name="agreeNewsLetter"
              checked={agreeNewsLetter}
              label="お知らせ設定"
              optionLabel="メール通知を受け取る"
              checkMarkColor="#000000"
              styleClasses={DEFAULT_CHECKBOX_STYLES}
              onCheckedChange={setAgreeNewsLetter}
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
          <p style={{ marginBottom: '0.5rem' }}>利用規約: {agreeTerms ? '同意済み' : '未同意'}</p>
          <p>メール通知: {agreeNewsLetter ? '有効' : '無効'}</p>
        </div>
      </>
    );
  }

  /**
   * Textarea タブのコンテンツを描画する。
   * @returns Textarea デモコンテンツ
   */
  function renderTextareaTab(): JSX.Element {
    return (
      <>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Textarea Component
        </h2>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            デフォルト（拡大縮小不可）
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Textarea
              name="description"
              value={description}
              label="説明"
              placeholder="内容を入力してください"
              required
              status={showError && description === '' ? 'error' : 'default'}
              errorMessage="説明を入力してください"
              styleClasses={showError && description === '' ? ERROR_TEXTAREA_STYLES : DEFAULT_TEXTAREA_STYLES}
              onValueChange={setDescription}
            />
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            拡大縮小可能（縦方向）
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Textarea
              name="memo"
              value={memo}
              label="メモ"
              placeholder="縦方向にリサイズ可能"
              resizeMode="vertical"
              styleClasses={DEFAULT_TEXTAREA_STYLES}
              onValueChange={setMemo}
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
            現在の入力値
          </h3>
          <p style={{ marginBottom: '0.5rem' }}>説明: {description || '（未入力）'}</p>
          <p>メモ: {memo}</p>
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
          <button
            type="button"
            onClick={() => setActiveTab('checkbox')}
            style={getTabStyle('checkbox')}
          >
            Checkbox
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('textarea')}
            style={getTabStyle('textarea')}
          >
            Textarea
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('select')}
            style={getTabStyle('select')}
          >
            Select
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('datapicker')}
            style={getTabStyle('datapicker')}
          >
            Datapicker
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
        {activeTab === 'checkbox' && renderCheckboxTab()}
        {activeTab === 'textarea' && renderTextareaTab()}
        {activeTab === 'select' && renderSelectTab()}
        {activeTab === 'datapicker' && renderDatapickerTab()}
      </div>
    </main>
  );
}
