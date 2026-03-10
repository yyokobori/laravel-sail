<?php

namespace App\Logging;

/**
 * リクエスト単位で共通ログ情報（request_id, user_id, route等）を保持・提供するクラス。
 *
 * @package App\Logging
 */
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class LogContext
{
    private ?string $requestId = null;
    private ?int $userId = null;
    private ?string $route = null;
    private ?string $httpMethod = null;

    /**
     * リクエストIDを生成・取得
     *
     * @return string UUID形式のリクエストID
     */
    public function getRequestId(): string
    {
        // 既にセット済みならそれを返し、未セットならUUID生成
        return $this->requestId ??= Str::uuid()->toString();
    }

    /**
     * リクエストIDを手動で設定
     * @param string $id UUID
     * @return void
     */
    public function setRequestId(string $id): void
    {
        $this->requestId = $id;
    }

    /**
     * ユーザーID取得（認証済みの場合のみ）
     * @return int|null ユーザーID
     */
    public function getUserId(): ?int
    {
        // 既にセット済みならそれを返し、未セットならAuthから取得
        return $this->userId ?? Auth::id();
    }

    /**
     * ユーザーIDを手動で設定
     * @param int|null $userId
     * @return void
     */
    public function setUserId(?int $userId): void
    {
        $this->userId = $userId;
    }

    /**
     * ルート名を取得
     * @return string|null ルート名
     */
    public function getRoute(): ?string
    {
        // 既にセット済みならそれを返し、未セットならリクエストから取得
        return $this->route ?? request()->route()?->getName();
    }

    /**
     * ルート名を手動で設定
     * @param string|null $route
     * @return void
     */
    public function setRoute(?string $route): void
    {
        $this->route = $route;
    }

    /**
     * すべての共通情報を配列で取得
     * @return array{request_id:string,user_id:int|null,route:string|null,http_method:string,url:string}
     */
    public function toArray(): array
    {
        return [
            'request_id' => $this->getRequestId(),
            'user_id' => $this->getUserId(),
            'route' => $this->getRoute(),
            'http_method' => request()->method(),
            'url' => request()->url(),
        ];
    }
}
