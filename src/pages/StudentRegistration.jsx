import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import FormField from '../components/common/FormField';
import { useAuth } from '../context/AuthContext';

export function StudentRegistration() {
  const navigate = useNavigate();
  const { loginProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    academicYear: '',
    instituteName: '',
    mobileNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const yearOptions = [
    { value: '1st Year (Freshman)', label: '1st Year' },
    { value: '2nd Year (Sophomore)', label: '2nd Year' },
    { value: '3rd Year (Junior)', label: '3rd Year' },
    { value: '4th Year (Senior)', label: '4th Year' }
  ];

  const validateField = (name, value) => {
    let error = '';
    const trimmedVal = typeof value === 'string' ? value.trim() : '';

    switch (name) {
      case 'fullName':
        if (!trimmedVal) {
          error = 'Full name is required.';
        } else if (trimmedVal.length < 2) {
          error = 'Full name must be at least 2 characters.';
        }
        break;

      case 'rollNumber':
        if (!trimmedVal) {
          error = 'Roll number is required.';
        } else if (!/^S-.+$/i.test(trimmedVal)) {
          error = 'Roll number must begin with "S-" followed by an identifier (e.g. S-101 or S-2024-CSE).';
        }
        break;

      case 'academicYear':
        if (!trimmedVal) {
          error = 'Please select your academic year.';
        }
        break;

      case 'instituteName':
        if (!trimmedVal) {
          error = 'Institute name is required.';
        } else if (trimmedVal.length < 3) {
          error = 'Institute name must be at least 3 characters.';
        }
        break;

      case 'mobileNumber':
        if (!trimmedVal) {
          error = 'Mobile number is required.';
        } else if (!/^[0-9]{10}$/.test(trimmedVal.replace(/\D/g, ''))) {
          error = 'Please enter a valid 10-digit mobile number.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleFillDemo = () => {
    setFormData({
      fullName: 'Smark Singh',
      rollNumber: 'S-2024-CS101',
      academicYear: '3rd Year (Junior)',
      instituteName: 'National Institute of Technology',
      mobileNumber: '9876543210'
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setTouched({
      fullName: true,
      rollNumber: true,
      academicYear: true,
      instituteName: true,
      mobileNumber: true
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const rollNumberClean = formData.rollNumber.trim().toUpperCase();

    // Save profile into React state (in-memory for this session only)
    loginProfile({
      role: 'student',
      fullName: formData.fullName.trim(),
      rollNumber: rollNumberClean,
      academicYear: formData.academicYear,
      instituteName: formData.instituteName.trim(),
      mobileNumber: formData.mobileNumber.trim()
    });

    navigate('/student');
  };

  return (
    <div className="registration-wrapper">
      <div className="registration-container">
        <div className="registration-header-nav">
          <Link to="/" className="btn-back-link">
            <ArrowLeft size={16} />
            <span>Back to Role Selection</span>
          </Link>
          <button
            type="button"
            className="btn-text-demo"
            onClick={handleFillDemo}
          >
            Auto-fill Sample Data
          </button>
        </div>

        <div className="registration-card">
          <div className="card-top-header">
            <div className="role-avatar-badge student-avatar">
              <BookOpen size={22} />
            </div>
            <div>
              <h2 className="registration-title">Student Registration</h2>
              <p className="registration-subtitle">
                Enter your college details to enter the student dashboard.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="registration-form">
            <FormField
              id="fullName"
              name="fullName"
              label="Full Name"
              placeholder="e.g. Smark Singh"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullName}
              required
            />

            <FormField
              id="rollNumber"
              name="rollNumber"
              label="Student Roll Number (Must start with S-)"
              placeholder="e.g. S-2024-CS101"
              value={formData.rollNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.rollNumber}
              required
              helpText="Must begin with 'S-' followed by your roll number (e.g. S-101)."
            />

            <div className="form-grid-2col">
              <FormField
                id="academicYear"
                name="academicYear"
                label="Academic Year"
                type="select"
                placeholder="-- Select Year --"
                options={yearOptions}
                value={formData.academicYear}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.academicYear}
                required
              />

              <FormField
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.mobileNumber}
                required
              />
            </div>

            <FormField
              id="instituteName"
              name="instituteName"
              label="College / Institute Name"
              placeholder="e.g. National Institute of Technology"
              value={formData.instituteName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.instituteName}
              required
            />

            <div className="form-submit-row">
              <button type="submit" className="btn btn-primary full-width">
                <span>Enter Student Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;
