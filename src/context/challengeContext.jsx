import React, { createContext, useContext, useState, useCallback } from "react";

const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all challenges
  const fetchChallenges = useCallback(async () => {
    try {
      setLoading(true);
      // API call would go here
      // const response = await fetch(`${API_URL}/challenges`);
      // const data = await response.json();
      // setChallenges(data);
      
      // For now, challenges are managed locally
    } catch (error) {
      console.error("Error fetching challenges:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new challenge
  const createChallenge = useCallback(
    async (friendId, goalType, goalValue) => {
      try {
        const newChallenge = {
          id: `challenge-${Date.now()}`,
          opponent_id: friendId,
          opponent_name: "", // Will be set from friend data
          goal_type: goalType,
          goal_value: goalValue,
          status: "pending",
          created_at: new Date().toISOString(),
          initiator_name: "You",
        };

        // API call would go here
        // const response = await fetch(`${API_URL}/challenges`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(newChallenge)
        // });

        // Add to local state
        setChallenges((prev) => [...prev, newChallenge]);
        return newChallenge;
      } catch (error) {
        console.error("Error creating challenge:", error);
        throw error;
      }
    },
    []
  );

  // Update challenge (accept, reject, etc.)
  const updateChallenge = useCallback(async (challengeId, updates) => {
    try {
      // API call would go here
      // const response = await fetch(`${API_URL}/challenges/${challengeId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });

      // Update local state
      setChallenges((prev) =>
        prev.map((challenge) =>
          challenge.id === challengeId
            ? { ...challenge, ...updates }
            : challenge
        )
      );
    } catch (error) {
      console.error("Error updating challenge:", error);
      throw error;
    }
  }, []);

  // Delete challenge (reject)
  const deleteChallenge = useCallback(async (challengeId) => {
  try {
    console.log("Attempting to delete challenge:", challengeId);

    // API call would go here
    // const response = await fetch(`${API_URL}/challenges/${challengeId}`, {
    //   method: 'DELETE'
    // });

    // Remove from local state immediately
    const previousChallenges = challenges;

    setChallenges((prev) => {
      const filtered = prev.filter((challenge) => challenge.id !== challengeId);
      console.log("Challenge deleted from state. Before:", prev.length, "After:", filtered.length);
      return filtered;
    });

  } catch (error) {
    console.error("Error deleting challenge:", error);
    throw error;
  }
}, [challenges]);

  // Add a challenge directly (for mock data or testing)
  const addChallenge = useCallback((challenge) => {
    setChallenges((prev) => [...prev, challenge]);
  }, []);

  // Add multiple challenges
  const addChallenges = useCallback((newChallenges) => {
    setChallenges((prev) => [...prev, ...newChallenges]);
  }, []);

  // Clear all challenges
  const clearChallenges = useCallback(() => {
    setChallenges([]);
  }, []);

  const value = {
    challenges,
    loading,
    fetchChallenges,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    addChallenge,
    addChallenges,
    clearChallenges,
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error("useChallenge must be used within ChallengeProvider");
  }
  return context;
};
