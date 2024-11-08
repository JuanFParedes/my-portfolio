'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Mail, Phone, Linkedin, Github, Moon, Sun, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import './styles.css'

interface Project {
  title: string;
  image: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface Skill {
  name: string;
  level: number;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const JuanParedesPortfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState<number>(0)
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  useEffect(() => {
    const handleScroll = (): void => {
      const sections: string[] = ['home', 'about', 'skills', 'services', 'projects', 'testimonials', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  const scrollTo = (id: string): void => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const projects: Project[] = [
    { title: 'Task Management App', image: '/placeholder.svg?height=400&width=600', description: 'A React-based task management application with a Node.js backend.' },
    { title: 'Weather Forecast Widget', image: '/placeholder.svg?height=400&width=600', description: 'A responsive weather widget using a third-party API to display forecasts.' },
    { title: 'Personal Blog', image: '/placeholder.svg?height=400&width=600', description: 'A blog built with Next.js and Markdown for easy content management.' },
  ]

  const testimonials: Testimonial[] = [
    { name: 'Maria Rodriguez', role: 'Project Manager', content: 'Juan is a dedicated developer who consistently delivers high-quality work. His attention to detail is impressive.' },
    { name: 'Alex Chen', role: 'Senior Developer', content: 'Working with Juan has been great. He\'s eager to learn and always brings fresh ideas to the team.' },
    { name: 'Sarah Thompson', role: 'UX Designer', content: 'Juan has a good eye for design implementation. He translates our mockups into pixel-perfect interfaces.' },
  ]

  const skills: Skill[] = [
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'Git', level: 75 },
  ]

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'
    if (!formData.message.trim()) errors.message = 'Message is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (validateForm()) {
      // Here you would typically send the form data to a server
      alert('Thank you for your message! I will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
      setFormErrors({})
    }
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <nav>
        <div className="container">
          <ul>
            {['Home', 'About', 'Skills', 'Services', 'Projects', 'Testimonials', 'Contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={activeSection === item.toLowerCase() ? 'active' : ''}
                >
                  {item}
                </button>
              </li>
            ))}
            <li className="dark-mode-toggle">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun /> : <Moon />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="container">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Juan Paredes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Junior Software Developer
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#contact" className="btn">Get in Touch</a>
            </motion.div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <h2>About Me</h2>
            <div className="about-content">
              <img src="/placeholder.svg?height=300&width=300" alt="Juan Paredes" className="about-image" />
              <div>
                <p>
                  I'm Juan Paredes, a passionate Junior Software Developer with a strong foundation in web technologies. I'm dedicated to creating efficient, user-friendly applications and constantly expanding my skills in the ever-evolving world of software development.
                </p>
                <h3 >Professional Goals</h3>
                <ul>
                  <li>Gain expertise in full-stack development</li>
                  <li>Contribute to open-source projects</li>
                  <li>Develop scalable and maintainable software solutions</li>
                </ul>
                <h3>Mission & Values</h3>
                <p>
                  My mission is to leverage technology to solve real-world problems and improve user experiences. I value continuous learning, collaboration, and writing clean, efficient code.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="container">
            <h2>Skills</h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services">
          <div className="container">
            <h2>Services</h2>
            <div className="services-grid">
              {[
                { title: 'Web Development', description: 'Creating responsive and interactive websites' },
                { title: 'Front-end Development', description: 'Building user interfaces with modern frameworks' },
                { title: 'Back-end Development', description: 'Developing server-side logic and APIs' },
                { title: 'Mobile-friendly Design', description: 'Ensuring great user experience on all devices' },
                { title: 'Performance Optimization', description: 'Improving website speed and efficiency' },
                { title: 'Code Review', description: 'Providing feedback to improve code quality' },
              ].map((service, index) => (
                <div key={index} className="service-item">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <h2>Projects</h2>
            <div className="projects-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProjectIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ textAlign: 'center' }}
                >
                  <img src={projects[currentProjectIndex].image} alt={projects[currentProjectIndex].title} className="project-image" />
                  <h3>{projects[currentProjectIndex].title}</h3>
                  <p>{projects[currentProjectIndex].description}</p>
                  <a href="#" className="btn">View Project</a>
                </motion.div>
              </AnimatePresence>
              <button
                className="project-nav prev"
                onClick={() => setCurrentProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
              >
                <ChevronLeft />
              </button>
              <button
                className="project-nav next"
                onClick={() => setCurrentProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </section>

        <section id="testimonials">
          <div className="container">
            <h2>Testimonials</h2>
            <div className="testimonial">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>"{testimonials[currentTestimonialIndex].content}"</p>
                  <p><strong>{testimonials[currentTestimonialIndex].name}</strong></p>
                  <p>{testimonials[currentTestimonialIndex].role}</p>
                </motion.div>
              </AnimatePresence>
              <div className="testimonial-nav">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={currentTestimonialIndex === index ? 'active' : ''}
                  >
                    <Star />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <h2>Contact Me</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <p className="error-message">{formErrors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <p className="error-message">{formErrors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  className={formErrors.message ? 'error' : ''}
                ></textarea>
                {formErrors.message && <p className="error-message">{formErrors.message}</p>}
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
            <div className="contact-info">
              <div className="contact-item">
                <Mail />
                <span>juanfelipeparedes24@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone />
                <span>+57 3213426106</span>
              </div>
              <div className="contact-item">
                <Linkedin />
                <a href="https://www.linkedin.com/in/juan-felipe-paredes-tarazona-a042162bb/" target="_blank" rel="noopener noreferrer">
                  Juan Felipe Paredes
                </a>
              </div>
              <div className="contact-item">
                <Github />
                <a href="https://github.com/JuanFParedes" target="_blank" rel="noopener noreferrer">
                  JuanFParedes
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Juan Paredes. All rights reserved.</p>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="scroll-top"
        aria-label="Scroll to top"
      >
        <ChevronDown className="rotate-180" />
      </button>
    </div>
  )
}

export default JuanParedesPortfolio