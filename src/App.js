import React, { useState, useEffect } from 'react';
import './App.css';
import profilePic from './assests/propic.jpg';
import resume from './assests/Myresume.pdf';
import FallingStarsBackground from './components/FallingStarsBackground';

// Custom Icon Components
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    // Contact Icons (keeping emojis for contact section)
    'email': '📧',
    'phone': '📞',
    'location': '📍',
    'send': '📤'
  };
  
  return (
    <span style={{ fontSize: size, color }} title={name}>
      {icons[name] || '❓'}
    </span>
  );
};

// Skill Icon Component for image-based icons
const SkillIcon = ({ name, alt, size = 32 }) => {
  try {
    // Try to import the icon image
    const iconSrc = require(`./assets/icons/${name}.png`);
    return (
      <img 
        src={iconSrc} 
        alt={alt || name} 
        className="skill-icon-img"
        style={{ width: size, height: size }}
        onError={(e) => {
          // Fallback to text if image doesn't exist
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'inline';
        }}
      />
    );
  } catch (error) {
    // Fallback to text if image doesn't exist
    return (
      <span className="skill-icon-fallback" style={{ fontSize: size * 0.6 }}>
        {name.toUpperCase()}
      </span>
    );
  }
};

// Typing Animation Component
const TypingAnimation = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};


// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:chamodhrathnayake0@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Tell me about your project or just say hello!"
        />
      </div>
      
      <button 
        type="submit" 
        className="btn btn--primary form-submit"
        disabled={isSubmitting}
      >
        <Icon name="send" size={16} />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      
      {submitStatus === 'success' && (
        <div className="form-status success">
          ✅ Message sent! Your email client should open now.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="form-status error">
          ❌ Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Scroll progress indicator
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    // Intersection Observer for section animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add smooth scroll event listeners
    document.addEventListener('click', handleSmoothScroll);

    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', updateScrollProgress);
      document.removeEventListener('click', handleSmoothScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app">
      {/* Falling Stars Background (canvas, fixed behind content) */}
      <FallingStarsBackground />
      
      {/* Loading Screen */}
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator">
        <div 
          className="scroll-progress" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav__content">
            <a href="#hero" className="nav__logo">CTR</a>
            <div className="nav__links">
              <a href="#about" className="nav__link">About</a>
              <a href="#skills" className="nav__link">Skills</a>
              <a href="#projects" className="nav__link">Projects</a>
              <a href="#contact" className="nav__link">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero container">
        <img src={profilePic} alt="Profile" className="hero__img" />
        <div className="hero__content">
          <h1 className="title title--animated">
            <span className="title-float title-gradient">
              <TypingAnimation text="Chamodh Theekshana Rathnayake" speed={80} />
            </span>
          </h1>
          <p className="subtitle">
            <TypingAnimation text="Software Engineering Undergraduate" speed={60} />
          </p>
          <div className="actions">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href={resume} download className="btn btn--secondary">Download CV</a>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="section container">
        <h2 className="section__title">About Me</h2>
        <div className="card">
          <p>
            I'm Chamodh Theekshana Rathnayake, an enthusiastic Software Engineering undergraduate at
            SLIIT, passionate about building modern, user-friendly, and impactful software solutions.
            With hands-on experience in web and mobile app development, I've worked on projects
            ranging from management systems to mobile apps, using technologies like Java, Kotlin,
            React, Node.js, MongoDB, and SQL.
          </p>
          <p>
            I also bring professional exposure from my time as a Trainee at Bank of Ceylon (BOC),
            where I developed communication, teamwork, and time management skills in a fast-paced
            environment. I enjoy solving problems, adapting to new challenges, and continuously
            learning to stay ahead in the ever-evolving tech industry.
          </p>
          <p>
            Beyond coding, I value creativity, adaptability, and problem-solving, which help me
            approach projects with a balance of technical expertise and innovative thinking. My goal
            is to grow into a versatile software engineer who creates solutions that make a real
            difference.
          </p>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section container">
        <h2 className="section__title">Education</h2>
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h3>Sri Rahula College, Katugastota</h3>
          <p>2008 – 2021</p>
          <p>
            Advanced Level (Commerce Stream) – Econ (B), Business (B), Accounts (C)
          </p>
        </div>
        <div className="card">
          <h3>Sri Lanka Institute of Information Technology (SLIIT)</h3>
          <p>2023 – Present</p>
          <p>BSc (Hons) in Software Engineering</p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section section--alt">
        <div className="container">
          <h2 className="section__title">Skills</h2>
          <div className="skills-container">
            {/* Programming Languages */}
            <div className="skill-category">
              <div className="skill-category-header">
                <h3>Programming Languages</h3>
                <p>Core languages I work with</p>
              </div>
              <div className="skill-grid">
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="javascript" alt="JavaScript" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">JavaScript</span>
                    <span className="skill-level">Advanced</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="python" alt="Python" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Python</span>
                    <span className="skill-level">Advanced</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="java" alt="Java" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Java</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="cpp" alt="C++" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">C++</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="c" alt="C" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">C</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="php" alt="PHP" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">PHP</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="html" alt="HTML" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">HTML</span>
                    <span className="skill-level">Expert</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="css" alt="CSS" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">CSS</span>
                    <span className="skill-level">Expert</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="kotlin" alt="Kotlin" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Kotlin</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="skill-category">
              <div className="skill-category-header">
                <h3>Frameworks & Libraries</h3>
                <p>Modern development frameworks</p>
              </div>
              <div className="skill-grid">
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="react" alt="React" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">React</span>
                    <span className="skill-level">Advanced</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="nodejs" alt="Node.js" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Node.js</span>
                    <span className="skill-level">Advanced</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="express" alt="Express" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Express</span>
                    <span className="skill-level">Advanced</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Databases */}
            <div className="skill-category">
              <div className="skill-category-header">
                <h3>Databases</h3>
                <p>Data storage and management</p>
              </div>
              <div className="skill-grid">
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="mongodb" alt="MongoDB" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">MongoDB</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="mysql" alt="MySQL" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">MySQL</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="sqlite" alt="SQLite" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">SQLite</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="skill-category">
              <div className="skill-category-header">
                <h3>Tools & Technologies</h3>
                <p>Development and design tools</p>
              </div>
              <div className="skill-grid">
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="vscode" alt="VSCode" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">VSCode</span>
                    <span className="skill-level">Expert</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="android" alt="Android Studio" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Android Studio</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="figma" alt="Figma" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Figma</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="drawio" alt="DrawIO" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">DrawIO</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="eclipse" alt="Eclipse" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Eclipse</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="slack" alt="Slack" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Slack</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="jira" alt="Jira" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">Jira</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon-wrapper">
                    <SkillIcon name="clickup" alt="ClickUp" size={48} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">ClickUp</span>
                    <span className="skill-level">Intermediate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section container">
        <h2 className="section__title">Projects</h2>
        <div className="projects__grid">
          {[{
            title: 'Driving School Management System',
            desc: 'Full-featured web app for managing a driving school. MERN stack with dashboards, progress tracking, payments, and more.',
            tech: ['React', 'Node.js', 'MongoDB', 'Express'],
            status: 'Completed'
          }, {
            title: 'Online Pharmacy System',
            desc: 'Web platform for pharmacy operations with Java, HTML, CSS, MySQL. Secure payments and feedback.',
            tech: ['Java', 'HTML', 'CSS', 'MySQL'],
            status: 'Completed'
          }, {
            title: 'Personal Finance Tracker App',
            desc: 'Android app in Kotlin with SQLite for expense tracking, backups, and budget alerts.',
            tech: ['Kotlin', 'SQLite', 'Android Studio'],
            status: 'Completed'
          }, {
            title: 'Online Coding Learning Platform',
            desc: 'WordPress-based e-learning site in progress with monetization features.',
            tech: ['WordPress', 'PHP', 'MySQL'],
            status: 'In Progress'
          }, {
            title: 'Apartment Booking System',
            desc: 'MERN stack web application to search, book, and manage apartment reservations with auth, admin dashboard, and payments.',
            tech: ['React', 'Node.js', 'Express', 'MongoDB'],
            status: 'Completed'
          }].map((project, index) => (
            <article key={index} className="project-card card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              <p>{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section section--alt">
        <div className="container">
          <h2 className="section__title">Contact</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="card contact">
                <h3>Get in Touch</h3>
                <div className="contact-item">
                  <Icon name="email" size={20} />
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:chamodhrathnayake0@gmail.com">chamodhrathnayake0@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <Icon name="phone" size={20} />
                  <div>
                    <strong>Phone</strong>
                    <span>0776995285</span>
                  </div>
                </div>
                <div className="contact-item">
                  <Icon name="location" size={20} />
                  <div>
                    <strong>Location</strong>
                    <span>Katugasthota, Sri Lanka</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <div className="card">
                <h3>Send me a message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Chamodh Theekshana Rathnayake. All rights reserved.
        <div className="socials">
          <a className="social-link" href="https://www.facebook.com/share/1FfCzR5kda/" target="_blank" rel="noreferrer noopener" aria-label="Facebook">
            <img className="social-icon" src={`${process.env.PUBLIC_URL}/icons/facebook.png`} alt="Facebook" />
          </a>
          <a className="social-link" href="https://www.instagram.com/theeks_zone?igsh=MWVib3kya2M5OGN3dw==" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
            <img className="social-icon" src={`${process.env.PUBLIC_URL}/icons/instagram.png`} alt="Instagram" />
          </a>
          <a className="social-link" href="https://www.linkedin.com/in/chamodh-rathnayake-28210a371?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
            <img className="social-icon" src={`${process.env.PUBLIC_URL}/icons/linkedin.png`} alt="LinkedIn" />
          </a>
          <a className="social-link" href="https://github.com/theekshana-2002" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
            <img className="social-icon" src={`${process.env.PUBLIC_URL}/icons/github.png`} alt="GitHub" />
          </a>
        </div>
      </footer>
    </div>
  );
}
