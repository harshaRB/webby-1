// Fetch subjects from Supabase
async function fetchSubjects() {
    const { data: subjects, error } = await supabase
      .from('subjects') // Assuming you have a 'subjects' table in Supabase
      .select('*');
  
    if (error) {
      console.error("Error fetching subjects:", error);
      return;
    }
  
    // Populate the dropdown
    const subjectDropdown = document.getElementById('subject');
    subjects.forEach(subject => {
      const option = document.createElement('option');
      option.value = subject.id;
      option.textContent = subject.name; // Assuming 'name' is the field for subject names
      subjectDropdown.appendChild(option);
    });
  }
  
  // Call the function to fetch and populate subjects when the page loads
  fetchSubjects();

  




  const urlParams = new URLSearchParams(window.location.search);
const questionId = urlParams.get('questionId');
const subject = urlParams.get('subject');

if (questionId) {
  // Fetch the question from Supabase and pre-fill the form
  async function fetchQuestionDetails() {
    const { data: questionData, error } = await supabase
      .from('questions')
      .select('question, subject')
      .eq('id', questionId)
      .single();

    if (error) {
      console.error('Error fetching question:', error);
      return;
    }

    document.getElementById('question').value = questionData.question;
    document.getElementById('subject').value = questionData.subject;
  }

  fetchQuestionDetails();
}





// Handle form submission
document.getElementById('submitForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const subject = document.getElementById('subject').value;
    const questionText = document.getElementById('question').value;
    const answerText = document.getElementById('answer').value;
  
    const user = supabase.auth.user();
  
    if (questionId) {
      // Add answer to existing question
      const { data: answerData, error } = await supabase
        .from('answers')
        .insert([
          { question_id: questionId, user_id: user.id, answer: answerText }
        ]);
  
      if (error) {
        console.error("Error adding answer:", error);
        return;
      }
  
      alert("Your answer has been submitted!");
    } else {
      // Add new question and answer
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert([
          { subject, question: questionText, user_id: user.id }
        ]);
  
      if (questionError) {
        console.error("Error adding question:", questionError);
        return;
      }
  
      const { data: answerData, error: answerError } = await supabase
        .from('answers')
        .insert([
          { question_id: questionData.id, user_id: user.id, answer: answerText }
        ]);
  
      if (answerError) {
        console.error("Error adding answer:", answerError);
        return;
      }
  
      alert("Your question and answer have been submitted!");
    }
  });
  