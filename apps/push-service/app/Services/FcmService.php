<?php

namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Messaging;
use Illuminate\Support\Facades\Log;

class FcmService
{
    protected Messaging $messaging;

    public function __construct()
    {
        // Factory will read JSON from GOOGLE_APPLICATION_CREDENTIALS env
        $factory = (new Factory)
            ->withServiceAccount(env('GOOGLE_APPLICATION_CREDENTIALS'));

        $this->messaging = $factory->createMessaging();
    }

    public function send(array $payload)
    {
        $title = $payload['title'] ?? '';
        $body  = $payload['body'] ?? '';
        $notification = Notification::create($title, $body);

        $message = CloudMessage::new()->withNotification($notification);

        if (!empty($payload['data'])) {
            $message = $message->withData($payload['data']);
        }

        $token = $payload['token'] ?? ($payload['tokens'][0] ?? null);
        if (!$token) {
            throw new \InvalidArgumentException('No token provided');
        }

        $response = $this->messaging->send($message, $token);
        Log::info('FCM send result', ['response' => $response]);

        return $response;
    }
}