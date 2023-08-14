package com.ssafy.project.repository;

import com.ssafy.project.domain.group.MeetingGroupInvitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InvitationRepository extends JpaRepository<MeetingGroupInvitation, Long> {
    Optional<MeetingGroupInvitation> findByUserIdAndGroupId(Long userId, Long groupId);
}
