export interface bodyMensagem {
    from: string
    body: string

};


export interface userState {
    [key: string]: string
}

export interface flowMessage {
    [key: string]: string
}

export interface messageJson {
    id: string;
    viewed: boolean;
    body: string;
    type: string;
    t: number;
    notifyName: string;
    from: string;
    to: string;
    ack: number;
    invis: boolean;
    isNewMsg: boolean;
    star: boolean;
    kicNotified: boolean;
    recvFresh: boolean;
    isFromTemplate: boolean;
    pollInvalidated: boolean;
    isSentCagPollCreation: boolean;
    latestEditMsgKey: string | null;
    latestEditSenderTimestampMs: number | null;
    mentionedJidList: string[];
    groupMentions: string[];
    isEventCanceled: boolean;
    eventInvalidated: boolean;
    isVcardOverMmsDocument: boolean;
    isForwarded: boolean;
    labels: string[];
    hasReaction: boolean;
    messageSecret: { [key: string]: number };
    productHeaderImageRejected: boolean;
    lastPlaybackProgress: number;
    isDynamicReplyButtonsMsg: boolean;
    isCarouselCard: boolean;
    parentMsgId: string | null;
    isMdHistoryMsg: boolean;
    stickerSentTs: number;
    isAvatar: boolean;
    lastUpdateFromServerTs: number;
    invokedBotWid: string | null;
    bizBotType: string | null;
    botResponseTargetId: string | null;
    botPluginType: string | null;
    botPluginReferenceIndex: number | null;
    botPluginSearchProvider: string | null;
    botPluginSearchUrl: string | null;
    botPluginSearchQuery: string | null;
    botPluginMaybeParent: boolean;
    botReelPluginThumbnailCdnUrl: string | null;
    botMsgBodyType: string | null;
    requiresDirectConnection: boolean | null;
    bizContentPlaceholderType: string | null;
    hostedBizEncStateMismatch: boolean;
    senderOrRecipientAccountTypeHosted: boolean;
    placeholderCreatedWhenAccountIsHosted: boolean;
    chatId: string;
    fromMe: boolean;
    sender: {
        id: string;
        name: string;
        shortName: string;
        pushname: string;
        type: string;
        labels: string[];
        isContactSyncCompleted: number;
        textStatusLastUpdateTime: number;
        syncToAddressbook: boolean;
        formattedName: string;
        isMe: boolean;
        isMyContact: boolean;
        isPSA: boolean;
        isUser: boolean;
        isWAContact: boolean;
        profilePicThumbObj: {
            eurl: string;
            id: string;
            img: string;
            imgFull: string;
            tag: string;
        };
    };
    msgs: any | null;
    timestamp: number;
    content: string;
    isGroupMsg: boolean;
    mediaData: object;
}