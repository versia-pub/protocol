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