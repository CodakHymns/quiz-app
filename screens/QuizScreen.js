import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import he from 'he';

//For the state inintialization for each variable
const QuizScreen = ({ navigation }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);


//Data Fetching
  useEffect(() => {
    //It fetches quiz data from Open Trivia Database 
    const fetchQuizData = async () => {
      //Error Handling
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
        setQuizData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  //Answer Shuffling
  useEffect(() => {
    if (quizData.length > 0) {
      const currentQuiz = quizData[currentQuestion];
      const answers = [
        //maps the answer to an object with the answer text with a incorrect/correct flag
        ...currentQuiz.incorrect_answers.map(answer => ({ answer, isCorrect: false })),
        { answer: currentQuiz.correct_answer, isCorrect: true }
      ].sort(() => Math.random() - 0.5);
      // Shuffles the array randomly for correct answer not to be at the same position
      setShuffledAnswers(answers);
    }
  }, [currentQuestion, quizData]);

  const handleAnswerPress = (index) => {
    setSelectedAnswerIndex(index); //Updates var of the selected answer with the index of the selected answer
    setShowCorrectAnswer(true);// sets the var to true and displays to the user if ans is correct or not
    if (shuffledAnswers[index].isCorrect) {
      //checks if the selected answer is correct based on (is correct) prop of the asnwer object in 'shuffledAnswers'
      setScore(score + 1);
    }
  };

  //Function to move to the next question
  const handleNextQuestion = () => {
    setShowCorrectAnswer(false);//hides the correct answer
    if (currentQuestion < quizData.length - 1) {
      //Moves to the nxt uestion if they are no more questions
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswerIndex(null);
    } else {
      //Nav to Results when questions are exhausted.
      navigation.navigate('Result', { score, totalQuestions: quizData.length, quizData });
    }
  };

  //displays a loading indicator when the quiz data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  const currentQuiz = quizData[currentQuestion];//Gets the current question data
  const answerLabels = ['A', 'B', 'C', 'D'];//labels answers

  return (
    //Container for quiz screen
    <View style={styles.container}>
      {/* question Container */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {currentQuestion + 1}. {he.decode(currentQuiz.question)}
        </Text>
      </View>

      {/* Answers container */}
      <View style={styles.answersContainer}>
        {shuffledAnswers.map((answerObj, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswerIndex === index
                ? styles.selectedAnswer
                : styles.unselectedAnswer,
              showCorrectAnswer && answerObj.isCorrect
                ? styles.correctAnswer
                : null,
              showCorrectAnswer && selectedAnswerIndex === index && !answerObj.isCorrect
                ? styles.wrongAnswer
                : null,
            ]}
            onPress={() => handleAnswerPress(index)}
            disabled={showCorrectAnswer} // Disable the button if the answer is already shown
          >
            <Text style={styles.answerText}>{`${answerLabels[index]}. ${he.decode(answerObj.answer)}`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* next Button Container */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentQuestion === quizData.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styling....

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  answersContainer: {
    flex: 1,
  },
  answerButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedAnswer: {
    backgroundColor: '#FF4136',
  },
  unselectedAnswer: {
    backgroundColor: '#fff',
  },
  correctAnswer: {
    backgroundColor: '#2ECC40',
  },
  wrongAnswer: {
    backgroundColor: '#FF4136',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
  },
  nextButtonContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QuizScreen;
