# Lysand Protocol

> **Note:** This protocol is still in development and is not ready for use yet. This document is a draft, and is subject to change.

## Introduction

The Lysand Protocol is meant to be a protocol for federated applications to communicate with each other using the HTTP stack. It is meant to be a simple protocol that is easy to implement and understand.

Unlike ActivityPub, Lysand includes many more out of the box features designed for social media applications. It is also designed to be more secure and private by default.

Lysand tries to be as standardized and possible and discourage use of vendor-specific implementations, such as what Mastodon has done with ActivityPub. It is based on simple JSON objects and HTTP requests, with no need for complex serialization formats.

TypeScript types are provided in this repository for every object in the protocol, which can be easily adapted to other languages.

## Protocol

Lysand tries to have similar concepts to already existing popular protocols, such as ActivityPub and ActivityStreams. However, it is not compatible with either of them. It is also not compatible with ActivityPub's JSON-LD serialization format.

Lysand-compatible servers may implement other protocols as well, such as ActivityPub, but they are not required to do so.

All request bodies and response bodies **MUST** be encoded as UTF-8 JSON.

### Objects

Objects are the main building blocks of the Lysand protocol. They are JSON objects that represent a publication, such as a post or a comment.

Here is an example object:
```json5
{
    "type": "Note",
    "id": "f08a124e-fe90-439e-8be4-15a428a72a19",
    "uri": "https://example.com/objects/f08a124e-fe90-439e-8be4-15a428a72a19",
    "created_at": "2021-01-01T00:00:00.000Z",
    "contents": [
        {
            "content": "Hello, world!",
            "content_type": "text/plain"
        },
        {
            "content": "Hello, <b>world</b>!",
            "content_type": "text/html"
        }
    ],
    "replies_to": [
        "https://test.com/objects/0b6ecf49-2959-4590-afb6-232f57036fa6"
    ],
    "mentions": [
        "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    ]
}
```

#### Type

The `type` field on an Object is a string that represents the type of the object. It is used to determine how the object should be displayed to the user.

The `type` field is required on all objects.

Currently available types are:
- `Note`
- `Patch`

##### Note

A `Note` object is a simple object that represents a post or publication. It is the most common type of object.

##### Patch

A `Patch` object is an object that represents a change to another object. It is used to update an object, such as when a spelling mistake is made and needs to be corrected.

`Patch` objects are not meant to be displayed to the user, and are only meant to be used internally by the server.

`Patch` objects **MUST** have a different `id` as the object that they are patching, and **MUST** have a `patched_at` field that contains the date and time that the object was patched. The `id` of the object that is being patched **MUST** be stored in the `patched_id` field.

Subsequent patches are applied to the original object, not to the previous patch. It is up to the server to display the most recent patch it has in storage to the client.

> **Note:**: A `Patch` object must replace the object that it is patching when displayed to the client. As such, if a Patch object is missing some fields from the previous object, these fields should not be displayed to the user

Here is an example `Patch` for the aforementioned object:
```json5
{
    "type": "Patch",
    "id": "4c21fdea-1318-4d14-b3aa-1ac2f3db2e53",
    "uri": "https://example.com/objects/4c21fdea-1318-4d14-b3aa-1ac2f3db2e53",
    "patched_id": "f08a124e-fe90-439e-8be4-15a428a72a19",
    "patched_at": "2021-01-01T00:00:00.000Z",
    "contents": [
        {
            "content": "This is patched!",
            "content_type": "text/plain"
        },
    ],
    // ...
}
```

#### ID

The `id` field on an Object is a string that represents the unique identifier of the object. It is used to identify the object, and **MUST** be unique across all objects.

The `id` field is not required to be unique across the entire network, but it is recommended that it is. Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field.

The `id` field is required on all objects.

#### Created At

The `created_at` field on an Object is a string that represents the date and time that the object was created. It is used to determine the order of objects. The data **MUST** be in ISO 8601 format.

Example: `2021-01-01T00:00:00.000Z`

The `created_at` field is required on all objects.

> **Note:** The `created_at` field should be the date and time that the post was actually made, but it is not required to be. Any ISO 8601 date is allowed in the `created_at` field. It is up to the servers to decide if they want to process dates that they would consider invalid, such as dates in the future.

#### URI

The `uri` field on an Object is a string that represents the URI of the object. It is used to identify the object, and **MUST** be unique across all objects. This URI **MUST** be unique across the entire network, and contain the `id` of the object in the URI.

The `uri` field is required on all objects.

#### Contents

The `contents` field on an Object is an array that contains a list of `ContentFormat` objects.

The `contents` field is not required on all objects. If it is not provided, it is assumed that the object does not have any content.

It is recommended that servers limit the length of the content from 500 to a couple thousand characters, but it is up to the server to decide how long the content can be. The protocol does not have an upper limit for the length of the content.

The `contents` field **MUST** be a text format, such as `text/plain` or `text/html`. The `contents` field **MUST NOT** be a binary format, such as `image/png` or `video/mp4`.

##### ContentFormat

A `ContentFormat` object can be represented as such in TypeScript:

```ts
interface ContentFormat {
    content: string;
    content_type: string;
}
```

An example value would be:
```json
{
    "content": "Hello, world!",
    "content_type": "text/plain"
}
```

The `contents` field is a string that contains the actual content of the object. The `content_type` field is a string that contains the MIME type of the content.

