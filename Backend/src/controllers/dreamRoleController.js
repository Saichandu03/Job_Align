const dreamCompanySchema = require("../models/dreamComanySchema");
const companySchema = require("../models/companySchema");
const rolesSchema = require("../models/rolesSchema");
const roadMapSchema = require("../models/roadMapSchema");
const dreamRoadMapSchema = require("../models/dreamRoadMapSchema");
const testSchema = require("../models/dreamRoleTestSchema");
const Together = require("together-ai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parse } = require("dotenv");
const dreamRoleSchema = require("../models/dreamRoleSchema");
const userSchema = require("../models/userSchema");
const dreamComanySchema = require("../models/dreamComanySchema");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_KEY_1);
const genAI2 = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_KEY_4);
const genAI3 = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_KEY_3);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const model2 = genAI2.getGenerativeModel({ model: "gemini-2.5-flash" });
const model3 = genAI2.getGenerativeModel({ model: "gemini-2.5-flash" });

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

// function parseJson(content) {
//   const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
//   const match = content.match(jsonRegex);

//   if (!match) {
//     console.warn("No JSON block found in the content.");
//     return null;
//   }

//   const jsonString = match[1].trim();

//   try {
//     return JSON.parse(jsonString);
//   } catch (error) {
//     console.error("Failed to parse JSON:", error);
//     return null;
//   }
// }

// const generateSkillRoadmap = async (role) => {
//   const prompt = `

// "Generate a comprehensive, industry-standard skill roadmap for a professional \"${role}\", structured from beginner to expert level. The response must be a pure JSON object, adhering to the following strict requirements:

// 1. Skill Separation: List exactly 8 distinct, globally recognized skills essential for the role. Do not merge disparate skills (e.g., \"HTML\" and \"CSS\" must be separate). Sub-skills are only grouped if they constitute a recognized industry standard (e.g., \"React\" within a broader \"Frontend Frameworks\" skill).

// 2. Topics Per Skill: Each skill must contain 8-10 highly relevant, job-critical topics. These topics must be meticulously ordered, progressing logically from foundational concepts to advanced, expert-level knowledge.

// 3. Topic Structure: Every topic must be an object with three keys:
//     - \"topicName\": A concise, standard, and widely used title (e.g., \"Flexbox Layout\", not \"Advanced Flexbox Layout Techniques Explained\").
//     - \"description\": A brief 1-2 line summary, focusing on the practical application or core understanding of the topic.
//     - \"completed\": false (default boolean value, always).
//     - \"score\": null (default null value, always).

// 4. Content Rules:
//     - Prioritize topics that are most crucial for a professional \"{{role}}\}\" in the current job market, emphasizing practical utility and real-world applicability.
//     - For 'Testing & Debugging', include only the most essential and commonly used tools (e.g., Jest, React Testing Library, browser DevTools); avoid overly specific or niche tools.
//     - Ensure absolute uniqueness of topics; if a concept is covered under one skill (e.g., \"Asynchronous JS\" under JavaScript), it must not reappear under another (e.g., 'APIs').
//     - Focus on core competencies and established technologies; refrain from including experimental or rapidly changing technologies unless they are clearly becoming industry standards.

// Output Format:
// The entire response must be a pure JSON object, without any additional text, markdown formatting (other than for the JSON itself), comments, or apologies.

// Example JSON Structure (for internal reference, actual content varies based on {{role}}):
// {
//   \"{{role}}\": [
//     {
//       \"skill\": \"HTML\",
//       \"topics\": [
//         {
//           \"topicName\": \"Semantic HTML\",
//           \"description\": \"Using HTML5 tags for meaningful structure.\",
//           \"completed\": false,
//           \"score\": null
//         },
//         // ... more topics
//       ]
//     },
//     {
//       \"skill\": \"CSS\",
//       \"topics\": [
//         {
//           \"topicName\": \"Flexbox\",
//           \"description\": \"Creating one-dimensional layouts.\",
//           \"completed\": false,
//           \"score\": null
//         },
//         // ... more topics
//       ]
//     }
//     // ... more skills
//   ]
// }"
//       `;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const analysisText = response.text();

//     const jsonRoleObject = parseJson(analysisText);
//     return jsonRoleObject;
//   } catch (error) {
//     console.error("Error generating skill roadmap:", error);
//     throw new Error(`Failed to generate roadmap for role: ${role}`);
//   }
// };

// const generateCompanyDetails = async (company) => {
//   const prompt = `You are a professional data researcher specializing in company information for career platforms. Your task is to create a comprehensive, accurate JSON object for "${company}" with this exact structure:

