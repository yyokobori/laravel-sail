<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Logging\LogContext;

/**
 * リクエストごとに一意なIDを生成し、LogContextにセット＆レスポンスヘッダーに付与するミドルウェア。
 *
 * @package App\Http\Middleware
 */
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AssignRequestId
{
    public function __construct(private LogContext $context) {}

    /**
     * リクエストIDを生成し、LogContextにセット＆レスポンスヘッダーに付与
     *
     * @param Request $request
     * @param Closure $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // リクエストID生成・設定
        $requestId = (string) Str::uuid(); // UUID形式で生成
        $this->context->setRequestId($requestId);

        // レスポンスヘッダーにも付与
        $response = $next($request);
        // レスポンスが正しい型の場合のみヘッダー付与
        if ($response instanceof Response) {
            $response->headers->set('X-Request-ID', $requestId); // 追跡用ID
        }
        return $response;
    }
}
