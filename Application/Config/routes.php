<?php

return [

	/* MAIN PAGE */

	"" => 
	[
		"controller" => "main",
		"action" => "index"
	],

	/* ACCOUNT */

	"login" => 
	[
		"controller" => "account",
		"action" => "login"
	],

	"logout" => 
	[
		"controller" => "account",
		"action" => "logout"
	],

	"register" => 
	[
		"controller" => "account",
		"action" => "register"
	],

	"user" => 
	[
		"controller" => "account",
		"action" => "user"
	],

	"user/drafts" => 
	[
		"controller" => "account",
		"action" => "drafts"
	],

	"user/settings" =>
	[
		"controller" => "account",
		"action" => "settings"
	],

	/* ADMIN PANEL */

	"admin/panel" => 
	[
		"controller" => "admin",
		"action" => "panel"
	],

	"admin/loadFile" => 
	[
		"controller" => "admin",
		"action" => "loadFile"
	],

	"admin/posts" => 
	[
		"controller" => "admin",
		"action" => "posts"
	],

	"admin/create-post" => 
	[
		"controller" => "admin",
		"action" => "createPost"
	],


	/* CONTENT */

	/*"post" => 
	[
		"controller" => "content",
		"action" => "post"
	],*/

	"writing" =>
	[
		"controller" => "content",
		"action" => "writing"
	],

	"load-media" =>
	[
		"controller" => "content",
		"action" => "loadMedia"
	],
	
	"load-media-by-url" =>
	[
		"controller" => "content",
		"action" => "loadMediaByUrl"
	],

	"unload-media-by-url" =>
	[
		"controller" => "content",
		"action" => "unloadMediaByUrl"
	],

	"load-draft" => 
	[
		"controller" => "content",
		"action" => "loadDraft"
	],

	"download-communities" => 
	[
		"controller" => "content",
		"action" => "downloadCommunities"
	],

	"download-drafts-by-range" => 
	[
		"controller" => "content",
		"action" => "downloadDraftsByRange"
	],

	"download-draft-by-index" =>
	[
		"controller" => "content",
		"action" => "downloadDraftByIndex"
	],

	"download-info-current-user" =>
	[
		"controller" => "content",
		"action" => "downloadInfoCurrentUser"
	],

	"update-post" =>
	[
		"controller" => "content",
		"action" => "updatePost"
	],

	"user/draft" => 
	[
		"controller" => "content",
		"action" => "draft"
	],



];

?>