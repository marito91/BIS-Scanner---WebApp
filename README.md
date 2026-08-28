# BIS Knowledge Centre Device Manager (Web App)

Frontend application for managing device loans and returns for the Knowledge Centre (library) at the British International School. Staff scan a barcode to check a device out to a student or staff member, and scan again to check it back in.

## Overview

Knowledge Centre staff scan a community member's barcode, assign an available device, and track it until it's returned. The app keeps a live view of who currently has a device checked out, plus a full loan and return history.

## Features
- Barcode-based check-out and check-in; manual ID entry is disabled to prevent one student using another's code
- Live view of all devices currently on loan, with borrower details
- Loan and return history, exportable and filterable by date or user
- Automatic email notifications to students on checkout and return, plus end-of-day reminders for anyone with an active loan
- Works on mobile devices when paired with a USB barcode scanner adapter
## Tech Stack

React frontend, connected to a Node.js/Express backend (see BIS-Scanner-Backend), backed by MongoDB.

## Setup

This app depends on the backend service above. Create a hostbase.js file pointing at your backend server before running locally, then install dependencies and start the development server.

## Context

Built and maintained as part of technology operations at the British International School's Knowledge Centre, supporting the school's shared-device lending program end-to-end.
