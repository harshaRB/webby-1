document.addEventListener('DOMContentLoaded', function () {
    console.log("JavaScript Loaded");

    // Initialize answersData from localStorage
    let answersData = loadVotesFromStorage(); 

    // Function to load data from localStorage (if available)
    function loadVotesFromStorage() {
        try {
            const storedData = localStorage.getItem("answersData");
            if (storedData) {
                return JSON.parse(storedData);
            }
        } catch (error) {
            console.error("Error loading votes from localStorage:", error);
        }
        return {}; // Return empty object if there's an error or no stored data
    }

    // Function to save data to localStorage
    function saveVotesToStorage() {
        try {
            localStorage.setItem("answersData", JSON.stringify(answersData));
        } catch (error) {
            console.error("Error saving votes to localStorage:", error);
        }
    }

    // Function to show answers for a specific question
    function showAnswers(questionId) {
        console.log("Showing answers for question " + questionId);

        // Dynamically load answers for the selected question
        document.querySelector(".current-question").textContent = `Answers for Question ${questionId}`;

        const answersSection = document.querySelector(".answer-container");
        answersSection.innerHTML = ''; // Clear existing answers

        // Get answers for the specific question
        const answers = answersData[questionId] || [];
        if (answers.length > 0) {
            answers.forEach(answer => {
                const answerCard = document.createElement('div');
                answerCard.classList.add('answer-card');
                answerCard.innerHTML = `
                    <div class="answer-content">
                        <p>${answer.text}</p>
                        <div class="vote-controls">
                            <button class="upvote-btn">⬆</button>
                            <span class="vote-count">${answer.votes}</span>
                            <button class="downvote-btn">⬇</button>
                        </div>
                    </div>
                `;
                answersSection.appendChild(answerCard);
            });
        } else {
            const noAnswersMessage = document.createElement('p');
            noAnswersMessage.textContent = "No answers yet. Be the first to answer!";
            answersSection.appendChild(noAnswersMessage);
        }
    }

    // Event listener for "View Answers" buttons
    document.querySelectorAll('.view-answers-btn').forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question-id');
            showAnswers(questionId);
        });
    });

    // Add vote functionality for questions and answers
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("upvote-btn") || e.target.classList.contains("downvote-btn")) {
            const card = e.target.closest(".question-card, .answer-card");
            const id = card.getAttribute("data-id");
            const type = card.classList.contains("question-card") ? "question" : "answer";
            const voteKey = `${type}-${id}`;

            // Prevent multiple votes from the same user
            if (hasVoted(voteKey)) {
                alert("You already voted on this!");
                return;
            }

            const voteCount = card.querySelector(".vote-count");
            let currentVotes = parseInt(voteCount.textContent, 10);

            if (e.target.classList.contains("upvote-btn")) {
                currentVotes++;
            } else if (e.target.classList.contains("downvote-btn")) {
                currentVotes--;
            }

            voteCount.textContent = currentVotes;
            markVoted(voteKey);

            // Update the corresponding answer or question vote count in answersData
            if (type === "question") {
                const questionId = parseInt(id, 10);
                if (!answersData[questionId]) answersData[questionId] = [];
                answersData[questionId][0].votes = currentVotes; // Update first answer's vote count (example)
            } else if (type === "answer") {
                const answerId = parseInt(id, 10);
                if (!answersData[answerId]) answersData[answerId] = [];
                answersData[answerId][0].votes = currentVotes; // Update the vote count for the answer
            }

            // Save updated answersData to localStorage
            saveVotesToStorage();

            // Reorder questions/answers dynamically
            if (type === "question") reorderQuestions();
            if (type === "answer") reorderAnswers(card.closest(".answers-section"));
        }
    });

    // Function to check if a user has already voted (using localStorage)
    function hasVoted(key) {
        try {
            return localStorage.getItem(key) === "true";
        } catch (error) {
            console.error("Error checking vote status:", error);
            return false; // Default to false if error occurs
        }
    }

    // Function to mark a vote in localStorage
    function markVoted(key) {
        try {
            localStorage.setItem(key, "true");
        } catch (error) {
            console.error("Error marking vote in localStorage:", error);
        }
    }

    // Function to reorder questions based on votes (descending order)
    function reorderQuestions() {
        const questionsContainer = document.querySelector(".questions-container");
        const questions = Array.from(questionsContainer.children);

        questions.sort((a, b) => {
            const votesA = parseInt(a.querySelector(".vote-count").textContent, 10);
            const votesB = parseInt(b.querySelector(".vote-count").textContent, 10);
            return votesB - votesA;
        });

        questionsContainer.innerHTML = "";
        questions.forEach((q) => questionsContainer.appendChild(q));
    }

    // Function to reorder answers based on votes (descending order)
    function reorderAnswers(section) {
        const answersContainer = section.querySelector(".answer-container");
        const answers = Array.from(answersContainer.children);

        answers.sort((a, b) => {
            const votesA = parseInt(a.querySelector(".vote-count").textContent, 10);
            const votesB = parseInt(b.querySelector(".vote-count").textContent, 10);
            return votesB - votesA;
        });

        answersContainer.innerHTML = "";
        answers.forEach((a) => answersContainer.appendChild(a));
    }

    // Ensure data is loaded correctly when the page is first accessed
    // Example data for testing (you can add more questions/answers dynamically)
    let initialAnswersData = {
        1: [
            { id: 1, text: "The Circle of Willis ensures brain blood flow by providing alternative routes when major arteries are blocked.", votes: 3 },
            { id: 2, text: "It serves as a safeguard for cerebral ischemia due to arterial blockages.", votes: 5 }
        ],
        2: [
            { id: 1, text: "The brachial plexus is crucial for motor and sensory innervation of the upper limbs.", votes: 4 },
            { id: 2, text: "Injuries to the brachial plexus can lead to conditions like Erb's palsy.", votes: 2 }
        ]
    };

    // Initialize the answersData with example data (if it's empty)
    if (Object.keys(answersData).length === 0) {
        answersData = initialAnswersData;
        saveVotesToStorage(); // Save initial data to localStorage if needed
    }
});
