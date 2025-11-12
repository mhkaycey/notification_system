<?php

namespace App\Jobs;

use App\Services\FcmService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;
use Throwable;

class ProcessPushNotification implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected array $payload;
    public $tries = 5;
    public $backoff = 10;

    public function __construct(array $payload)
    {
        $this->payload = $payload;
    }

    public function handle(FcmService $fcm)
    {
        $msgId = $this->payload['msg_id'] ?? null;
        if (!$msgId) return;

        if (Redis::exists("notification:{$msgId}:status")) {
            return; // already processed
        }

        Redis::setex("notification:{$msgId}:processing", 300, true);

        try {
            $fcm->send($this->payload);
            Redis::set("notification:{$msgId}:status", 'sent');
        } catch (Throwable $e) {
            Redis::set("notification:{$msgId}:status", 'failed:' . $e->getMessage());
            throw $e;
        } finally {
            Redis::del("notification:{$msgId}:processing");
        }
    }
}