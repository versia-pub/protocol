import { Extension } from "../../Extension";

export interface OrgLysandPollsVoteType extends Extension {
    extension_type: "org.lysand:polls/Vote";
    author: string;
    poll: string;
    option: number;
}

export interface OrgLysandPollsVoteResultType extends Extension {
    extension_type: "org.lysand:polls/VoteResult";
    poll: string;
    votes: number[];
}