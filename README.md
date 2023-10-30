# 1. Lysand Protocol

> **Note:** This protocol is still in development and is not ready for use yet. This document is a draft, and is subject to change.

## 1.1. Introduction

The Lysand Protocol is meant to be a protocol for federated applications to communicate with each other using the HTTP stack. It is meant to be a simple protocol that is easy to implement and understand.

Unlike ActivityPub, Lysand includes many more out of the box features designed for social media applications. It is also designed to be more secure and private by default.

Lysand tries to be as standardized and possible and discourage use of vendor-specific implementations, such as what Mastodon has done with ActivityPub. It is based on simple JSON objects and HTTP requests, with no need for complex serialization formats.

TypeScript types are provided in this repository for every object in the protocol, which can be easily adapted to other languages.

## 1.2. Table of contents

- [1. Lysand Protocol](#1-lysand-protocol)
  - [1.1. Introduction](#11-introduction)
  - [1.2. Table of contents](#12-table-of-contents)
  - [1.3. Protocol](#13-protocol)
  - [1.4. Objects](#14-objects)
      - [1.4.0.1. ID](#1401-id)
      - [1.4.0.2. Created At](#1402-created-at)
      - [1.4.0.3. URI](#1403-uri)
    - [1.4.1. Type](#141-type)
  - [1.5. Structures](#15-structures)
    - [1.5.1. ContentFormat](#151-contentformat)
    - [1.5.2. Custom Emojis](#152-custom-emojis)
    - [1.5.3. Collections](#153-collections)
    - [1.5.4. Public Key Cryptography](#154-public-key-cryptography)
  - [1.6. Categories](#16-categories)
    - [1.6.1. Publications](#161-publications)
      - [1.6.1.1. Type](#1611-type)
        - [1.6.1.1.1. Note](#16111-note)
        - [1.6.1.1.2. Patch](#16112-patch)
      - [1.6.1.2. Author](#1612-author)
      - [1.6.1.3. Contents](#1613-contents)
      - [1.6.1.4. Attachments](#1614-attachments)
      - [1.6.1.5. Replies To](#1615-replies-to)
      - [1.6.1.6. Quotes](#1616-quotes)
      - [1.6.1.7. Mentions](#1617-mentions)
      - [1.6.1.8. Subject](#1618-subject)
      - [1.6.1.9. Is Sensitive](#1619-is-sensitive)
    - [1.6.2. Actors](#162-actors)
      - [1.6.2.1. Type](#1621-type)
      - [1.6.2.2. ID](#1622-id)
      - [1.6.2.3. Public Key](#1623-public-key)
      - [1.6.2.4. Display Name](#1624-display-name)
      - [1.6.2.5. Username](#1625-username)
      - [1.6.2.6. Indexable](#1626-indexable)
      - [1.6.2.7. Avatar](#1627-avatar)
      - [1.6.2.8. Header](#1628-header)
      - [1.6.2.9. Bio](#1629-bio)
      - [1.6.2.10. Fields](#16210-fields)
      - [1.6.2.11. Featured](#16211-featured)
      - [1.6.2.12. Followers](#16212-followers)
      - [1.6.2.13. Following](#16213-following)
      - [1.6.2.14. Likes](#16214-likes)
      - [1.6.2.15. Dislikes](#16215-dislikes)
      - [1.6.2.16. Inbox](#16216-inbox)
      - [1.6.2.17. Outbox](#16217-outbox)
    - [1.6.3. Actions](#163-actions)
      - [1.6.3.1. Type](#1631-type)
        - [1.6.3.1.1. Like](#16311-like)
        - [1.6.3.1.2. Dislike](#16312-dislike)
        - [1.6.3.1.3. Follow](#16313-follow)
        - [1.6.3.1.4. Follow Accept](#16314-follow-accept)
        - [1.6.3.1.5. Follow Reject](#16315-follow-reject)
        - [1.6.3.1.6. Announce](#16316-announce)
        - [1.6.3.1.7. Undo](#16317-undo)
      - [1.6.3.2. Author](#1632-author)
    - [1.6.4. Server Metadata](#164-server-metadata)
      - [1.6.4.1. Type](#1641-type)
      - [1.6.4.2. Name](#1642-name)
      - [1.6.4.3. Version](#1643-version)
      - [1.6.4.4. Description](#1644-description)
      - [1.6.4.5. Website](#1645-website)
      - [1.6.4.6. Moderators](#1646-moderators)
      - [1.6.4.7. Admins](#1647-admins)
      - [1.6.4.8. Logo](#1648-logo)
      - [1.6.4.9. Banner](#1649-banner)
      - [1.6.4.10. Supported Extensions](#16410-supported-extensions)
  - [1.7. Protocol Extensions](#17-protocol-extensions)
    - [1.7.1. Adding New Object Types](#171-adding-new-object-types)
  - [1.8. Official Protocol Extensions](#18-official-protocol-extensions)
    - [1.8.1. Custom Emojis](#181-custom-emojis)
      - [1.8.1.1. Applying Custom Emojis](#1811-applying-custom-emojis)
    - [1.8.2. Reactions](#182-reactions)
      - [1.8.2.1. Type](#1821-type)
      - [1.8.2.2. Object](#1822-object)
      - [1.8.2.3. Content](#1823-content)
    - [1.8.3. Getting Reactions](#183-getting-reactions)
    - [1.8.4. Public Reaction Federation](#184-public-reaction-federation)
    - [1.8.5. Private Reaction Federation](#185-private-reaction-federation)
    - [1.8.6. Reactions With Custom Emojis](#186-reactions-with-custom-emojis)
    - [1.8.7. Polls](#187-polls)
      - [1.8.7.1. Options](#1871-options)
      - [1.8.7.2. Votes](#1872-votes)
      - [1.8.7.3. Multiple Choice](#1873-multiple-choice)
      - [1.8.7.4. Expires At](#1874-expires-at)
      - [1.8.7.5. Integration With Custom Emojis](#1875-integration-with-custom-emojis)
      - [1.8.7.6. Poll Results](#1876-poll-results)
      - [1.8.7.7. Sending Votes](#1877-sending-votes)
      - [1.8.7.8. Poll Events](#1878-poll-events)
    - [1.8.8. Events](#188-events)
    - [1.8.9. Is Cat](#189-is-cat)
  - [1.9. Federation](#19-federation)
    - [1.9.1. Cryptography](#191-cryptography)
    - [1.9.2. User Discovery](#192-user-discovery)
    - [1.9.3. User Actor Endpoints](#193-user-actor-endpoints)
    - [1.9.4. User Inbox](#194-user-inbox)
    - [1.9.5. User Outbox](#195-user-outbox)
    - [1.9.6. User Followers](#196-user-followers)
    - [1.9.7. User Following](#197-user-following)
    - [1.9.8. User Featured Publications](#198-user-featured-publications)
    - [1.9.9. User Likes](#199-user-likes)
    - [1.9.10. User Dislikes](#1910-user-dislikes)
    - [1.9.11. Server Discovery](#1911-server-discovery)
  - [1.10. License](#110-license)


## 1.3. Protocol

Lysand tries to have similar concepts to already existing popular protocols, such as ActivityPub and ActivityStreams. However, it is not compatible with either of them. It is also not compatible with ActivityPub's JSON-LD serialization format.

Lysand-compatible servers may implement other protocols as well, such as ActivityPub, but they are not required to do so.

All request bodies and response bodies **MUST** be encoded as UTF-8 JSON.

All IDs **MUST** be UUIDs or UUID-compatible. Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field.

All URIs **MUST** be absolute URIs, and **MUST** be HTTPS URIs, except for development purposes.

All URIs **MUST** be unique across the entire network, and **MUST** contain the `id` of the object in the URI.

All URIs **MUST** be normalized, and **MUST NOT** contain any query parameters.

## 1.4. Objects

Lysand uses JSON objects as its data format. It is meant to be a simple format that is easy to implement and understand.

All JSON objects such as [Publications](#publications), [Actors](#actors), and [Actions](#actions) **MUST** have a `type` field that represents the type of the object. This is used to determine how the object should be displayed to the user.

These fields **MUST** be included in every JSON object:

#### 1.4.0.1. ID

The `id` field on an Object is a string that represents the unique identifier of the object. It is used to identify the object, and **MUST** be unique across all objects.

The `id` field is not required to be unique across the entire network, but it is recommended that it is. Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field.

The `id` field is required on all objects.

#### 1.4.0.2. Created At

The `created_at` field on an object is a string that represents the date and time that the object was created. It is used to determine the order of objects. The data **MUST** be in ISO 8601 format.

Example: `2021-01-01T00:00:00.000Z`

The `created_at` field is required on all objects.

> **Note:** The `created_at` field should be the date and time that the post was actually made, but it is not required to be. Any ISO 8601 date is allowed in the `created_at` field. It is up to the servers to decide if they want to process dates that they would consider invalid, such as dates in the future.

#### 1.4.0.3. URI

The `uri` field on an object is a string that represents the URI of the object. It is used to identify the object, and **MUST** be unique across all objects. This URI **MUST** be unique across the entire network, and contain the `id` of the object in the URI.

The `uri` field is required on all objects.

### 1.4.1. Type

The `type` field on an object is a string that represents the type of the object. It is used to determine how the object should be displayed to the user.

The `type` field is required on all objects.

## 1.5. Structures

### 1.5.1. ContentFormat

A `ContentFormat` object can be represented as such in TypeScript:

```ts
interface ContentFormat {
    content: string;
    content_type: string;
    description?: string;
}
```

An example value would be:
```json
{
    "content": "Hello, world!",
    "content_type": "text/plain"
}
```

Another example:
```json
{
    "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
    "content_type": "image/png",
    "description": "A jolly horse running in the mountains"
}
```

The `contents` field is a string that contains the actual content of the object. The `content_type` field is a string that contains the MIME type of the content.

The `content` and `content_type` fields are required on all `ContentFormat` objects.

The `description` field is a string that contains a description of the content. It is used to describe the content to users that cannot see the content, such as users that are blind, or when the content does not load properly. It is not required on all `ContentFormat` objects. If it is not provided, it is assumed that the content does not have a description.

It is expected that files in an array of `ContentFormat` objects (when used to store URLs to files) are the same file, but in different formats. For example, a PNG image and a WebP image. Files in formats such as PDF that cannot be converted to other formats should only be stored once.

For example, this is acceptable:
```json
[
    {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
        "content_type": "image/png",
        "description": "A jolly horse running in the mountains"
    },
    {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp",
        "content_type": "image/webp",
        "description": "A jolly horse running in the mountains"
    }
]
```

But this is not:
```json
[
    {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
        "content_type": "image/png",
        "description": "A jolly horse running in the mountains"
    },
    {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp",
        "content_type": "image/webp",
        "description": "A jolly horse running in the mountains"
    },
    {
        "content": "https://cdn.example.com/attachments/anotherfile.pdf",
        "content_type": "application/pdf",
        "description": "A PDF file about macroeconomics"
    }
]
```

Each array of ContentFormat objects should be considered as a SINGLE FILE, and not multiple files. The multiple formats are only meant to save bandwidth.

### 1.5.2. Custom Emojis

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

### 1.5.3. Collections

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

### 1.5.4. Public Key Cryptography

Lysand uses public key cryptography to sign objects. It is used to verify that an object was created by the user that claims to have created it.

All public keys in Lysand **MUST** be encoded using the [ed25519](https://ed25519.cr.yp.to/) algorithm. This algorithm is used because it is fast, secure, and has a small key size. Legacy algorithms such as RSA are not supported, and **SHOULD NOT** be implemented using extensions for security.

Other encryption algorithms could be implemented using extensions, but it is not recommended.

Here is an example of generating a public-private key pair in TypeScript using the WebCrypto API:
```ts
const keyPair = await crypto.subtle.generateKey(
    {
        name: "ed25519",
        namedCurve: "ed25519",
    },
    true,
    ["sign", "verify"]
);

// Encode both to base64
const publicKey = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.exportKey("raw", keyPair.publicKey))));

const privateKey = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.exportKey("raw", keyPair.privateKey))));

// Store the public and private key somewhere in your user data
```

Public key data is represented as such across the protocol:

```ts
interface ActorPublicKeyData {
    public_key: string;
    actor: string;
}
```

The `public_key` field is a string that contains the public key of the user. It **MUST** be encoded using base64.

The `actor` field is a string that contains the URI of the user. It is required.

## 1.6. Categories

Lysand has three main categories of objects: [Publications](#publications), [Actors](#actors), and [Actions](#actions).

Each category is simply provided as a way to sort through the objects. They are not meant to be used as a way to determine how to display the object to the user.

Each category may have multiple object types within it. For example, the [Publications](#publications) category has the `Note` and `Patch` object types.

### 1.6.1. Publications

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
    "attachments": [
        [
            {
                "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
                "content_type": "image/png"
            },
            {
                "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp",
                "content_type": "image/webp"
            }
        ],
        [
            {
                "content": "https://cdn.example.com/attachments/ilovecats.mp4",
                "content_type": "video/mp4"
            }
        ]
    ],
    "replies_to": [
        "https://test.com/publications/0b6ecf49-2959-4590-afb6-232f57036fa6"
    ],
    "mentions": [
        "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    ],
}
```

#### 1.6.1.1. Type

Currently available types are:
- `Note`
- `Patch`

##### 1.6.1.1.1. Note

A `Note` object is a simple object that represents a post or publication. It is the most common type of object.

##### 1.6.1.1.2. Patch

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

#### 1.6.1.2. Author

The `author` field on a Publication is a string that represents the URI of the user that created the object. It is used to identify the author of the Publication.

The `author` field is required on all publications.

#### 1.6.1.3. Contents

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

#### 1.6.1.4. Attachments

The `attachments` field on a Publication is an array that contains a list of arrays of `ContentFormat` objects. It is used to attach files to a publication.

The `attachments` field is not required on all publications. If it is not provided, it is assumed that the publication does not have any attachments.

It is recommended that servers limit the number of attachments to 20, but it is up to the server to decide how many attachments a publication can have. The protocol does not have an upper limit for the number of attachments.

The `attachments` field **MAY** be in any format, such as `image/png`, `image/webp`, `video/mp4`, or `audio/mpeg`. It is up to the server to decide which formats are allowed.

> **Note:** Lysand recommends that servers let users upload any file as an attachment, but clients should warn users before downloading potentially malicious files, such as `.exe` files.

#### 1.6.1.5. Replies To

The `replies_to` field on a Publication is an array that contains a list of URIs that represent the publications that the publication is replying to. It is used to determine the reply chain of an object.

The `replies_to` field is not required on all publications. If it is not provided, it is assumed that the object is not replying to any other object.

`replies_to` is an array, which means that a publication can reply to multiple publications at once. **Servers may want to limit this to a single publication, however, to prevent mass spam.** It is up to the discretion of the server software to decide how many publications a publication can reply to, but **it is recommended to not let users reply to more than one publication at a time**.

#### 1.6.1.6. Quotes

The `quotes` field on a Publication is an array that contains a list of URIs that represent the publications that the publication is quoting. It is used to determine the quote chain of an object.

Quoting is similar to replying, but it does not (by default) notify the user that they were quoted. It is meant to be used to comment or add context to another publication.

The `quotes` field is not required on all publications. If it is not provided, it is assumed that the object is not quoting any other object.

`quotes` is an array, which means that a publication can quote multiple publications at once. **Servers may want to limit this to a single publication, however, to prevent mass spam.** It is up to the discretion of the server software to decide how many publications a publication can quote, but **it is recommended to not let users quote more than one publication at a time**.

Example of quoting:
```json5
{
    // ...
    "quotes": [
        "https://test.com/publications/5f886c84-f8f7-4f65-8ac2-4691d385c509"
    ],
    // ...
}
```

Quoting **SHOULD BE** rendered differently from replying, such as by adding a quote block to the publication or including the quoted post in the publication.

#### 1.6.1.7. Mentions

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

#### 1.6.1.8. Subject

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

#### 1.6.1.9. Is Sensitive

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

### 1.6.2. Actors

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
    "indexable": true,
    "public_key": {
        "public_key": "...",
        "actor": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    },
    "bio": [
        {
            "content": "My name is Gordon Ramsay, I'm a silly quirky little pony that LOVES to roleplay in the bedroom!",
            "content_type": "text/plain"
        },
        {
            "content": "My name is <b>Gordon Ramsay</b>, I'm a silly quirky little pony that <i>LOVES</i> to roleplay in the bedroom!",
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
    ],
    "featured": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/featured",
    "followers": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/followers",
    "following": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/following",
    "likes": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/likes",
    "dislikes": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/dislikes",
    "inbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/inbox",
    "outbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/outbox",
}
```

#### 1.6.2.1. Type

Currently available types are:
- `User`

#### 1.6.2.2. ID

The `id` field on an Actor is a string that represents the unique identifier of the actor. It is used to identify the actor, and **MUST** be unique across all actors of the server.

#### 1.6.2.3. Public Key

The `public_key` field on an Actor is an `ActorPublicKeyData` object. It is used to verify that the actor is who they say they are.

All actors **MUST** have a `public_key` field. All servers **SHOULD** verify that the actor is who they say they are using the `public_key` field, which is used to encode any HTTP requests emitted on behalf of the actor.

> For more information on cryptography, please see the [Cryptography](#cryptography) section.

#### 1.6.2.4. Display Name

The `display_name` field on an Actor is a string that represents the display name of the actor. It is used to display the actor's name to the user.

The `display_name` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a display name, and the actor's username should be used instead

Display names **MUST** be treated as changeable, and **MUST NOT** be used to identify the actor.

It is recommended that servers limit the length of the display name from 1 to 50 characters, but it is up to the server to decide how long the display name can be. The protocol does not have an upper limit for the length of the display name.

#### 1.6.2.5. Username

The `username` field on an Actor is a string that represents the username of the actor. It is used to loosely identify the actor, and **MUST** be unique across all actors of a server.

The `username` field is required on all actors.

The `username` field **MUST NOT** be used to identify the actor internally or across the protocol. It is only meant to be used as a display name, and as such is changeable by the user.

The `username` field **MUST** be a string that contains only alphanumeric characters, underscores, and dashes. It **MUST NOT** contain any spaces or other special characters.

It **MUST** match this regex: `/^[a-zA-Z0-9_-]+$/`

It is recommended that servers limit the length of the username from 1 to 20 characters, but it is up to the server to decide how long the username can be. The protocol does not have an upper limit for the length of the username.

#### 1.6.2.6. Indexable

The `indexable` field on an Actor is a boolean that represents whether or not the actor should be indexed by search engines. This field is required and must be included.

#### 1.6.2.7. Avatar

The `avatar` field on an Actor is an array that contains a list of `ContentFormat` objects.

The `avatar` field is not required on all actors. If it is not provided, it is assumed that the actor does not have an avatar.

The avatar content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The avatar content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each avatar, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

#### 1.6.2.8. Header

The `header` field on an Actor is an array that contains a list of `ContentFormat` objects. It is meant to serve as a banner for users.

The `header` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a header.

The header content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The header content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each header, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

#### 1.6.2.9. Bio

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

#### 1.6.2.10. Fields

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

#### 1.6.2.11. Featured

Please see [Featured Publications](#198-user-featured-publications) for more information.

#### 1.6.2.12. Followers

Please see [User Followers](#196-user-followers) for more information.

#### 1.6.2.13. Following

Please see [User Following](#197-user-following) for more information.

#### 1.6.2.14. Likes

Please see [User Likes](#199-user-likes) for more information.

#### 1.6.2.15. Dislikes

Please see [User Dislikes](#1910-user-dislikes) for more information.

#### 1.6.2.16. Inbox

The `inbox` field on an Actor is a string that represents the URI of the actor's inbox. It is used to identify the actor's inbox for federation.

#### 1.6.2.17. Outbox

The `outbox` field on an Actor is a string that represents the URI of the actor's outbox. It is used to identify the actor's outbox for federation.

### 1.6.3. Actions

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

#### 1.6.3.1. Type

Currently available types are:
- `Like`
- `Dislike`
- `Follow`
- `FollowAccept`
- `FollowReject`
- `Announce`
- `Undo`

Notably, a `Block` action is not included in the Lysand protocol. This is because Lysand does not have a concept of blocking users. Instead, it is up to the client or server to decide if it wants to display content from a user or not.

This serves to prevent abuse of the protocol to find out if a user has blocked another user, which is a privacy concern.

##### 1.6.3.1.1. Like

A `Like` action is an action that represents a user liking/favouriting an object. It is one of the most common type of action.

A `Like` object **MUST** have an `object` field that contains the URI of the object that the user is liking. The object **MUST** be a `Publication` object.

Example:
```json5
{
    "type": "Like",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

##### 1.6.3.1.2. Dislike

A `Dislike` action is an action that represents a user disliking an object. It is one of the most common type of action.

A `Dislike` object **MUST** have an `object` field that contains the URI of the object that the user is disliking. The object **MUST** be a `Publication` object.

Example:
```json5
{
    "type": "Dislike",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

##### 1.6.3.1.3. Follow

A `Follow` action is an action that represents a user following another user. By following another user, the user will be able to see the other user's posts in their feed.

A `Follow` object **MUST** have an `followee` field that contains the URI of the user that the user is following.

Example:
```json5
{
    "type": "Follow",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "followee": "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
}
```

##### 1.6.3.1.4. Follow Accept

A `FollowAccept` action is an action that represents a user accepting a follow request from another user. By accepting a follow request, the user will be able to see the other user's posts in their feed.

A `FollowAccept` object **MUST** have an `follower` field that contains the URI of the user that the user is accepting a follow request from.

Example:
```json5
{
    "type": "FollowAccept",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "follower": "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
}
```

##### 1.6.3.1.5. Follow Reject

A `FollowReject` action is an action that represents a user rejecting a follow request from another user. By rejecting a follow request, the user will not be able to see the other user's posts in their feed.

A `FollowReject` object **MUST** have an `follower` field that contains the URI of the user that the user is rejecting a follow request from.

Example:
```json5
{
    "type": "FollowReject",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "follower": "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
}
```

##### 1.6.3.1.6. Announce

An `Announce` action is an action that represents a user announcing an object. It is used to share an object with the user's followers. This is similar to "retweeting" on Twitter.

An `Announce` object **MUST** have an `object` field that contains the URI of the object that the user is announcing. The object **MUST** be a `Publication` object.

Example:
```json5
{
    "type": "Announce",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

##### 1.6.3.1.7. Undo

An `Undo` action is an action that represents a user undoing an action. It is used to cancel an action or delete an already existing object.

An `Undo` object **MUST** have an `object` field that contains the URI of the object that the user is undoing. The object **MUST** be a `Publication` object.

Servers **MUST** not allow users to undo actions that they did not create.

Servers that receive `Undo` actions **MUST** undo the action that is being undone. For example, if a user likes a post, and then undoes the like, the server **MUST** remove the like from the post. Similarly, if an `Undo` action is received for a `Follow` action, the server **MUST** unfollow the user.

If the `Undo` action has a Publication or other object as the `object` field, the server **MUST** stop showing the object to users. Deleting the original object is recommended, but not required.

An `Undo` action on a `Patch` object **MUST** be treated as cancellation of the `Patch` object, and **MUST NOT** be treated as a cancellation of the original object.

Example:
```json5
{
    "type": "Undo",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

Some ob

#### 1.6.3.2. Author

The `author` field on an Action is a string that represents the URI of the user that created the action. It is used to identify the author of the action.

The `author` field is required on all actions.

### 1.6.4. Server Metadata

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

#### 1.6.4.1. Type

The `type` field on a Server Metadata object is a string that represents the type of the object. It is used to determine how the object should be displayed to the user.

The `type` field is required on all objects.

Currently available types are:
- `ServerMetadata`

#### 1.6.4.2. Name

The `name` field on a Server Metadata object is a string that represents the name of the server. It is used to display the name of the server to the user.

The `name` field is required on all Server Metadata objects.

It is recommended that servers limit the length of the name from 1 to 50 characters, but it is up to the server to decide how long the name can be. The protocol does not have an upper limit for the length of the name.

#### 1.6.4.3. Version

The `version` field on a Server Metadata object is a string that represents the version of the server. It is used to display the version of the server to the user.

It is recommended that servers use SemVer to version their servers, but it is not required. The protocol does not have any requirements for the format of the version.

The `version` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a version.

#### 1.6.4.4. Description

The `description` field on a Server Metadata object is a string that represents the description of the server. It is used to display the description of the server to the user. It should include information about the server, such as what it is about and what it is used for.

For example, a server focused on a specific topic may include information about that topic in the description.

The `description` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a description.

It is recommended that servers limit the length of the description from 1 to 500 characters, but it is up to the server to decide how long the description can be. The protocol does not have an upper limit for the length of the description.

#### 1.6.4.5. Website

The `website` field on a Server Metadata object is a string that represents the website of the server. It is used to display the website of the server to the user. This may be used to link to the server's website.

The `website` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a website.

#### 1.6.4.6. Moderators

The `moderators` field on a Server Metadata object is an array that contains a list of URIs that represent the moderators of the server. It is used to determine which users are moderators of the server.

The `moderators` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have any moderators, or is not willing to provide a list.

#### 1.6.4.7. Admins

The `admins` field on a Server Metadata object is an array that contains a list of URIs that represent the admins of the server. It is used to determine which users are admins of the server.

The `admins` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have any admins, or is not willing to provide a list.

#### 1.6.4.8. Logo

The `logo` field on a Server Metadata object is an array that contains a list of `ContentFormat` objects. It is meant to serve as a logo for the server.

The `logo` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a logo.

The logo content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The logo content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each logo, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

#### 1.6.4.9. Banner

The `banner` field on a Server Metadata object is an array that contains a list of `ContentFormat` objects. It is meant to serve as a banner for the server.

The `banner` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a banner.

The banner content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The banner content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each banner, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

#### 1.6.4.10. Supported Extensions

The `supported_extensions` field on a Server Metadata object is an array that contains a list of extension names that the server supports.

The `supported_extensions` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not support any extensions.

## 1.7. Protocol Extensions

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

### 1.7.1. Adding New Object Types

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

## 1.8. Official Protocol Extensions

Lysand has a few official extensions that are part of the core protocol. These extensions are standardized and documented, and servers **SHOULD** implement them if they implement the core protocol (however they are not required to do so).

### 1.8.1. Custom Emojis

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

#### 1.8.1.1. Applying Custom Emojis

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

### 1.8.2. Reactions

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

#### 1.8.2.1. Type

As with all new objects added by extensions, the `type` field **MUST BE** `Extension`.

The `extension_type` field **MUST** be `org.lysand:reactions/Reaction`.

#### 1.8.2.2. Object

The `object` field on a Reaction object is a string that represents the URI of the object that the user is reacting to. It is used to identify the object that the user is reacting to.

The `object` field is required on all Reaction objects.

#### 1.8.2.3. Content

The `content` field on a Reaction object is a string that represents the emoji that the user is reacting with. It is used to identify the emoji that the user is reacting with.

The `content` field is required on all Reaction objects.

Clients **SHOULD** check if the value of `content` is an emoji: if it is not an emoji and instead is text, depending on which other extensions are implemented, it **MAY** be a Custom Emoji.

> Please see [Reactions With Custom Emojis](#reactions-with-custom-emojis) for more information about custom emoji reactions.

### 1.8.3. Getting Reactions

Clients can get reactions to an object by sending a `GET` request to the reaction `Collection`'s URI.

The URI of the reaction `Collection` **MUST** be specified as follows:
```json5
{
    // ...
    "extensions": {
        "org.lysand:reactions": {
            "reactions": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19/reactions"
        }
    }
}
```

The `reactions` field is a string that represents the URI of the reaction `Collection`.

The server **MUST** respond with a `Collection` object that contains a list of `Reaction` objects, as such:

```json5
{
    "type": "Collection",
    "first": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19/reactions?page=1",
    "last": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19/reactions?page=1",
    "total_items": 1,
    "items": [
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
    ]
}
```

### 1.8.4. Public Reaction Federation

If a user reacts to a Publication, the user's server **MUST** federate the reaction to all its followers. This is to ensure that all users see the reaction.

Note, however, that this does not mean that the reaction will be displayed to users. If the Publication that was reacted to is not visible to a user, the reaction **MUST NOT** be displayed to the user, even if the user follows the user that reacted to the Publication.

### 1.8.5. Private Reaction Federation

If a user reacts to a Publication, the user's server **MUST** federate the reaction to the author of the Publication. This is to ensure that the author of the Publication sees the reaction.

### 1.8.6. Reactions With Custom Emojis

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

### 1.8.7. Polls

With the Polls extension, users can create polls. This is useful for asking questions to users, such as "What is your favourite colour?".

Polls are added as a new field under Publication Extensions, called `poll`. This field is an object that contains the poll information.

```json5
{
    // ...
    "extensions": {
        "org.lysand:polls": {
            "poll": {
                "options": [
                    [
                        {
                            "content": "Red",
                            "content_type": "text/plain"
                        }
                    ],
                    [
                        {
                            "content": "Blue",
                            "content_type": "text/plain"
                        }
                    ],
                    [
                        {
                            "content": "Green",
                            "content_type": "text/plain"
                        }
                    ]
                ],
                "votes": [
                    9,
                    5,
                    0
                ],
                "multiple_choice": false,
                "expires_at": "2021-01-04T00:00:00.000Z"
            }
        }
    }
    // ...
}
```

These fields are described below.

> **Note:** There is no `question` field, because it is assumed that the question will be put in the `contents` field of the Publication. Clients are expected to render polls next to the contents of the Publication itself.

#### 1.8.7.1. Options

The `options` field on a Poll object is an array that contains a list of `ContentFormat` arrays. It is used to represent the options of the poll.

The `options` field is required on all Poll extension fields

The `options` field **MUST** contain at least 2 options, and does not have an upper limit for the number of options.

> **Note:** Servers should limit the number of options to a reasonable number, perferably in a configurable manner, such as 10. This is to prevent abuse of the protocol by sending a large number of options.

#### 1.8.7.2. Votes

The `votes` field on a Poll object is an array that contains a list of integers. It is used to represent the number of votes for each option.

The `votes` field is required on all Poll extension fields.

#### 1.8.7.3. Multiple Choice

The `multiple_choice` field on a Poll object is a boolean that represents whether or not the poll is multiple choice. It is used to determine if the user can select multiple options.

The `multiple_choice` field is not required on all Poll extension fields. If it is not provided, it is assumed that the poll is not multiple choice.

#### 1.8.7.4. Expires At

The `expires_at` field on a Poll object is a string that represents the date and time that the poll expires. It is used to determine when the poll ends, and when to stop accepting votes.

The `expires_at` field is required on all Poll extension fields.

Clients **SHOULD** display the time remaining until the poll expires.

#### 1.8.7.5. Integration With Custom Emojis

If you implement both the Polls and the Custom Emojis extensions, you can use the Custom Emojis extension to add emojis to poll options.

Example:
```json5
{
    // ...
    "extensions": {
        "org.lysand:polls": {
            "poll": {
                "options": [
                    [
                        {
                            "content": ":red:",
                            "content_type": "text/plain"
                        }
                    ],
                    [
                        {
                            "content": ":blue:",
                            "content_type": "text/plain"
                        }
                    ],
                    [
                        {
                            "content": ":green:",
                            "content_type": "text/plain"
                        }
                    ]
                ],
                "votes": [
                    9,
                    5,
                    0
                ],
                "multiple_choice": false,
                "expires_at": "2021-01-04T00:00:00.000Z"
            }
        },
        "org.lysand:custom_emojis": {
            "emojis": [
                {
                    "name": "red",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/red.webp",
                            "content_type": "image/webp"
                        }
                    ]
                },
                {
                    "name": "blue",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/blue.webp",
                            "content_type": "image/webp"
                        }
                    ]
                },
                {
                    "name": "green",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/green.webp",
                            "content_type": "image/webp"
                        }
                    ]
                }
            ]
        }
    }
    // ...
}
```

When rendering the poll options, clients **SHOULD** display emojis as recommended by the [Custom Emojis](#custom-emojis-1) extension.

#### 1.8.7.6. Poll Results

Clients **SHOULD** display poll results as a percentage of votes. For example, if 10 users voted for the first option, and 5 users voted for the second option, the first option should be displayed as 66.67%, and the second option should be displayed as 33.33%.

Clients **SHOULD** display the number of votes for each option.

Clients **SHOULD** display the total number of votes.

#### 1.8.7.7. Sending Votes

Clients **SHOULD** allow users to vote on polls. When a user votes on a poll, the client **MUST** send a `POST` request to the poll's Publication URI with the following JSON object in the body:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:polls/Vote",
    "id": "6b1586cf-1f83-4d85-8d70-a5dc9f213b3e",
    "uri": "https://example.com/actions/6b1586cf-1f83-4d85-8d70-a5dc9f213b3e",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "poll": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "option": 0
}
```

In return, the server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid `VoteResult` object.

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:polls/VoteResult",
    "id": "d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
    "uri": "https://example.com/actions/d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
    "poll": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "votes": [
        10,
        5,
        0
    ]
}
```

The total amount of votes can be calculated by summing the `votes` array.

This amount **MUST** include the user's vote, and **SHOULD** be displayed to the user upon voting.

#### 1.8.7.8. Poll Events

When a poll ends, a user that has voted in it **SHOULD** be notified of the results by the server.

The server **MAY** send a `GET` request to the poll's Publication URI to update the results of the poll.

### 1.8.8. Events

With the Events extension, users can create events. This is useful for creating gatherings, such as meetups or parties.

This extension is planned but not yet drafted.

### 1.8.9. Is Cat

> **Note:** This is a **silly** extension that is not meant to be taken very seriously.

With the Is Cat extension, users can tell other users if they are a cat or not. This is akin to Misskey's "Is Cat" feature.

An Actor can indicate whether they are a cat or not with the following field:

```json5
{
    "type": "User",
    // ...
    "extensions": {
        "org.lysand:is_cat": {
            "cat": true
        }
    }
}
```

Clients **SHOULD** render some graphic to indicate if a user is a cat or not, such as cat ears on the user's avatar.

## 1.9. Federation

The Lysand protocol is only useful when it is federated. This section describes how federation works in Lysand.

Federation in Lysand is based on the HTTP protocol. Servers communicate with each other by sending HTTP requests to one another.
objects
These requests are usually `POST` requests containing a JSON object in the body. This JSON object **MUST BE** a valid Lysand object.

Servers that receive invalid Lysand objects **SHOULD** discard this object as invalid.

### 1.9.1. Cryptography

Lysand uses cryptography to ensure that objects are not tampered with during transit. This is done by signing objects with a private key, and verifying the signature with a public key.

All HTTP requests **MUST** be sent over HTTPS. Servers **MUST** not accept HTTP requests, unless it is for development purposes.

HTTP requests **MUST** be signed with the public key of the author of the object. This is done by adding a `Signature` header to the request.

The `Signature` header **MUST** be formatted as follows:
```
Signature: keyId="https://example.com/users/uuid",algorithm="ed25519",headers="(request-target) host date digest",signature="base64_signature"
```

The `keyId` field **MUST** be the URI of the user that is sending the request.

The `algorithm` field **MUST** be `ed25519`.

The `headers` field **MUST** be `(request-target) host date digest`.

The `signature` field **MUST** be the base64-encoded signature of the request.

The signature **MUST** be calculated as follows:

1. Create a string that contains the following:
```
(request-target): post /users/uuid/inbox
host: example.com
date: Fri, 01 Jan 2021 00:00:00 GMT
digest: SHA-256=base64_digest
```

1. Sign the string with the user's private key.

2. Base64-encode the signature.

The `digest` field **MUST** be the SHA-256 digest of the request body, base64-encoded.

The `date` field **MUST** be the date and time that the request was sent, formatted as follows (ISO 8601):
```
Fri, 01 Jan 2021 00:00:00 GMT
```

The `host` field **MUST** be the domain of the server that is receiving the request.

The `request-target` field **MUST** be the request target of the request, formatted as follows:
```
post /users/uuid/inbox
```

Where `/users/uuid/inbox` is the path of the request.

Here is an example of signing a request using TypeScript and the WebCrypto API:

```typescript
const privateKey = await crypto.subtle.importKey(
    "raw",
    atob("base64_private_key"),
    {
        name: "ed25519",
        namedCurve: "ed25519"
    },
    false,
    ["sign"]
);

const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode("request_body")
);

const signature = await crypto.subtle.sign(
    {
        name: "ed25519",
        saltLength: 0
    },
    privateKey,
    new TextEncoder().encode(
        "(request-target): post /users/uuid/inbox\n" +
        "host: example.com\n" +
        "date: Fri, 01 Jan 2021 00:00:00 GMT\n" +
        "digest: SHA-256=" + btoa(digest)
    )
);

const signatureBase64 = base64Encode(signature);
```

The request can then be sent with the `Signature` and `Date` headers as follows:
```ts
await fetch("https://example.com/users/uuid/inbox", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Date": "Fri, 01 Jan 2021 00:00:00 GMT",
        "Signature": `keyId="https://example.com/users/uuid",algorithm="ed25519",headers="(request-target) host date digest",signature="${signatureBase64}"`
    },
    body: JSON.stringify({
        // ...
    })
});
```

### 1.9.2. User Discovery

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

### 1.9.3. User Actor Endpoints

Once the requesting server has discovered the endpoints of the server, it can send a `GET` request to the `self` endpoint to discover the user's actor.

In the above example, to discover user information, the requesting server **MUST** send a `GET` request to the endpoint `https://example.com/users/uuid` with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Actor object.

### 1.9.4. User Inbox

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

### 1.9.5. User Outbox

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
            "type": "Note",
            "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "uri": "https://example.com/publications/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "author": "https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755",
            "created_at": "2021-01-01T00:00:00.000Z",
            "contents": [
                {
                    "content": "Hello, world!",
                    "content_type": "text/plain"
                }
            ],
        }
    ]
}
```

These publications **MUST BE** ordered from newest to oldest, in descending order.

### 1.9.6. User Followers

Users in Lysand have a list of followers, which is a list of users that follow the user. This is similar to the followers list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the followers endpoint return an empty collection.

The server **MUST** specify the followers URL in the actor object.

Example followers URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/followers`

The requesting server **MUST** send a `GET` request to the followers endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/followers`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Actors. This collection may be empty.

### 1.9.7. User Following

Users in Lysand have a list of following, which is a list of users that the user follows. This is similar to the following list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the following endpoint return an empty collection.

The server **MUST** specify the following URL in the actor object.

Example following URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/following`

The requesting server **MUST** send a `GET` request to the following endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/following`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Actors. This collection may be empty.

### 1.9.8. User Featured Publications

Users in Lysand have a list of featured publications, which is a list of publications that the user has pinned or are important. This is similar to the featured publications list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the featured publications endpoint return an empty collection.

The server **MUST** specify the featured publications URL in the actor object.

Example featured publications URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/featured`

The requesting server **MUST** send a `GET` request to the featured publications endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/featured`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Publications. This collection may be empty.

### 1.9.9. User Likes

Users in Lysand have a list of likes, which is a list of posts that the user has liked. This is similar to the likes list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the likes endpoint return an empty collection.

The server **MUST** specify the likes URL in the actor object.

Example likes URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/likes`

The requesting server **MUST** send a `GET` request to the likes endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/likes`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Publications. This collection may be empty.


### 1.9.10. User Dislikes

Users in Lysand have a list of dislikes, which is a list of posts that the user has disliked. This is similar to the dislikes list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the dislikes endpoint return an empty collection.

The server **MUST** specify the dislikes URL in the actor object.

Example dislikes URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/dislikes`

The requesting server **MUST** send a `GET` request to the dislikes endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/dislikes`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Publications. This collection may be empty.

### 1.9.11. Server Discovery

> **Note:** The terms "the server" and "the requesting server" are used in this section. "The server" refers to the server that is being discovered, and "the requesting server" refers to the server that is trying to discover the server.

To discover the metadata of a server, the requesting server **MUST** send a `GET` request to the endpoint `https://example.com/.well-known/lysand`.

The requesting server **MUST** send the following headers with the request:
```
Accept: application/json
```

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid `ServerMetadata` object.

Example:
    
```json5
{
    "type": "ServerMetadata",
    "name": "Example",
    "uri": "https://example.com",
    "version": "1.0.0",
    "supported_extensions": [
        "org.lysand:reactions",
        "org.lysand:polls",
        "org.lysand:custom_emojis",
        "org.lysand:is_cat"
    ]
}
```

## 1.10. License

This repository is licensed under the [GPL-3.0](LICENSE)

This document was authored by [CPlusPatch](https://github.com/CPlusPatch). Please open an issue or contact me for any questions or additions:

`@jesse:cpluspatch.dev` (Matrix)

`contact@cpluspatch.com` (E-mail)
