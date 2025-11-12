<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use Illuminate\Support\Str;

class TestPublishController extends Controller
{
    public function publish(Request $request)
    {
        $payload = $request->all();
        // dd($payload);
        $payload['msg_id'] = $payload['msg_id'] ?? Str::uuid()->toString();

        $connection = new AMQPStreamConnection(
            env('RABBITMQ_HOST', 'rabbitmq'),
            env('RABBITMQ_PORT', 5672),
            env('RABBITMQ_USER', 'guest'),
            env('RABBITMQ_PASS', 'guest')
        );

        $channel = $connection->channel();
        $exchange = env('RABBITMQ_EXCHANGE', 'notifications.direct');
        $queue = env('RABBITMQ_QUEUE', 'notifications.push.queue');

        $channel->exchange_declare($exchange, 'direct', false, true, false);
        $channel->queue_declare($queue, false, true, false, false);
        $channel->queue_bind($queue, $exchange);

        $msg = new AMQPMessage(json_encode($payload), ['content_type' => 'application/json']);
        $channel->basic_publish($msg, $exchange);

        $channel->close();
        $connection->close();

        return response()->json(['success' => true, 'msg_id' => $payload['msg_id']]);
    }
}