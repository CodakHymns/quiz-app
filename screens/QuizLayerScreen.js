import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Button } from 'react-native'; 
import axios from 'axios';
import he from 'he';

const QuizScreenLayer = ({ route, navigation }) => {
  const { category, difficulty } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${getCategoryId(category)}&difficulty=${difficulty}&type=multiple`);
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  const getCategoryId = (category) => {
    switch (category) {
      case 'Physics':
        return 17;
      case 'Soccer':
        return 21;
      case 'Movies':
        return 11;
      default:
        return 9;
    }
  };

  const handleAnswerPress = (index) => {
    setSelectedAnswerIndex(index);
    setShowNextButton(true);
    setShowCorrectAnswer(true);
    const selectedOption = shuffledAnswers[index];
    if (selectedOption.isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
      setShowNextButton(false);
      setShowCorrectAnswer(false);
    } else {
      navigation.navigate('Result', { score, total: questions.length });
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [
        ...currentQuestion.incorrect_answers.map((answer) => ({ answer, isCorrect: false })),
        { answer: currentQuestion.correct_answer, isCorrect: true },
      ].sort(() => Math.random() - 0.5);
      setShuffledAnswers(answers);
    }
  }, [currentQuestionIndex, questions]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answerLabels = ['A', 'B', 'C', 'D'];

  return (
    <View style={styles.container}>
      <View style={styles.questionNumber}>
        <Text style={styles.scoreboardText}>Question: {currentQuestionIndex + 1}/{questions.length}</Text>
      </View>
      <View style={styles.scoreboard}>
        <Text style={styles.scoreboardText}>Score: {score}</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{he.decode(currentQuestion.question)}</Text>
      </View>
      <View style={styles.answersContainer}>
        {shuffledAnswers.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswerIndex === index && option.isCorrect ? styles.correctAnswer : null,
              selectedAnswerIndex === index && !option.isCorrect ? styles.wrongAnswer : null,
            ]}
            onPress={() => handleAnswerPress(index)}
            disabled={showNextButton}
          >
            <Text style={styles.answerText}>{`${answerLabels[index]}. ${he.decode(option.answer)}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {showCorrectAnswer && (
        <Text style={styles.correctAnswerText}>
          The correct answer is: {he.decode(currentQuestion.correct_answer)}
        </Text>
      )}
      <View style={styles.nextButtonContainer}>
        <Button
          title="Next"
          onPress={handleNextQuestion}
          disabled={!showNextButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  questionNumber: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  scoreboard: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  scoreboardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answersContainer: {
    marginBottom: 20,
    width: '100%',
  },
  answerButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  correctAnswerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ECC40',
  },
  nextButtonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
});

export default QuizScreenLayer;
