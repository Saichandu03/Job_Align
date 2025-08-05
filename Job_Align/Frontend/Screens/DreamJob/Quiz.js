import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
    primary: '#48CAE4',
    primaryMid: '#90E0EF',
    primaryLight: '#ADE8F4',
    primaryPale: '#CAF0F8',
    secondary: '#0077B6',
    secondaryDark: '#023E8A',
    accent: '#00B4D8',
    primaryDark: '#03045E',
    tertiary: '#0096C7',
    white: '#FFFFFF',
    lightGray: '#F8FAFC',
    gray: '#64748B',
    darkGray: '#334155',
    progressBg: '#E2E8F0',
    success: '#06B6D4',
    warning: '#F59E0B',
    error: '#EF4444',
};

const Quiz = ({ topic, onBack, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const quizData = [
        {
            question: `What is the main concept of ${topic.topicName}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 0
        },
        {
            question: `Which of the following best describes ${topic.topicName}?`,
            options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
            correct: 1
        },
        {
            question: `How would you implement ${topic.topicName}?`,
            options: ['Method A', 'Method B', 'Method C', 'Method D'],
            correct: 2
        }
    ];

    const handleAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        if (selectedAnswer === quizData[currentQuestion].correct) {
            setScore(score + 1);
        }

        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            setShowResult(true);
        }
    };

    const handleComplete = () => {
        const finalScore = Math.round((score / quizData.length) * 100);
        onComplete(topic, finalScore);
    };

    if (showResult) {
        const finalScore = Math.round((score / quizData.length) * 100);
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
                <View style={styles.quizResultHeader}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Icon name="close" size={24} color={colors.secondaryDark} />
                    </TouchableOpacity>
                    <Text style={styles.quizHeaderTitle}>Quiz Results</Text>
                </View>

                <View style={styles.quizContainer}>
                    <View style={styles.resultCard}>
                        <View style={styles.resultIconContainer}>
                            <Icon name="check-circle" size={64} color={colors.success} />
                        </View>
                        <Text style={styles.resultTitle}>Quiz Completed!</Text>
                        <Text style={styles.resultScore}>{finalScore}%</Text>
                        <Text style={styles.resultDescription}>
                            You scored {score} out of {quizData.length} questions correctly.
                        </Text>
                        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
                            <Text style={styles.completeButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
            <View style={styles.quizHeader}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Icon name="close" size={24} color={colors.secondaryDark} />
                </TouchableOpacity>
                <Text style={styles.quizHeaderTitle}>Quiz</Text>
                <Text style={styles.quizProgress}>{currentQuestion + 1}/{quizData.length}</Text>
            </View>

            <View style={styles.quizContainer}>
                <View style={styles.questionCard}>
                    <Text style={styles.questionNumber}>QUESTION {currentQuestion + 1}</Text>
                    <Text style={styles.questionText}>{quizData[currentQuestion].question}</Text>

                    <View style={styles.optionsContainer}>
                        {quizData[currentQuestion].options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedAnswer === index && styles.optionButtonSelected
                                ]}
                                onPress={() => handleAnswer(index)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedAnswer === index && styles.optionTextSelected
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.nextButton, selectedAnswer === null && styles.nextButtonDisabled]}
                        onPress={handleNext}
                        disabled={selectedAnswer === null}
                    >
                        <Text style={styles.nextButtonText}>
                            {currentQuestion < quizData.length - 1 ? 'Next' : 'Finish'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryLight,
    },
    quizHeader: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        elevation: 4,
    },
    quizResultHeader: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        elevation: 4,
    },
    quizHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.secondaryDark,
        flex: 1,
        textAlign: 'center',
        marginLeft: 16,
    },
    quizProgress: {
        fontSize: 14,
        color: colors.secondaryDark,
        fontWeight: '600',
        opacity: 0.8,
    },
    quizContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    questionCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 32,
        elevation: 8,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: colors.primaryLight,
    },
    questionNumber: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    questionText: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.darkGray,
        marginBottom: 32,
        lineHeight: 32,
    },
    optionsContainer: {
        marginBottom: 32,
    },
    optionButton: {
        backgroundColor: colors.primaryPale,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: colors.primaryLight,
        elevation: 1,
    },
    optionButtonSelected: {
        backgroundColor: colors.primaryMid,
        borderColor: colors.secondary,
        elevation: 2,
    },
    optionText: {
        fontSize: 16,
        color: colors.darkGray,
        fontWeight: '500',
    },
    optionTextSelected: {
        color: colors.secondaryDark,
        fontWeight: '600',
    },
    nextButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 4,
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    nextButtonDisabled: {
        backgroundColor: colors.gray,
        opacity: 0.5,
        elevation: 0,
    },
    nextButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    resultCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        elevation: 8,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: colors.primaryLight,
    },
    resultIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.darkGray,
        marginBottom: 16,
    },
    resultScore: {
        fontSize: 80,
        fontWeight: 'bold',
        color: colors.secondary,
        marginBottom: 16,
    },
    resultDescription: {
        fontSize: 16,
        color: colors.gray,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    completeButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        minWidth: 160,
        alignItems: 'center',
        elevation: 4,
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    completeButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
    },
});

export default Quiz;