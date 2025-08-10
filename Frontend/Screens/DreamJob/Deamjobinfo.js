import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const { width } = Dimensions.get('window');

// Skeleton Loader Component (remains the same)
const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    {/* Header Skeleton */}
    <View style={styles.skeletonHeader}>
      <View style={styles.skeletonLogo} />
      <View style={styles.skeletonRoleTitle} />
      <View style={styles.skeletonCompanySubtitle} />
    </View>

    {/* Tabs Skeleton */}
    <View style={styles.skeletonTabs}>
      <View style={styles.skeletonTab} />
      <View style={styles.skeletonTab} />
    </View>

    {/* Content Skeleton */}
    <View style={styles.skeletonContent}>
      {[...Array(3)].map((_, i) => (
        <View key={i} style={styles.skeletonSection}>
          <View style={styles.skeletonSectionHeader}>
            <View style={styles.skeletonIcon} />
            <View style={styles.skeletonSectionTitle} />
          </View>
          {[...Array(4)].map((_, j) => (
            <View key={j} style={styles.skeletonListItem}>
              <View style={styles.skeletonBullet} />
              <View style={styles.skeletonListItemText} />
            </View>
          ))}
        </View>
      ))}
      <View style={styles.skeletonButton} />
    </View>
  </View>
);

const DreamJobPage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('company');
  const [companyData, setCompanyData] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // State to store userId

  useEffect(() => {
    const getUserIdAndFetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId'); // Retrieve userId
        if (storedUserId) {
          setUserId(storedUserId);
          // Now fetch data using the retrieved userId
          const companyRes = await axios.post(
            'https://jobalign-backend.onrender.com/api/getCompanyData',
            'http://localhost:5000/api/getCompanyData',
            { userId: storedUserId } // Use storedUserId here
          );
          const roleRes = await axios.post(
            // 'https://jobalign-backend.onrender.com/api/getRoleData',
            'http://localhost:5000/api/getRoleData',
            { userId: storedUserId } // Use storedUserId here
          );

          setCompanyData(companyRes.data[0]);
          setRoleData(roleRes.data[0]);
        } else {
          Alert.alert('Error', 'User ID not found in AsyncStorage.');
          // Handle case where userId is not found (e.g., navigate to login)
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch job data or user ID');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUserIdAndFetchData();
  }, []);

  const formatBulletPoints = (text) =>
    text
      ? text.split('.')
          .filter((sentence) => sentence.trim().length > 0)
          .map((sentence) => `${sentence.trim()}.`)
      : [];

  if (loading) {
    return (
      <LinearGradient
        colors={['#90E0EF', '#CAF0F8', '#FFFFFF']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 0.8 }}
        locations={[0, 0.4, 1]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <SkeletonLoader />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Rest of your component (CompanyTab, JobTab, and main render) remains the same
  const CompanyTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Overview */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="business-outline" size={20} color="#0096C7" />
          <Text style={styles.sectionTitle}>Company Overview</Text>
        </View>
        {formatBulletPoints(companyData?.overview).map((point, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.listItemText}>{point}</Text>
          </View>
        ))}
      </View>

      {/* Top Roles */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="star-outline" size={20} color="#0096C7" />
          <Text style={styles.sectionTitle}>Top Roles</Text>
        </View>
        {companyData?.topRoles?.map((role, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.listItemText}>{role}</Text>
          </View>
        ))}
      </View>

      {/* Locations */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location-outline" size={20} color="#0096C7" />
          <Text style={styles.sectionTitle}>Company Locations</Text>
        </View>
        {companyData?.locations?.map((loc, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.listItemText}>{loc}</Text>
          </View>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.bottomApplyButton}
        onPress={() => navigation.navigate('Roadmap')}
      >
        <AntDesign name="rocket1" size={18} color="white" />
        <Text style={styles.applyButtonText}>View Roadmap</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const JobTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Description */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="document-text-outline" size={20} color="#0096C7" />
          <Text style={styles.sectionTitle}>Job Description</Text>
        </View>
        {formatBulletPoints(roleData?.description).map((point, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.listItemText}>{point}</Text>
          </View>
        ))}
      </View>

      {/* Responsibilities */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="list-outline" size={20} color="#0096C7" />
          <Text style={styles.sectionTitle}>Responsibilities</Text>
        </View>
        {roleData?.responsibilities?.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="code-slash" size={20} color="#0096C7" />
          <Text style={styles.sectionTitle}>Skills Required</Text>
        </View>
        <View style={styles.skillsContainer}>
          {roleData?.skills?.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.bottomApplyButton}
         onPress={() => navigation.navigate('Roadmap')}
      >
        <AntDesign name="rocket1" size={18} color="white" />
        <Text style={styles.applyButtonText}>View Roadmap</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <LinearGradient
      colors={['#90E0EF', '#CAF0F8', '#FFFFFF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 0.8 }}
      locations={[0, 0.4, 1]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Updated Profile Section */}
        <View style={styles.headerContent}>
          <Image source={{ uri: companyData?.logo }} style={styles.logo} />
          <Text style={styles.roleTitle}>{roleData?.name}</Text>
          <Text style={styles.companySubtitle}>{companyData?.name}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'company' && styles.activeTab]}
            onPress={() => setActiveTab('company')}
          >
            <Ionicons
              name="business-outline"
              size={20}
              color={activeTab === 'company' ? 'white' : '#0096C7'}
            />
            <Text style={[styles.tabText, activeTab === 'company' && styles.activeTabText]}>
              About Company
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'job' && styles.activeTab]}
            onPress={() => setActiveTab('job')}
          >
            <Ionicons
              name="document-text-outline"
              size={20}
              color={activeTab === 'job' ? 'white' : '#48CAE4'}
            />
            <Text style={[styles.tabText, activeTab === 'job' && styles.activeTabText]}>
              About Job
            </Text>
          </TouchableOpacity>
        </View>

        {/* Render Tab Content */}
        {activeTab === 'company' ? <CompanyTab /> : <JobTab />}
      </SafeAreaView>
    </LinearGradient>
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
  },
  headerContent: {
    marginTop: 40,
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  roleTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  companySubtitle: {
    fontSize: 18,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3F2FD',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  activeTab: {
    backgroundColor: '#0096C7',
    borderColor: '#0096C7',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  tabContent: {
    flex: 1,
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(240, 240, 240, 0.5)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0096C7',
    marginTop: 7,
    marginRight: 12,
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 3,
  },
  skillTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  bottomApplyButton: {
    backgroundColor: '#0096C7',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Skeleton Loader Styles
  skeletonContainer: {
    flex: 1,
    padding: 16,
  },
  skeletonHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  skeletonLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    marginBottom: 16,
  },
  skeletonRoleTitle: {
    width: 200,
    height: 30,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginBottom: 8,
  },
  skeletonCompanySubtitle: {
    width: 150,
    height: 20,
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
  },
  skeletonTabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  skeletonTab: {
    flex: 1,
    height: 48,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
  },
  skeletonSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skeletonIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
  },
  skeletonSectionTitle: {
    width: 150,
    height: 20,
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
    marginLeft: 8,
  },
  skeletonListItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  skeletonBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E3F2FD',
    marginTop: 7,
    marginRight: 12,
  },
  skeletonListItemText: {
    height: 16,
    flex: 1,
    backgroundColor: '#E3F2FD',
    borderRadius: 4,
  },
  skeletonButton: {
    height: 56,
    marginHorizontal: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    marginBottom: 16,
  },
});

export default DreamJobPage;