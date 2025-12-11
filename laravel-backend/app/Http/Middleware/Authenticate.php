<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo($request): ?string
    {
        // For APIs, don't redirect to a login route — just return 401 Unauthorized
        if ($request->expectsJson()) {
            return null;
        }

        // If you ever add a web login page, you can return its route here.
        // For now, return null so no redirect happens.
        return null;
    }
}
