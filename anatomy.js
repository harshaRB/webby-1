// Initialize Supabase
const supabase = supabase.createClient('https://wwevvwgdonkknqzgbsoa.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3ZXZ2d2dkb25ra25xemdic29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MjUwMzgsImV4cCI6MjA1MDEwMTAzOH0.VskKxKSSewdZmatXYQLB6vsLZP0IsZMfz_pVVpBHky8');

// Fetch and display questions from Supabase
async function fetchQuestions() {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, question, subject, votes')
    .eq('subject', 'Anatomy')
    .order('votes', { ascending: false });

  if (error) {
    console.error('Error fetching questions:', error);
    return;
  }

  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = ''; // Clear previous questions

  questions.forEach(question => {
    const questionCard = document.createElement('div');
    questionCard.classList.add('question-card');

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = question.question;

    const votes = document.createElement('div');
    votes.classList.add('votes');
    votes.textContent = `Votes: ${question.votes}`;

    const answerBtn = document.createElement('button');
    answerBtn.classList.add('answer-btn');
    answerBtn.textContent = 'Add Your Answer';
    answerBtn.onclick = () => {
      window.location.href = `submit-question-answer.html?questionId=${question.id}&subject=Anatomy`;
    };

    questionCard.appendChild(questionTitle);
    questionCard.appendChild(votes);
    questionCard.appendChild(answerBtn);
    questionsList.appendChild(questionCard);
  });
}

// Fetch questions when the page loads
fetchQuestions();

// Add a button to submit questions
document.getElementById('submit-question-btn').addEventListener('click', () => {
  window.location.href = 'submit-question-answer.html';
});









async function addExampleQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .insert([
        { question: 'What is the function of the heart?', subject: 'Anatomy', votes: 5 },
        { question: 'Describe the structure of the human brain.', subject: 'Anatomy', votes: 8 },
        { question: 'What are the types of muscle tissues?', subject: 'Anatomy', votes: 10 }
      ]);
  
    if (error) {
      console.error('Error adding example questions:', error);
    } else {
      console.log('Example questions added:', data);
    }
  }
  
  // Call the function to add questions
  addExampleQuestions();

  




  async function addExampleAnswers() {
    const { data, error } = await supabase
      .from('answers')
      .insert([
        { question_id: 1, answer: 'The heart pumps blood throughout the body.', user_id: 1 },
        { question_id: 2, answer: 'The brain is composed of the cerebrum, cerebellum, and brainstem.', user_id: 1 },
        { question_id: 3, answer: 'There are three types: skeletal, smooth, and cardiac muscle tissue.', user_id: 1 }
      ]);
  
    if (error) {
      console.error('Error adding example answers:', error);
    } else {
      console.log('Example answers added:', data);
    }
  }
  
  // Call the function to add answers
  addExampleAnswers();
  




  // Initialize Supabase
const supabaseUrl = 'https://wwevvwgdonkknqzgbsoa.supabase.co'; // Replace with your URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3ZXZ2d2dkb25ra25xemdic29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MjUwMzgsImV4cCI6MjA1MDEwMTAzOH0.VskKxKSSewdZmatXYQLB6vsLZP0IsZMfz_pVVpBHky8'; // Replace with your Anon Key
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);
