<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UserProfileController extends Controller
{
    public function show()
    {
        $userProfile = Auth::user()->profile;

        if ($userProfile) {
            return response()->json($userProfile, 200);
        } else {
            return response()->json(['error' => 'Profile not found'], 404);
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


    public function destroy()
    {
        $userProfile = Auth::user()->profile;

        if ($userProfile) {
            $userProfile->delete();
            return response()->json(['message' => 'Profile deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Profile not found'], 404);
        }
    }



}