// {
//   "name": "Full official company name",
//   "logo": "Working, high-resolution logo URL (must be publicly accessible)",
//   "overview": "Professional 60-80 word summary covering founding year, founders, headquarters, core business, key innovations, career culture, global presence, and job seeker appeal",
//   "topRoles": ["5 most common roles (prioritize technical roles like SDE, Network Engineer, Cloud Architect, Cybersecurity Analyst, Product Manager)"],
//   "locations": ["At most 5 major office locations worldwide with '(HQ)' marking headquarters"]
// }

// CRITICAL REQUIREMENTS:
// 1. The 'logo' field MUST be dynamically generated using the format https://logo.clearbit.com/{domain}, where {domain} is the primary domain. Ensure this URL is functional and points to a high-resolution logo.
// 2. Validate all other information (overview, topRoles, locations) through at least 3 reliable sources.
// 3. Prioritize career-relevant details for job seekers.
// 4. Maintain a professional yet motivational tone.
// 5. Return ONLY valid JSON with no additional text or explanations.

// QUALITY STANDARDS:
// - The 'logo' URL must be a direct image link (PNG/JPG) generated from the Clearbit API format.
// - The 'overview' must include all specified elements.
// - 'locations' must be specific office cities, not regions.

// RETURN ONLY THE JSON OBJECT. DO NOT INCLUDE ANY OTHER TEXT OR MARKDOWN.`;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const analysisText = response.text();
//     const jsonRoleObject = parseJson(analysisText);
//     return jsonRoleObject;
//   } catch (error) {
//     console.error("Error generating skill roadmap:", error);
//     throw new Error(`Failed to generate roadmap for role: ${role}`);
//   }
// };

// const addDreamRole = async (req, res) => {
//   try {
//     const { userId, company, role } = req.body;

//     if (!userId || !company || !role) {
//       return res.status(400).json({
//         message:
//           "Missing required fields: userId, company, and role are required",
//       });
//     }

//     const dreamCompany = company.trim().toUpperCase();
//     const dreamRole = role.trim().toUpperCase();

//     const existingRole = await rolesSchema.findOne({ name: dreamRole });

//     if (existingRole) {
//       try {
//         const parsedData = JSON.parse(existingRole.data);
//         return res.status(200).json(parsedData);
//       } catch (parseError) {
//         console.error("Error parsing existing role data:", parseError);
//       }
//     }

//     const companyDetails = await generateCompanyDetails(dreamCompany);
//     const skillRoadmap = await generateSkillRoadmap(dreamRole);

//     const newcompany = new companiesSchema({
//       name: dreamCompany,
//       data: JSON.stringify(companyDetails),
//     });

//     await newcompany.save();

//     const saveCompanyDetails = new dreamCompanySchema(companyDetails);
//     await saveCompanyDetails.save();

//     const newRole = new rolesSchema({
//       name: dreamRole,
//       data: JSON.stringify(skillRoadmap),
//     });

//     await newRole.save();

//     const saveDreamRole = new dreamRoleSchema({
//       userId: userId,
//       dreamRole: dreamRole,
//       skills: skillRoadmap,
//     });
//     await saveDreamRole.save();
//     return res
//       .status(201)
//       .json({ company: companyDetails, role: skillRoadmap });
//   } catch (error) {
//     console.error("Error in addDreamRole:", error);
//     return res.status(500).json({
//       message: "Internal server error while processing dream role",
//       error: error.message,
//     });
//   }
// };

const parseJson = (content) => {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
  const match = content.match(jsonRegex);
  const jsonString = match ? match[1].trim() : content.trim();

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

const isValidHttpUrl = (value) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return false;
  }

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (error) {
    return false;
  }
};

const buildFallbackReferenceLink = (dreamRole, skillName, topicName) => {
  const searchQuery = `${dreamRole} ${skillName} ${topicName} official documentation`;
  return `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
};

const normalizeReferenceLink = (referenceLink, dreamRole, skillName, topicName) => {
  if (typeof referenceLink === "string") {
    const trimmedLink = referenceLink.trim();

    if (isValidHttpUrl(trimmedLink)) {
      return trimmedLink;
    }

    if (isValidHttpUrl(`https://${trimmedLink}`)) {
      return `https://${trimmedLink}`;
    }
  }

  return buildFallbackReferenceLink(dreamRole, skillName, topicName);
};

