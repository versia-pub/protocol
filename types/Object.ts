interface Object {
    type: "Note";
    id: string; // Either a UUID or some kind of time-based UUID-compatible system
    url: string; // URL to the note
    contents: ContentFormat[];
    extensions: {
        // Should be in the format
        // "organization:extension_name": value
        // Example: "org.joinmastodon:spoiler_text": "This is a spoiler!"
        [key: string]: any;
    }
}

/**
 * Content format is an array of objects that contain the content and the content type.
 */
interface ContentFormat {
    content: string;
    content_type: string;
}