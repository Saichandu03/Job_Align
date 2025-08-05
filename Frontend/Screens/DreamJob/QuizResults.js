// QuizResults.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const colors = {
    primary: '#48CAE4',
    secondary: '#0077B6',
    secondaryDark: '#023E8A',
    white: '#FFFFFF',
    lightGray: '#F8FAFC',
    gray: '#64748B',
    darkGray: '#334155',
    error: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
};

const QuizResults = (ress) => {
    console.log("QuizResults component rendered with response: ", ress);
    const route = useRoute();
    const navigation = useNavigation();

    // Fix: Use overall_score instead of score to match your data structure
    const { overall_score = 0, response = [] } = route.params || {};

    // Determines the color of the score based on its value.
    const getScoreColor = (scoreValue) => {
        if (scoreValue >= 80) return colors.success;
        if (scoreValue >= 50) return colors.warning;
        return colors.error;
    };

    // Fix: Updated helper to work with your actual data structure
    const getQuestionText = (item) => {
        return item.question || 'N/A';
    };

    // Fix: Updated helper to work with your actual data structure
    const getAnswerText = (item) => {
        return item.answer || 'No answer provided';
    };

    const onRetakeQuiz = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    if (!response || !Array.isArray(response) || response.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Quiz Results</Text>
                </View>
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No quiz results to display.</Text>
                    <TouchableOpacity style={styles.retakeButton} onPress={onRetakeQuiz}>
                        <Icon name="replay" size={20} color={colors.white} />
                        <Text style={styles.retakeButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quiz Results</Text>
            </View>

            <ScrollView contentContainerStyle={styles.resultsContainer}>
                {/* Score display card - Fix: Use overall_score */}
                <View style={styles.scoreCard}>
                    <Text style={styles.scoreText}>Your Score:</Text>
                    <Text style={[styles.scoreValue, { color: getScoreColor(overall_score) }]}>{overall_score}%</Text>
                    <Text style={styles.scoreComment}>
                        {overall_score >= 70 ? "Great job!" : overall_score >= 50 ? "Good effort, keep learning!" : "Keep practicing!"}
                    </Text>
                </View>

                {/* Map through each question's result */}
                {console.log("Response Data: ", response)}
                {response.map((item, index) => (
                    <View key={index} style={styles.questionResultCard}>
                        <Text style={styles.questionTitle}>Question {index + 1}: {getQuestionText(item)}</Text>
                        <View style={styles.answerSection}>
                            <Text style={styles.yourAnswerLabel}>Your Answer:</Text>
                            <Text style={styles.yourAnswerText}>
                                {getAnswerText(item) || "No answer provided"}
                            </Text>
                        </View>
                        <View style={styles.matchScoreSection}>
                            <Text style={styles.matchScoreLabel}>Match Score:</Text>
                            <Text style={styles.matchScoreValue}>{item.match_score || 0}%</Text>
                        </View>
                        {item.comment && ( 
                            <View style={styles.commentSection}>
                                <Text style={styles.commentLabel}>Feedback:</Text>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                        )}
                    </View>
                ))}

                {/* Retake Quiz button */}
                <TouchableOpacity style={styles.retakeButton} onPress={onRetakeQuiz}>
                    <Icon name="replay" size={20} color={colors.white} />
                    <Text style={styles.retakeButtonText}>Retake Quiz</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.secondaryDark,
    },
    resultsContainer: {
        padding: 16,
        flexGrow: 1,
    },
    scoreCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scoreText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkGray,
        marginBottom: 8,
    },
    scoreValue: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    scoreComment: {
        fontSize: 16,
        color: colors.gray,
        marginTop: 8,
        textAlign: 'center',
    },
    questionResultCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    questionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.secondaryDark,
        marginBottom: 12,
        lineHeight: 22,
    },
    answerSection: {
        marginBottom: 12,
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 8,
    },
    yourAnswerLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray,
        marginBottom: 4,
    },
    yourAnswerText: {
        fontSize: 15,
        color: colors.darkGray,
        lineHeight: 22,
    },
    matchScoreSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    matchScoreLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray,
        marginRight: 8,
    },
    matchScoreValue: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.secondary,
    },
    commentSection: {
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
        paddingTop: 12,
        marginTop: 8,
    },
    commentLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.warning,
        marginBottom: 4,
    },
    commentText: {
        fontSize: 14,
        color: colors.darkGray,
        lineHeight: 20,
        fontStyle: 'italic',
    },
    retakeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    retakeButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noResultsText: {
        fontSize: 18,
        color: colors.gray,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default QuizResults;