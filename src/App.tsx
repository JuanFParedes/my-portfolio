'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Mail, Phone, Linkedin, Github, Moon, Sun, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"
import { Switch } from "./components/ui/switch"
import { Label } from "./components/ui/label"
import { Card, CardContent } from "./components/ui/card"
import { Progress } from "./components/ui/progress"

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
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
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
    { name: 'Alex Chen', role: 'Senior Developer', content: 'Working with Juan has been great. He is eager to learn and always brings fresh ideas to the team.' },
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
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 shadow-md z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <ul className="flex space-x-6">
                {['Home', 'About', 'Skills', 'Services', 'Projects', 'Testimonials', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollTo(item.toLowerCase())}
                      className={`text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
                        activeSection === item.toLowerCase() ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-4">
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  id="dark-mode-toggle"
                />
                <Label htmlFor="dark-mode-toggle" className="sr-only">
                  Toggle dark mode
                </Label>
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16">
          <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold mb-4"
              >
                Juan Paredes
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl mb-8"
              >
                Junior Software Developer
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  onClick={() => scrollTo('contact')}
                  className="bg-white text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  Get in Touch
                </Button>
              </motion.div>
            </div>
          </section>

          <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img src="/placeholder.svg?height=300&width=300" alt="Juan Paredes" className="rounded-full w-64 h-64 object-cover" />
                <div>
                  <p className="mb-4">
                    I'm Juan Paredes, a passionate Junior Software Developer with a strong foundation in web technologies. I'm dedicated to creating efficient, user-friendly applications and constantly expanding my skills in the ever-evolving world of software development.
                  </p>
                  <h3 className="text-xl font-semibold mb-2">Professional Goals</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Gain expertise in full-stack development</li>
                    <li>Contribute to open-source projects</li>
                    <li>Develop scalable and maintainable software solutions</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-2">Mission & Values</h3>
                  <p>
                    My mission is to leverage technology to solve real-world problems and improve user experiences. I value continuous learning, collaboration, and writing clean, efficient code.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="w-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Web Development', description: 'Creating responsive and interactive websites', icon: 'Code' },
                  { title: 'Front-end Development', description: 'Building user interfaces with modern frameworks', icon: 'Layout' },
                  { title: 'Back-end Development', description: 'Developing server-side logic and APIs', icon: 'Database' },
                  { title: 'Mobile-friendly Design', description: 'Ensuring great user experience on all devices', icon: 'Smartphone' },
                  { title: 'Performance Optimization', description: 'Improving website speed and efficiency', icon: 'Zap' },
                  { title: 'Code Review', description: 'Providing feedback to improve code quality', icon: 'CheckSquare' },
                ].map((service, index) => (
                  <Card key={index} className="transition-transform hover:scale-105 bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProjectIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row items-center gap-8"
                  >
                    <img src={projects[currentProjectIndex].image} alt={projects[currentProjectIndex].title} className="w-full md:w-1/2 rounded-lg shadow-lg" />
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl font-semibold mb-4">{projects[currentProjectIndex].title}</h3>
                      <p className="mb-4">{projects[currentProjectIndex].description}</p>
                      <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">View Project</Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-1/2 -left-4 -translate-y-1/2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
                    className="bg-white dark:bg-gray-800"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
                    className="bg-white  dark:bg-gray-800"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
              <div className="relative max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <p className="text-lg mb-4">"{testimonials[currentTestimonialIndex].content}"</p>
                    <div className="font-semibold">{testimonials[currentTestimonialIndex].name}</div>
                    <div className="text-gray-600 dark:text-gray-300">{testimonials[currentTestimonialIndex].role}</div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-center mt-4 space-x-2">
                  {testimonials.map((_, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`${currentTestimonialIndex === index ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className={`bg-gray-100 dark:bg-gray-800 ${formErrors.name ? 'border-red-500' : ''}`}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className={`bg-gray-100 dark:bg-gray-800 ${formErrors.email ? 'border-red-500' : ''}`}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      className={`bg-gray-100 dark:bg-gray-800 ${formErrors.message ? 'border-red-500' : ''}`}
                    />
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">Send Message</Button>
                </form>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span>juan.paredes@example.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span>+1 (234) 567-890</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <a href="https://www.linkedin.com/in/juanparedes" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      linkedin.com/in/juanparedes
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Github className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <a href="https://github.com/juanparedes" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      github.com/juanparedes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Juan Paredes. All rights reserved.</p>
          </div>
        </footer>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-black text-white dark:bg-white dark:text-black p-3 rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronDown className="w-6 h-6 transform rotate-180" />
        </button>
      </div>
    </div>
  )
}

export default JuanParedesPortfolio
