package com.ssafy.project.repository;

import com.ssafy.project.domain.group.MeetingGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;

public interface GroupRepository extends JpaRepository<MeetingGroup, Long> {



}
