import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ImageBackground,
} from 'react-native';
// Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import backgroundImage from '../../assets/background.png';
import Quiz from './Quiz';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Color palette
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

// Skeleton Loader Component
const SkeletonLoader = () => {
    return (
        <ImageBackground
            source={backgroundImage}
            style={[styles.container, styles.loadingContainer]}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={'rgba(72, 202, 228, 0.9)'} />
                <ScrollView>
                    {/* Header Skeleton */}
                    <View style={[styles.header, { backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
                        <View style={styles.headerContent}>
                            <View style={[styles.pathIndicator, { opacity: 0.5 }]}>
                                <View style={[styles.pathDot, styles.skeleton]} />
                                <View style={[styles.pathText, styles.skeletonText, { width: 100 }]} />
                            </View>

                            <View style={[styles.mainTitle, styles.skeletonText, { width: 200, height: 40 }]} />
                            <View style={[styles.subtitle, styles.skeletonText, { width: 250, height: 24 }]} />

                            <View style={[styles.progressCard, { backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
                                <View style={styles.progressHeader}>
                                    <View style={styles.progressInfo}>
                                        <View style={[styles.progressIcon, styles.skeleton]} />
                                        <View style={styles.progressText}>
                                            <View style={[styles.progressTitle, styles.skeletonText, { width: 150, height: 24 }]} />
                                            <View style={[styles.progressSubtitle, styles.skeletonText, { width: 180, height: 18 }]} />
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.progressBarContainer}>
                                    <View style={[styles.progressBar, styles.skeleton]} />
                                    <View style={styles.progressLabels}>
                                        <View style={[styles.progressLabel, styles.skeletonText, { width: 30 }]} />
                                        <View style={[styles.progressLabel, styles.skeletonText, { width: 40 }]} />
                                        <View style={[styles.progressLabel, styles.skeletonText, { width: 40 }]} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Skill Cards Skeleton */}
                    <View style={styles.skillsList}>
                        {[1, 2, 3].map((_, index) => (
                            <View key={index} style={[styles.skillCard, { backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
                                <View style={styles.skillCardContent}>
                                    <View style={styles.skillHeader}>
                                        <View style={[styles.skillIcon, styles.skeleton]} />
                                        <View style={styles.skillInfo}>
                                            <View style={[styles.skillTitle, styles.skeletonText, { width: 150, height: 24 }]} />
                                            <View style={[styles.skillDescription, styles.skeletonText, { width: 200, height: 18 }]} />
                                            <View style={[styles.skillTopics, styles.skeletonText, { width: 80, height: 18 }]} />
                                        </View>
                                        <View style={[styles.skeleton, { width: 24, height: 24, borderRadius: 12 }]} />
                                    </View>

                                    <View style={styles.skillProgress}>
                                        <View style={styles.skillProgressHeader}>
                                            <View style={[styles.progressText, styles.skeletonText, { width: 70 }]} />
                                            <View style={[styles.progressCount, styles.skeletonText, { width: 50 }]} />
                                        </View>
                                        <View style={[styles.skillProgressBar, styles.skeleton]} />
                                        <View style={[styles.progressPercentage, styles.skeletonText, { width: 40, alignSelf: 'flex-end' }]} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

// Header Component
const Header = ({ totalTopics, completedTopics, dreamRole }) => {
    const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <View style={styles.pathIndicator}>
                    <View style={styles.pathDot} />
                    <Text style={styles.pathText}>{dreamRole || 'Developer'} Path</Text>
                </View>

                <Text style={styles.mainTitle}>Master Your Skills</Text>
                <Text style={styles.subtitle}>Build expertise one topic at a time</Text>

                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <View style={styles.progressInfo}>
                            <View style={styles.progressIcon}>
                                <Icon name="trending-up" size={24} color={colors.white} />
                            </View>
                            <View style={styles.progressText}>
                                <Text style={styles.progressTitle}>Overall Progress</Text>
                                <Text style={styles.progressSubtitle}>
                                    {completedTopics} of {totalTopics} topics completed
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
                        </View>
                        <View style={styles.progressLabels}>
                            <Text style={styles.progressLabel}>0%</Text>
                            <Text style={[styles.progressLabel, styles.progressLabelCurrent]}>{Math.round(progressPercentage)}%</Text>
                            <Text style={styles.progressLabel}>100%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

// Skill Card Component
const SkillCard = ({ skill, topics, onPress }) => {
    const completedTopics = topics.filter(topic => topic.completed).length;
    const totalTopics = topics.length;
    const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

    return (
        <TouchableOpacity style={styles.skillCard} onPress={() => onPress(skill.skillName, topics)}>
            <View style={styles.skillCardContent}>
                <View style={styles.skillHeader}>
                    <View style={styles.skillIcon}>
                        <Icon name="menu-book" size={24} color={colors.secondary} />
                    </View>
                    <View style={styles.skillInfo}>
                        <Text style={styles.skillTitle}>{skill.skillName}</Text>
                        <Text style={styles.skillDescription}>{skill.description}</Text>
                        <Text style={styles.skillTopics}>{totalTopics} topics</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color={colors.primary} />
                </View>

                <View style={styles.skillProgress}>
                    <View style={styles.skillProgressHeader}>
                        <Text style={styles.progressText}>Progress</Text>
                        <Text style={styles.progressCount}>{completedTopics}/{totalTopics}</Text>
                    </View>
                    <View style={styles.skillProgressBar}>
                        <View style={[styles.skillProgressFill, { width: `${progressPercentage}%` }]} />
                    </View>
                    <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Topic List Component
const TopicList = ({ skill, topics, onBack, onStartQuiz }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
            <View style={styles.topicListHeader}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={colors.secondaryDark} />
                </TouchableOpacity>
                <Text style={styles.topicListHeaderTitle}>{skill}</Text>
            </View>

            <ScrollView style={styles.topicList}>
                {topics.map((topic, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.topicItem}
                        onPress={() => onStartQuiz(topic)}
                    >
                        <View style={styles.topicItemContent}>
                            <View style={[styles.topicItemIcon, topic.completed && styles.topicItemIconCompleted]}>
                                <Icon
                                    name={topic.completed ? "check" : "play-arrow"}
                                    size={20}
                                    color={topic.completed ? colors.white : colors.secondary}
                                />
                            </View>
                            <View style={styles.topicItemInfo}>
                                <Text style={styles.topicItemTitle}>{topic.topicName}</Text>
                                <Text style={styles.topicItemDescription}>{topic.description}</Text>
                                {topic.completed && topic.score && (
                                    <Text style={styles.topicItemScore}>Score: {topic.score}%</Text>
                                )}
                            </View>
                            <Icon name="chevron-right" size={20} color={colors.primary} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

// Main App Component
const Roadmap = () => {
    const [currentView, setCurrentView] = useState('main');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [roadmapData, setRoadmapData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                // Get the userId from AsyncStorage. Assuming it's stored with the key 'userId'.
                const userId = await AsyncStorage.getItem('userId');

                // Check if userId exists before making the API call
                if (userId) {
                    const response = await axios.post(
                        // 'https://jobalign-backend.onrender.com/api/getRoadMap', {
                        'http://localhost:5000/api/getRoadMap', {
                        userId: userId // Use the dynamic userId from AsyncStorage
                    });
                    setRoadmapData(response.data[0]); // Assuming the API returns an array with one item
                } else {
                    // Handle cases where the userId is not found
                    setError("Could not find user credentials.");
                    console.log("UserID not found in AsyncStorage");
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching roadmap:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoadmap();
    }, []);

    if (loading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return (
            <ImageBackground
                source={backgroundImage}
                style={[styles.container, styles.loadingContainer]}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.loadingContainer}>
                    <Text style={styles.errorText}>Error loading roadmap: {error}</Text>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    if (!roadmapData) {
        return (
            <ImageBackground
                source={backgroundImage}
                style={[styles.container, styles.loadingContainer]}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.loadingContainer}>
                    <Text style={styles.errorText}>No roadmap data available</Text>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    const totalTopics = roadmapData.skills.reduce((sum, skill) => sum + skill.topics.length, 0);
    const completedTopics = roadmapData.skills.reduce((sum, skill) =>
        sum + skill.topics.filter(topic => topic.completed).length, 0
    );

    const handleSkillPress = (skill, topics) => {
        setSelectedSkill(skill);
        setSelectedTopics(topics);
        setCurrentView('topic');
    };

    const handleStartQuiz = (topic) => {
        setSelectedTopic(topic);
        setCurrentView('quiz');
    };

    const handleQuizComplete = (topic, score) => {
        const updatedSkills = roadmapData.skills.map(skill => ({
            ...skill,
            topics: skill.topics.map(t =>
                t.topicName === topic.topicName
                    ? { ...t, completed: true, score: score }
                    : t
            )
        }));

        setRoadmapData({ ...roadmapData, skills: updatedSkills });
        setCurrentView('topic');
    };

    const handleBack = () => {
        if (currentView === 'topic') {
            setCurrentView('main');
        }
    };

    if (currentView === 'quiz' && selectedTopic) {
        return (
            <Quiz
                topic={selectedTopic}
                onBack={() => setCurrentView('topic')}
                onComplete={handleQuizComplete}
            />
        );
    }

    if (currentView === 'topic') {
        return (
            <TopicList
                skill={selectedSkill}
                topics={selectedTopics}
                onBack={handleBack}
                onStartQuiz={handleStartQuiz}
            />
        );
    }

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.container}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={'rgba(72, 202, 228, 0.9)'} />
                <ScrollView>
                    <Header
                        totalTopics={totalTopics}
                        completedTopics={completedTopics}
                        dreamRole={roadmapData.dreamRole}
                    />

                    <View style={styles.skillsList}>
                        {roadmapData.skills.map((skillData, index) => (
                            <SkillCard
                                key={index}
                                skill={skillData}
                                topics={skillData.topics}
                                onPress={handleSkillPress}
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    errorText: {
        fontSize: 18,
        color: colors.error,
    },
    header: {
        backgroundColor: 'rgba(72, 202, 228, 0.9)',
        paddingBottom: 32,
    },
    headerContent: {
        padding: 24,
    },
    pathIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    pathDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.primaryLight,
        marginRight: 12,
    },
    pathText: {
        color: colors.secondaryDark,
        fontSize: 14,
        fontWeight: '600',
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.secondaryDark,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 18,
        color: colors.secondaryDark,
        marginBottom: 32,
        opacity: 0.8,
    },
    progressCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 24,
        elevation: 8,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    progressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    progressIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    progressText: {
        flex: 1,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkGray,
        marginBottom: 4,
    },
    progressSubtitle: {
        fontSize: 14,
        color: colors.gray,
    },
    progressBarContainer: {
        marginTop: 12,
    },
    progressBar: {
        height: 10,
        backgroundColor: colors.primaryPale,
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    progressLabel: {
        fontSize: 14,
        color: colors.gray,
    },
    progressLabelCurrent: {
        color: colors.secondary,
        fontWeight: '600',
    },
    skillsList: {
        padding: 24,
    },
    skillCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        marginBottom: 20,
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: colors.primaryLight,
    },
    skillCardContent: {
        padding: 24,
    },
    skillHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    skillIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    skillInfo: {
        flex: 1,
    },
    skillTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkGray,
        marginBottom: 4,
    },
    skillDescription: {
        fontSize: 14,
        color: colors.gray,
        marginBottom: 4,
    },
    skillTopics: {
        fontSize: 14,
        color: colors.gray,
    },
    skillProgress: {
        marginTop: 12,
    },
    skillProgressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    skillProgressBar: {
        height: 8,
        backgroundColor: colors.primaryPale,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 12,
    },
    skillProgressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 4,
    },
    progressPercentage: {
        fontSize: 14,
        color: colors.secondary,
        textAlign: 'right',
        fontWeight: '600',
    },
    topicListHeader: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        elevation: 4,
    },
    topicListHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.secondaryDark,
        marginLeft: 16,
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
    },
    topicList: {
        flex: 1,
        padding: 24,
    },
    topicItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: colors.primaryLight,
    },
    topicItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    topicItemIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    topicItemIconCompleted: {
        backgroundColor: colors.success,
    },
    topicItemInfo: {
        flex: 1,
    },
    topicItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.darkGray,
        marginBottom: 4,
    },
    topicItemDescription: {
        fontSize: 14,
        color: colors.gray,
        lineHeight: 20,
    },
    topicItemScore: {
        fontSize: 14,
        color: colors.secondary,
        fontWeight: '600',
        marginTop: 4,
    },
    // Skeleton styles
    skeleton: {
        backgroundColor: colors.progressBg,
        borderRadius: 4,
    },
    skeletonText: {
        backgroundColor: colors.progressBg,
        borderRadius: 4,
        color: 'transparent',
    },
});

export default Roadmap;