const generateSkillRoadmap = async (role) => {
  const prompt = `
You are a senior curriculum architect for career platforms.

Generate a production-quality technical skill roadmap for the role "${role}".
The roadmap must be practical, hiring-focused, and ordered from beginner to advanced.

STRICT OUTPUT RULES:
1. Return ONLY a valid JSON object.
2. Do not include markdown fences, comments, headings, or explanatory text.
3. Use this exact top-level structure:
   {
     "${role}": [ ... ]
   }

ROADMAP REQUIREMENTS:
1. Include exactly 8 distinct industry-standard skills.
2. Each skill must contain 8 to 10 non-overlapping topics.
3. Topics must be sequenced from foundational to advanced.
4. Avoid duplicate concepts across all skills.
5. Prioritize core technologies and real-world industry practices.
6. For testing/debugging topics, include only mainstream tools.

TOPIC OBJECT SCHEMA (mandatory):
Each topic must be an object with EXACTLY these keys:
- "topicName": string
- "description": string (1 to 2 concise lines, practical and beginner-friendly)
- "referenceLink": string (must be a live, direct, publicly accessible HTTPS URL)
- "completed": false
- "score": null

REFERENCE LINK QUALITY RULES:
1. Use only high-trust sources: official documentation, major standards bodies, or authoritative educational sites.
2. Prefer official docs pages over homepages (for example, use a specific docs/tutorial page).
3. Every link must start with "https://".
4. Every link must be unique per topic and directly relevant to that topic.
5. Never use placeholder, broken-looking, or example domains.

EXAMPLE STRUCTURE:
{
  "${role}": [
    {
      "skill": "HTML",
      "topics": [
        {
          "topicName": "Semantic HTML",
          "description": "Use semantic HTML5 tags to create accessible and meaningful page structure.",
          "referenceLink": "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
          "completed": false,
          "score": null
        }
      ]
    }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    const jsonRoleObject = parseJson(analysisText);
    if (!jsonRoleObject) {
      throw new Error("Failed to parse generated skill roadmap JSON");
    }

    return jsonRoleObject;
  } catch (error) {
    console.error(`Error generating skill roadmap for role ${role}:`, error);
    throw new Error(
      `Failed to generate roadmap for role: ${role}. ${error.message}`
    );
  }
};



// setTimeout(async() =>{
//   const response = await generateSkillRoadmap("React Native Developer");
//   console.log(JSON.stringify(response, null, 2));
// }, 2000);

const generateRoleDetails = async (role) => {
  const prompt = `You are a highly specialized data researcher for career platforms, focused on generating accurate and professional job role information. Your task is to create a comprehensive JSON object for a specific job role ${role}, following this exact structure:
{
  "name": "Exact, official job role title",
  "description": "Professional 60-80 word summary of the role, its primary purpose within an organization, key contributions, and overall impact.",
  "skills": ["At least 5 essential technical skills (e.g., programming languages, tools, frameworks)", "At least 3 essential soft skills (e.g., communication, problem-solving, teamwork)"],
  "responsibilities": ["5-7 concise, action-oriented core duties and tasks associated with the role. Each point should be brief and highly accurate."]
}

CRITICAL REQUIREMENTS:
1.  The 'roleName' field MUST be the exact, official title of the job role you are provided.
2.  The 'description' must be a professional summary, strictly between 60-80 words, covering the role's purpose, key contributions, and impact.
3.  'Skills' must be a well-balanced list of at least 5 technical and 3 soft skills, directly relevant to the role.
4.  'responsibilities' must be a list of 5 to 7 concise, action-oriented bullet points, accurately reflecting the core duties of the role. Prioritize clarity and brevity for each point.
5.  Validate all information (description, keySkills, responsibilities) through a minimum of 3 reliable sources (e.g., major job boards, industry-standard role definitions, professional organizations).
6.  Maintain a professional, informative, and appealing tone, suitable for job seekers.
7.  Return ONLY valid JSON with no additional text, explanations, or markdown outside the JSON block.

QUALITY STANDARDS:
-   The 'description' must contain all specified elements within the word count.
-   'Skills' and 'responsibilities' must be highly relevant, accurate, and comprehensive for the specified role.
-   Each responsibility point must be a brief, clear action statement.

**To trigger the response, you must provide the specific job role name.**

For example, if you provide "${role}", the JSON should contain information for that role.

RETURN ONLY THE JSON OBJECT. DO NOT INCLUDE ANY OTHER TEXT OR MARKDOWN.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    const jsonRoleObject = parseJson(analysisText);
    if (!jsonRoleObject) {
      throw new Error("Failed to parse generated role skills JSON");
    }

    return jsonRoleObject;
  } catch (error) {
    console.error(`Error generating data for role ${role}:`, error);
    throw new Error(
      `Failed to generate data for role: ${role}. ${error.message}`
    );
  }
};

