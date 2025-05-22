import { useState, useEffect } from "react";

// Main App Component
export default function App() {
 // State management for form data and records
 const [formData, setFormData] = useState({
 name: "",
 email: "",
 phone: "",
 // New added fields
 age: "",
 gender: "male", // Default value for gender dropdown
 date: "",
 time: "",
 officerName: "",
 // End of new fields
 description: "",
 photo: null, // For storing the uploaded photo file
 });
 const [photoPreview, setPhotoPreview] = useState(null); // For displaying photo preview
 const [submitted, setSubmitted] = useState(false);
 const [verified, setVerified] = useState(false);
 const [showPasswordModal, setShowPasswordModal] = useState(false);
 const [password, setPassword] = useState("");
 const [records, setRecords] = useState([]);
 const [viewRecord, setViewRecord] = useState(null);
 const [showViewModal, setShowViewModal] = useState(false);
 const [viewPassword, setViewPassword] = useState("");
 const [passwordError, setPasswordError] = useState(false);
 const [passwordVerified, setPasswordVerified] = useState(false);

 // CSS styles object
 const styles = {
 appContainer: {
 display: 'flex',
 flexDirection: 'column',
 minHeight: '100vh'
 },
 // Hero Section
 heroSection: {
 width: '100%',
 backgroundColor: '#1f2937',
 color: 'white',
 padding: '4rem 1rem'
 },
 container: {
 maxWidth: '64rem',
 margin: '0 auto',
 padding: '0 1rem'
 },
 heroTitle: {
 fontSize: '2.5rem',
 fontWeight: 'bold',
 marginBottom: '1rem'
 },
 heroSubtitle: {
 fontSize: '1.25rem'
 },
 // About Section
 aboutSection: {
 padding: '3rem 1rem',
 backgroundColor: '#f3f4f6'
 },
 sectionTitle: {
 fontSize: '1.875rem',
 fontWeight: 'bold',
 marginBottom: '1.5rem'
 },
 sectionText: {
 marginBottom: '1rem'
 },
 // Form Section
 formSection: {
 padding: '3rem 1rem'
 },
 formContainer: {
 display: 'flex',
 flexDirection: 'column',
 gap: '1rem'
 },
 formGroup: {
 marginBottom: '1rem'
 },
 formRow: {
 display: 'flex',
 gap: '1rem',
 marginBottom: '1rem',
 flexWrap: 'wrap'
 },
 formColumn: {
 flex: '1 1 300px'
 },
 formLabel: {
 display: 'block',
 fontSize: '0.875rem',
 fontWeight: '500',
 color: '#374151',
 marginBottom: '0.25rem'
 },
 formInput: {
 width: '100%',
 padding: '0.5rem 1rem',
 border: '1px solid #d1d5db',
 borderRadius: '0.375rem',
 fontSize: '1rem',
 outline: 'none'
 },
 formSelect: {
 width: '100%',
 padding: '0.5rem 1rem',
 border: '1px solid #d1d5db',
 borderRadius: '0.375rem',
 fontSize: '1rem',
 outline: 'none',
 backgroundColor: 'white'
 },
 formTextarea: {
 width: '100%',
 padding: '0.5rem 1rem',
 border: '1px solid #d1d5db',
 borderRadius: '0.375rem',
 fontSize: '1rem',
 outline: 'none',
 resize: 'vertical'
 },
 photoUploadContainer: {
 marginBottom: '1rem'
 },
 photoPreview: {
 width: '150px',
 height: '150px',
 border: '1px solid #d1d5db',
 borderRadius: '0.375rem',
 marginTop: '0.5rem',
 objectFit: 'cover',
 display: 'block'
 },
 photoPlaceholder: {
 width: '150px',
 height: '150px',
 border: '1px solid #d1d5db',
 borderRadius: '0.375rem',
 marginTop: '0.5rem',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 backgroundColor: '#f3f4f6',
 color: '#6b7280'
 },
 // Buttons
 btnPrimary: {
 display: 'inline-block',
 padding: '0.5rem 1rem',
 borderRadius: '0.375rem',
 fontSize: '1rem',
 fontWeight: '500',
 textAlign: 'center',
 cursor: 'pointer',
 backgroundColor: '#2563eb',
 color: 'white',
 border: 'none'
 },
 btnSecondary: {
 display: 'inline-block',
 padding: '0.5rem 1rem',
 borderRadius: '0.375rem',
 fontSize: '1rem',
 fontWeight: '500',
 textAlign: 'center',
 cursor: 'pointer',
 border: '1px solid #d1d5db',
 backgroundColor: 'white'
 },
 btnView: {
 backgroundColor: '#16a34a',
 color: 'white',
 padding: '0.25rem 1rem',
 borderRadius: '0.375rem',
 border: 'none',
 cursor: 'pointer'
 },
 btnDisabled: {
 display: 'inline-block',
 padding: '0.5rem 1rem',
 borderRadius: '0.375rem',
 fontSize: '1rem',
 fontWeight: '500',
 textAlign: 'center',
 backgroundColor: '#9ca3af',
 color: 'white',
 cursor: 'not-allowed',
 border: 'none'
 },
 // Verification Box
 verificationBox: {
 marginTop: '2rem',
 padding: '1rem',
 backgroundColor: '#eff6ff',
 border: '1px solid #dbeafe',
 borderRadius: '0.375rem'
 },
 verificationTitle: {
 fontSize: '1.25rem',
 fontWeight: '600',
 marginBottom: '1rem'
 },
 verificationDetails: {
 marginBottom: '1rem'
 },
 verificationPhotoContainer: {
 marginBottom: '1rem'
 },
 verificationCheckbox: {
 display: 'flex',
 alignItems: 'center'
 },
 checkbox: {
 marginRight: '0.5rem',
 height: '1rem',
 width: '1rem'
 },
 checkboxLabel: {
 fontSize: '0.875rem',
 fontWeight: '500',
 color: '#374151'
 },
 // Records Section
 recordsSection: {
 padding: '3rem 1rem',
 backgroundColor: '#f3f4f6'
 },
 noRecords: {
 color: '#6b7280'
 },
 recordsList: {
 display: 'flex',
 flexDirection: 'column',
 gap: '1rem'
 },
 recordItem: {
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'center',
 backgroundColor: 'white',
 padding: '1rem',
 borderRadius: '0.375rem',
 boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
 },
 recordInfo: {
 display: 'flex',
 flexDirection: 'column'
 },
 recordName: {
 fontWeight: '500'
 },
 recordEmail: {
 fontSize: '0.875rem',
 color: '#6b7280'
 },
 // Footer
 footer: {
 backgroundColor: '#1f2937',
 color: 'white',
 padding: '2rem 1rem',
 marginTop: 'auto',
 textAlign: 'center'
 },
 // Modal Styles
 modalOverlay: {
 position: 'fixed',
 top: 0,
 right: 0,
 bottom: 0,
 left: 0,
 backgroundColor: 'rgba(107, 114, 128, 0.75)',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 padding: '1rem',
 zIndex: 50
 },
 modal: {
 backgroundColor: 'white',
 borderRadius: '0.5rem',
 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
 padding: '1.5rem',
 maxWidth: '32rem',
 width: '100%',
 maxHeight: '90vh',
 overflowY: 'auto'
 },
 modalTitle: {
 fontSize: '1.25rem',
 fontWeight: 'bold',
 marginBottom: '1rem'
 },
 modalText: {
 marginBottom: '1rem'
 },
 modalActions: {
 display: 'flex',
 justifyContent: 'flex-end',
 gap: '0.75rem',
 marginTop: '1rem'
 },
 errorMessage: {
 color: '#ef4444',
 marginBottom: '1rem'
 },
 recordDetails: {
 marginBottom: '1.5rem'
 },
 recordDetailsTitle: {
 fontSize: '1.125rem',
 fontWeight: '600',
 marginBottom: '0.5rem'
 },
 recordPhotoContainer: {
 marginTop: '1rem',
 marginBottom: '1rem'
 },
 recordPhoto: {
 maxWidth: '200px',
 maxHeight: '200px',
 objectFit: 'contain',
 border: '1px solid #d1d5db',
 borderRadius: '0.375rem'
 }
 };

 // Handle form input changes
 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData({ ...formData, [name]: value });
 };

 // Handle photo upload
 const handlePhotoUpload = (e) => {
 const file = e.target.files[0];
 if (file) {
 setFormData({ ...formData, photo: file });
 
 // Create URL for preview
 const reader = new FileReader();
 reader.onloadend = () => {
 setPhotoPreview(reader.result);
 };
 reader.readAsDataURL(file);
 }
 };

 // Handle form submission
 const handleSubmit = (e) => {
 if (e) e.preventDefault();
 setSubmitted(true);
 // Reset verification status when a new form is submitted
 setVerified(false);
 };

 // Handle verification checkbox
 const handleVerify = (e) => {
 setVerified(e.target.checked);
 if (e.target.checked) {
 setShowPasswordModal(true);
 }
 };

 // Handle password creation
 const handlePasswordSave = () => {
 // Create a new record with form data and password
 const newRecord = {
 ...formData,
 id: Date.now().toString(),
 password,
 photoUrl: photoPreview, // Store the photo URL for display
 };

 // Add the record to the list
 setRecords([...records, newRecord]);

 // Reset form and states
 setFormData({
 name: "",
 email: "",
 phone: "",
 age: "",
 gender: "male",
 date: "",
 time: "",
 officerName: "",
 description: "",
 photo: null,
 });
 setPhotoPreview(null);
 setSubmitted(false);
 setVerified(false);
 setShowPasswordModal(false);
 setPassword("");
 };

 // Handle viewing a record
 const handleViewRecord = (record) => {
 setViewRecord(record);
 setShowViewModal(true);
 setViewPassword("");
 setPasswordError(false);
 setPasswordVerified(false);
 };

 // Verify password for viewing a record
 const validatePassword = () => {
 if (viewRecord && viewRecord.password === viewPassword) {
 // Password is correct, show the details
 setPasswordError(false);
 setPasswordVerified(true);
 } else {
 // Password is incorrect
 setPasswordError(true);
 setPasswordVerified(false);
 }
 };

 // Get current date in YYYY-MM-DD format for the date input default
 const getCurrentDate = () => {
 const today = new Date();
 const year = today.getFullYear();
 const month = String(today.getMonth() + 1).padStart(2, '0');
 const day = String(today.getDate()).padStart(2, '0');
 return `${year}-${month}-${day}`;
 };

 // Get current time in HH:MM format for the time input default
 const getCurrentTime = () => {
 const now = new Date();
 const hours = String(now.getHours()).padStart(2, '0');
 const minutes = String(now.getMinutes()).padStart(2, '0');
 return `${hours}:${minutes}`;
 };

 // Set default date and time when component mounts
 useEffect(() => {
 setFormData(prev => ({
 ...prev,
 date: getCurrentDate(),
 time: getCurrentTime()
 }));
 }, []);

 return (
 <div style={styles.appContainer}>
 {/* Hero Section */}
 <div style={styles.heroSection}>
 <div style={styles.container}>
 <h1 style={styles.heroTitle}>Record Management App</h1>
 <p style={styles.heroSubtitle}>
 A secure application to manage personal records with complete details and photo.
 </p>
 </div>
 </div>

 {/* About Section */}
 <section style={styles.aboutSection}>
 <div style={styles.container}>
 <h2 style={styles.sectionTitle}>About This App</h2>
 <p style={styles.sectionText}>
 This application allows you to create and manage detailed personal records with 
 secure password protection. Each record captures comprehensive information including 
 personal details, photo identification, and verification by an officer.
 </p>
 <p style={styles.sectionText}>
 To get started, simply fill out the form below with all required details and 
 submit. You'll be asked to verify your information and set a password 
 to protect your record.
 </p>
 <p style={styles.sectionText}>
 Later, you can view your records by clicking the "View" button and 
 entering the correct password. This ensures that your information 
 remains private and secure.
 </p>
 </div>
 </section>

 {/* Form Section */}
 <section style={styles.formSection}>
 <div style={styles.container}>
 <h2 style={styles.sectionTitle}>Create New Record</h2>
 <div style={styles.formContainer}>
 {/* Personal Details */}
 <div style={styles.formRow}>
 <div style={styles.formColumn}>
 <div style={styles.formGroup}>
 <label htmlFor="name" style={styles.formLabel}>
 Full Name
 </label>
 <input
 type="text"
 id="name"
 name="name"
 value={formData.name}
 onChange={handleChange}
 style={styles.formInput}
 />
 </div>
 </div>
 
 <div style={styles.formColumn}>
 <div style={styles.formGroup}>
 <label htmlFor="age" style={styles.formLabel}>
 Age
 </label>
 <input
 type="number"
 id="age"
 name="age"
 min="1"
 max="120"
 value={formData.age}
 onChange={handleChange}
 style={styles.formInput}
 />
 </div>
 </div>
 </div>

 <div style={styles.formRow}>
 <div style={styles.formColumn}>
 <div style={styles.formGroup}>
 <label htmlFor="gender" style={styles.formLabel}>
 Gender
 </label>
 <select
 id="gender"
 name="gender"
 value={formData.gender}
 onChange={handleChange}
 style={styles.formSelect}
 >
 <option value="male">Male</option>
 <option value="female">Female</option>
 <option value="other">Other</option>
 </select>
 </div>
 </div>
 
 <div style={styles.formColumn}>
 <div style={styles.formGroup}>
 <label htmlFor="phone" style={styles.formLabel}>
 Phone Number
 </label>
 <input
 type="tel"
 id="phone"
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 style={styles.formInput}
 />
 </div>
 </div>
 </div>

 <div style={styles.formRow}>
 <div style={styles.formColumn}>
 <div style={styles.formGroup}>
 <label htmlFor="email" style={styles.formLabel}>
 Email
 </label>
 <input
 type="email"
 id="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 style={styles.formInput}
 />
 </div>
 </div>
 </div>

 {/* Date and Time Section */}
 <div style={styles.formRow}>
 <div style={styles.formColumn}>
 <div style={styles.formGroup}>
 <label htmlFor="date" style={styles.formLabel}>
 Date
 </label>
 <input
 type="date"
 id="date"
 name="date"
 value={formData.date}
 onChange={handleChange}
 style={styles.formInput}
 />
 </div>
 </div>
 
 <div style={styles.formColumn}>
 <div style={styles.formGroup}>
 <label htmlFor="time" style={styles.formLabel}>
 Time
 </label>
 <input
 type="time"
 id="time"
 name="time"
 value={formData.time}
 onChange={handleChange}
 style={styles.formInput}
 />
 </div>
 </div>
 </div>

 {/* Officer Information */}
 <div style={styles.formRow}>
 <div style={styles.formColumn}>
 <div style={styles.formGroup}>
 <label htmlFor="officerName" style={styles.formLabel}>
 Officer Name
 </label>
 <input
 type="text"
 id="officerName"
 name="officerName"
 value={formData.officerName}
 onChange={handleChange}
 style={styles.formInput}
 />
 </div>
 </div>
 </div>

 {/* Photo Upload */}
 <div style={styles.photoUploadContainer}>
 <label htmlFor="photo" style={styles.formLabel}>
 Upload Photo
 </label>
 <input
 type="file"
 id="photo"
 name="photo"
 accept="image/*"
 onChange={handlePhotoUpload}
 style={styles.formInput}
 />
 
 {photoPreview ? (
 <img 
 src={photoPreview} 
 alt="Preview" 
 style={styles.photoPreview} 
 />
 ) : (
 <div style={styles.photoPlaceholder}>
 No photo selected
 </div>
 )}
 </div>

 {/* Description */}
 <div style={styles.formGroup}>
 <label htmlFor="description" style={styles.formLabel}>
 Description
 </label>
 <textarea
 id="description"
 name="description"
 value={formData.description}
 onChange={handleChange}
 rows="4"
 style={styles.formTextarea}
 ></textarea>
 </div>

 <button
 onClick={handleSubmit}
 style={styles.btnPrimary}
 >
 Submit
 </button>
 </div>

 {/* Verification Section */}
 {submitted && (
 <div style={styles.verificationBox}>
 <h3 style={styles.verificationTitle}>Verify Your Details</h3>
 
 <div style={styles.verificationDetails}>
 <p><strong>Name:</strong> {formData.name}</p>
 <p><strong>Age:</strong> {formData.age}</p>
 <p><strong>Gender:</strong> {formData.gender}</p>
 <p><strong>Email:</strong> {formData.email}</p>
 <p><strong>Phone:</strong> {formData.phone}</p>
 <p><strong>Date:</strong> {formData.date}</p>
 <p><strong>Time:</strong> {formData.time}</p>
 <p><strong>Officer Name:</strong> {formData.officerName}</p>
 <p><strong>Description:</strong> {formData.description}</p>
 </div>
 
 {photoPreview && (
 <div style={styles.verificationPhotoContainer}>
 <p><strong>Photo:</strong></p>
 <img src={photoPreview} alt="Photo" style={styles.photoPreview} />
 </div>
 )}
 
 <div style={styles.verificationCheckbox}>
 <input
 type="checkbox"
 id="verify"
 checked={verified}
 onChange={handleVerify}
 style={styles.checkbox}
 />
 <label htmlFor="verify" style={styles.checkboxLabel}>
 I verify that the details are correct
 </label>
 </div>
 </div>
 )}
 </div>
 </section>

 {/* Records List Section */}
 <section style={styles.recordsSection}>
 <div style={styles.container}>
 <h2 style={styles.sectionTitle}>Your Records</h2>
 
 {records.length === 0 ? (
 <p style={styles.noRecords}>No records yet. Create one by filling out the form above.</p>
 ) : (
 <div style={styles.recordsList}>
 {records.map((record) => (
 <div 
 key={record.id} 
 style={styles.recordItem}
 >
 <div style={styles.recordInfo}>
 <h3 style={styles.recordName}>{record.name}</h3>
 <p style={styles.recordEmail}>{record.email} | {record.phone}</p>
 </div>
 <button
 onClick={() => handleViewRecord(record)}
 style={styles.btnView}
 >
 View
 </button>
 </div>
 ))}
 </div>
 )}
 </div>
 </section>

 {/* Footer */}
 <footer style={styles.footer}>
 <div style={styles.container}>
 <p>© 2025 Record Management App. All rights reserved.</p>
 </div>
 </footer>

 {/* Password Creation Modal */}
 {showPasswordModal && (
 <div style={styles.modalOverlay}>
 <div style={styles.modal}>
 <h3 style={styles.modalTitle}>Set Password</h3>
 <p style={styles.modalText}>Please create a password to protect this record. You'll need this password to view the record later.</p>
 
 <div style={styles.formGroup}>
 <label htmlFor="password" style={styles.formLabel}>
 Password
 </label>
 <input
 type="password"
 id="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 style={styles.formInput}
 />
 </div>
 
 <div style={styles.modalActions}>
 <button
 onClick={() => {
 setShowPasswordModal(false);
 setVerified(false);
 }}
 style={styles.btnSecondary}
 >
 Cancel
 </button>
 <button
 onClick={handlePasswordSave}
 disabled={!password}
 style={password ? styles.btnPrimary : styles.btnDisabled}
 >
 Save Record
 </button>
 </div>
 </div>
 </div>
 )}

 {/* View Record Modal */}
 {showViewModal && (
 <div style={styles.modalOverlay}>
 <div style={styles.modal}>
 <h3 style={styles.modalTitle}>View Record</h3>
 
 {!passwordVerified ? (
 <div>
 <p style={styles.modalText}>Enter the password to view this record.</p>
 <div style={styles.formGroup}>
 <label htmlFor="viewPassword" style={styles.formLabel}>
 Password
 </label>
 <input
 type="password"
 id="viewPassword"
 value={viewPassword}
 onChange={(e) => setViewPassword(e.target.value)}
 style={styles.formInput}
 />
 </div>
 
 {passwordError && (
 <p style={styles.errorMessage}>Incorrect password. Please try again.</p>
 )}
 
 <div style={styles.modalActions}>
 <button
 onClick={() => {
 setShowViewModal(false);
 setViewRecord(null);
 setViewPassword("");
 setPasswordVerified(false);
 }}
 style={styles.btnSecondary}
 >
 Cancel
 </button>
 <button
 onClick={validatePassword}
 disabled={!viewPassword}
 style={viewPassword ? styles.btnPrimary : styles.btnDisabled}
 >
 Verify
 </button>
 </div>
 </div>
 ) : (
 <div>
 <div style={styles.recordDetails}>
 <h4 style={styles.recordDetailsTitle}>Record Details</h4>
 <p><strong>Name:</strong> {viewRecord.name}</p>
 <p><strong>Age:</strong> {viewRecord.age}</p>
 <p><strong>Gender:</strong> {viewRecord.gender}</p>
 <p><strong>Email:</strong> {viewRecord.email}</p>
 <p><strong>Phone:</strong> {viewRecord.phone}</p>
 <p><strong>Date:</strong> {viewRecord.date}</p>
 <p><strong>Time:</strong> {viewRecord.time}</p>
 <p><strong>Officer Name:</strong> {viewRecord.officerName}</p>
 <p><strong>Description:</strong> {viewRecord.description}</p>
 
 {viewRecord.photoUrl && (
 <div style={styles.recordPhotoContainer}>
 <p><strong>Photo:</strong></p>
 <img src={viewRecord.photoUrl} alt="Record Photo" style={styles.recordPhoto} />
 </div>
 )}
 </div>
 
 <div style={styles.modalActions}>
 <button
 onClick={() => {
 setShowViewModal(false);
 setViewRecord(null);
 setViewPassword("");
 setPasswordVerified(false);
 }}
 style={styles.btnPrimary}
 >
 Close
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 )}
 </div>
 );
}