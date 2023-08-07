package com.ssafy.project.domain.room;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeetingRoomMessage is a Querydsl query type for MeetingRoomMessage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeetingRoomMessage extends EntityPathBase<MeetingRoomMessage> {

    private static final long serialVersionUID = -1775372362L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMeetingRoomMessage meetingRoomMessage = new QMeetingRoomMessage("meetingRoomMessage");

    public final com.ssafy.project.domain.QBaseTimeEntity _super = new com.ssafy.project.domain.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    public final QMeetingRoom meetingRoom;

    public final com.ssafy.project.domain.user.QUser messageFrom;

    public final NumberPath<Long> messageId = createNumber("messageId", Long.class);

    public QMeetingRoomMessage(String variable) {
        this(MeetingRoomMessage.class, forVariable(variable), INITS);
    }

    public QMeetingRoomMessage(Path<? extends MeetingRoomMessage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMeetingRoomMessage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMeetingRoomMessage(PathMetadata metadata, PathInits inits) {
        this(MeetingRoomMessage.class, metadata, inits);
    }

    public QMeetingRoomMessage(Class<? extends MeetingRoomMessage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.meetingRoom = inits.isInitialized("meetingRoom") ? new QMeetingRoom(forProperty("meetingRoom")) : null;
        this.messageFrom = inits.isInitialized("messageFrom") ? new com.ssafy.project.domain.user.QUser(forProperty("messageFrom"), inits.get("messageFrom")) : null;
    }

}