An example value for the `contents` field would be:
```json5
{
    // ...
    "contents": [
        {
            "content": "Hello, world!",
            "content_type": "text/plain"
        },
        {
            "content": "Hello, <b>world</b>!",
            "content_type": "text/html"
        }
    ]
    // ...
}
```

> **Note:** Lysand heavily recommends that servers support the `text/html` content type, as it is the most rich content type that is supported by most clients.

> **Note**: Lysand also recommends that servers always include a `text/plain` version of each object, as it is the most basic content type that is supported by all clients, such as command line clients.

It is up to the client to choose which content format to display to the user. The client may choose to display the first content format that it supports, or it may choose to display the content format that it thinks is the most appropriate.

Lysand recommends that clients display the richest content format that they support, such as HTML or more exotic formats such as MFM.

#### Replies To

The `replies_to` field on an Object is an array that contains a list of URIs that represent the objects that the object is replying to. It is used to determine the reply chain of an object.

The `replies_to` field is not required on all objects. If it is not provided, it is assumed that the object is not replying to any other object.

`replies_to` is an array, which means that an object can reply to multiple objects at once. **Servers may want to limit this to a single object, however, to prevent mass spam.** It is up to the discretion of the server software to decide how many objects an object can reply to, but **it is recommended to not let users reply to more than one object at a time**.

#### Mentions

The `mentions` field on an Object is an array that contains a list of URIs that represent the users that the object is mentioning. It is used to determine which users are mentioned in an object.

The `mentions` field is not required on all objects. If it is not provided, it is assumed that the object is not mentioning any other users.

An example value for `mentions` would be:
```json5
{
    // ...
    "mentions": [
        "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    ]
    // ...
}
```

### Actors

Actors are the main users of the Lysand protocol. They are JSON objects that represent a user. They are similar to ActivityPub's `Actor` objects.

Actors **MUST** be referred to by their `id` internally and across the protocol. The `username` property MUST be treated as a changeable display name, and **MUST NOT** be used to identify the actor.

Here is an example actor:
```json5
{
    "type": "User",
    "id": "02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "uri": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "created_at": "2021-01-01T00:00:00.000Z",
    "display_name": "Gordon Ramsay",
    "username": "gordonramsay",
    "avatar": [
        {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.webp",
            "content_type": "image/webp"
        }
    ],
    "header": [
        {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.webp",
            "content_type": "image/webp"
        }
    ],
    "bio": [
        {
            "content": "This is my bio!",
            "content_type": "text/plain"
        },
        {
            "content": "This is my <b>bio</b>!",
            "content_type": "text/html"
        }
    ]
}
```

#### Type

The `type` field on an Actor is a string that represents the type of the actor. It is used to determine how the actor should be displayed to the user.

The `type` field is required on all actors.

Currently available types are:
- `User`

#### ID

The `id` field on an Actor is a string that represents the unique identifier of the actor. It is used to identify the actor, and **MUST** be unique across all actors.

The `id` field is not required to be unique across the entire network, but it is recommended that it is. Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field.

The `id` field is required on all actors.

#### Created At

The `created_at` field on an Actor is a string that represents the date and time that the actor was created. It is used to determine the order of actors. The data **MUST** be in ISO 8601 format.

Example: `2021-01-01T00:00:00.000Z`

The `created_at` field is required on all actors.

> **Note:** The `created_at` field should be the date and time that the actor was actually created, but it is not required to be. Any ISO 8601 date is allowed in the `created_at` field. It is up to the servers to decide if they want to process dates that they would consider invalid, such as dates in the future.

#### URI

The `uri` field on an Actor is a string that represents the URI of the actor. It is used to identify the actor, and **MUST** be unique across all actors. This URI **MUST** be unique across the entire network, and contain the `id` of the actor in the URI.

The `uri` field is required on all actors.

#### Display Name

The `display_name` field on an Actor is a string that represents the display name of the actor. It is used to display the actor's name to the user.

The `display_name` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a display name, and the actor's username should be used instead

Display names **MUST** be treated as changeable, and **MUST NOT** be used to identify the actor.

It is recommended that servers limit the length of the display name from 1 to 50 characters, but it is up to the server to decide how long the display name can be. The protocol does not have an upper limit for the length of the display name.

#### Username

The `username` field on an Actor is a string that represents the username of the actor. It is used to loosely identify the actor, and **MUST** be unique across all actors of a server.

The `username` field is required on all actors.

The `username` field **MUST NOT** be used to identify the actor internally or across the protocol. It is only meant to be used as a display name, and as such is changeable by the user.

It is recommended that servers limit the length of the username from 1 to 20 characters, but it is up to the server to decide how long the username can be. The protocol does not have an upper limit for the length of the username.

#### Avatar

The `avatar` field on an Actor is an array that contains a list of `ContentFormat` objects.

The `avatar` field is not required on all actors. If it is not provided, it is assumed that the actor does not have an avatar.

The avatar content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The avatar content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each avatar, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

#### Header

The `header` field on an Actor is an array that contains a list of `ContentFormat` objects. It is meant to serve as a banner for users.

The `header` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a header.

The header content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The header content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each header, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

#### Bio

The `bio` field on an Actor is an array that contains a list of `ContentFormat` objects.

The `bio` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a bio.

The `bio` field is used to display a short description of the actor to the user. It is recommended that servers limit the length of the bio from 500 to a couple thousand characters, but it is up to the server to decide how long the bio can be. The protocol does not have an upper limit for the length of the bio.

The `bio` **MUST** be a text format, such as `text/plain` or `text/html`. The `bio` **MUST NOT** be a binary format, such as `image/png` or `video/mp4`.

