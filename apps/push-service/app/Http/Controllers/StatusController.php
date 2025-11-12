<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redis;

class StatusController extends Controller
{
    public function show(string $msgId)
    {
        $status = Redis::get("notification:{$msgId}:status") ?? 'unknown';
        return response()->json(['msg_id' => $msgId, 'status' => $status]);
    }
}