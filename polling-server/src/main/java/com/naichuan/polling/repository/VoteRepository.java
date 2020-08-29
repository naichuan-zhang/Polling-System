package com.naichuan.polling.repository;

import com.naichuan.polling.model.ChoiceVoteCount;
import com.naichuan.polling.model.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("select new com.naichuan.polling.model.ChoiceVoteCount(v.choice.id, count(v.id)) from Vote v " +
            "where v.poll.id in :pollIds group by v.choice.id")
    List<ChoiceVoteCount> countByPollIdInGroupByChoiceId(@Param("pollIds") List<Long> pollIds);

    @Query("select new com.naichuan.polling.model.ChoiceVoteCount(v.choice.id, count(v.id)) from Vote v " +
            "where v.poll.id = :pollId group by v.choice.id")
    List<ChoiceVoteCount> countByPollIdGroupByChoiceId(@Param("pollId") Long pollId);

    @Query("select v from Vote v where v.user.id = :userId and v.poll.id in :pollIds")
    List<Vote> findByUserIdAndPollIdIn(@Param("userId") Long userId, @Param("pollIds") List<Long> pollIds);

    @Query("select count(v.id) from Vote v where v.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);

    @Query("select v.poll.id from Vote v where v.user.id = :userId")
    Page<Long> findVotedPollIdsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("select v from Vote v where v.user.id = :userId and v.poll.id = :pollId")
    Vote findByUserIdAndPollId(Long userId, Long pollId);
}
