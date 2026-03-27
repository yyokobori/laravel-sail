<?php

namespace App\Logging\Processors;

/**
 * ログ出力前にパスワード・トークン・メール等の機密情報を自動マスキングするプロセッサ。
 *
 * @package App\Logging\Processors
 */
class SensitiveDataMaskingProcessor
{
    private array $patterns = [
        // パスワード系
        '/("password"\s*:\s*")[^"]*(")/i' => '$1***$2',
        "/'password'\s*=>\s*'[^']*'/i" => "'password' => '***'",
        // トークン系
        '/("token"\s*:\s*")[^"]*(")/i' => '$1***$2',
        '/Bearer\s+[A-Za-z0-9\-._~+\/]+=*/i' => 'Bearer ***',
        // メールアドレス
        '/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i' => '***@***.***',
        // クレジットカード（連続数字16桁）
        '/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/' => '****-****-****-****',
    ];

    /**
     * ログレコードのmessage/context/extraをマスキング
     *
     * @param array $record ログレコード
     * @return array マスキング済みのログレコード
     */
    public function __invoke(array $record): array
    {
        // message, context, extra を全てマスキング
        $record['message'] = $this->mask($record['message']);
        // contextが存在する場合はマスキング
        if (isset($record['context'])) {
            $record['context'] = $this->maskArray($record['context']);
        }
        // extraが存在する場合はマスキング
        if (isset($record['extra'])) {
            $record['extra'] = $this->maskArray($record['extra']);
        }
        return $record;
    }

    /**
     * 文字列中の機密情報を正規表現でマスキング
     * @param string $text
     * @return string
     */
    private function mask(string $text): string
    {
        // パターンごとに正規表現で置換
        foreach ($this->patterns as $pattern => $replacement) {
            $text = preg_replace($pattern, $replacement, $text);
        }
        return $text;
    }

    /**
     * 配列中のすべての文字列要素をマスキング
     * @param array $data
     * @return array
     */
    private function maskArray(array $data): array
    {
        // 配列の全要素を再帰的にマスキング
        array_walk_recursive($data, function (&$value) {
            // 文字列の場合のみマスキング
            if (is_string($value)) {
                $value = $this->mask($value);
            }
        });
        return $data;
    }
}
