// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements (Login Section) ---
    const roleSelect = document.getElementById('role-select');
    const roleTitle = document.getElementById('role-title');
    const userIdInput = document.getElementById('user-id');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const messageBox = document.getElementById('message-box');

    // --- DOM Elements (Page Containers) ---
    const loginSection = document.getElementById('login-section');
    const studentPage = document.getElementById('student-page');
    const teacherPage = document.getElementById('teacher-page');
    const hodPage = document.getElementById('hod-page');
    const deanPage = document.getElementById('dean-page');

    // --- DOM Elements (Logout Buttons) ---
    const logoutButtonStudent = document.getElementById('logout-button-student');
    const logoutButtonTeacher = document.getElementById('logout-button-teacher');
    const logoutButtonHod = document.getElementById('logout-button-hod');
    const logoutButtonDean = document.getElementById('logout-button-dean');

    // --- DOM Elements (Student Page Form) ---
    const studentNameInput = document.getElementById('student-name');
    const studentIdInput = document.getElementById('student-id-input');
    const studentIdDisplay = document.getElementById('student-id-display');
    const studentIdValidationMessage = document.getElementById('student-id-validation-message');
    const studentYearInput = document.getElementById('student-year');
    const yearValidationMessage = document.getElementById('year-validation-message');
    const studentAttendanceInput = document.getElementById('student-attendance');
    const attendanceDisplay = document.getElementById('attendance-display');
    const attendanceWarning = document.getElementById('attendance-warning');
    const parentEmailInput = document.getElementById('parent-email');
    const parentEmailValidationMessage = document.getElementById('parent-email-validation-message');
    const parentContactInput = document.getElementById('parent-contact');
    const parentContactValidationMessage = document.getElementById('parent-contact-validation-message');

    const authLeaveCheckbox = document.getElementById('auth-leave');
    const specLeaveCheckbox = document.getElementById('spec-leave');
    const leaveTypeMessage = document.getElementById('leave-type-message');
    const leaveTypeSelectMessage = document.getElementById('leave-type-select-message');
    const leaveReasonTextarea = document.getElementById('leave-reason');
    const reasonInfo = document.getElementById('reason-info');
    const reasonWarning = document.getElementById('reason-warning');
    const studentBranchSelect = document.getElementById('student-branch');
    const studentBatchSelect = document.getElementById('student-batch');
    const batchDisplay = document.getElementById('batch-display');
    const batchWarning = document.getElementById('batch-warning');
    const studentMentorSelect = document.getElementById('student-mentor');
    const mentorVerificationMessage = document.getElementById('mentor-verification-message');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const dateRangeMessage = document.getElementById('date-range-message');
    const dateRangeError = document.getElementById('date-range-error');
    const submitLeaveRequestButton = document.getElementById('submit-leave-request');
    const formSubmissionMessage = document.getElementById('form-submission-message');

    // --- DOM Elements (Student Page Status/Gate Pass) ---
    const studentIdCheckMessage = document.getElementById('student-id-check-message');
    const leaveHistoryContainer = document.getElementById('leave-history-container');
    const leaveHistoryTableBody = document.getElementById('leave-history-table-body');
    const noRequestsMessage = document.getElementById('no-requests-message');
    const gatePassSection = document.getElementById('gate-pass-section');
    const gatePassMessage = document.getElementById('gate-pass-message');
    const qrCodeDisplay = document.getElementById('qr-code-display');
    const downloadQrButton = document.getElementById('download-qr-button');
    const qrErrorMessage = document.getElementById('qr-error-message');
    const noActivePassMessage = document.getElementById('no-active-pass-message');
    const qrDownloadWarning = document.getElementById('qr-download-warning'); // NEW: QR Download Warning

    // --- DOM Elements (Teacher Page) ---
    const teacherWelcomeTitle = document.getElementById('teacher-welcome-title');
    const pendingTeacherRequestsContainer = document.getElementById('pending-teacher-requests-container');
    const noPendingTeacherRequests = document.getElementById('no-pending-teacher-requests');
    const reviewedTeacherRequestsTableBody = document.getElementById('reviewed-teacher-requests-table-body');
    const noReviewedTeacherRequests = document.getElementById('no-reviewed-teacher-requests');

    // --- DOM Elements (HOD Page) ---
    const hodWelcomeTitle = document.getElementById('hod-welcome-title');
    const pendingHodRequestsContainer = document.getElementById('pending-hod-requests-container');
    const noPendingHodRequests = document.getElementById('no-pending-hod-requests');
    const reviewedHodRequestsTableBody = document.getElementById('reviewed-hod-requests-table-body');
    const noReviewedHodRequests = document.getElementById('no-reviewed-hod-requests');

    // --- DOM Elements (Dean Page) ---
    const deanWelcomeTitle = document.getElementById('dean-welcome-title');
    const pendingDeanRequestsContainer = document.getElementById('pending-dean-requests-container');
    const noPendingDeanRequests = document.getElementById('no-pending-dean-requests');
    const reviewedDeanRequestsTableBody = document.getElementById('reviewed-dean-requests-table-body');
    const noReviewedDeanRequests = document.getElementById('no-reviewed-dean-requests');

    // --- Custom Logout Confirmation Modal Elements ---
    const logoutConfirmModal = document.getElementById('logout-confirm-modal');
    const confirmLogoutYesButton = document.getElementById('confirm-logout-yes');
    const confirmLogoutNoButton = document.getElementById('confirm-logout-no');


    // --- User Data (Simulated - In a real app, this would come from a backend API) ---
    const USERS = {
        "student": {"id": "student123", "password": "pass123"},
        "teacher_dileep": {"id": "dileep123", "password": "pass456", "name": "Dileep Kumar"},
        "teacher_bagal": {"id": "bagal123", "password": "pass789", "name": "Bagal"},
        "teacher_sugam": {"id": "sugam123", "password": "pass101", "name": "Sugam Shivare"},
        "teacher_rajshekhar": {"id": "raj123", "password": "pass102", "name": "Rajshekhar Pothala"},
        "teacher_dj": {"id": "dj123", "password": "pass103", "name": "DJ"},
        "teacher_ashok": {"id": "ashok123", "password": "pass104", "name": "ASHOK PANIGRAHI"},
        "teacher_sachin": {"id": "sachin123", "password": "pass105", "name": "Sachin Bhandari"},
        "teacher_rehan": {"id": "rehan123", "password": "pass106", "name": "Rehan"},
        "teacher_suraj": {"id": "suraj123", "password": "pass107", "name": "Suraj Patil"},
        "hod_1": {"id": "hod1_id", "password": "hod1_pass", "name": "HOD BTech/MBA"},
        "hod_2": {"id": "hod2_id", "password": "hod2_pass", "name": "HOD BPharm/Textile"},
        "dean": {"id": "dean_id", "password": "dean_pass", "name": "Dean of Academics"},
    };

    const LEAVE_STATUS_PENDING = "Pending";
    const LEAVE_STATUS_TEACHER_APPROVED = "Teacher Approved";
    const LEAVE_STATUS_HOD_APPROVED = "HOD Approved"; // Now means awaiting Dean for >3 days
    const LEAVE_STATUS_GRANTED = "Granted";
    const LEAVE_STATUS_REJECTED = "Rejected";

    const BRANCH_BATCH_MAP = {
        "BTECH CS": ['A1', 'A2', 'B1', 'B2'],
        "BTECH CE": ['C1', 'C2', 'D1', 'D2'],
        "BTECH AI-ML": ['F1', 'F2'],
        "BTECH IT": ['E1', 'E2'],
        "MBA TECH CE": ['AB1', 'AB2'],
        "B-PHARM": ['P1', 'P2', 'P3'],
        "TEXTILE": ['T1', 'T2', 'T3', 'T4']
    };

    const MENTOR_BATCH_MAP = {
        'A1': 'Sugam Shivare', 'A2': 'Dileep Kumar', 'B1': 'Rajshekhar Pothala', 'B2': 'DJ',
        'C1': 'ASHOK PANIGRAHI', 'C2': 'Sachin Bhandari', 'D1': 'Suraj Patil', 'D2': 'Rehan',
        'F1': 'Dileep Kumar', 'F2': 'DJ',
        'E1': 'Bagal', 'E2': 'Dileep Kumar',
        'AB1': 'Sachin Bhandari', 'AB2': 'Rehan',
        'P1': 'Dileep Kumar', 'P2': 'Dileep Kumar', 'P3': 'Dileep Kumar',
        'T1': 'DJ', 'T2': 'DJ', 'T3': 'DJ', 'T4': 'DJ'
    };

    // --- State Management (Simulated - In a real app, session management would be on backend) ---
    let loggedInAs = null; // Stores the role of the logged-in user
    let userName = null; // Stores the name of the logged-in user (for teachers, HODs, Dean)
    let currentStudentId = null; // Stores the student ID manually entered by the student on their page

    // --- Simulated Database (In a real app, this would be handled by a backend) ---
    // This array will hold all leave requests. Data will be lost on page refresh.
    let LEAVE_REQUESTS = [];

    // --- Helper Functions ---

    // Function to display messages (success, error, info)
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `mt-4 p-3 rounded-lg text-sm ${type}`;
        element.classList.remove('hidden');
    }

    // Function to hide messages
    function hideMessage(element) {
        element.classList.add('hidden');
        element.textContent = '';
    }

    // Function to show the custom logout confirmation modal
    function showLogoutConfirmModal() {
        logoutConfirmModal.classList.remove('hidden');
    }

    // Function to hide the custom logout confirmation modal
    function hideLogoutConfirmModal() {
        logoutConfirmModal.classList.add('hidden');
    }

    function updateRoleTitle() {
        const selectedRole = roleSelect.value;
        roleTitle.textContent = `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login`;
        hideMessage(messageBox);
    }

    function navigateTo(pageId) {
        loginSection.classList.add('hidden');
        studentPage.classList.add('hidden');
        teacherPage.classList.add('hidden');
        hodPage.classList.add('hidden');
        deanPage.classList.add('hidden');

        document.getElementById(pageId).classList.remove('hidden');
    }

    function handleLogin() {
        const selectedRole = roleSelect.value;
        const userId = userIdInput.value.trim();
        const password = passwordInput.value.trim();

        hideMessage(messageBox);

        if (!userId || !password) {
            showMessage(messageBox, "Please enter both ID and Password.", "error");
            return;
        }

        let authenticated = false;

        if (selectedRole === "student") {
            if (userId === USERS.student.id && password === USERS.student.password) {
                authenticated = true;
                loggedInAs = "student";
                userName = "Student"; // Generic name for student
                // currentStudentId is NOT set here; it's manually entered on student page
            }
        } else if (selectedRole === "teacher") {
            for (const key in USERS) {
                if (key.startsWith("teacher") && USERS[key].id === userId && USERS[key].password === password) {
                    authenticated = true;
                    loggedInAs = "teacher";
                    userName = USERS[key].name;
                    break;
                }
            }
        } else if (selectedRole === "hod") {
            for (const key in USERS) {
                if (key.startsWith("hod") && USERS[key].id === userId && USERS[key].password === password) {
                    authenticated = true;
                    loggedInAs = "hod";
                    userName = USERS[key].name;
                    break;
                }
            }
        } else if (selectedRole === "dean") {
            if (userId === USERS.dean.id && password === USERS.dean.password) {
                authenticated = true;
                loggedInAs = "dean";
                userName = USERS.dean.name;
            }
        }

        if (authenticated) {
            showMessage(messageBox, `Welcome, ${userName}! You're logged in as a ${loggedInAs}.`, "success");
            userIdInput.value = ''; // Clear inputs
            passwordInput.value = '';
            // Navigate to the appropriate page after a short delay
            setTimeout(() => {
                switch (loggedInAs) {
                    case 'student':
                        navigateTo('student-page');
                        // Do NOT pre-fill student ID here. It will be manually entered.
                        break;
                    case 'teacher':
                        navigateTo('teacher-page');
                        teacher_page(); // Call teacher page setup
                        break;
                    case 'hod':
                        navigateTo('hod-page');
                        hod_page(); // Call HOD page setup
                        break;
                    case 'dean':
                        navigateTo('dean-page');
                        dean_page(); // Call Dean page setup
                        break;
                }
            }, 500); // Small delay for message to be seen
        } else {
            showMessage(messageBox, `Invalid ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} ID or Password. Please try again.`, "error");
        }
    }
    
    // Function to perform logout actions after confirmation
    function performLogout() {
        loggedInAs = null;
        userName = null;
        currentStudentId = null; // Clear student ID on logout
        showMessage(messageBox, "You have been logged out.", "info");
        // Reset form fields on logout
        resetStudentForm();
        setTimeout(() => {
            navigateTo('login-section'); // Go back to login page
            hideMessage(messageBox); // Clear logout message
        }, 500);
    }

    // --- Student Page Specific Functions ---

    // Resets all student form fields
    function resetStudentForm() {
        studentNameInput.value = '';
        studentIdInput.value = '';
        studentIdDisplay.classList.add('hidden');
        hideMessage(studentIdValidationMessage); // Hide ID validation message
        studentYearInput.value = ''; // Reset dropdown to default
        hideMessage(yearValidationMessage);
        studentAttendanceInput.value = '85.0';
        attendanceDisplay.innerHTML = 'Your attendance is: <strong>85.00%</strong>';
        hideMessage(attendanceWarning);
        parentEmailInput.value = '';
        hideMessage(parentEmailValidationMessage);
        parentContactInput.value = '';
        hideMessage(parentContactValidationMessage);

        authLeaveCheckbox.checked = false;
        specLeaveCheckbox.checked = false;
        hideMessage(leaveTypeMessage);
        hideMessage(leaveTypeSelectMessage);
        leaveReasonTextarea.value = '';
        hideMessage(reasonInfo);
        hideMessage(reasonWarning);
        studentBranchSelect.value = '';
        studentBatchSelect.innerHTML = '<option value="">Select Batch</option>';
        studentBatchSelect.disabled = true;
        hideMessage(batchDisplay);
        hideMessage(batchWarning);
        studentMentorSelect.value = '';
        hideMessage(mentorVerificationMessage);
        startDateInput.value = '';
        endDateInput.value = '';
        hideMessage(dateRangeMessage);
        hideMessage(dateRangeError);
        hideMessage(formSubmissionMessage);

        // Hide history and gate pass sections
        leaveHistoryContainer.classList.add('hidden');
        gatePassSection.classList.add('hidden');
        noRequestsMessage.classList.add('hidden');
        noActivePassMessage.classList.add('hidden');
        studentIdCheckMessage.classList.remove('hidden'); // Show initial message
        hideMessage(qrDownloadWarning); // NEW: Hide QR download warning on form reset
    }


    // Validates student year input (now for a select dropdown)
    function validateStudentYear() {
        const year = studentYearInput.value.trim();
        if (year === '') {
            showMessage(yearValidationMessage, "Please select your academic year.", "error"); // Changed message
            return false;
        }
        hideMessage(yearValidationMessage);
        return true;
    }

    // Updates attendance display and warning
    function updateAttendanceDisplay() {
        const attendance = parseFloat(studentAttendanceInput.value);
        attendanceDisplay.innerHTML = `Your attendance is: <strong>${attendance.toFixed(2)}%</strong>`;
        if (attendance <= 80) {
            showMessage(attendanceWarning, "Your attendance is below 80%. You might need to talk with your Mentor about this.", "warning");
        } else {
            hideMessage(attendanceWarning);
        }
    }

    // NEW FUNCTION: Validate Parent's Email
    function validateParentEmail() {
        const email = parentEmailInput.value.trim();
        hideMessage(parentEmailValidationMessage);
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage(parentEmailValidationMessage, "Please enter a valid parent's email address.", "error");
            return false;
        }
        return true;
    }

    // NEW FUNCTION: Validate Parent's Contact Number
    function validateParentContact() {
        const contact = parentContactInput.value.trim();
        hideMessage(parentContactValidationMessage);
        if (!contact || !/^\d{10}$/.test(contact)) {
            showMessage(parentContactValidationMessage, "Please enter a valid 10-digit parent's contact number.", "error");
            return false;
        }
        return true;
    }


    // Validates leave type selection
    function validateLeaveType() {
        const authChecked = authLeaveCheckbox.checked;
        const specChecked = specLeaveCheckbox.checked;

        hideMessage(leaveTypeMessage);
        hideMessage(leaveTypeSelectMessage);

        if (authChecked && specChecked) {
            showMessage(leaveTypeMessage, "Please pick only one type of leave.", "error");
            return false;
        }
        else if (!authChecked && !specChecked) {
            showMessage(leaveTypeSelectMessage, "Don't forget to select a leave type!", "error");
            return false;
        }
        return true;
    }

    // Updates reason info/warning
    function updateReasonStatus() {
        if (leaveReasonTextarea.value.trim() === '') {
            showMessage(reasonWarning, "Please provide a reason for your leave.", "warning");
            hideMessage(reasonInfo);
            return false;
        } else {
            showMessage(reasonInfo, "Your reason will be reviewed by your mentor.", "info");
            hideMessage(reasonWarning);
            return true;
        }
    }

    // Populates batch dropdown based on selected branch
    function populateBatches() {
        const selectedBranch = studentBranchSelect.value;
        studentBatchSelect.innerHTML = '<option value="">Select Batch</option>'; // Clear existing options
        studentBatchSelect.disabled = true;
        hideMessage(batchDisplay);
        hideMessage(batchWarning);

        if (selectedBranch) {
            const batches = BRANCH_BATCH_MAP[selectedBranch];
            if (batches) {
                batches.forEach(batch => {
                    const option = document.createElement('option');
                    option.value = batch;
                    option.textContent = batch;
                    studentBatchSelect.appendChild(option);
                });
                studentBatchSelect.disabled = false;
                showMessage(batchWarning, "Please select your batch.", "info"); // Prompt to select batch
            }
        } else {
            showMessage(batchWarning, "Pick your branch to see your batch options.", "warning");
        }
    }

    // Updates batch display
    function updateBatchDisplay() {
        const selectedBranch = studentBranchSelect.value;
        const selectedBatch = studentBatchSelect.value;
        if (selectedBranch && selectedBatch) {
            batchDisplay.innerHTML = `You're in batch: <strong>${selectedBatch}</strong>, from the <strong>${selectedBranch}</strong> branch.`;
            batchDisplay.classList.remove('hidden');
            hideMessage(batchWarning);
        } else {
            batchDisplay.classList.add('hidden');
        }
    }

    // Validates mentor selection against batch
    function validateMentor() {
        const selectedBatch = studentBatchSelect.value;
        const selectedMentor = studentMentorSelect.value;

        hideMessage(mentorVerificationMessage);

        if (!selectedBatch) {
            showMessage(mentorVerificationMessage, "Please pick your batch to help verify your mentor.", "warning");
            return false;
        }
        if (!selectedMentor) {
            showMessage(mentorVerificationMessage, "Please select your mentor.", "warning");
            return false;
        }

        if (MENTOR_BATCH_MAP[selectedBatch] === selectedMentor) {
            showMessage(mentorVerificationMessage, "Mentor and batch details verified.", "success");
            return true;
        } else {
            showMessage(mentorVerificationMessage, `Please check if '${selectedMentor}' is the correct mentor for batch '${selectedBatch}'?`, "error");
            return false;
        }
    }

    // Calculates and displays leave days, validates date range
    function updateDateRange() {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        hideMessage(dateRangeMessage);
        hideMessage(dateRangeError);

        if (!startDate || !endDate) {
            return { isValid: false, numDays: 0 };
        }

        const startDt = new Date(startDate);
        const endDt = new Date(endDate);
        const today = new Date();
        today.setHours(0,0,0,0); // Normalize today's date for comparison

        if (startDt > endDt) {
            showMessage(dateRangeError, "The 'End' date must be after or on the 'From' date.", "error");
            return { isValid: false, numDays: 0 };
        }

        // Check if start date is in the past
        if (startDt < today) {
            showMessage(dateRangeError, "Leave 'From' date cannot be in the past.", "error");
            return { isValid: false, numDays: 0 };
        }


        const diffTime = Math.abs(endDt - startDt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include start day

        dateRangeMessage.innerHTML = `You're applying for <strong>${diffDays}</strong> day(s) of leave.`;
        dateRangeMessage.classList.remove('hidden');
        return { isValid: true, numDays: diffDays };
    }

    // Determine HOD based on branch (simulated)
    function getAssignedHOD(branch) {
        if (['BTECH CS', 'BTECH CE', 'BTECH AI-ML', 'BTECH IT', 'MBA TECH CE'].includes(branch)) {
            return USERS["hod_1"]["name"];
        } else if (['B-PHARM', 'TEXTILE'].includes(branch)) {
            return USERS["hod_2"]["name"];
        }
        return null;
    }

    // --- Form Submission Handler (Student Page) ---
    function handleSubmitLeaveRequest() {
        hideMessage(formSubmissionMessage);

        // Collect form data
        const s_name = studentNameInput.value.trim();
        const s_id = studentIdInput.value.trim();
        const yr = studentYearInput.value.trim(); // Get value from select
        const attn = parseFloat(studentAttendanceInput.value);
        const parent_email = parentEmailInput.value.trim();
        const parent_contact = parentContactInput.value.trim();

        const auth_leave = authLeaveCheckbox.checked;
        const spec_leave = specLeaveCheckbox.checked;
        const reason = leaveReasonTextarea.value.trim();
        const sel_branch = studentBranchSelect.value;
        const sel_batch = studentBatchSelect.value;
        const sel_mentor = studentMentorSelect.value;
        const s_date = startDateInput.value;
        const e_date = endDateInput.value;

        // Perform all validations
        let isValid = true;

        if (!s_name) { showMessage(formSubmissionMessage, "Please enter your full name.", "error"); isValid = false; }
        
        // Validate 11-digit student ID
        if (s_id.length !== 11 || !/^\d+$/.test(s_id)) {
            showMessage(formSubmissionMessage, "Student ID must be exactly 11 digits.", "error");
            isValid = false;
        } else {
            // If ID is valid, set currentStudentId for history lookup
            currentStudentId = s_id; 
        }

        if (!validateStudentYear()) { isValid = false; } // Validate dropdown
        if (isNaN(attn) || attn < 0 || attn > 100) { showMessage(formSubmissionMessage, "Please enter a valid attendance percentage.", "error"); isValid = false; }
        if (!validateParentEmail()) { isValid = false; }
        if (!validateParentContact()) { isValid = false; }

        if (!validateLeaveType()) { isValid = false; }
        if (!updateReasonStatus()) { isValid = false; }
        if (!sel_branch) { showMessage(formSubmissionMessage, "Please select your branch.", "error"); isValid = false; }
        if (!sel_batch) { showMessage(formSubmissionMessage, "Please select your batch.", "error"); isValid = false; }
        if (!validateMentor()) { isValid = false; }

        const dateValidation = updateDateRange();
        if (!dateValidation.isValid || dateValidation.numDays <= 0) { isValid = false; }

        const ah = getAssignedHOD(sel_branch);
        if (!ah) { showMessage(formSubmissionMessage, "Could not determine the HOD for your selected branch.", "error"); isValid = false; }


        if (!isValid) {
            showMessage(formSubmissionMessage, "Please fill in all the required details correctly and fix any errors before submitting.", "error");
            return;
        }

        // Simulate duplicate check (very basic, in real app this would be backend)
        const isDuplicate = LEAVE_REQUESTS.some(req =>
            req.student_id === s_id &&
            req.status === LEAVE_STATUS_PENDING &&
            req.start_date === s_date &&
            req.end_date === e_date &&
            req.reason.toLowerCase() === reason.toLowerCase()
        );

        if (isDuplicate) {
            showMessage(formSubmissionMessage, "You already have a similar pending leave request for these dates and reason. Please wait for your previous request to be processed by your teacher and HOD.", "warning");
            return;
        }

        // If all validations pass, simulate submission
        const newRequest = {
            student_name: s_name,
            attendance: attn,
            year: yr,
            student_id: s_id,
            branch: sel_branch,
            batch: sel_batch,
            parent_email: parent_email,
            parent_contact: parent_contact,
            leave_days: dateValidation.numDays,
            start_date: s_date,
            end_date: e_date,
            reason: reason,
            teacher: sel_mentor,
            hod_assigned: ah,
            teacher_approved: false,
            hod_approved: false,
            dean_approved: false,
            status: LEAVE_STATUS_PENDING,
            qr_code_data: null,
            timestamp: Date.now() // Add timestamp for ordering
        };

        LEAVE_REQUESTS.push(newRequest); // Add to simulated database
        showMessage(formSubmissionMessage, "Your leave request has been submitted for approval by your teacher and HOD.", "success");
        console.log("Submitted Leave Request:", newRequest);
        console.log("All Leave Requests:", LEAVE_REQUESTS);

        // Optionally, clear the form after submission
        resetStudentForm();
        // After submission, re-display history for the current student ID
        displayStudentLeaveHistory(currentStudentId);
    }

    // Function to display student leave history (simulated)
    function displayStudentLeaveHistory(studentId) {
        leaveHistoryTableBody.innerHTML = ''; // Clear existing rows
        hideMessage(noRequestsMessage);
        hideMessage(noActivePassMessage);
        gatePassSection.classList.add('hidden');
        studentIdCheckMessage.classList.add('hidden'); // Hide initial prompt
        hideMessage(qrDownloadWarning); // NEW: Hide QR download warning initially

        if (!studentId || studentId.length !== 11 || !/^\d+$/.test(studentId)) {
            showMessage(studentIdCheckMessage, "Enter your 11-digit Student ID above to check your leave status and get your pass.", "info");
            studentIdCheckMessage.classList.remove('hidden');
            leaveHistoryContainer.classList.add('hidden');
            return;
        }

        const studentRequests = LEAVE_REQUESTS.filter(req => req.student_id === studentId);

        if (studentRequests.length === 0) {
            showMessage(noRequestsMessage, "No leave requests found for your Student ID. Submit one above.", "info");
            leaveHistoryContainer.classList.add('hidden');
            return;
        }

        leaveHistoryContainer.classList.remove('hidden');
        // Sort requests by timestamp (most recent first) for display
        studentRequests.sort((a, b) => b.timestamp - a.timestamp);

        studentRequests.forEach(req => {
            const row = leaveHistoryTableBody.insertRow();
            row.className = 'border-b border-gray-200 hover:bg-gray-100';
            row.innerHTML = `
                <td class="py-3 px-6 text-left whitespace-nowrap">${req.start_date}</td>
                <td class="py-3 px-6 text-left whitespace-nowrap">${req.end_date}</td>
                <td class="py-3 px-6 text-left">${req.leave_days}</td>
                <td class="py-3 px-6 text-left">${req.reason}</td>
                <td class="py-3 px-6 text-left">${req.status}</td>
                <td class="py-3 px-6 text-left">${req.teacher}</td>
                <td class="py-3 px-6 text-left">${req.hod_assigned}</td>
                <td class="py-3 px-6 text-left">${req.dean_assigned || 'N/A'}</td>
                <td class="py-3 px-6 text-left">${req.teacher_approved ? 'Yes' : 'No'}</td>
                <td class="py-3 px-6 text-left">${req.hod_approved ? 'Yes' : 'No'}</td>
                <td class="py-3 px-6 text-left">${req.dean_approved ? 'Yes' : 'No'}</td>
            `;
        });

        // Simulate active gate pass display
        const today = new Date();
        today.setHours(0,0,0,0);
        const activeGrantedReqs = studentRequests.filter(req =>
            req.status === LEAVE_STATUS_GRANTED &&
            new Date(req.end_date) >= today
        ).sort((a, b) => new Date(a.end_date) - new Date(b.end_date));

        if (activeGrantedReqs.length > 0) {
            const currentReq = activeGrantedReqs[0]; // Get the most recent active pass
            gatePassSection.classList.remove('hidden');
            gatePassMessage.innerHTML = `Your leave request for <strong>${currentReq.start_date}</strong> to <strong>${currentReq.end_date}</strong> has been <strong>GRANTED.</strong> This pass is valid until <strong>${currentReq.end_date}</strong>.`;

            // --- START QR CODE GENERATION ---
            qrCodeDisplay.innerHTML = ''; // Clear previous QR code
            if (currentReq.qr_code_data) {
                // Initialize QRCode.js
                new QRCode(qrCodeDisplay, {
                    text: currentReq.qr_code_data, // Data to encode in QR code
                    width: 180, // Adjust width as needed
                    height: 180, // Adjust height as needed
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H // Error correction level
                });
                showMessage(qrDownloadWarning, "DOWNLOAD YOUR QR CODE ON DEVICE ONCE IT IS SEEN, IT MAY DISAPPEAR.", "warning"); // NEW: Show warning

                // For downloading, we need to extract the canvas data
                downloadQrButton.onclick = () => {
                    const canvas = qrCodeDisplay.querySelector('canvas');
                    if (canvas) {
                        const dataURL = canvas.toDataURL("image/png");
                        const link = document.createElement('a');
                        link.href = dataURL;
                        link.download = `GatePass_QR_${currentReq.student_id}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        showMessage(qrErrorMessage, "QR code not available for download. Please ensure it's displayed.", "error");
                    }
                };
            } else {
                qrCodeDisplay.innerHTML = '<p class="text-gray-600">QR Code data not available.</p>';
                showMessage(qrErrorMessage, "QR Code could not be generated as data is missing.", "error");
                downloadQrButton.onclick = null; // Disable download if no QR
                hideMessage(qrDownloadWarning); // NEW: Hide warning if no QR
            }
            // --- END QR CODE GENERATION ---

        } else {
            showMessage(noActivePassMessage, "No active or future approved leave requests found for your Student ID. Your previous passes have expired or none are pending.", "info");
            hideMessage(qrDownloadWarning); // NEW: Hide warning if no active pass
        }
    }

    // Function to update a leave request (simulated - in real app, this would be a backend API call)
    function simulatedUpdateLeaveRequest(index, column, value, newStatus = null) {
        if (index >= 0 && index < LEAVE_REQUESTS.length) {
            LEAVE_REQUESTS[index][column] = value;
            if (newStatus) {
                LEAVE_REQUESTS[index].status = newStatus;
            }
            console.log(`Request ${index} updated: ${column} = ${value}, status = ${newStatus || LEAVE_REQUESTS[index].status}`);
            return true;
        }
        console.error("Failed to update request: Invalid index or data.");
        return false;
    }


    function teacher_page() {
        teacherWelcomeTitle.textContent = `Welcome, ${userName} (Teacher Portal)!`;
        pendingTeacherRequestsContainer.innerHTML = ''; // Clear previous requests
        reviewedTeacherRequestsTableBody.innerHTML = ''; // Clear previous history
        hideMessage(noPendingTeacherRequests);
        hideMessage(noReviewedTeacherRequests);

        const currentTeacherName = userName;

        // Filter pending requests for this teacher
        const pendingRequests = LEAVE_REQUESTS.filter(req =>
            req.status === LEAVE_STATUS_PENDING &&
            req.teacher === currentTeacherName
        );

        if (pendingRequests.length > 0) {
            pendingRequests.forEach((req, index) => {
                // Find the original index in the LEAVE_REQUESTS array
                const originalIndex = LEAVE_REQUESTS.indexOf(req);

                const requestCard = document.createElement('div');
                requestCard.className = 'border border-gray-300 bg-white p-4 rounded-lg shadow-sm';
                requestCard.innerHTML = `
                    <p><strong>Student Name:</strong> ${req.student_name}</p>
                    <p><strong>Student ID:</strong> ${req.student_id}</p>
                    <p><strong>Branch/Batch:</strong> ${req.branch}/${req.batch}</p>
                    <p><strong>Leave Days:</strong> ${req.leave_days} (${req.start_date} to ${req.end_date})</p>
                    <p><strong>Reason:</strong> ${req.reason}</p>
                    <p><strong>Requested Teacher:</strong> ${req.teacher}</p>
                    <p><strong>Assigned HOD:</strong> ${req.hod_assigned}</p>
                    <p><strong>Attendance:</strong> ${req.attendance}%</p>
                    <p><strong>Parent's Email:</strong> ${req.parent_email}</p>
                    <p><strong>Parent's Contact:</strong> ${req.parent_contact}</p>
                    <div class="flex gap-4 mt-4">
                        <button id="teacher-approve-${originalIndex}" class="flex-1 bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300">✅ Approve</button>
                        <button id="teacher-reject-${originalIndex}" class="flex-1 bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300">❌ Reject</button>
                    </div>
                `;
                pendingTeacherRequestsContainer.appendChild(requestCard);

                // Add event listeners to the dynamically created buttons
                document.getElementById(`teacher-approve-${originalIndex}`).addEventListener('click', () => {
                    if (simulatedUpdateLeaveRequest(originalIndex, "teacher_approved", true, LEAVE_STATUS_TEACHER_APPROVED)) {
                        showMessage(messageBox, `Teacher approval recorded for Student ID: ${req.student_id}. Request now awaiting HOD approval.`, "success");
                        teacher_page(); // Re-render the teacher page to update lists
                        if (loggedInAs === 'student' && currentStudentId === req.student_id) {
                            displayStudentLeaveHistory(currentStudentId);
                        }
                    } else {
                        showMessage(messageBox, "Failed to record teacher approval.", "error");
                    }
                });

                document.getElementById(`teacher-reject-${originalIndex}`).addEventListener('click', () => {
                    if (simulatedUpdateLeaveRequest(originalIndex, "status", LEAVE_STATUS_REJECTED)) {
                        simulatedUpdateLeaveRequest(originalIndex, "teacher_approved", false);
                        simulatedUpdateLeaveRequest(originalIndex, "hod_approved", false);
                        simulatedUpdateLeaveRequest(originalIndex, "dean_approved", false);
                        simulatedUpdateLeaveRequest(originalIndex, "qr_code_data", null);
                        showMessage(messageBox, `Leave rejected for Student ID: ${req.student_id}.`, "warning");
                        teacher_page(); // Re-render the teacher page to update lists
                        if (loggedInAs === 'student' && currentStudentId === req.student_id) {
                            displayStudentLeaveHistory(currentStudentId);
                        }
                    } else {
                        showMessage(messageBox, "Failed to reject leave request.", "error");
                    }
                });
            });
        } else {
            noPendingTeacherRequests.classList.remove('hidden');
        }

        // Filter reviewed requests for this teacher
        const reviewedRequests = LEAVE_REQUESTS.filter(req =>
            req.teacher === currentTeacherName &&
            req.status !== LEAVE_STATUS_PENDING
        );

        if (reviewedRequests.length > 0) {
            reviewedRequests.forEach(req => {
                const row = reviewedTeacherRequestsTableBody.insertRow();
                row.className = 'border-b border-gray-200 hover:bg-gray-100';
                row.innerHTML = `
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.student_name}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.student_id}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.start_date}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.end_date}</td>
                    <td class="py-3 px-6 text-left">${req.status}</td>
                    <td class="py-3 px-6 text-left">${req.teacher}</td>
                    <td class="py-3 px-6 text-left">${req.hod_assigned}</td>
                    <td class="py-3 px-6 text-left">${req.dean_assigned || 'N/A'}</td>
                    <td class="py-3 px-6 text-left">${req.teacher_approved ? 'Yes' : 'No'}</td>
                    <td class="py-3 px-6 text-left">${req.hod_approved ? 'Yes' : 'No'}</td>
                    <td class="py-3 px-6 text-left">${req.dean_approved ? 'Yes' : 'No'}</td>
                `;
            });
        } else {
            noReviewedTeacherRequests.classList.remove('hidden');
        }
    }

    // --- HOD Page Specific Functions ---
    function hod_page() {
        hodWelcomeTitle.textContent = `Welcome, ${userName} (HOD Portal)!`;
        pendingHodRequestsContainer.innerHTML = ''; // Clear previous requests
        reviewedHodRequestsTableBody.innerHTML = ''; // Clear previous history
        hideMessage(noPendingHodRequests);
        hideMessage(noReviewedHodRequests);

        const currentHodName = userName;
        // let hodBranches = []; // Not directly used for filtering but good for context
        // if (currentHodName === USERS["hod_1"]["name"]) {
        //     hodBranches = ['BTECH CS', 'BTECH CE', 'BTECH AI-ML', 'BTECH IT', 'MBA TECH CE'];
        // } else if (currentHodName === USERS["hod_2"]["name"]) {
        //     hodBranches = ['B-PHARM', 'TEXTILE'];
        // }

        // Filter pending requests for this HOD
        // Requests must be teacher_approved and status should be TEACHER_APPROVED
        const pendingRequests = LEAVE_REQUESTS.filter(req =>
            req.teacher_approved === true &&
            req.status === LEAVE_STATUS_TEACHER_APPROVED && // Only show requests that teacher approved
            req.hod_assigned === currentHodName
        );

        if (pendingRequests.length > 0) {
            pendingRequests.forEach((req, index) => {
                const originalIndex = LEAVE_REQUESTS.indexOf(req);

                const requestCard = document.createElement('div');
                requestCard.className = 'border border-gray-300 bg-white p-4 rounded-lg shadow-sm';
                requestCard.innerHTML = `
                    <p><strong>Student Name:</strong> ${req.student_name}</p>
                    <p><strong>Student ID:</strong> ${req.student_id}</p>
                    <p><strong>Branch/Batch:</strong> ${req.branch}/${req.batch}</p>
                    <p><strong>Leave Days:</strong> ${req.leave_days} (${req.start_date} to ${req.end_date})</p>
                    <p><strong>Reason:</strong> ${req.reason}</p>
                    <p><strong>Teacher:</strong> ${req.teacher} (Approved: ${req.teacher_approved ? 'Yes' : 'No'})</p>
                    <p><strong>Assigned HOD:</strong> ${req.hod_assigned}</p>
                    <p><strong>Attendance:</strong> ${req.attendance}%</p>
                    <p><strong>Parent's Email:</strong> ${req.parent_email}</p>
                    <p><strong>Parent's Contact:</strong> ${req.parent_contact}</p>
                    <div class="flex gap-4 mt-4">
                        <button id="hod-approve-${originalIndex}" class="flex-1 bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300">✅ Approve</button>
                        <button id="hod-reject-${originalIndex}" class="flex-1 bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300">❌ Reject</button>
                    </div>
                `;
                pendingHodRequestsContainer.appendChild(requestCard);

                // Add event listeners
                document.getElementById(`hod-approve-${originalIndex}`).addEventListener('click', () => {
                    let newStatus;
                    if (req.leave_days <= 3) {
                        newStatus = LEAVE_STATUS_GRANTED;
                        // Simulate QR code data generation for granted requests
                        LEAVE_REQUESTS[originalIndex].qr_code_data = `LEAVE_GRANTED_ID:${req.student_id}|NAME:${req.student_name}|FROM:${req.start_date}|TO:${req.end_date}|TEACHER_APP:YES|HOD_APP:YES|PARENT_EMAIL:${req.parent_email}|PARENT_CONTACT:${req.parent_contact}|TS:${Date.now()}`;
                    } else {
                        // If leave days > 3, it goes to Dean
                        newStatus = LEAVE_STATUS_HOD_APPROVED; // Status indicates HOD approved, now awaiting Dean
                    }

                    if (simulatedUpdateLeaveRequest(originalIndex, "hod_approved", true, newStatus)) {
                        // Add dean_assigned to the request if it's going to dean
                        if (newStatus === LEAVE_STATUS_HOD_APPROVED) {
                            LEAVE_REQUESTS[originalIndex].dean_assigned = USERS.dean.name;
                            showMessage(messageBox, `HOD approval recorded for Student ID: ${req.student_id}. Request now awaiting Dean approval as leave is for ${req.leave_days} days.`, "success");
                        } else {
                            showMessage(messageBox, `HOD approval recorded for Student ID: ${req.student_id}. Leave fully GRANTED!`, "success");
                        }
                        hod_page(); // Re-render HOD page
                        // If a student is logged in, and this request belongs to them, update their history
                        if (loggedInAs === 'student' && currentStudentId === req.student_id) {
                            displayStudentLeaveHistory(currentStudentId);
                        }
                    } else {
                        showMessage(messageBox, "Failed to record HOD approval.", "error");
                    }
                });

                document.getElementById(`hod-reject-${originalIndex}`).addEventListener('click', () => {
                    if (simulatedUpdateLeaveRequest(originalIndex, "status", LEAVE_STATUS_REJECTED)) {
                        simulatedUpdateLeaveRequest(originalIndex, "hod_approved", false);
                        simulatedUpdateLeaveRequest(originalIndex, "dean_approved", false);
                        simulatedUpdateLeaveRequest(originalIndex, "qr_code_data", null);
                        showMessage(messageBox, `Leave rejected for Student ID: ${req.student_id}.`, "warning");
                        hod_page(); // Re-render HOD page
                        if (loggedInAs === 'student' && currentStudentId === req.student_id) {
                            displayStudentLeaveHistory(currentStudentId);
                        }
                    } else {
                        showMessage(messageBox, "Failed to reject leave request.", "error");
                    }
                });
            });
        } else {
            noPendingHodRequests.classList.remove('hidden');
        }

        // Filter reviewed requests for this HOD
        const reviewedRequests = LEAVE_REQUESTS.filter(req =>
            req.hod_assigned === currentHodName &&
            (req.hod_approved === true || req.status === LEAVE_STATUS_REJECTED)
        );

        if (reviewedRequests.length > 0) {
            reviewedRequests.forEach(req => {
                const row = reviewedHodRequestsTableBody.insertRow();
                row.className = 'border-b border-gray-200 hover:bg-gray-100';
                row.innerHTML = `
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.student_name}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.student_id}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.start_date}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.end_date}</td>
                    <td class="py-3 px-6 text-left">${req.status}</td>
                    <td class="py-3 px-6 text-left">${req.teacher}</td>
                    <td class="py-3 px-6 text-left">${req.hod_assigned}</td>
                    <td class="py-3 px-6 text-left">${req.dean_assigned || 'N/A'}</td>
                    <td class="py-3 px-6 text-left">${req.teacher_approved ? 'Yes' : 'No'}</td>
                    <td class="py-3 px-6 text-left">${req.hod_approved ? 'Yes' : 'No'}</td>
                    <td class="py-3 px-6 text-left">${req.dean_approved ? 'Yes' : 'No'}</td>
                `;
            });
        } else {
            noReviewedHodRequests.classList.add('hidden'); // Ensure this is hidden if there are reviewed requests
        }
    }

    // --- Dean Page Specific Functions ---
    function dean_page() {
        deanWelcomeTitle.textContent = `Welcome, ${userName} (Dean Portal)!`;
        pendingDeanRequestsContainer.innerHTML = ''; // Clear previous requests
        reviewedDeanRequestsTableBody.innerHTML = ''; // Clear previous history
        hideMessage(noPendingDeanRequests);
        hideMessage(noReviewedDeanRequests);

        const currentDeanName = userName;

        // Filter pending requests for the Dean
        // These are requests where HOD approved, but dean_approved is false, and status is HOD_APPROVED
        const pendingRequests = LEAVE_REQUESTS.filter(req =>
            req.hod_approved === true &&
            req.dean_approved === false &&
            req.status === LEAVE_STATUS_HOD_APPROVED && // Status is now HOD Approved, means it's for Dean
            req.dean_assigned === currentDeanName // Ensure it's assigned to this Dean (though there's only one dean)
        );

        if (pendingRequests.length > 0) {
            pendingRequests.forEach((req, index) => {
                const originalIndex = LEAVE_REQUESTS.indexOf(req);

                const requestCard = document.createElement('div');
                requestCard.className = 'border border-gray-300 bg-white p-4 rounded-lg shadow-sm';
                requestCard.innerHTML = `
                    <p><strong>Student Name:</strong> ${req.student_name}</p>
                    <p><strong>Student ID:</strong> ${req.student_id}</p>
                    <p><strong>Branch/Batch:</strong> ${req.branch}/${req.batch}</p>
                    <p><strong>Leave Days:</strong> ${req.leave_days} (${req.start_date} to ${req.end_date})</p>
                    <p><strong>Reason:</strong> ${req.reason}</p>
                    <p><strong>Teacher:</strong> ${req.teacher} (Approved: ${req.teacher_approved ? 'Yes' : 'No'})</p>
                    <p><strong>HOD:</strong> ${req.hod_assigned} (Approved: ${req.hod_approved ? 'Yes' : 'No'})</p>
                    <p><strong>Attendance:</strong> ${req.attendance}%</p>
                    <p><strong>Parent's Email:</strong> ${req.parent_email}</p>
                    <p><strong>Parent's Contact:</strong> ${req.parent_contact}</p>
                    <div class="flex gap-4 mt-4">
                        <button id="dean-approve-${originalIndex}" class="flex-1 bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300">✅ Approve</button>
                        <button id="dean-reject-${originalIndex}" class="flex-1 bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300">❌ Reject</button>
                    </div>
                `;
                pendingDeanRequestsContainer.appendChild(requestCard);

                // Add event listeners
                document.getElementById(`dean-approve-${originalIndex}`).addEventListener('click', () => {
                    const qrData = `LEAVE_GRANTED_ID:${req.student_id}|NAME:${req.student_name}|FROM:${req.start_date}|TO:${req.end_date}|TEACHER_APP:YES|HOD_APP:YES|DEAN_APP:YES|PARENT_EMAIL:${req.parent_email}|PARENT_CONTACT:${req.parent_contact}|TS:${Date.now()}`;
                    if (simulatedUpdateLeaveRequest(originalIndex, "dean_approved", true, LEAVE_STATUS_GRANTED)) {
                        LEAVE_REQUESTS[originalIndex].qr_code_data = qrData;
                        showMessage(messageBox, `Dean approval recorded for Student ID: ${req.student_id}. Leave fully GRANTED!`, "success");
                        dean_page(); // Re-render Dean page
                        if (loggedInAs === 'student' && currentStudentId === req.student_id) {
                            displayStudentLeaveHistory(currentStudentId);
                        }
                    } else {
                        showMessage(messageBox, "Failed to record Dean approval.", "error");
                    }
                });

                document.getElementById(`dean-reject-${originalIndex}`).addEventListener('click', () => {
                    if (simulatedUpdateLeaveRequest(originalIndex, "status", LEAVE_STATUS_REJECTED)) {
                        simulatedUpdateLeaveRequest(originalIndex, "dean_approved", false);
                        simulatedUpdateLeaveRequest(originalIndex, "qr_code_data", null);
                        showMessage(messageBox, `Leave rejected for Student ID: ${req.student_id}.`, "warning");
                        dean_page(); // Re-render Dean page
                        if (loggedInAs === 'student' && currentStudentId === req.student_id) {
                            displayStudentLeaveHistory(currentStudentId);
                        }
                    } else {
                        showMessage(messageBox, "Failed to reject leave request.", "error");
                    }
                });
            });
        } else {
            noPendingDeanRequests.classList.remove('hidden');
        }

        // Filter reviewed requests for this Dean
        const reviewedRequests = LEAVE_REQUESTS.filter(req =>
            req.dean_assigned === currentDeanName &&
            (req.dean_approved === true || req.status === LEAVE_STATUS_REJECTED)
        );

        if (reviewedRequests.length > 0) {
            reviewedRequests.forEach(req => {
                const row = reviewedDeanRequestsTableBody.insertRow();
                row.className = 'border-b border-gray-200 hover:bg-gray-100';
                row.innerHTML = `
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.student_name}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.student_id}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.start_date}</td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">${req.end_date}</td>
                    <td class="py-3 px-6 text-left">${req.status}</td>
                    <td class="py-3 px-6 text-left">${req.teacher}</td>
                    <td class="py-3 px-6 text-left">${req.hod_assigned}</td>
                    <td class="py-3 px-6 text-left">${req.dean_assigned || 'N/A'}</td>
                    <td class="py-3 px-6 text-left">${req.teacher_approved ? 'Yes' : 'No'}</td>
                    <td class="py-3 px-6 text-left">${req.hod_approved ? 'Yes' : 'No'}</td>
                    <td class="py-3 px-6 text-left">${req.dean_approved ? 'Yes' : 'No'}</td>
                `;
            });
        } else {
            noReviewedDeanRequests.classList.add('hidden'); // Ensure this is hidden if there are reviewed requests
        }
    }


    // --- Event Listeners ---
    roleSelect.addEventListener('change', updateRoleTitle);
    loginButton.addEventListener('click', handleLogin);

    logoutButtonStudent.addEventListener('click', showLogoutConfirmModal);
    logoutButtonTeacher.addEventListener('click', showLogoutConfirmModal);
    logoutButtonHod.addEventListener('click', showLogoutConfirmModal);
    logoutButtonDean.addEventListener('click', showLogoutConfirmModal);

    confirmLogoutYesButton.addEventListener('click', () => {
        hideLogoutConfirmModal();
        performLogout();
    });

    confirmLogoutNoButton.addEventListener('click', () => {
        hideLogoutConfirmModal();
    });

    studentIdInput.addEventListener('input', () => {
        const sId = studentIdInput.value.trim();
        hideMessage(studentIdValidationMessage);

        if (sId.length === 11 && /^\d+$/.test(sId)) {
            studentIdDisplay.innerHTML = `Your Student ID is: <strong>${sId}</strong>`;
            studentIdDisplay.classList.remove('hidden');
            currentStudentId = sId;
            displayStudentLeaveHistory(sId);
        } else {
            studentIdDisplay.classList.add('hidden');
            if (sId.length > 0 && (sId.length !== 11 || !/^\d+$/.test(sId))) {
                showMessage(studentIdValidationMessage, "Student ID must be exactly 11 digits (numbers only).", "error");
            } else {
                hideMessage(studentIdValidationMessage);
            }
            leaveHistoryContainer.classList.add('hidden');
            gatePassSection.classList.add('hidden');
            noRequestsMessage.classList.add('hidden');
            noActivePassMessage.classList.add('hidden');
            studentIdCheckMessage.classList.remove('hidden');
            currentStudentId = null;
            hideMessage(qrDownloadWarning); // NEW: Hide warning if student ID is invalid/empty
        }
    });
    studentYearInput.addEventListener('change', validateStudentYear);
    studentAttendanceInput.addEventListener('input', updateAttendanceDisplay);
    parentEmailInput.addEventListener('input', validateParentEmail);
    parentContactInput.addEventListener('input', validateParentContact);

    authLeaveCheckbox.addEventListener('change', validateLeaveType);
    specLeaveCheckbox.addEventListener('change', validateLeaveType);
    leaveReasonTextarea.addEventListener('input', updateReasonStatus);
    studentBranchSelect.addEventListener('change', populateBatches);
    studentBatchSelect.addEventListener('change', updateBatchDisplay);
    studentBatchSelect.addEventListener('change', validateMentor);
    studentMentorSelect.addEventListener('change', validateMentor);
    startDateInput.addEventListener('change', updateDateRange);
    endDateInput.addEventListener('change', updateDateRange);
    submitLeaveRequestButton.addEventListener('click', handleSubmitLeaveRequest);

    updateRoleTitle();
    navigateTo('login-section');
});
