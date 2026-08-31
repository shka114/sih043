// ==========================================================================
// SAMADHAN SETU — Supabase Client & Database Services
// Connected to existing Supabase project: SAMADHANSETU Project (kevcnuhdmjnkioiucscc)
// ==========================================================================

const SUPABASE_URL = "https://kevcnuhdmjnkioiucscc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldmNudWhkbWpua2lvaXVjc2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODAzMzMsImV4cCI6MjEwMzY1NjMzM30.uF8pwJQNnXotJAAxK3P6HTw_MYJK2wf9vAJg2FIvqZk";

let supabaseClient = null;

// Initialize Supabase Client safely
function initSupabase() {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: window.localStorage
        }
      });
    }
    return supabaseClient;
  }
  console.warn("Supabase library not loaded yet.");
  return null;
}

function getSupabase() {
  if (!supabaseClient) {
    return initSupabase();
  }
  return supabaseClient;
}

// ==========================================================================
// AUTHENTICATION SERVICES
// ==========================================================================

/**
 * Get current authenticated user session
 */
async function getCurrentAuthUser() {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    const { data: { session }, error } = await sb.auth.getSession();
    if (error || !session || !session.user) {
      return null;
    }
    return session.user;
  } catch (err) {
    console.error("Error getting auth user:", err);
    return null;
  }
}

/**
 * Sign up a new user and sync with public."Users" profile table
 */
async function supabaseSignUp(name, email, password, role = "Citizen") {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase client not initialized.");

  const { data, error } = await sb.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        full_name: name.trim(),
        role: role
      }
    }
  });

  if (error) {
    throw error;
  }

  if (data && data.user) {
    // If session is immediately established, ensure public."Users" profile is synced
    if (data.session) {
      await syncPublicUserProfile(data.user, name, role);
    }
  }

  return data;
}

/**
 * Sign in existing user with email and password
 */
async function supabaseSignIn(email, password) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase client not initialized.");

  const { data, error } = await sb.auth.signInWithPassword({
    email: email.trim(),
    password: password
  });

  if (error) {
    throw error;
  }

  if (data && data.user) {
    const profile = await fetchPublicUserProfile(data.user.id);
    if (!profile) {
      const name = data.user.user_metadata?.full_name || email.split('@')[0];
      const role = data.user.user_metadata?.role || "Citizen";
      await syncPublicUserProfile(data.user, name, role);
    }
  }

  return data;
}

/**
 * Sign out current user
 */
async function supabaseSignOut() {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
}

/**
 * Fetch profile from public."Users" table by User ID
 */
