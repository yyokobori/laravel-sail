<?php

namespace App\Logging\Formatters;

use Monolog\Formatter\LineFormatter;

class CustomLineFormatter extends LineFormatter
{
    public function __construct()
    {
        // フォーマット例:
        // [info] ---\nログの内容\n-------------------\n
        $format = "[%level_name%] ---%extra.line_break%%message%%extra.line_break%-------------------%extra.line_break%";
        $dateFormat = null;
        parent::__construct($format, $dateFormat, true, true);
    }

    public function format(array $record): string
    {
        // 改行コードをextraに渡す（Monologの変数展開用）
        $record['extra']['line_break'] = "\n";
        return parent::format($record);
    }
}
