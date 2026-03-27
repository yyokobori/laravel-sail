<?php

namespace App\Logging\Processors;

use App\Logging\LogContext;

/**
 * Monologレコードに共通コンテキスト（request_id, user_id, route等）を自動付与するプロセッサ。
 *
 * @package App\Logging\Processors
 */
class ContextProcessor
{
    /**
     * @param LogContext $context 共通情報を保持するLogContext
     */
    public function __construct(private LogContext $context) {}

    /**
     * Monologのログレコードに共通情報を追加する
     *
     * @param array $record ログレコード
     * @return array 追加済みのログレコード
     */
    public function __invoke(array $record): array
    {
        // extraフィールドに共通情報を追加（既存extraがあればマージ）
        $record['extra'] = array_merge(
            $record['extra'] ?? [],
            $this->context->toArray()
        );
        return $record;
    }
}
