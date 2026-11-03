---
title: "Petty Cash Bulk Store Upload"
date: 2026-02-15
summary: "Validated, Excel-driven bulk store onboarding that removed delays and errors, with 3,729 stores created"
show_date: false
reading_time: false
company: "Zaggle Prepaid Ocean Services"
company_slug: "zaggle"
tags:
  - Backend
  - Full-Stack
tech_stack:
  - Java
  - Spring Boot
  - Excel (.xlsx)
  - PostgreSQL
featured: true
role: "Software Engineer"
duration: "Zaggle Prepaid Ocean Services"
highlights:
  - "3,729 stores created since launch"
  - "Onboarding delays and errors resolved"
---

A bulk upload feature for Petty Cash that lets Client Admins and IPMs onboard stores from a single Excel template.

## What I built

- Built a bulk store upload so Client Admins and IPMs can onboard many stores from one Excel (.xlsx) template instead of creating them one by one in the UI.
- Validated every file before processing: file and data checks, mandatory fields, email and pincode formats, duplicates inside the file, and case-sensitive and case-insensitive matches against existing stores.
- Made each job atomic: a single invalid row fails the whole upload, so no partial or inconsistent stores get created.
- Returned row-wise success and error reports as downloadable files, with the same results and access control as manual store creation.
- Resolved the delays and errors in store onboarding with the optimized bulk flow, which has created **3,729 stores** since the optimization.
