import { generateClient } from "aws-amplify/api";
import { createPollAnswers, updateOption } from "../src/graphql/mutations";
import { getOption, getPollAnswers } from "../src/graphql/queries";
import { getCurrentUser } from "@aws-amplify/auth";

const client = generateClient();

export const vote = async (thought, option) => {
    const { userId } = await getCurrentUser();

    try {
        // Register vote
        const newVote = await client.graphql({
            query: createPollAnswers,
            variables: {
                input: {
                    thoughtID: thought.id,
                    userID: userId,
                    optionID: option.id,
                },
            },
        });

        if (!newVote.data.createPollAnswers) {
            throw new Error("Failed to create poll answer.");
        }

        console.log("New vote registered: ", newVote.data.createPollAnswers);

        // Get current vote count
        const optionData = await client.graphql({
            query: getOption,
            variables: { id: option.id },
        });

        const currentVoteCount = optionData?.data?.getOption?.votes;
        if (currentVoteCount === undefined) {
            throw new Error("Failed to retrieve current vote count.");
        }

        // Update vote count
        const updatedVote = await client.graphql({
            query: updateOption,
            variables: {
                input: {
                    id: option.id,
                    votes: currentVoteCount + 1,
                },
            },
        });

        if (!updatedVote.data.updateOption) {
            throw new Error("Failed to update vote count.");
        }

        console.log("Vote count updated: ", updatedVote.data.updateOption);
        return updatedVote.data.updateOption;

    } catch (error) {
        console.error("Error processing vote: ", error);
        return null;
    }
};

export const checkAnswered = async (thought) => {
    const { userId } = await getCurrentUser();
    try {
        const result = await client.graphql({
            query: getPollAnswers,
            variables: {
                userID: userId,
                thoughtID: thought.id,
            }
        })

        const answer = result.data.getPollAnswers;

        if (answer && answer.optionID) {
            return answer.optionID;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}