async function fetchPublicUserProfile(userId) {
  const sb = getSupabase();
  if (!sb || !userId) return null;

  try {
    const { data, error } = await sb
      .from('Users')
      .select('*')
      .eq('ID', userId)
      .maybeSingle();

    if (error) {
      console.warn("Could not fetch user profile:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("fetchPublicUserProfile exception:", err);
    return null;
  }
}

/**
 * Insert or update profile in public."Users" table
 */
async function syncPublicUserProfile(user, name, role = "Citizen") {
  const sb = getSupabase();
  if (!sb || !user) return null;

  const profileData = {
    "ID": user.id,
    "Name": name || user.user_metadata?.full_name || user.email?.split('@')[0] || "Community Member",
    "Email": user.email,
    "Role": role || user.user_metadata?.role || "Citizen"
  };

  try {
    const { data, error } = await sb
      .from('Users')
      .upsert(profileData, { onConflict: 'ID' })
      .select()
      .maybeSingle();

    if (error) {
      console.warn("syncPublicUserProfile warning:", error.message);
    }
    return data || profileData;
  } catch (err) {
    console.error("syncPublicUserProfile exception:", err);
    return profileData;
  }
}

// ==========================================================================
// DATABASE SERVICES: PROBLEMS & CHALLENGES
// ==========================================================================

/**
 * Fetch all Problems from Supabase with joined Solutions & AI Analysis
 */
async function fetchProblemsFromDB() {
  const sb = getSupabase();
  if (!sb) return [];

  try {
    // 1. Fetch Problems
    const { data: problemsData, error: probError } = await sb
      .from('Problems')
      .select('*')
      .order('Date', { ascending: false });

    if (probError) {
      console.warn("Error fetching Problems from Supabase:", probError.message);
      return [];
    }

    if (!problemsData || problemsData.length === 0) {
      return [];
    }

    // 2. Fetch Solutions
    const { data: solutionsData } = await sb
      .from('Solutions')
      .select('*')
      .order('created_at', { ascending: false });

    // 3. Fetch AI Analysis
    const { data: aiData } = await sb
      .from('Ai_analysis')
      .select('*');

    // 4. Fetch Users to display submitter names
    const { data: usersData } = await sb
      .from('Users')
      .select('*');

    const userMap = {};
    (usersData || []).forEach(u => {
      userMap[u.ID] = u;
    });

    const solMap = {};
    (solutionsData || []).forEach(s => {
      if (!solMap[s.problem_id]) solMap[s.problem_id] = [];
      const submitterUser = userMap[s.submitted_by];
      solMap[s.problem_id].push({
        id: s.solution_id,
        solutionId: s.solution_id,
        problemId: s.problem_id,
        title: s.impact_description ? (s.impact_description.length > 50 ? s.impact_description.substring(0, 50) + '...' : s.impact_description) : "Proposed Solution",
        description: s.solution_description || "",
        status: s.status || "Proposed",
        currentStage: s.implementation_status || s.status || "Solution Proposed",
        submittedBy: submitterUser ? submitterUser.Name : "Innovator Team",
        submittedById: s.submitted_by,
        expectedImpact: s.impact_description || "",
        date: s.created_at ? new Date(s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "Recently",
        projectId: s.project_id
      });
    });

    const aiMap = {};
    (aiData || []).forEach(a => {
      aiMap[a.Problem_ID] = a;
    });

    // Map database records to UI structure
    return problemsData.map(p => {
      const dbId = p["Problem ID"];
      const author = userMap[p["User ID"]];
      const solutions = solMap[dbId] || [];
      const aiRecord = aiMap[dbId] || null;

      // Determine stage index (0-6) from Status
      let stageIndex = 0;
      const statusLower = (p.Status || "").toLowerCase();
      if (statusLower.includes("resolved")) stageIndex = 6;
      else if (statusLower.includes("pilot") || statusLower.includes("implementation")) stageIndex = 5;
      else if (statusLower.includes("proposed") || solutions.length > 0) stageIndex = 4;
      else if (statusLower.includes("collab") || statusLower.includes("looking")) stageIndex = 3;
      else if (statusLower.includes("validated")) stageIndex = 2;
      else if (statusLower.includes("review")) stageIndex = 1;
      else stageIndex = 0;

      return {
        id: dbId,
        dbId: dbId,
        title: p.Title || "Untitled Problem",
        category: (p.Category || "Other").toLowerCase().replace(/\s+/g, '-'),
        categoryName: p.Category || "Other",
        location: p.Location || "Jharkhand",
        district: (p.Location || "").split(',').pop().trim() || "Jharkhand",
        shortDescription: p.Description && p.Description.length > 140 ? p.Description.substring(0, 140) + '...' : (p.Description || ''),
        fullDescription: p.Description || '',
        currentSituation: p.Description || '',
        affectedPopulation: "Community Residents",
        urgency: p.Priority || "Medium",
        expectedOutcome: "Practical community-backed solution.",
        expectedSolution: "Practical community-backed solution.",
        stageIndex: stageIndex,
        status: p.Status || "Open for Solutions",
        authorName: author ? author.Name : "Community Member",
        authorId: p["User ID"],
        datePosted: p.Date ? new Date(p.Date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "Recently",
        solutionsList: solutions,
        aiAnalysis: aiRecord,
        isFromDB: true
      };
    });
  } catch (err) {
    console.error("fetchProblemsFromDB exception:", err);
    return [];
  }
}

/**
 * Insert a new Problem into public."Problems"
 */
async function insertProblemToDB(problemData) {
  const sb = getSupabase();
  if (!sb) throw new Error("Database client not available.");

  const authUser = await getCurrentAuthUser();
  if (!authUser) {
    throw new Error("You must be signed in to submit a problem.");
  }

  // Ensure user profile exists in public."Users" before inserting problem
  await syncPublicUserProfile(authUser, authUser.user_metadata?.full_name, authUser.user_metadata?.role);

  const payload = {
    "Title": problemData.title.trim(),
    "Description": problemData.description.trim(),
    "Category": problemData.categoryName || problemData.category || "Other",
    "Location": problemData.location.trim(),
    "Priority": problemData.urgency || "Medium",
    "Status": "Submitted",
    "User ID": authUser.id
  };

  const { data, error } = await sb
    .from('Problems')
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================================================
// DATABASE SERVICES: SOLUTIONS & PROJECTS
// ==========================================================================

/**
 * Insert a new Solution into public."Solutions"
 */
async function insertSolutionToDB(solutionData) {
  const sb = getSupabase();
  if (!sb) throw new Error("Database client not available.");

  const authUser = await getCurrentAuthUser();
  if (!authUser) {
    throw new Error("You must be signed in to propose a solution.");
  }

  await syncPublicUserProfile(authUser, authUser.user_metadata?.full_name, authUser.user_metadata?.role);

  const payload = {
    "problem_id": solutionData.problemId,
    "submitted_by": authUser.id,
    "solution_description": solutionData.description.trim(),
    "impact_description": (solutionData.title ? solutionData.title + ": " : "") + (solutionData.impact || ""),
    "status": "Proposed",
    "implementation_status": "Not Started"
  };

  if (solutionData.projectId) {
    payload.project_id = solutionData.projectId;
  }

  const { data, error } = await sb
    .from('Solutions')
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  // Update Problem status to "Solution Proposed" if it was pending
  try {
    await sb
      .from('Problems')
      .update({ "Status": "Solution Proposed" })
      .eq('Problem ID', solutionData.problemId);
  } catch (upErr) {
    console.warn("Could not update problem status:", upErr);
  }

  return data;
}

/**
 * Create a new Project linked to a Problem and optional Institution
 */
async function insertProjectToDB(projectData) {
  const sb = getSupabase();
  if (!sb) throw new Error("Database client not available.");

  const payload = {
    "problem_id": projectData.problemId,
    "project_name": projectData.projectName,
    "description": projectData.description || "",
    "status": projectData.status || "Proposed",
    "institution_id": projectData.institutionId || null,
    "start_date": projectData.startDate || new Date().toISOString().split('T')[0]
  };

  const { data, error } = await sb
    .from('Projects')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==========================================================================
// DATABASE SERVICES: TEAMS & COLLABORATION
// ==========================================================================

/**
 * Add a member / collaboration entry to public."Teams"
 */
async function insertTeamMemberToDB(teamData) {
  const sb = getSupabase();
  if (!sb) throw new Error("Database client not available.");

  const authUser = await getCurrentAuthUser();
  const memberId = authUser ? authUser.id : null;

  if (authUser) {
    await syncPublicUserProfile(authUser, teamData.memberName || authUser.user_metadata?.full_name, teamData.memberRole);
  }

  // If no existing project_id is provided, create or link a default project for the problem
  let projectId = teamData.projectId;
  if (!projectId && teamData.problemId && teamData.problemId.length >= 30) {
    try {
      const { data: existingProjects } = await sb
        .from('Projects')
        .select('project_id')
        .eq('problem_id', teamData.problemId)
        .limit(1);

      if (existingProjects && existingProjects.length > 0) {
        projectId = existingProjects[0].project_id;
      } else {
        const newProj = await insertProjectToDB({
          problemId: teamData.problemId,
          projectName: teamData.targetTitle ? `Collaboration: ${teamData.targetTitle}` : "Community Project",
          description: teamData.message || "Community collaborative initiative",
          status: "Active"
        });
        projectId = newProj.project_id;
      }
    } catch (projErr) {
      console.warn("Could not find/create project for team:", projErr);
    }
  }

  if (!projectId) {
    // If not tied to a valid UUID problem/project, record as an industry partner or institution if applicable
    return { ok: true, note: "Recorded local collaboration" };
  }

  const payload = {
    "project_id": projectId,
    "member_id": memberId,
    "member_name": teamData.memberName || (authUser ? authUser.user_metadata?.full_name : "Volunteer"),
    "member_role": teamData.memberRole || (teamData.helpTypes ? teamData.helpTypes.join(', ') : "Contributor")
  };

  const { data, error } = await sb
    .from('Teams')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==========================================================================
// DATABASE SERVICES: INDUSTRY PARTNERS & INSTITUTIONS
// ==========================================================================

/**
 * Register an Industry Partner in public."Industry_Partners"
 */
async function insertIndustryPartnerToDB(partnerData) {
  const sb = getSupabase();
  if (!sb) throw new Error("Database client not available.");

  const payload = {
    "company_name": partnerData.companyName.trim(),
    "partner_type": partnerData.partnerType || "Industry",
    "expertise": partnerData.expertise || "",
    "description": partnerData.description || "",
    "contact_email": partnerData.email || "",
    "phone": partnerData.phone || ""
  };

  const { data, error } = await sb
    .from('Industry_Partners')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Register an Academic Institution / NGO in public."Institutions"
 */
async function insertInstitutionToDB(instData) {
  const sb = getSupabase();
  if (!sb) throw new Error("Database client not available.");

  const payload = {
    "Name": instData.name.trim(),
    "Type": instData.type || "University",
    "Location": instData.location || "Jharkhand",
    "Expertise": instData.expertise || "",
    "Description": instData.description || "",
    "Contact_email": instData.email || ""
  };

  const { data, error } = await sb
    .from('Institutions')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==========================================================================
// DATABASE SERVICES: AI ANALYSIS
// ==========================================================================

/**
 * Fetch AI Analysis record for a Problem
 */
async function fetchAiAnalysisForProblem(problemId) {
  const sb = getSupabase();
  if (!sb || !problemId) return null;

  try {
    const { data, error } = await sb
      .from('Ai_analysis')
      .select('*')
      .eq('Problem_ID', problemId)
      .maybeSingle();

    if (error) {
      console.warn("fetchAiAnalysis error:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("fetchAiAnalysis exception:", err);
    return null;
  }
}

/**
 * Insert an AI Analysis record for a Problem
 */
async function insertAiAnalysisToDB(aiData) {
  const sb = getSupabase();
  if (!sb) throw new Error("Database client not available.");

  const payload = {
    "Problem_ID": aiData.problemId,
    "Ai_generated_category": aiData.category || "General",
    "Ai_summary": aiData.summary || "",
    "Ai_priority": aiData.priority || "Medium",
    "Ai_suggestions": aiData.suggestions || false
  };

  const { data, error } = await sb
    .from('Ai_analysis')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==========================================================================
// DATABASE SERVICES: USER CONTRIBUTIONS
// ==========================================================================

/**
 * Fetch all contributions (Problems, Solutions, Teams) created by authenticated user
 */
async function fetchUserContributionsFromDB(userId) {
  const sb = getSupabase();
  if (!sb || !userId) {
    return { problems: [], solutions: [], teams: [] };
  }

  try {
    const [problemsRes, solutionsRes, teamsRes] = await Promise.all([
      sb.from('Problems').select('*').eq('User ID', userId).order('Date', { ascending: false }),
      sb.from('Solutions').select('*, Problems(*)').eq('submitted_by', userId).order('created_at', { ascending: false }),
      sb.from('Teams').select('*, Projects(*, Problems(*))').eq('member_id', userId).order('created_at', { ascending: false })
    ]);

    return {
      problems: problemsRes.data || [],
      solutions: solutionsRes.data || [],
      teams: teamsRes.data || []
    };
  } catch (err) {
    console.error("fetchUserContributionsFromDB exception:", err);
    return { problems: [], solutions: [], teams: [] };
  }
}

// Auto-initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initSupabase();
  });
}
