interface Object {
    type: string;
    id: string; // Either a UUID or some kind of time-based UUID-compatible system
    uri: string; // URI to the note
    contents: ContentFormat[];
    extensions: {
        // Should be in the format
        // "organization:extension_name": value
        // Example: "org.joinmastodon:spoiler_text": "This is a spoiler!"
        [key: string]: any;
    }
}

/**
 * A Note is a publication on the network, such as a post or comment
 */
interface Note extends Object {
    type: "Note";
}

/**
 * A Patch is an edit to a Note
 */
interface Patch extends Object {
    type: "Patch";
    patched_id: string;
    patched_at: string;
}

/**
 * Content format is an array of objects that contain the content and the content type.
 */
interface ContentFormat {
    content: string;
    content_type: string;
}