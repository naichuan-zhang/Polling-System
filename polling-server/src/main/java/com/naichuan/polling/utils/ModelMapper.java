package com.naichuan.polling.utils;

import com.naichuan.polling.model.Poll;
import com.naichuan.polling.model.User;
import com.naichuan.polling.payload.ChoiceResponse;
import com.naichuan.polling.payload.PollResponse;
import com.naichuan.polling.payload.UserSummary;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Naichuan Zhang
 * 29-Aug-2020
 **/
public class ModelMapper {

    public static PollResponse mapPollToPollResponse(Poll poll, Map<Long, Long> choiceVotesMap,
                                                     User creator, Long userVote) {
        PollResponse pollResponse = new PollResponse();
        pollResponse.setId(poll.getId());
        pollResponse.setQuestion(poll.getQuestion());
        pollResponse.setCreationDateTime(poll.getCreatedAt());
        pollResponse.setExpirationDateTime(poll.getExpirationDateTime());
        Instant now = Instant.now();
        pollResponse.setExpired(poll.getExpirationDateTime().isBefore(now));
        List<ChoiceResponse> choiceResponses = poll.getChoices().stream().map(
                choice -> {
                    ChoiceResponse choiceResponse = new ChoiceResponse();
                    choiceResponse.setId(choice.getId());
                    choiceResponse.setText(choice.getText());
                    if (choiceVotesMap.containsKey(choice.getId())) {
                        choiceResponse.setVoteCount(choiceVotesMap.get(choice.getId()));
                    } else {
                        choiceResponse.setVoteCount((long) 0);
                    }
                    return choiceResponse;
                }
        ).collect(Collectors.toList());
        pollResponse.setChoices(choiceResponses);
        UserSummary userSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        pollResponse.setCreatedBy(userSummary);
        if (userVote != null) {
            pollResponse.setSelectedChoice(userVote);
        }
        long totalVotes = pollResponse.getChoices().stream().mapToLong(ChoiceResponse::getVoteCount).sum();
        pollResponse.setTotalVotes(totalVotes);

        return pollResponse;
    }
}
