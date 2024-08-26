<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class UserProfileController extends Controller
{
    public function getUserByToken(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 400);
        }

        try {
            $user = JWTAuth::parseToken()->authenticate();

            if ($user) {
                return response()->json($user, 200);
            } else {
                return response()->json(['error' => 'User not found'], 404);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'first_name' => 'string|max:255',
                'last_name' => 'string|max:255',
                'profile_picture' => 'string|nullable',
            ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $userProfile = Auth::user()->profile;

        if ($userProfile) {
            $userProfile->update($request->all());
            return response()->json($userProfile, 200);
        } else {
            return response()->json(['error' => 'Profile not found'], 404);
        }
    }

}
