import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, ArrowLeft, ArrowRight } from 'lucide-react';
import FormField from '../components/common/FormField';
import { useAuth } from '../context/AuthContext';

export function TeacherRegistration() {
  const navigate = useNavigate();
  const { loginProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    teacherId: '',
    instituteName: '',
    mobileNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

      case 'teacherId':
        if (!trimmedVal) {
          error = 'Teacher ID is required.';
        } else if (!/^T-.+$/i.test(trimmedVal)) {
          error = 'Teacher ID must begin with "T-" followed by an identifier (e.g. T-8842 or T-FAC-01).';
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
      fullName: 'Prof. S. Sharma',
      teacherId: 'T-8842',
      instituteName: 'National Institute of Technology',
      mobileNumber: '9123456780'
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
      teacherId: true,
      instituteName: true,
      mobileNumber: true
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const teacherIdClean = formData.teacherId.trim().toUpperCase();

    // Save profile into React state (in-memory for this session only)
    loginProfile({
      role: 'teacher',
      fullName: formData.fullName.trim(),
      teacherId: teacherIdClean,
      instituteName: formData.instituteName.trim(),
      mobileNumber: formData.mobileNumber.trim()
    });

    navigate('/teacher');
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
            <div className="role-avatar-badge teacher-avatar">
              <Users size={22} />
            </div>
            <div>
              <h2 className="registration-title">Faculty Registration</h2>
              <p className="registration-subtitle">
                Enter your instructor details to access the teacher dashboard.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="registration-form">
            <FormField
              id="fullName"
              name="fullName"
              label="Full Name (with Title)"
              placeholder="e.g. Prof. S. Sharma"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullName}
              required
            />

            <FormField
              id="teacherId"
              name="teacherId"
              label="Teacher ID (Must start with T-)"
              placeholder="e.g. T-8842"
              value={formData.teacherId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.teacherId}
              required
              helpText="Must begin with 'T-' followed by your faculty ID (e.g. T-8842)."
            />

            <div className="form-grid-2col">
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

              <FormField
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                type="tel"
                placeholder="e.g. 9123456780"
                value={formData.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.mobileNumber}
                required
              />
            </div>

            <div className="form-submit-row">
              <button type="submit" className="btn btn-secondary full-width">
                <span>Enter Faculty Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegistration;
