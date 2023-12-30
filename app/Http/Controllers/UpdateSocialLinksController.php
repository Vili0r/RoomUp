<?php

namespace App\Http\Controllers;

use App\Rules\ValidFacebookProfile;
use App\Rules\ValidInstagramProfile;
use App\Rules\ValidLinkedinProfile;
use App\Rules\ValidTikTokProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class UpdateSocialLinksController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'facebook_link' => ['nullable', 'url', new ValidFacebookProfile],
            'instagram_link' => ['nullable', 'url', new ValidInstagramProfile],
            'tiktok_link' => ['nullable', 'url', new ValidTikTokProfile],
            'linkedin_link' => ['nullable', 'url', new ValidLinkedinProfile],
        ]);

        $user = $request->user();
        $user->update([
            'facebook_link' => $request->facebook_link,
            'instagram_link' => $request->instagram_link,
            'tiktok_link' => $request->tiktok_link,
            'linkedin_link' => $request->linkedin_link
        ]);
        
        $user->save();

        // Check if any of the social media links are not null
        $isAnySocialLinkPresent = !is_null($user->facebook_link) || !is_null($user->instagram_link) 
                    || !is_null($user->tiktok_link) || !is_null($user->linkedin_link);

        $user->verification()->update([
            'social_media_verified_at' => $isAnySocialLinkPresent ? now() : null,
        ]);

        return Redirect::route('profile.edit');
    }
}
