package com.ssafy.project.domain.room;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupMeetingRoom is a Querydsl query type for GroupMeetingRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupMeetingRoom extends EntityPathBase<GroupMeetingRoom> {

    private static final long serialVersionUID = -1816283844L;

    public static final QGroupMeetingRoom groupMeetingRoom = new QGroupMeetingRoom("groupMeetingRoom");

    public final QMeetingRoom _super = new QMeetingRoom(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Integer> femaleCount = createNumber("femaleCount", Integer.class);

    public final ListPath<com.ssafy.project.domain.group.MeetingGroup, com.ssafy.project.domain.group.QMeetingGroup> groupMeetingRooms = this.<com.ssafy.project.domain.group.MeetingGroup, com.ssafy.project.domain.group.QMeetingGroup>createList("groupMeetingRooms", com.ssafy.project.domain.group.MeetingGroup.class, com.ssafy.project.domain.group.QMeetingGroup.class, PathInits.DIRECT2);

    public final BooleanPath isReady = createBoolean("isReady");

    //inherited
    public final BooleanPath isStart = _super.isStart;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    public final NumberPath<Integer> maleCount = createNumber("maleCount", Integer.class);

    //inherited
    public final NumberPath<Long> roomId = _super.roomId;

    public QGroupMeetingRoom(String variable) {
        super(GroupMeetingRoom.class, forVariable(variable));
    }

    public QGroupMeetingRoom(Path<? extends GroupMeetingRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGroupMeetingRoom(PathMetadata metadata) {
        super(GroupMeetingRoom.class, metadata);
    }

}