const generateCompanyDetails = async (company) => {
  const prompt = `
You are a professional data researcher specializing in company information for career platforms. Your task is to create a comprehensive, accurate JSON object for "${company}" with this exact structure:

{
  "name": "Full official company name",
  "logo": "Working, high-resolution logo URL (must be publicly accessible)",
  "overview": "Professional 60-80 word summary covering founding year, founders, headquarters, core business, key innovations, career culture, global presence, and job seeker appeal",
  "topRoles": ["5 most common roles (prioritize technical roles like SDE, Network Engineer, Cloud Architect, Cybersecurity Analyst, Product Manager)"],
  "locations": ["At most 5 major office locations worldwide with '(HQ)' marking headquarters"]
}

CRITICAL REQUIREMENTS:
1.  The 'logo' field MUST be dynamically generated using the format "https://logo.clearbit.com/{domain}". **For "Technical Hub", ensure you use 'technicalhub.io' as the primary domain to generate the logo URL.** This URL must be functional and point to a high-resolution logo.
2.  Validate all other information (overview, topRoles, locations) through at least 3 reliable sources, specifically focusing on the "Technical Hub" based in Surampalem, Andhra Pradesh, India.
3.  Prioritize career-relevant details for job seekers.
4.  Maintain a professional yet motivational tone.
5.  Return ONLY valid JSON with no additional text or explanations.

QUALITY STANDARDS:
-   The 'logo' URL must be a direct image link (PNG/JPG) generated from the Clearbit API format using ${company}.
-   The 'overview' must include all specified elements.
-   'locations' must be specific office cities, not regions.

RETURN ONLY THE JSON OBJECT. DO NOT INCLUDE ANY OTHER TEXT OR MARKDOWN.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    const jsonCompanyObject = parseJson(analysisText);
    if (!jsonCompanyObject) {
      throw new Error("Failed to parse generated company details JSON");
    }

    return jsonCompanyObject;
  } catch (error) {
    console.error(`Error generating company details for ${company}:`, error);
    throw new Error(
      `Failed to generate company details for: ${company}. ${error.message}`
    );
  }
};

const checkExistingData = async (dreamCompany, dreamRole) => {
  try {
    const [existingCompany, existingRole, existingRoadMap] = await Promise.all([
      companySchema.findOne({ name: dreamCompany }),
      rolesSchema.findOne({ name: dreamRole }),
      roadMapSchema.findOne({ name: dreamRole }),
    ]);

    let companyData = null;
    let roleData = null;
    let roadMapData = null;

    if (existingCompany) {
      try {
        companyData = JSON.parse(existingCompany.data);
      } catch (parseError) {
        console.warn(
          `Error parsing existing company data for ${dreamCompany}:`,
          parseError
        );
      }
    }

    if (existingRole) {
      try {
        roleData = JSON.parse(existingRole.data);
        roadMapData = JSON.parse(existingRoadMap.data);
      } catch (parseError) {
        console.warn(
          `Error parsing existing role data for ${dreamRole}:`,
          parseError
        );
      }
    }

    return {
      company: companyData,
      role: roleData,
      roadMap: roadMapData,
      hasCompany: !!companyData,
      hasRole: !!roleData,
    };
  } catch (error) {
    console.error("Error checking existing data:", error);
    return {
      company: null,
      role: null,
      hasCompany: false,
      hasRole: false,
    };
  }
};

const generateMissingData = async (existingData, dreamCompany, dreamRole) => {
  const { hasCompany, hasRole } = existingData;
  const generationTasks = [];

  if (!hasCompany) {
    console.log(`Generating company details for: ${dreamCompany}`);
    generationTasks.push(
      generateCompanyDetails(dreamCompany).catch((error) => {
        console.error(
          `Failed to generate company details for ${dreamCompany}:`,
          error
        );
        return null;
      })
    );
  }

  if (!hasRole) {
    console.log(`Generating skill roadmap for: ${dreamRole}`);
    generationTasks.push(
      generateSkillRoadmap(dreamRole).catch((error) => {
        console.error(
          `Failed to generate dream Role Data for ${dreamRole}:`,
          error
        );
        return null;
      })
    );
    generationTasks.push(
      generateRoleDetails(dreamRole).catch((error) => {
        console.error(
          `Failed to generate skill roadmap for ${dreamRole}:`,
          error
        );
        return null;
      })
    );
  }

  const results = await Promise.all(generationTasks);

  let newCompanyData = null;
  let newRoleData = null;
  let newRoadMapData = null;

  let resultIndex = 0;
  if (!hasCompany) {
    newCompanyData = results[resultIndex++];
  }
  if (!hasRole) {
    newRoadMapData = results[resultIndex++];
    newRoleData = results[resultIndex++];
  }

  return {
    newCompanyData,
    newRoleData,
    newRoadMapData,
  };
};

// const saveNewDataToMasterCollections = async (
//   newCompanyData,
//   newRoleData,
//   newRoadMapData,
//   dreamCompany,
//   dreamRole
// ) => {
//   const saveOperations = [];

//   try {
//     if (newCompanyData) {
//       saveOperations.push(
//         new companySchema({
//           name: dreamCompany,
//           data: JSON.stringify(newCompanyData),
//         }).save()
//       );
//     }

//     if (newRoleData) {
//       saveOperations.push(
//         new rolesSchema({
//           name: dreamRole,
//           data: JSON.stringify(newRoleData),
//         }).save()
//       );
//     }
//     if (newRoadMapData) {
//       saveOperations.push(
//         new roadMapSchema({
//           name: dreamRole,
//           data: JSON.stringify(newRoadMapData),
//         }).save()
//       );
//     }

//     if (saveOperations.length > 0) {
//       await Promise.all(saveOperations);
//       console.log("Successfully saved new data to master collections");
//     }
//   } catch (error) {
//     console.error("Error saving new data to master collections:", error);
//     throw new Error(
//       `Master collections save operation failed: ${error.message}`
//     );
//   }
// };

const saveNewDataToMasterCollections = async (
  newCompanyData,
  newRoleData,
  newRoadMapData,
  dreamCompany,
  dreamRole
) => {
  const saveOperations = [];

  try {
    if (newCompanyData) {
      saveOperations.push(
        companySchema.findOneAndUpdate(
          { name: dreamCompany },
          { name: dreamCompany, data: JSON.stringify(newCompanyData) },
          { upsert: true }
        )
      );
    }

    if (newRoleData) {
      saveOperations.push(
        rolesSchema.findOneAndUpdate(
          { name: dreamRole },
          { name: dreamRole, data: JSON.stringify(newRoleData) },
          { upsert: true }
        )
      );
    }

    if (newRoadMapData) {
      saveOperations.push(
        roadMapSchema.findOneAndUpdate(
          { name: dreamRole },
          { name: dreamRole, data: JSON.stringify(newRoadMapData) },
          { upsert: true }
        )
      );
    }

    if (saveOperations.length > 0) {
      await Promise.all(saveOperations);
      console.log("Successfully saved new data to master collections");
    }
  } catch (error) {
    console.error("Error saving new data to master collections:", error);
    throw new Error(`Master collections save operation failed: ${error.message}`);
  }
};

const saveToDreamCollections = async (
  companyData,
  roleData,
  roadMapData,
  dreamCompany,
  dreamRole,
  userId
) => {
  const saveOperations = [];

  try {
    if (companyData) {
      saveOperations.push(
        dreamCompanySchema.findOneAndUpdate(
          { userId: userId },
          { userId: userId, ...companyData },
          {
            upsert: true,
            new: true,
            runValidators: true,
          }
        )
      );
    }
    if (roleData) {
      saveOperations.push(
        dreamRoleSchema.findOneAndUpdate(
          { userId: userId },
          { userId: userId, ...roleData },
          {
            upsert: true,
            new: true,
            runValidators: true,
          }
        )
      );
    }

    if (roadMapData) {
      let skillsArray = null;

      if (Array.isArray(roadMapData)) {
        skillsArray = roadMapData;
      } else if (
        roadMapData[dreamRole] &&
        Array.isArray(roadMapData[dreamRole])
      ) {
        skillsArray = roadMapData[dreamRole];
      } else if (typeof roadMapData === "object") {
        const keys = Object.keys(roadMapData);
        for (const key of keys) {
          if (Array.isArray(roadMapData[key])) {
            skillsArray = roadMapData[key];
            break;
          }
        }
      }

      if (!Array.isArray(skillsArray)) {
        console.error("Could not find skills array in role data:", roadMapData);
        throw new Error(
          "Invalid role data structure - expected array of skills"
        );
      }

      const transformedSkills = skillsArray.map((skillGroup) => {
        if (!skillGroup || typeof skillGroup !== "object") {
          console.error("Invalid skill group:", skillGroup);
          throw new Error("Invalid skill group structure");
        }

        const skillName =
          skillGroup.skill || skillGroup.skillName || "Unknown Skill";

        const transformedTopics = Array.isArray(skillGroup.topics)
          ? skillGroup.topics.map((topic) => {
              const topicName = topic?.topicName || "Untitled Topic";
              const topicDescription =
                topic?.description ||
                `Core concept in ${skillName} for ${dreamRole}`;

              return {
                topicName: topicName,
                description: topicDescription,
                referenceLink: normalizeReferenceLink(
                  topic?.referenceLink,
                  dreamRole,
                  skillName,
                  topicName
                ),
                completed: false,
                score: null,
              };
            })
          : [];

        return {
          skillName: skillName,
          description:
            skillGroup.description || `Essential skill for ${dreamRole}`,
          topics: transformedTopics,
        };
      });

      saveOperations.push(
        dreamRoadMapSchema.findOneAndUpdate(
          { userId: userId },
          {
            userId: userId,
            dreamRole: dreamRole,
            skills: transformedSkills,
          },
          {
            upsert: true,
            new: true,
            runValidators: true,
          }
        )
      );
    }

    if (saveOperations.length > 0) {
      await Promise.all(saveOperations);
    }
  } catch (error) {
    console.error("Error saving data to dream collections:", error);
    console.error("Full error details:", error);
    throw new Error(
      `Dream collections save operation failed: ${error.message}`
    );
  }
};

const saveDataToUser = async(userId, dreamCompany, dreamRole) =>{
  console.log(userId, dreamRole, dreamCompany);
  try{
    const updateFields = {};
    if (dreamRole !== undefined) updateFields.dreamRole = dreamRole;
    if (dreamCompany !== undefined) updateFields.dreamCompany = dreamCompany;

    const updatedData = await userSchema.findByIdAndUpdate(
      userId, 
      { $set: updateFields },
      { 
        new: false, 
        runValidators: true
      }
    );
    console.log(updatedData);
  }
  catch(err){
    console.log("Error while saving The Dream Role And Company");
    console.error(err);
  }
}

const addDreamRole = async (req, res) => {
  try {
    const { userId, company, role } = req.body;

    if (!userId || !company || !role) {
      return res
        .status(400)
        .json(
          "Missing required fields: userId, company, and role are required"
        );
    }

    const dreamCompany = company.trim().toUpperCase();
    const dreamRole = role.trim().toUpperCase();

    const existingData = await checkExistingData(dreamCompany, dreamRole);

    let finalCompanyData = existingData.company;
    let finalRoleData = existingData.role;
    let finalRoadMapData = existingData.roadMap;

    // if (!existingData.hasCompany || !existingData.hasRole) {
    //   const { newCompanyData, newRoleData, newRoadMapData } = await generateMissingData(
    //     existingData,
    //     dreamCompany,
    //     dreamRole
    //   );

    //   if (!existingData.hasCompany && !newCompanyData) {
    //     return res.status(500).json("Failed to generate company details");
    //   }

    //   if (!existingData.hasRole && !newRoleData) {
    //     return res.status(500).json("Failed to generate role skill roadmap");
    //   }

    //   await saveNewDataToMasterCollections(
    //     newCompanyData,
    //     newRoleData,
    //     newRoadMapData,
    //     dreamCompany,
    //     dreamRole
    //   );

    //   if (newCompanyData) finalCompanyData = newCompanyData;
    //   if (newRoleData) finalRoleData = newRoleData;
    //   if(newRoadMapData) finalRoadMapData = newRoadMapData;
    // }

    // await saveToDreamCollections(
    //   finalCompanyData,
    //   finalRoleData,
    //   finalRoadMapData,
    //   dreamCompany,
    //   dreamRole,
    //   userId
    // );

    if (!existingData.hasCompany || !existingData.hasRole) {
      const { newCompanyData, newRoleData, newRoadMapData } =
        await generateMissingData(existingData, dreamCompany, dreamRole);

      if (!existingData.hasCompany && !newCompanyData) {
        return res.status(500).json("Failed to generate company details");
      }
      if (!existingData.hasRole && !newRoleData) {
        return res.status(500).json("Failed to generate role skill roadmap");
      }

      if (newCompanyData) finalCompanyData = newCompanyData;
      if (newRoleData) finalRoleData = newRoleData;
      if (newRoadMapData) finalRoadMapData = newRoadMapData;


      await Promise.all([
        saveNewDataToMasterCollections(
          newCompanyData,
          newRoleData,
          newRoadMapData,
          dreamCompany,
          dreamRole
        ),
        saveToDreamCollections(
          finalCompanyData,
          finalRoleData,
          finalRoadMapData,
          dreamCompany,
          dreamRole,
          userId
        ),
        saveDataToUser(
          userId,
          dreamCompany,
          dreamRole
        ),
      ]);
    } else {
      await Promise.all([
        saveDataToUser(
          userId,
          dreamCompany,
          dreamRole
        ),
         saveToDreamCollections(
        finalCompanyData,
        finalRoleData,
        finalRoadMapData,
        dreamCompany,
        dreamRole,
        userId
      )
      ]);
    
    }
    return res.status(201).json("Dream role created successfully");
  } catch (error) {
    console.error("Error in addDreamRole:", error);
    return res
      .status(500)
      .json("Internal server error while processing dream role");
  }
};

const purify = (analysis) => {
  try {
    const jsonMatch = analysis.match(/```json\s*([\s\S]*?)\s*```/) ||
      analysis.match(/```\s*([\s\S]*?)\s*```/) || [null, analysis];
    const jsonStr = jsonMatch[1] || analysis;
    return JSON.parse(jsonStr.trim());
  } catch (parseError) {
    console.error("JSON parsing error:", parseError);
    return null;
  }
};

const getTopicQuestions = async (req, res) => {
  const { topic, description } = req.body;

  console.log("Received topic:", topic);
  console.log("Received description:", description);  

  if (!topic) {
    return res.status(400).json("Missing required field Topic");
  }

  if (!description) {
    return res.status(400).json("Missing required field Description");
  }

  const prompt = `Generate exactly 5 unique, beginner-level questions for the topic '{topicName: \"${topic}\", description: \"${description}\"}'.

Requirements:
- Each question must cover a DIFFERENT concept (no repetition).
- Use simple, descriptive language (max 20 words per question).
- Base on real-world scenarios: apps, shopping, games, social media, restaurants, etc.
- Format for mobile users who describe solutions, not write code.
- Use "How would you..." or "Describe..." question formats.
- Target complete beginners with no coding experience.

Return ONLY valid JSON in this exact format:
[
  {"question-1": "..."},
  {"question-2": "..."}....
]`;

  try {
    const result = await model2.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    const parsedAnalysis = purify(analysis);
    if (parsedAnalysis == null) {
      return res
        .status(500)
        .send("Internal Server Error! Please contact support.");
    }

    console.log("Parsed questions:", parsedAnalysis);

    res.status(200).json(parsedAnalysis);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error!", err: error });
  }
};

const checkTestAnswers = async (req, res) => {
  const { roadMapId, userId, skillId, topicId, answersObject } = req.body;

  console.log("Received userId:", userId);
  console.log("Received roadMapId:", roadMapId);
  console.log("Received skillId:", skillId);
  console.log("Received topicId:", topicId);
  console.log("Received answersObject:", answersObject);

  if (!userId) {
    return res.status(400).json("Missing required field User ID");
  }
  if (!topicId) {
    return res.status(400).json("Missing required field Topic ID");
  }
  if (!answersObject) {
    res.status(400).send("Missing required fields Answers Object Array");
  }
  if (!skillId) {
    res.status(400).send("Missing required fields Skill ID");
  }
  if (!roadMapId) {
    res.status(400).send("Missing required fields Road Map ID");
  }

    const prompt = `## EXPERT TECHNICAL ANSWER EVALUATION SYSTEM

You are a professional technical evaluator specializing in assessing beginner-friendly technical explanations for mobile-centric concepts.

### INPUT DATA:
${JSON.stringify(answersObject)}

---

## PRIMARY EVALUATION TASK:

For each question-answer pair, evaluate the user's answer against the criteria below and identify the correct/expected answer based on the question context.

---

## WEIGHTED SCORING CRITERIA (0-100%):

### 1. Conceptual Accuracy & Correctness (45% weight) - CRITICAL
- Does the answer describe a technically correct solution to the question?
- Is the core concept fundamentally sound and factually accurate?
- Does it align with mobile development best practices?
- **FAIL CONDITION:** Factually incorrect, misleading, or irrelevant answers = 0%

### 2. Beginner-Friendly Clarity (35% weight)
- Is the explanation easy for a non-coder to understand?
- Uses minimal jargon; explains necessary terminology clearly?
- Includes relatable real-world or mobile app examples?
- Logically structured and easy to follow?

### 3. Solution-Focused Delivery (20% weight)
- Focuses on conceptual solutions, NOT code implementation?
- Avoids code snippets, pseudocode, and technical minutiae?
- Directly addresses what the user would do/understand?
- Practical and actionable for mobile users?

---

## SPECIAL HANDLING RULES:

**Insufficient Answers (Automatic 0-10%):**
- Single letters or numbers with no explanation (e.g., "A", "5", "Yes")
- Vague phrases without detail (e.g., "It works", "Use documentation")
- Entirely off-topic or blank responses
- Less than 15 words of substantive content

**Strong Answers (80-100%):**
- Technically accurate with clear logic
- Explains the "why" and "how" for beginners
- Includes a practical mobile/app example
- No code; purely conceptual explanation

---

## OUTPUT REQUIREMENTS:

For EACH question-answer pair, you MUST include these fields:
- **"question"**: Original question from input
- **"user_answer"**: The user's provided answer
- **"correct_answer"**: The ideal/expected answer (your expert determination)
- **"match_score"**: Percentage (0-100) based on criteria above
- **"comment"**: Concise professional feedback (max 40 words) - highlight strengths and improvement areas

**OVERALL CALCULATION:**
Calculate "overall_score" as the precise mathematical average of all individual match_scores.

---

## RESPONSE FORMAT:

Return ONLY valid JSON with NO additional text, markdown, comments, or explanations outside the JSON:

\`\`\`json
{
  "overall_score": <average of all match_scores>,
  "response": [
    {
      "question": "...",
      "user_answer": "...",
      "correct_answer": "<your expert determination of the ideal answer>",
      "match_score": <0-100>,
      "comment": "<strength/gap analysis, max 40 words>"
    }
  ]
}
\`\`\`
`;
  try {
    const result = await model3.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    const parsedAnalysis = purify(analysis);
    if (parsedAnalysis == null) {
      return res
        .status(500)
        .send("Internal Server Error! Please contact support.");
    }

    if (parsedAnalysis.score >= 75) {
      const [updateResult, savedTest] = await Promise.all([
        dreamRoadMapSchema.updateOne(
          {
            _id: roadMapId,
            "skills._id": skillId,
            "skills.topics._id": topicId,
          },
          {
            $set: {
              "skills.$[skill].topics.$[topic].completed": true,
              "skills.$[skill].topics.$[topic].score": parsedAnalysis.score,
            },
          },
          {
            arrayFilters: [{ "skill._id": skillId }, { "topic._id": topicId }],
          }
        ),
        testSchema.findOneAndUpdate(
          {
            userId: userId,
            topicId: topicId,
          },
          {
            userId: userId,
            topicId: topicId,
            score: parsedAnalysis.score,
            response: parsedAnalysis.response,
          },
          {
            upsert: true,
            new: true,
          }
        ),
      ]);
    }

    console.log("Parsed analysis:", parsedAnalysis);

    res.status(200).json(parsedAnalysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!", err: err });
  }
};

const getRoadMap = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    const roadMap = await dreamRoadMapSchema.find({ userId: userId });
    res.status(200).send(roadMap);
  } catch (err) {
    console.log("Error" + err);
    res.status(500).send({
      message: "Internal Server Error! Please contact support.",
      err: err,
    });
  }
};

