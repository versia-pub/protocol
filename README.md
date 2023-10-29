# Lysand Protocol

> **Note:** This protocol is still in development and is not ready for use yet. This document is a draft, and is subject to change.

## Introduction

The Lysand Protocol is meant to be a protocol for federated applications to communicate with each other using the HTTP stack. It is meant to be a simple protocol that is easy to implement and understand.

Unlike ActivityPub, Lysand includes many more out of the box features designed for social media applications. It is also designed to be more secure and private by default.

Lysand tries to be as standardized and possible and discourage use of vendor-specific implementations, such as what Mastodon has done with ActivityPub. It is based on simple JSON objects and HTTP requests, with no need for complex serialization formats.

TypeScript types are provided in this repository for every object in the protocol, which can be easily adapted to other languages.

## Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Protocol](#protocol)
- [Objects](#objects)
  - [ID](#id)
  - [Created At](#created-at)
  - [URI](#uri)
  - [Type](#type)
- [Structures](#structures)
    - [ContentFormat](#contentformat)
    - [Custom Emojis](#custom-emojis)
    - [Collections](#collections)
- [Categories](#categories)
    - [Publications](#publications)
        - [Type](#type-1)
        - [Note](#note)
        - [Patch](#patch)
        - [Author](#author)
        - [Contents](#contents)
        - [Replies To](#replies-to)
        - [Mentions](#mentions)
        - [Subject](#subject)
        - [Is Sensitive](#is-sensitive)
    - [Actors](#actors)
        - [Type](#type-2)
        - [ID](#id-1)
        - [Display Name](#display-name)
        - [Username](#username)
        - [Avatar](#avatar)
        - [Header](#header)
        - [Bio](#bio)
        - [Fields](#fields)
        - [Inbox](#inbox)
        - [Outbox](#outbox)
    - [Actions](#actions)
        - [Type](#type-3)
        - [Like](#like)
        - [Follow](#follow)
        - [Follow Accept](#follow-accept)
        - [Follow Reject](#follow-reject)
        - [Author](#author-1)
    - [Server Metadata](#server-metadata)
        - [Type](#type-4)
        - [Name](#name)
        - [Version](#version)
        - [Description](#description)
        - [Website](#website)
        - [Moderators](#moderators)
        - [Admins](#admins)
        - [Logo](#logo)
        - [Banner](#banner)
        - [Supported Extensions](#supported-extensions)
- [Protocol Extensions](#protocol-extensions)
    - [Adding New Object Types](#adding-new-object-types)
- [Official Protocol Extensions](#official-protocol-extensions)
    - [Custom Emojis](#custom-emojis-1)
        - [Type](#type-5)
        - [Name](#name-1)
        - [URL](#url)
        - [Alt](#alt)
    - [Reactions](#reactions)
        - [Type](#type-6)
        - [Object](#object)
        - [Content](#content)
        - [Reactions With Custom Emojis](#reactions-with-custom-emojis)
- [Federation](#federation)
    - [Cryptography](#cryptography)
    - [Discovery](#discovery)
    - [User Actor Endpoints](#user-actor-endpoints)
    - [User Inbox](#user-inbox)
    - [User Outbox](#user-outbox)
- [License](#license)

## Protocol

Lysand tries to have similar concepts to already existing popular protocols, such as ActivityPub and ActivityStreams. However, it is not compatible with either of them. It is also not compatible with ActivityPub's JSON-LD serialization format.

Lysand-compatible servers may implement other protocols as well, such as ActivityPub, but they are not required to do so.

All request bodies and response bodies **MUST** be encoded as UTF-8 JSON.

All IDs **MUST** be UUIDs or UUID-compatible. Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field.

All URIs **MUST** be absolute URIs, and **MUST** be HTTPS URIs, except for development purposes.

All URIs **MUST** be unique across the entire network, and **MUST** contain the `id` of the object in the URI.

All URIs **MUST** be normalized, and **MUST NOT** contain any query parameters.

## Objects

Lysand uses JSON objects as its data format. It is meant to be a simple format that is easy to implement and understand.

All JSON objects such as [Publications](#publications), [Actors](#actors), and [Actions](#actions) **MUST** have a `type` field that represents the type of the object. This is used to determine how the object should be displayed to the user.

These fields **MUST** be included in every JSON object:

#### ID

The `id` field on an Object is a string that represents the unique identifier of the object. It is used to identify the object, and **MUST** be unique across all objects.

The `id` field is not required to be unique across the entire network, but it is recommended that it is. Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field.

The `id` field is required on all objects.

#### Created At

The `created_at` field on an object is a string that represents the date and time that the object was created. It is used to determine the order of objects. The data **MUST** be in ISO 8601 format.

Example: `2021-01-01T00:00:00.000Z`

The `created_at` field is required on all objects.

> **Note:** The `created_at` field should be the date and time that the post was actually made, but it is not required to be. Any ISO 8601 date is allowed in the `created_at` field. It is up to the servers to decide if they want to process dates that they would consider invalid, such as dates in the future.

#### URI

The `uri` field on an object is a string that represents the URI of the object. It is used to identify the object, and **MUST** be unique across all objects. This URI **MUST** be unique across the entire network, and contain the `id` of the object in the URI.

The `uri` field is required on all objects.

### Type

The `type` field on an object is a string that represents the type of the object. It is used to determine how the object should be displayed to the user.

The `type` field is required on all objects.

## Structures

### ContentFormat

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

### Custom Emojis

Lysand supports custom emojis. They are represented as such in TypeScript:

```ts
interface Emoji {
    name: string;
    url: ContentFormat[];
}
```

Lysand custom emojis are implemented as part of an official optional extension to the protocol. See [Protocol Extensions](#protocol-extensions) for more information.

Servers **MAY** choose not to implement custom emojis, but it is recommended that they do so.

An example value would be:
```json
{
    "name": "happy_face",
    "alt": "A happy face emoji.",
    "url": [
        {
            "content": "https://cdn.example.com/emojis/happy_face.webp",
            "content_type": "image/webp"
        }
    ]
}
```

The `name` field **MUST** be a string that contains only alphanumeric characters, underscores, and dashes. It **MUST NOT** contain any spaces or other special characters.

It **MUST** match this regex: `/^[a-zA-Z0-9_-]+$/`

---

The `url` field is an array that contains a list of `ContentFormat` objects. It is meant to serve as a list of URLs that the emoji can be accessed at.

The `url` field is required on all emojis.

The `url` field **MUST** contain at least one URL.

The `url` field **MUST** be a binary image format, such as `image/png` or `image/jpeg`. The `url` field **MUST NOT** be a text format, such as `text/plain` or `text/html`.

---
The `alt` field is a string that contains the alt text for the emoji. It is used to describe the emoji to users that cannot see the emoji, such as users that are blind, or when the emoji does not load properly.

The `alt` field is not required on all emojis. If it is not provided, it is assumed that the emoji does not have an alt text.

---

Emojis normally do not need to be transcoded into more modern formats, as they are typically small and do not take up much bandwidth. However, servers **MAY** choose to transcode emojis into more modern formats, such as WebP, AVIF, JXL, or HEIF.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

Emoji size is not standardized, and is up to the server to decide. Servers **MAY** choose to limit the size of emojis, but it is not required. Generally, an upper limit of a few hundred kilobytes is recommended so as to not take up too much bandwidth.

### Collections

Collections are JSON objects that contain a list of other objects. They are used to represent a list of objects, such as a list of publications or a list of users.

Collections can be represented as such in TypeScript:

```ts
interface Collection<T> {
    first: string;
    last: string;
    total_items: number;
    next?: string;
    prev?: string;
    items: T[];
}
```

Collections **MUST** contain a `first` field that contains the URI of the first item in the collection, and a `last` field that contains the URI of the last item in the collection.

Collections **MUST** contain a `total_items` field that contains the total number of items in the collection.

Collections **MUST** contain a `next` field that contains the URI of the next page of items in the collection, and a `prev` field that contains the URI of the previous page of items in the collection, unless the user is on the first or last page of the collection.

Collections **MUST** contain an `items` field that contains a list of items in the collection. (for example, a list of publications or a list of users)

## Categories

Lysand has three main categories of objects: [Publications](#publications), [Actors](#actors), and [Actions](#actions).

Each category is simply provided as a way to sort through the objects. They are not meant to be used as a way to determine how to display the object to the user.

Each category may have multiple object types within it. For example, the [Publications](#publications) category has the `Note` and `Patch` object types.

### Publications

Publications are the main building blocks of the Lysand protocol. They are JSON objects that represent a publication, such as a post or a comment.

Here is an example publication:
```json5
{
    "type": "Note",
    "id": "f08a124e-fe90-439e-8be4-15a428a72a19",
    "uri": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
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
        "https://test.com/publications/0b6ecf49-2959-4590-afb6-232f57036fa6"
    ],
    "mentions": [
        "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    ],
    // ...
}
```

#### Type

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
    "uri": "https://example.com/publications/4c21fdea-1318-4d14-b3aa-1ac2f3db2e53",
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

#### Author

The `author` field on a Publication is a string that represents the URI of the user that created the object. It is used to identify the author of the Publication.

The `author` field is required on all publications.

#### Contents

The `contents` field on a Publication is an array that contains a list of `ContentFormat` objects.

The `contents` field is not required on all publications. If it is not provided, it is assumed that the publication does not have any content.

It is recommended that servers limit the length of the content from 500 to a couple thousand characters, but it is up to the server to decide how long the content can be. The protocol does not have an upper limit for the length of the content.

The `contents` field **MUST** be a text format, such as `text/plain` or `text/html`. The `contents` field **MUST NOT** be a binary format, such as `image/png` or `video/mp4`.

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

The `replies_to` field on a Publication is an array that contains a list of URIs that represent the publications that the publication is replying to. It is used to determine the reply chain of an object.

The `replies_to` field is not required on all publications. If it is not provided, it is assumed that the object is not replying to any other object.

`replies_to` is an array, which means that a publication can reply to multiple publications at once. **Servers may want to limit this to a single publication, however, to prevent mass spam.** It is up to the discretion of the server software to decide how many publications a publication can reply to, but **it is recommended to not let users reply to more than one publication at a time**.

#### Mentions

The `mentions` field on a Publication is an array that contains a list of URIs that represent the users that the publication is mentioning. It is used to determine which users are mentioned in a publication.

The `mentions` field is not required on all publications. If it is not provided, it is assumed that the publication is not mentioning any other users.

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

#### Subject

The `subject` field on a Publication is a **string** that represents the subject of the publication. It may be used as a content warning or spoiler warning.

The `subject` field is not required on all publications. If it is not provided, it is assumed that the publication does not have a subject.

It is recommended that servers limit the length of the subject from 1 to 300 characters, but it is up to the server to decide how long the subject can be. The protocol does not have an upper limit for the length of the subject.

The `subject` field **MUST NOT** be a `ContentFormat` object. It **MUST** be a string, and **MUST** be plain text. It **MUST NOT** contain any HTML or other markup.

> See [ContentFormat](#contentformat) for more information on `ContentFormat` objects.

> Client extensions are welcome to add support for HTML or other markup in the `subject` field, but it is not recommended.

An example value for `subject` would be:
```json5
{
    // ...
    "subject": "This is a subject!"
    // ...
}
```

#### Is Sensitive

The `is_sensitive` field on a Publication is a **boolean** that represents whether or not the publication is sensitive. It may be used as a content warning or spoiler warning.

The `is_sensitive` field is not required on all publications. If it is not provided, it is assumed that the publication is not sensitive.

An example value for `is_sensitive` would be:
```json5
{
    // ...
    "is_sensitive": true
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
    ],
    "fields": [
        {
            "key": [
                {
                    "content": "Where I live",
                    "content_type": "text/plain"
                }
            ],
            "value": [
                {
                    "content": "Portland, Oregon",
                    "content_type": "text/plain"
                }
            ],
        }
    ]
    "inbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/inbox",
    "outbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/outbox",
}
```

#### Type

Currently available types are:
- `User`

#### ID

The `id` field on an Actor is a string that represents the unique identifier of the actor. It is used to identify the actor, and **MUST** be unique across all actors of the server.

#### Display Name

The `display_name` field on an Actor is a string that represents the display name of the actor. It is used to display the actor's name to the user.

The `display_name` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a display name, and the actor's username should be used instead

Display names **MUST** be treated as changeable, and **MUST NOT** be used to identify the actor.

It is recommended that servers limit the length of the display name from 1 to 50 characters, but it is up to the server to decide how long the display name can be. The protocol does not have an upper limit for the length of the display name.

#### Username

The `username` field on an Actor is a string that represents the username of the actor. It is used to loosely identify the actor, and **MUST** be unique across all actors of a server.

The `username` field is required on all actors.

The `username` field **MUST NOT** be used to identify the actor internally or across the protocol. It is only meant to be used as a display name, and as such is changeable by the user.

The `username` field **MUST** be a string that contains only alphanumeric characters, underscores, and dashes. It **MUST NOT** contain any spaces or other special characters.

It **MUST** match this regex: `/^[a-zA-Z0-9_-]+$/`

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

An example value for the `bio` field would be:
```json5
{
    // ...
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
    // ...
}
```

> **Note:** Lysand heavily recommends that servers support the `text/html` content type, as it is the most rich content type that is supported by most clients.

> **Note**: Lysand also recommends that servers always include a `text/plain` version of each object, as it is the most basic content type that is supported by all clients, such as command line clients.

It is up to the client to choose which content format to display to the user. The client may choose to display the first content format that it supports, or it may choose to display the content format that it thinks is the most appropriate.

#### Fields

The `fields` field on an Actor is an array that contains a list of `Field` objects. It is used to display custom fields to the user, such as additional metadata.

The `fields` field is not required on all actors. If it is not provided, it is assumed that the actor does not have any fields.

An example value for the `fields` field would be:
```json5
{
    // ...
    "fields": [
        {
            "key": [
                {
                    "content": "Where I live",
                    "content_type": "text/plain"
                }
            ],
            "value": [
                {
                    "content": "Portland, Oregon",
                    "content_type": "text/plain"
                }
            ],
        }
    ]
    // ...
}
```

Fields are formatted as follows:
```ts
interface Field {
    key: ContentFormat[];
    value: ContentFormat[];
}
```

Both `key` and `value` should be presented to the user as a couple.

The `key` field **MUST** be a text format, such as `text/plain` or `text/html`. The `key` field **MUST NOT** be a binary format, such as `image/png` or `video/mp4`.

The `value` field **MUST** be a text format, such as `text/plain` or `text/html`. The `value` field **MUST NOT** be a binary format, such as `image/png` or `video/mp4`.

#### Inbox

The `inbox` field on an Actor is a string that represents the URI of the actor's inbox. It is used to identify the actor's inbox for federation.

#### Outbox

The `outbox` field on an Actor is a string that represents the URI of the actor's outbox. It is used to identify the actor's outbox for federation.

### Actions

Actions are the main way that clients interact with the Lysand protocol. They are JSON objects that represent an action that a user wants to perform, such as posting a new object or following a user.

Here is an example action:
```json5
{
    "type": "Like",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

#### Type

Currently available types are:
- `Like`
- `Follow`
- `FollowAccept`
- `FollowReject`

Notably, a `Block` action is not included in the Lysand protocol. This is because Lysand does not have a concept of blocking users. Instead, it is up to the client or server to decide if it wants to display content from a user or not.

This serves to prevent abuse of the protocol to find out if a user has blocked another user, which is a privacy concern.

##### Like

A `Like` action is an action that represents a user liking/favouriting an object. It is one of the most common type of action.

A `Like` object **MUST** have an `object` field that contains the URI of the object that the user is liking. The object **MUST** be a `Publication` object.

Example:
```json5
{
    "type": "Like",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

##### Follow

A `Follow` action is an action that represents a user following another user. By following another user, the user will be able to see the other user's posts in their feed.

A `Follow` object **MUST** have an `followee` field that contains the URI of the user that the user is following.

Example:
```json5
{
    "type": "Follow",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "followee": "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
}
```

##### Follow Accept

A `FollowAccept` action is an action that represents a user accepting a follow request from another user. By accepting a follow request, the user will be able to see the other user's posts in their feed.

A `FollowAccept` object **MUST** have an `follower` field that contains the URI of the user that the user is accepting a follow request from.

Example:
```json5
{
    "type": "FollowAccept",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "follower": "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
}
```

##### Follow Reject

A `FollowReject` action is an action that represents a user rejecting a follow request from another user. By rejecting a follow request, the user will not be able to see the other user's posts in their feed.

A `FollowReject` object **MUST** have an `follower` field that contains the URI of the user that the user is rejecting a follow request from.

Example:
```json5
{
    "type": "FollowReject",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "follower": "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
}
```

#### Author

The `author` field on an Action is a string that represents the URI of the user that created the action. It is used to identify the author of the action.

The `author` field is required on all actions.

### Server Metadata

Server metadata is metadata that servers can provide to clients to help them determine how to interact with the server. It is meant to be a simple way for servers to provide information to other servers and clients.

Here is an example server metadata object:
```json5
{
    "type": "ServerMetadata",
    "name": "Example Server",
    "version": "1.0.0",
    "description": "This is an example server.",
    "website": "https://example.com",
    "moderators": [
        "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
        // ...
    ],
    "admins": [
        // ...
    ],
    "logo": [
        {
            "content": "https://cdn.example.com/logo.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.example.com/logo.webp",
            "content_type": "image/webp"
        }
    ],
    "banner": [
        {
            "content": "https://cdn.example.com/banner.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.example.com/banner.webp",
            "content_type": "image/webp"
        }
    ],
    "supported_extensions": [ "org.lysand:reactions" ],
    "extensions": {
        // Example extension
        "org.joinmastodon:monthly_active_users": 1000
    }
}
```

#### Type

The `type` field on a Server Metadata object is a string that represents the type of the object. It is used to determine how the object should be displayed to the user.

The `type` field is required on all objects.

Currently available types are:
- `ServerMetadata`

#### Name

The `name` field on a Server Metadata object is a string that represents the name of the server. It is used to display the name of the server to the user.

The `name` field is required on all Server Metadata objects.

It is recommended that servers limit the length of the name from 1 to 50 characters, but it is up to the server to decide how long the name can be. The protocol does not have an upper limit for the length of the name.

#### Version

The `version` field on a Server Metadata object is a string that represents the version of the server. It is used to display the version of the server to the user.

It is recommended that servers use SemVer to version their servers, but it is not required. The protocol does not have any requirements for the format of the version.

The `version` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a version.

#### Description

The `description` field on a Server Metadata object is a string that represents the description of the server. It is used to display the description of the server to the user. It should include information about the server, such as what it is about and what it is used for.

For example, a server focused on a specific topic may include information about that topic in the description.

The `description` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a description.

It is recommended that servers limit the length of the description from 1 to 500 characters, but it is up to the server to decide how long the description can be. The protocol does not have an upper limit for the length of the description.

#### Website

The `website` field on a Server Metadata object is a string that represents the website of the server. It is used to display the website of the server to the user. This may be used to link to the server's website.

The `website` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a website.

#### Moderators

The `moderators` field on a Server Metadata object is an array that contains a list of URIs that represent the moderators of the server. It is used to determine which users are moderators of the server.

The `moderators` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have any moderators, or is not willing to provide a list.

#### Admins

The `admins` field on a Server Metadata object is an array that contains a list of URIs that represent the admins of the server. It is used to determine which users are admins of the server.

The `admins` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have any admins, or is not willing to provide a list.

#### Logo

The `logo` field on a Server Metadata object is an array that contains a list of `ContentFormat` objects. It is meant to serve as a logo for the server.

The `logo` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a logo.

The logo content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The logo content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each logo, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

#### Banner

The `banner` field on a Server Metadata object is an array that contains a list of `ContentFormat` objects. It is meant to serve as a banner for the server.

The `banner` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a banner.

The banner content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The banner content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each banner, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

#### Supported Extensions

The `supported_extensions` field on a Server Metadata object is an array that contains a list of extension names that the server supports.

The `supported_extensions` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not support any extensions.

## Protocol Extensions

Lysand supports protocol extensions, which are extensions to the protocol that are not part of the core protocol. They are meant to be used to extend the protocol with new features.

Protocol extensions can be added to a object as follows:

```json5
{
    // ...
    "extensions": {
        "com.organization.name:key": "value"
    }
    // ...
}
```

The `extensions` field is an object that contains a list of extensions. Each extension is a key-value pair, where the key is the extension name, and the value is the extension value.

The extension name **MUST** be a string that contains the reverse domain name of the organization that created the extension, followed by a colon, followed by the name of the extension. For example, `com.example:extension_name`.

The extension name **MUST** be unique across the organization namespace (I.E., it should be unique for each organization).

The extension value **MAY** be any valid JSON value. It is up to the servers to decide of they want to implement extensions or not.

For example, a server may implement an extension that allows users to geotag an object. The extension name may be `org.geotagger:geotag`, and the extension value may be a string that contains the geotag.
```json5
{
    // ...
    "extensions": {
        "org.geotagger:geotag": "40.7128° N, 74.0060° W"
    }
    // ...
}
```

Lysand heavily recommends that extensions are documented and standardized, and that servers do not implement extensions that are not documented or standardized by their author.

### Adding New Object Types

Lysand supports adding new object types via extensions. This is useful for adding new types of objects to the protocol, such as polls or events.

Every new object type added **MUST** have `Extension` as its object type, and **MUST** have a `extension_type` field that contains the extension name of the object type.

The extension name of the object type is formatted as follows:

```
com.organization.name:extension/Type
```

For example, if a server wants to add a new object type called `Poll`, the extension name would be `com.example:poll/Poll`.

Custom types **MUST** start with a capital letter, **MUST** be alphanumeric values (with PascalCase used instead of spaces) and **MUST** be unique across all extensions.

Custom types **MUST** be unique in their organization namespace (I.E., it should be unique for each organization).

An example is given in the following object:
```json5
{
    "type": "Extension",
    "extension_type": "com.example:poll/Poll",
    "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "question": "What is your favourite colour?",
    "options": [
        "Red",
        "Blue",
        "Green"
    ]
}
```

## Official Protocol Extensions

Lysand has a few official extensions that are part of the core protocol. These extensions are standardized and documented, and servers **SHOULD** implement them if they implement the core protocol (however they are not required to do so).

### Custom Emojis

Please see [Custom Emojis](#custom-emojis) for more information about the Custom Emojis type. The extension is implemented as such:

```json5
{
    // ...
    "extensions": {
        "org.lysand:custom_emojis": {
            "emojis": [
                {
                    "name": "happy_face",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/happy_face.webp",
                            "content_type": "image/webp"
                        }
                    ]
                },
                // ...
            ]
        }
    }
    // ...
}
```

That is, the extension name is `org.lysand:custom_emojis`, and the extension value is an object that contains a list of emojis.

#### Applying Custom Emojis

Clients **MUST** apply custom emojis to the following fields of the following objects:

- `Publication.contents`
- `Publication.subject`
- `Actor.bio`
- `Actor.display_name`

A custom emoji is formatted inside a text string as follows: 
```
:emoji_name:
```

For example, if a user wants to use the `happy_face` emoji, they would type:
```
:happy_face:
```

Clients **MUST** replace the `:emoji_name:` with the appropriate emoji. If the client does not support custom emojis, it **MUST** display the `:emoji_name:` as-is.

If the client supports Custom Emojis, but does not support the emoji that the user is trying to use (such as with an incompatible MIME type), it **MUST** display the `:emoji_name:` as-is.

When rendered as images, Custom Emojis **SHOULD** have proper alt text for accessibility. The alt text **SHOULD** be the alt text of the emoji, if it has one. If the emoji does not have an alt text, the alt text **SHOULD** be the name of the emoji.

Example in HTML:
```html
Hello, world! <img src="https://cdn.example.com/emojis/happy_face.webp" alt="A happy face emoji." title="A happy face emoji.">
```

### Reactions

With the Reactions extension, users can react to objects with emojis. This is similar to how Facebook and Discord work.

Here is an example of a reaction to a post using this extension:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:reactions/Reaction",
    "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "content": "😀",
}
```

#### Type

As with all new objects added by extensions, the `type` field **MUST BE** `Extension`.

The `extension_type` field **MUST** be `org.lysand:reactions/Reaction`.

#### Object

The `object` field on a Reaction object is a string that represents the URI of the object that the user is reacting to. It is used to identify the object that the user is reacting to.

The `object` field is required on all Reaction objects.

#### Content

The `content` field on a Reaction object is a string that represents the emoji that the user is reacting with. It is used to identify the emoji that the user is reacting with.

The `content` field is required on all Reaction objects.

Clients **SHOULD** check if the value of `content` is an emoji: if it is not an emoji and instead is text, depending on which other extensions are implemented, it **MAY** be a Custom Emoji.

> Please see [Reactions With Custom Emojis](#reactions-with-custom-emojis) for more information about custom emoji reactions.

### Reactions With Custom Emojis

If you implement both the Reactions and the Custom Emojis extensions, you can use the Custom Emojis extension to react with custom emojis.

The Reaction object needs to be modified as such:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:reactions/Reaction",
    "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "content": ":happy_face:",
    "extensions": {
        "org.lysand:custom_emojis": {
            "emojis": [
                {
                    "name": "happy_face",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/happy_face.webp",
                            "content_type": "image/webp"
                        }
                    ]
                },
                // ...
            ]
        }
    }
}
```

The only addiction to the Reaction object is the `extensions` field, which contains the Custom Emojis extension.

When rendering the Reaction object, clients **MUST** replace the `:emoji_name:` with the appropriate emoji. If the client does not support custom emojis, it **MUST** display the `:emoji_name:` as-is.

When rendered as images, Custom Emoji Reactions **SHOULD** have proper alt text for accessibility. The alt text **SHOULD** be the alt text of the emoji, if it has one. If the emoji does not have an alt text, the alt text **SHOULD** be the name of the emoji.

Example in HTML:
```html
<img src="https://cdn.example.com/emojis/happy_face.webp" alt="A happy face emoji." title="A happy face emoji.">
```

## Federation

The Lysand protocol is only useful when it is federated. This section describes how federation works in Lysand.

Federation in Lysand is based on the HTTP protocol. Servers communicate with each other by sending HTTP requests to one another.

These requests are usually `POST` requests containing a JSON object in the body. This JSON object **MUST BE** a valid Lysand object.

Servers that receive invalid Lysand objects **SHOULD** discard this object as invalid.

### Cryptography

Lysand uses cryptography to ensure that objects are not tampered with during transit. This is done by signing objects with a private key, and verifying the signature with a public key.

-> This section is still under construction

### Discovery

> **Note:** The terms "the server" and "the requesting server" are used in this section. "The server" refers to the server that is being discovered, and "the requesting server" refers to the server that is trying to discover the server.

Servers **MUST** implement the [WebFinger](https://tools.ietf.org/html/rfc7033) protocol to allow other servers to discover their endpoints. This is done by serving a `host-meta` file at the address `/.well-known/host-meta`.

The document **MUST** contain the following information, as specified by the WebFinger protocol:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
    <Link rel="lrdd" type="application/xrd+xml" template="https://example.com/.well-known/webfinger?resource={uri}" />
</XRD>
```

The `template` field **MUST** be the URI of the server's WebFinger endpoint, which is usually `https://example.com/.well-known/webfinger?resource={uri}`.

The `resource` field **MUST** be the URI of the user that the server is trying to discover (in the format `acct:uuid@example.com`)

Breaking down this URI, we get the following:

- `acct`: The protocol of the URI. This is always `acct` for Lysand.
- `uuid`: The UUID of the user that the server is trying to discover.
- `example.com`: The domain of the server that the user is on. This is usually the domain of the server. This can also be a subdomain of the server, such as `lysand.example.com`.

This format is reminiscent of the `acct` format used by ActivityPub, but with a UUID instead of a username. Users should typically not use the `id` of an actor to identify it, but instead its `username`.

---

Once the server's WebFinger endpoint has been discovered, it can receive a `GET` request to the endpoint to discover the endpoints of the user.

The requesting server **MUST** send a `GET` request to the endpoint `https://example.com/.well-known/webfinger`.

The requesting server **MUST** send the following headers with the request:

- `Accept: application/jrd+json`
- `Accept: application/json`

The requestinng server **MUST** send the following query parameters with the request:

- `resource`: The URI of the user that the server is trying to discover (in the format `acct:uuid@example.com` (replace `uuid` with the user's ID)

---

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** contain the following information, as specified by the WebFinger protocol:

```json5
{
    "subject": "acct:uuid@example.com",
    "links": [
        {
            "rel": "self",
            "type": "application/json",
            "href": "https://example.com/users/uuid"
        },
        {
            "rel": "http://webfinger.net/rel/profile-page",
            "type": "text/html",
            "href": "https://example.com/users/uuid"
        },
        {
            "rel": "http://schemas.google.com/g/2010#updates-from",
            "type": "application/atom+xml",
            "href": "https://example.com/users/uuid"
        },
    ]
}
```

> **Note:** The `subject` field **MUST** be the same as the `resource` field in the request.

> **Note:** The server implementation is free to add any additional links to the `links` array, such as for compatibility with other federation protocols. However, the links specified above **MUST** be included.

>The `href` values of these links can be anything as long as it includes the `uuid` of the user, such as `https://example.com/accounts/uuid` or `https://example.com/uuid.`.

### User Actor Endpoints

Once the requesting server has discovered the endpoints of the server, it can send a `GET` request to the `self` endpoint to discover the user's actor.

In the above example, to discover user information, the requesting server **MUST** send a `GET` request to the endpoint `https://example.com/users/uuid` with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Actor object.

### User Inbox

Once the requesting server has discovered the endpoints of the server, it can send a `POST` request to the `inbox` endpoint to send an object to the user.

Typically, the inbox can be located on the same URL as the user's actor, but this is not required. The server **MUST** specify the inbox URL in the actor object.

Example inbox URL: `https://example.com/users/uuid/inbox`

The requesting server **MUST** send a `POST` request to the endpoint `https://example.com/users/uuid/inbox` with the headers `Content-Type: application/json` and `Accept: application/json`.

The body of the request **MUST** be a valid Lysand object.

Example with cURL:
```bash
curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{ \
    "type":"Publication", \
    "id":"6f27bc77-58ee-4c9b-b804-8cc1c1182fa9", \
    "uri":"https://example.com/publications/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9", \
    "author":"https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe", \
    "created_at":"2021-01-01T00:00:00.000Z", \
    "contents":"Hello, world!" \
}' https://example.com/users/uuid/inbox
```

The server **MUST** respond with a `200 OK` response code if no error occurred.

### User Outbox

Users in Lysand have an outbox, which is a list of objects that the user has posted. This is similar to the outbox in ActivityPub.

The server **MUST** specify the outbox URL in the actor object.

Example outbox URL: `https://example.com/users/uuid/outbox`

The requesting server **MUST** send a `GET` request to the outbox endpoint (`https://example.com/users/uuid/outbox`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Publications.

Example:

```json5
{
    "first": "https://example.com/users/uuid/outbox?page=1",
    "last": "https://example.com/users/uuid/outbox?page=1",
    // No next or prev attribute in this case, but they can exist
    "total_items": 1,
    "items": [
        {
            "type": "Publication",
            "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "uri": "https://example.com/publications/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "author": "https://example.com/users/uuid",
            "created_at": "2021-01-01T00:00:00.000Z",
            "contents": "Hello, world!"
        }
    ]
}
```

These publications **MUST BE** ordered from newest to oldest, in descending order.

## License

This repository is licensed under the [GPL-3.0](LICENSE)

This document was authored by [CPlusPatch](https://github.com/CPlusPatch). Please open an issue or contact me for any questions or additions:

`@jesse:cpluspatch.dev` (Matrix)

`contact@cpluspatch.com` (E-mail)
