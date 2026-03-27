<?php

namespace App\Logging\Formatters;

use Monolog\Formatter\LineFormatter;

class CustomLineFormatter extends LineFormatter
{
    /**
     * @var bool スタックトレースを出力するか
     */

    private bool $showStackTrace = false;

    public function __construct(bool $showStackTrace = false)
    {
        // フォーマット例:
        // [info] ---\nログの内容\n-------------------\n
        $format = "[%level_name%] ---%extra.line_break%%message%%extra.line_break%-------------------%extra.line_break%";
        $dateFormat = null;
        parent::__construct($format, $dateFormat, true, true);

        // 引数でtrueが渡された場合はそれを優先、falseなら環境判定で切り替え
        if ($showStackTrace) {
            $this->showStackTrace = true;
        } else {
            $env = env('APP_ENV', 'production');
            if (in_array($env, ['local', 'develop', 'development', 'stg', 'stage', 'staging'], true)) {
                $this->showStackTrace = true;
            }
        }
    }

    public function format(array $record): string
    {
        // 改行コードをextraに渡す（Monologの変数展開用）
        $record['extra']['line_break'] = "\n";

        // 例外があり、stack traceを出力しない場合は削除
        if (isset($record['context']['exception']) && !$this->showStackTrace) {
            if (is_object($record['context']['exception']) && method_exists($record['context']['exception'], 'getMessage')) {
                // メッセージのみ残し、trace情報を除去
                $record['context']['exception'] = $record['context']['exception']->getMessage();
            } elseif (is_string($record['context']['exception'])) {
                // 文字列の場合はそのまま
                // ただしtraceらしき改行以降はカット
                $record['context']['exception'] = preg_replace('/\nStack trace:.*/s', '', $record['context']['exception']);
            }
        }
        return parent::format($record);
    }
}
