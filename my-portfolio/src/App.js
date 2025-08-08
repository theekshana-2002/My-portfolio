import React from 'react';
import './App.css';
import profilePic from './assests/propic.jpg';
import resume from './assests/Myresume.pdf';

export default function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero container">
        <img src={profilePic} alt="Profile" className="hero__img" />
        <div className="hero__content">
          <h1 className="title">Chamodh Theekshana Rathnayake</h1>
          <p className="subtitle">Software Engineering Undergraduate</p>
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
            I am Chamodh Theekshana Rathnayake, an enthusiastic and dedicated undergraduate
            currently pursuing a four-year Software Engineering degree at SLIIT. I completed my
            schooling at Sri Rahula College, Katugastota, and previously worked as a trainee at Bank
            of Ceylon (BOC), gaining valuable professional experience. I am equipped with the
            technical skills to work with a range of modern technologies, including Artificial
            Intelligence applications. I am adaptable to various environments and capable of
            working independently or collaboratively to achieve goals effectively.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section section--alt">
        <div className="container">
          <h2 className="section__title">Skills</h2>
          <div className="skills__grid">
            <div className="card">
              <h3>Languages</h3>
              <p>C, C++, Python, Java, JavaScript, PHP, HTML, CSS, Kotlin</p>
            </div>
            <div className="card">
              <h3>Frameworks</h3>
              <p>Node, React, Express</p>
            </div>
            <div className="card">
              <h3>Databases</h3>
              <p>MongoDB, SQL, SQLite</p>
            </div>
            <div className="card">
              <h3>Tools & Technologies</h3>
              <p>VSCode, Android Studio, Figma, DrawIO, Eclipse</p>
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
            desc: 'Full-featured web app for managing a driving school. MERN stack with dashboards, progress tracking, payments, and more.'
          }, {
            title: 'Online Pharmacy System',
            desc: 'Web platform for pharmacy operations with Java, HTML, CSS, MySQL. Secure payments and feedback.'
          }, {
            title: 'Personal Finance Tracker App',
            desc: 'Android app in Kotlin with SQLite for expense tracking, backups, and budget alerts.'
          }, {
            title: 'Online Coding Learning Platform',
            desc: 'WordPress-based e-learning site in progress with monetization features.'
          }].map((project, index) => (
            <article key={index} className="project-card card">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section section--alt">
        <div className="container">
          <h2 className="section__title">Contact</h2>
          <div className="card contact">
            <p>Email: <a href="mailto:chamodhrathnayake0@gmail.com">chamodhrathnayake0@gmail.com</a></p>
            <p>Phone: <span>0776995285</span></p>
            <p>Location: <span>Katugasthota, Sri Lanka</span></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Chamodh Theekshana Rathnayake. All rights reserved.
      </footer>
    </div>
  );
}
