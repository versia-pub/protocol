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
- [Categories](#categories)
    - [Publications](#publications)
        - [Type](#type-1)
        - [Note](#note)
        - [Patch](#patch)
        - [Author](#author)
        - [Contents](#contents)
        - [Replies To](#replies-to)
        - [Mentions](#mentions)
    - [Actors](#actors)
        - [Type](#type-2)
        - [ID](#id-1)
        - [Display Name](#display-name)
        - [Username](#username)
        - [Avatar](#avatar)
        - [Header](#header)
        - [Bio](#bio)
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
- [Protocol Extensions](#protocol-extensions)
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
    ]
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
    "extensions": {
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

## License

This repository is licensed under the [GPL-3.0](LICENSE)

This document was authored by [CPlusPatch](https://github.com/CPlusPatch). Please open an issue or contact me for any questions or additions:

`@jesse:cpluspatch.dev` (Matrix)

`contact@cpluspatch.com` (E-mail)