const getRoleData = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    roleData = await dreamRoleSchema.find({ userId: userId });
    res.status(200).send(roleData);
  } catch (err) {
    console.log("Error" + err);
    res.status(500).send({
      message: "Internal Server Error! Please contact support.",
      err: err,
    });
  }
};

const getCompanyData = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    const companyData = await dreamCompanySchema.find({ userId: userId });
    res.status(200).send(companyData);
  } catch (err) {
    console.log("Error" + err);
    res.status(500).send({
      message: "Internal Server Error! Please contact support.",
      err: err,
    });
  }
};

const getTopicTestResult = async (req, res) => {
  const { userId, topicId } = req.body;
  console.log(userId, topicId);
  try {
    const topicTestResult = await testSchema.find({
      userId: userId,
      topicId: topicId,
    });
    res.status(200).send(topicTestResult);
  } catch (err) {
    console.log("Error" + err);
    res.status(500).send({
      message: "Internal Server Error! Please contact support.",
      err: err,
    });
  }
};



// const roadMap = JSON.stringify(road);

const postRoadMapData = async(roadMap) =>{
  const update = await new roadMapSchema(roadMap).save();
}


module.exports = {
  addDreamRole,
  getTopicQuestions,
  checkTestAnswers,
  getRoadMap,
  getCompanyData,
  getRoleData,
  getTopicTestResult,
};
