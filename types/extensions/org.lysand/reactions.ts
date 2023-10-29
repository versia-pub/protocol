import { Extension } from "../../Extension";

export interface OrgLysandReactionsType extends Extension {
    extension_type: "org.lysand:reactions/Reaction";
    author: string;
    object: string;
    content: string;
}