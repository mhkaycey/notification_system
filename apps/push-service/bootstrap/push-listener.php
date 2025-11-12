<?php

use Illuminate\Contracts\Console\Kernel;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

$connection = new AMQPStreamConnection(
    env('RABBITMQ_HOST', 'rabbitmq'),
    env('RABBITMQ_PORT', 5672),
    env('RABBITMQ_USER', 'guest'),
    env('RABBITMQ_PASS', 'guest'),
    env('RABBITMQ_VHOST', '/')
);

$channel = $connection->channel();
$queue = env('RABBITMQ_QUEUE', 'notifications.push.queue');
$channel->queue_declare($queue, false, true, false, false);

echo "✅ Push service listening on queue: {$queue}\n";

$callback = function (AMQPMessage $msg) {
    $data = json_decode($msg->body, true);
    echo "📩 Received message {$msg->body}\n";
    dispatch(new \App\Jobs\ProcessPushNotification($data));
};

$channel->basic_consume($queue, '', false, true, false, false, $callback);

while ($channel->is_open()) {
    $channel->wait();
}