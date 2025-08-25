<?php

namespace App\Http\Controllers;

use App\Events\DelayedEvent;
use Illuminate\Http\Request;

class DelayedEventController extends Controller
{
    public function __invoke(Request $request): void
    {
       event(new DelayedEvent());
    }
}
