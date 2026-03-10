<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * ログ関連の初期設定（LogContext, Processor登録, デフォルトチャネル切替）を一元管理するサービスプロバイダ。
 *
 * @package App\Providers
 */
use App\Logging\LogContext;
use App\Logging\Processors\ContextProcessor;
use App\Logging\Processors\SensitiveDataMaskingProcessor;

class LoggingServiceProvider extends ServiceProvider
{
    /**
     * サービス登録（LogContextのシングルトン登録）
     * @return void
     */
    public function register(): void
    {
        $this->app->singleton(LogContext::class);
    }

    /**
     * プロセッサ登録・デフォルトチャネル切替
     * @return void
     */
    public function boot(): void
    {
        $this->configureProcessors();
        $this->configureDefaultChannel();
    }

    /**
     * 各チャネルにプロセッサを登録
     * @return void
     */
    private function configureProcessors(): void
    {
        // 各チャネル（develop, error, info）にプロセッサを登録
        foreach (['develop', 'error', 'info'] as $channel) {
            $logger = $this->app->make('log')->channel($channel);
            $logger->getLogger()->pushProcessor(app(ContextProcessor::class));
            $logger->getLogger()->pushProcessor(app(SensitiveDataMaskingProcessor::class));
        }
    }

    /**
     * local環境時にデフォルトチャネルをdevelopに切り替え
     * @return void
     */
    private function configureDefaultChannel(): void
    {
        if (app()->environment('local')) {
            config(['logging.default' => 'develop']);
        }
    }
}
