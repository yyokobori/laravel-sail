<?php

use Illuminate\Support\Facades\Route;

// 開発環境: Laravelのウェルカムページ
// 本番環境: Reactアプリ（public/index.htmlが存在する場合）
Route::get('/', function () {
    // Reactのビルド成果物が存在する場合はそれを返す
    if (file_exists(public_path('index.html'))) {
        return file_get_contents(public_path('index.html'));
    }
    return view('welcome');
});

// SPA用のフォールバックルート（APIルート以外）
// Reactのルーティングを有効にするため、全てのルートでindex.htmlを返す
Route::fallback(function () {
    if (file_exists(public_path('index.html'))) {
        return file_get_contents(public_path('index.html'));
    }
    abort(404);
});
