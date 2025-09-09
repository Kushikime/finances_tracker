# Finances Tracker User Stories

## Core Functionality

### User Authentication
- As a user, I want to register with email and password so that I can create an account
- As a user, I want to log in to access my financial data
- As a user, I want to log out to secure my account when I'm done
- As a user, I want to reset my password if I forget it

### Dashboard Overview
- As a user, I want to see my current balance at a glance
- As a user, I want to view a comparison of my finances with last month
- As a user, I want to see a summary of my recent transactions
- As a user, I want to quickly access all main features from the dashboard

## Transaction Management

### Viewing Transactions
- As a user, I want to view a paginated list of all my transactions
- As a user, I want to filter transactions by date range
- As a user, I want to filter transactions by type (income/expense)
- As a user, I want to search for specific transactions by description or category
- As a user, I want to sort transactions by different parameters (amount, date, category)

### Creating Transactions
- As a user, I want to add a new income transaction with description and amount
- As a user, I want to add a new expense transaction with description and amount
- As a user, I want to categorize my transactions for better organization
- As a user, I want to associate an expense with a specific goal or envelope (piggy bank)
- As a user, I want to attach notes or receipts to transactions for reference

### Managing Transactions
- As a user, I want to edit transaction details if I made a mistake
- As a user, I want to delete transactions that were entered incorrectly
- As a user, I want to mark recurring transactions for easier tracking

## Goals Management

### Creating and Managing Goals
- As a user, I want to create a financial goal with a target amount and deadline
- As a user, I want to track progress towards my financial goals
- As a user, I want to edit my goals if my priorities change
- As a user, I want to delete goals that are no longer relevant
- As a user, I want to mark goals as completed when achieved

### Goal Sharing
- As a user, I want to share a goal with another user to save for something together
- As a user, I want to see who has contributed to a shared goal
- As a user, I want to track individual contributions to a shared goal

### Goal Visualization
- As a user, I want to see a progress bar showing how close I am to achieving my goal
- As a user, I want to see the percentage of completion for each goal
- As a user, I want to see an estimated completion date based on my saving rate

## Envelopes (Piggy Banks) Management

### Creating and Managing Envelopes
- As a user, I want to create an envelope (piggy bank) for specific spending categories
- As a user, I want to allocate money to different envelopes
- As a user, I want to track the balance of each envelope
- As a user, I want to edit my envelopes if my budget changes
- As a user, I want to delete envelopes that are no longer needed

### Envelope Sharing
- As a user, I want to share an envelope with another user for shared expenses
- As a user, I want to see who has contributed to a shared envelope
- As a user, I want to track individual contributions to a shared envelope

### Envelope Visualization
- As a user, I want to see how much money is in each envelope
- As a user, I want to see how much has been added to each envelope this month
- As a user, I want to see spending trends from my envelope over time

## Social Features

### User Collaboration
- As a user, I want to invite another user to collaborate on financial goals
- As a user, I want to accept or decline invitations to shared goals or envelopes
- As a user, I want to remove a user from a shared goal or envelope if needed

### Notifications
- As a user, I want to receive notifications about significant activity in shared goals/envelopes
- As a user, I want to be notified when I'm close to achieving a goal
- As a user, I want to be notified when an envelope is running low

## Reporting and Analysis

### Financial Reports
- As a user, I want to see spending breakdowns by category
- As a user, I want to view income vs. expenses over time
- As a user, I want to export my financial data for external analysis
- As a user, I want to see projections of my savings based on current habits

## UI/UX Requirements

### Dashboard Interface
- The dashboard should prominently display the current balance
- The dashboard should show change vs. last month (with visual indicators for positive/negative changes)
- The dashboard should display a paginated transactions table with sorting and filtering options

### Transaction Management
- Adding a transaction should open a modal/popup interface
- The transaction form should dynamically change based on transaction type (income/expense)
- For expenses linked to goals/envelopes, a dropdown should allow selecting from related entities

### Goals and Envelopes Sections
- Goals and envelopes should be displayed as card components
- Each goal card should show progress bar, target amount, and percentage complete
- Each envelope card should show current amount and monthly additions
- Both sections should have an "add new" option
- When adding goals/envelopes, users should be able to select other users to share with

### Responsive Design
- All interfaces should work seamlessly on desktop and mobile devices
- Critical actions should be accessible with minimal navigation
- Data visualizations should adapt to different screen sizes
