interface Object {
    type: string;
    id: string; // Either a UUID or some kind of time-based UUID-compatible system
    uri: string; // URI to the note
    created_at: string;
    extensions?: {
        // Should be in the format
        // "organization:extension_name": value
        // Example: "org.joinmastodon:spoiler_text": "This is a spoiler!"
        [key: string]: any;
    }
}

interface User extends Object {
    type: "User";
    bio: ContentFormat[];
    display_name?: string;
    username: string;
    avatar?: ContentFormat[];
    header?: ContentFormat[];
}

/**
 * A Note is a publication on the network, such as a post or comment
 */
interface Note extends Object {
    type: "Note";
    contents?: ContentFormat[];
    mentions?: string[];
    replies_to?: string;
}

/**
 * A Patch is an edit to a Note
 */
interface Patch extends Object {
    type: "Patch";
    contents?: ContentFormat[];
    mentions?: string[];
    replies_to?: string;
    patched_id: string;
    patched_at: string;
}

interface Like extends Object {
    type: "Like";
    object: string;
}

interface Follow extends Object {
    type: "Follow";
    followee: string;
}

interface FollowAccept extends Object {
    type: "FollowAccept";
    follower: string;
}

interface FollowReject extends Object {
    type: "FollowReject";
    follower: string;
}

interface ServerMetadata extends Object {
    type: "ServerMetadata";
    name: string;
    version?: string;
    description?: string;
    website?: string;
    moderators?: string[];
    admins?: string[];
    logo?: ContentFormat[];
    banner?: ContentFormat[];
}

/**
 * Content format is an array of objects that contain the content and the content type.
 */
interface ContentFormat {
    content: string;
    content_type: string;
}