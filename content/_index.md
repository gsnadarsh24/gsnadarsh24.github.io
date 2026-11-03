---
# Leave the homepage title empty to use the site title
title: ''
summary: ''
date: 2026-01-05
type: landing

sections:
  # Developer Hero - Gradient background with name, role, social, and CTAs
  - block: dev-hero
    id: hero
    content:
      username: me
      greeting: "Hi, I'm"
      show_status: false
      show_scroll_indicator: false
      typewriter:
        enable: true
        prefix: "I build"
        strings:
          - "full-stack fintech systems"
          - "reliable REST APIs"
          - "data dashboards"
          - "ML-powered tools"
        type_speed: 70
        delete_speed: 40
        pause_time: 2500
      cta_buttons:
        - text: View My Work
          url: "#projects"
          icon: arrow-down
        - text: Get In Touch
          url: "#contact"
          icon: envelope
    design:
      style: centered
      avatar_shape: circle
      animations: true
      background:
        color:
          light: "#fafafa"
          dark: "#0a0a0f"
      spacing:
        padding: ["6rem", "0", "4rem", "0"]

  # Filterable Portfolio - Alpine.js powered project filtering
  - block: portfolio
    id: projects
    content:
      title: "Featured Projects"
      subtitle: "A selection of my recent work"
      count: 0
      filters:
        folders:
          - projects
      buttons:
        - name: All
          tag: '*'
      default_button_index: 0
    design:
      columns: 3
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Visual Tech Stack - Icons organized by category
  - block: tech-stack
    id: skills
    content:
      title: "Tech Stack"
      subtitle: "Technologies I use to build things"
      categories:
        - name: Languages
          items:
            - name: Java
              icon: devicon/java
            - name: JavaScript
              icon: devicon/javascript
            - name: Python
              icon: devicon/python
            - name: Ruby
              icon: devicon/ruby
        - name: Full Stack
          items:
            - name: Spring Boot
              icon: devicon/spring
            - name: Ruby on Rails
              icon: devicon/rails
            - name: React
              icon: devicon/react
            - name: Node.js
              icon: devicon/nodejs
        - name: Databases & Tools
          items:
            - name: PostgreSQL
              icon: devicon/postgresql
            - name: MongoDB
              icon: devicon/mongodb
            - name: Git
              icon: devicon/git
            - name: Docker
              icon: devicon/docker
            - name: Linux
              icon: devicon/linux
            - name: Maven
              icon: devicon/maven
    design:
      style: grid
      show_levels: false
      background:
        color:
          light: "#f5f5f5"
          dark: "#08080c"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Experience Timeline
  - block: resume-experience
    id: experience
    content:
      title: Experience
      date_format: Jan 2006
      items:
        - title: Software Engineer
          company: Zaggle Prepaid Ocean Services
          company_url: ''
          company_logo: ''
          location: Hyderabad, India
          date_start: '2025-06-01'
          date_end: ''
          description: |2-
            * Built a real-time control that auto-blocks QR payments at a client's daily spend limit, capping payout risk for ~1,700 users
            * Replaced manual script checks with a Rails scheduler reporting card-loading status for all provider banks every 6 hours
            * Built a full-stack Petty Cash metrics dashboard with date-range views of tenants, users, payment volume and success rate
            * Engineered a validated Excel bulk-upload pipeline for Petty Cash stores (atomic fail-on-invalid-row, row-wise error reports), cutting onboarding from hours to minutes with 3,729 stores created
            * Built an idempotent expense-backfill API that linked 78+ DEBIT transactions to their expenses, restoring reconciliation integrity after client migrations
            * Closed a cross-tenant vulnerability in EMS Admin APIs and built an annotation-driven AOP guard that blocks replay attacks across 40+ Petty Cash endpoints
            * Refactored Java OCR services to resolve global and client-specific field mappings at runtime, enabling custom OCR fields with zero code changes
        - title: Software Engineering Intern
          company: Zaggle Prepaid Ocean Services
          company_url: ''
          company_logo: ''
          location: Hyderabad, India
          date_start: '2025-01-01'
          date_end: '2025-06-30'
          description: |2-
            * Led a 24-hour P0 investigation into global OTP failures that halted QR payments; traced them to SMS template ID mismatches in the Kaleyra vendor configuration, restored payment services worldwide and added redundant notification paths
            * Implemented backend recovery logic for pending QR payments, preserving audit logs and financial integrity
            * Analyzed API logs in Oodle to compare web and mobile usage, showing most users are on mobile
        - title: Software Engineering Intern
          company: LTIMindtree
          company_url: ''
          company_logo: ''
          location: Hyderabad, India
          date_start: '2023-10-01'
          date_end: '2023-12-31'
          description: |2-
            * Developed a Computer Vision project with OpenCV for graph labeling using edge detection and contour recognition
            * Integrated FastAPI, improving code efficiency by 20% and reaching 90% accuracy in contour area calculations
    design:
      columns: '1'
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Contact Section
  - block: contact-info
    id: contact
    content:
      title: Get In Touch
      subtitle: "Let's build something together"
      text: |-
        I'm always interested in hearing about new projects and opportunities.
        Whether you want to hire, collaborate, or just say hi, feel free to reach out!
      email: gsnadarsh24@gmail.com
      autolink: true
    design:
      columns: '1'
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

---
