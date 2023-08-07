package com.ssafy.project.domain.group;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeetingGroup is a Querydsl query type for MeetingGroup
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeetingGroup extends EntityPathBase<MeetingGroup> {

    private static final long serialVersionUID = -517468479L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMeetingGroup meetingGroup = new QMeetingGroup("meetingGroup");

    public final com.ssafy.project.domain.QBaseTimeEntity _super = new com.ssafy.project.domain.QBaseTimeEntity(this);

    public final BooleanPath accepted = createBoolean("accepted");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Integer> groupCount = createNumber("groupCount", Integer.class);

    public final EnumPath<com.ssafy.project.domain.Gender> groupGender = createEnum("groupGender", com.ssafy.project.domain.Gender.class);

    public final NumberPath<Long> groupId = createNumber("groupId", Long.class);

    public final com.ssafy.project.domain.room.QGroupMeetingRoom groupMeetingRoom;

    public final EnumPath<MeetingGroupRole> groupRole = createEnum("groupRole", MeetingGroupRole.class);

    public final ListPath<com.ssafy.project.domain.user.User, com.ssafy.project.domain.user.QUser> groupUser = this.<com.ssafy.project.domain.user.User, com.ssafy.project.domain.user.QUser>createList("groupUser", com.ssafy.project.domain.user.User.class, com.ssafy.project.domain.user.QUser.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    public QMeetingGroup(String variable) {
        this(MeetingGroup.class, forVariable(variable), INITS);
    }

    public QMeetingGroup(Path<? extends MeetingGroup> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMeetingGroup(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMeetingGroup(PathMetadata metadata, PathInits inits) {
        this(MeetingGroup.class, metadata, inits);
    }

    public QMeetingGroup(Class<? extends MeetingGroup> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.groupMeetingRoom = inits.isInitialized("groupMeetingRoom") ? new com.ssafy.project.domain.room.QGroupMeetingRoom(forProperty("groupMeetingRoom")) : null;
    }

}

