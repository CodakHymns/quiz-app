import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuizScreen = ({ navigation, route }) => {
  const [quizData, setQuizData] = useState([
    // (quiz data unchanged)
    {
        question: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 0,
      },
      {
        question: 'Which language is spoken in Brazil?',
        answers: ['Spanish', 'English', 'Portuguese', 'French'],
        correctAnswer: 2,
      },
      {
        question: 'Who wrote the novel "To Kill a Mockingbird"?',
        answers: ['Ernest Hemingway', 'Harper Lee', 'J.K. Rowling', 'F. Scott Fitzgerald'],
        correctAnswer: 1,
      },
      {
        question: 'What is the largest planet in our solar system?',
        answers: ['Jupiter', 'Saturn', 'Mars', 'Venus'],
        correctAnswer: 0,
      },
      {
        question: 'What is the currency used in Japan?',
        answers: ['Dollar', 'Euro', 'Yen', 'Pound'],
        correctAnswer: 2,
      },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  
  const handleAnswerPress = (index) => {
    setSelectedAnswer(index);
    setShowCorrectAnswer(true);
    if (index === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };


  const handleNextQuestion = () => {
    setShowCorrectAnswer(false);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      navigation.navigate('Result', { score, totalQuestions: quizData.length, quizData });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {currentQuestion + 1}. {quizData[currentQuestion].question}
        </Text>
      </View>
      <View style={styles.answersContainer}>
        {quizData[currentQuestion].answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === index
                ? styles.selectedAnswer
                : styles.unselectedAnswer,
              selectedAnswer === index && selectedAnswer !== quizData[currentQuestion].correctAnswer
                ? styles.wrongAnswer
                : null,
            ]}
            onPress={() => handleAnswerPress(index)}
          >
            <Text style={styles.answerText}>{answer}</Text>
            {showCorrectAnswer && selectedAnswer === index && index === quizData[currentQuestion].correctAnswer && (
              <Text style={styles.correctAnswerText}>Correct</Text>
            )}
            {showCorrectAnswer && selectedAnswer === index && index !== quizData[currentQuestion].correctAnswer && (
              <Text style={styles.wrongAnswerText}>Incorrect. The correct answer is: {quizData[currentQuestion].answers[quizData[currentQuestion].correctAnswer]}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
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
    backgroundColor: '#2196F3',
  },
  unselectedAnswer: {
    backgroundColor: '#fff',
  },
  wrongAnswer: {
    backgroundColor: '#FF4136',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
  },
  correctAnswerText: {
    fontSize: 14,
    color: '#2ECC40',
    marginTop: 8,
  },
  wrongAnswerText: {
    fontSize: 14,
    color: '#FF4136',
    marginTop: 8,
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