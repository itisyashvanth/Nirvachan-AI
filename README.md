# 🗳️ Nirvachan AI — India Election Intelligence Platform

> **निर्वाचन** *(Nirvachan)* — Hindi for "Election"
> Built for **PromptWars Virtual Hackathon** | Problem: *Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.*

---

## 🏆 What Is This?

Nirvachan AI is a **persona-based, interactive election education platform** that demystifies India's electoral process for 970 million voters. Instead of dumping information like a government PDF, it asks *"Who are you?"* and builds a personalized journey — from registration to polling day.

**Live at:** `http://localhost:8787` (run locally — see setup below)

---

## 🎯 Problem Statement Analysis

### Why This Problem Exists

India holds the world's largest democratic exercise, yet:
- The official ECI portal (`eci.gov.in`) is dense, bureaucratic, and non-personalized
- Information is buried in PDFs and legal language
- No journey map exists for different voter types (first-timers, NRIs, returning voters)
- There is zero interactive education — only transactional forms
- Mobile experience on government portals is poor
- Citizens don't know their rights (paid holiday on election day, NOTA option, PwD facilities)

### Our Solution: Mission-Based Journey Engine

Rather than a generic FAQ chatbot, Nirvachan AI uses a **persona-first architecture**:

```
Landing Page → Who Are You? → Personalized Journey → AI Chat + Deep Dives
```

Each voter type (First-Time, Returning, NRI, Student) gets a **custom 5-step mission path**, tailored explainers, and AI answers scoped to their context.

---

## 🏗️ Architecture

### File Structure

```
Nirvachan-AI/
├── index.html      # Complete app shell — landing page + dashboard
├── styles.css      # Full CSS system — glassmorphism, animations, responsive
├── data.js         # All application data (loads first)
│   ├── PERSONAS    # 4 voter persona definitions
│   ├── MISSIONS    # Per-persona step missions
│   ├── AI_KB       # Knowledge base for AI responses
│   ├── TIMELINES   # Lok Sabha / Vidhan Sabha / Presidential timelines
│   ├── GUIDES      # Deep dive topic cards
│   ├── GUIDE_CONTENT # Full HTML content per topic
│   ├── MISSION_DETAILS # Expandable step-by-step mission modals
│   └── getAIResponse() # Keyword-matching AI response function
└── app.js          # All UI logic (loads after data.js)
    ├── selectPersona()
    ├── beginJourney()     # Landing → Dashboard transition
    ├── toggleLearn()      # Expand/collapse voter type detail panels
    ├── goHome()           # Dashboard → Landing transition
    ├── switchTab()        # Tab navigation
    ├── applyPersona()     # Personalise dashboard per persona
    ├── renderMissions()   # Build journey mission UI
    ├── loadTimeline()     # Render election timeline
    ├── renderGuides()     # Build deep dive cards
    ├── openMission()      # Mission modal popup
    ├── sendMessage()      # AI chat send
    ├── clearChat()        # Reset chat
    └── handleChatKeydown() # Enter key handler
```

### Data Flow

```
data.js loads first
    ↓
PERSONAS, MISSIONS, AI_KB, TIMELINES, GUIDES, etc. defined globally
    ↓
app.js loads second
    ↓
DOMContentLoaded fires → createParticles() + animateVoterCount()
    ↓
User on Landing Page → clicks "Learn More" (toggleLearn) or "Begin" (beginJourney)
    ↓
beginJourney(persona) → hides landing, shows main-app, calls applyPersona()
    ↓
applyPersona() → sets greeting, subtitle, renders missions, loads suggested questions
    ↓
User navigates tabs → switchTab() shows/hides sections
    ↓
AI Chat → sendMessage() → getAIResponse() → keyword match → response
```

---

## 🎨 UI Design System

### Design Principles (Inspired by ECI Portal Failures)

| ECI Portal Issue | Nirvachan AI Fix |
|-----------------|------------------|
| Dense, no hierarchy | Clear sections: Hero → Problem → Solution → Choose Path |
| Same for all users | 4 distinct persona journeys |
| Static text only | Animated stats, expandable cards, progress bars |
| No images | Generated election imagery, EVM diagram |
| Confusing navigation | Tab-based dashboard, breadcrumb persona badge |
| No mobile care | Responsive CSS grid, clamp() typography |
| No journey map | Mission progress bar with locked/unlocked steps |

### Color Palette

```css
--saffron:      #FF9933   /* Indian flag saffron — primary CTA */
--india-green:  #138808   /* Indian flag green — accents */
--navy:         #060b18   /* Deep background */
--navy-2:       #0d1526   /* Card backgrounds */
--glass:        rgba(255,255,255,0.05)  /* Glassmorphism panels */
```

### Typography
- **Space Grotesk** — headings, numbers, brand name
- **Inter** — body text, labels, UI elements

### Animation System
- Floating orbs (ambient background)
- Particle system (200 CSS particles)
- Animated voter count counter
- Scroll-linked section reveals
- Mission unlock transitions
- Tab slide transitions

---

## 🗺️ User Flow

### 1. Landing Page
```
Hero Section
  → "Understand India's Election Process Like Never Before"
  → Stats bar: 97.8Cr voters | 543 seats | 10.5L stations | 75+ years

Problem Section
  → Dense & Bureaucratic | Not Personalized | No Journey Map

Solution Section
  → Personalized Journey | Living Timeline | AI Chat | Deep Dive

Choose Your Path (Voter Cards)
  → First-Time Voter  [Learn More ▾] [Begin →]
  → Returning Voter   [Learn More ▾] [Begin →]
  → NRI / Overseas    [Learn More ▾] [Begin →]
  → Student/Researcher[Learn More ▾] [Begin →]
```

### 2. Learn More Panels
Clicking "Learn More ▾" expands a panel showing:
- Who this is for (eligibility criteria)
- 5-step journey preview
- Feature chips (what's inside)
- "Start Journey" CTA button

### 3. Dashboard (after clicking Begin)
Five tabs, each purpose-built:

| Tab | Content |
|-----|---------|
| 🏠 Home | Persona greeting, quick-access cards, India election infographic |
| 🗺️ My Journey | Progress bar + 5 mission steps (active/locked/done states) |
| 📅 Timeline | Lok Sabha / Vidhan Sabha / Presidential timelines with phase tags |
| 📖 Deep Dive | 6 topic cards (ECI, EVM, MCC, FPTP, Delimitation, EPIC) with full HTML explainers |
| 🤖 Ask Nirvachan | AI chat with suggested questions, keyword-matched responses |

### 4. Mission Modal
Clicking any mission step opens a full-screen modal with:
- Step-by-step numbered instructions
- Practical details (form names, URLs, helpline numbers)
- "Mark Complete" to unlock next mission

---

## 🤖 AI Response System

Nirvachan uses a **keyword-matching knowledge base** (`getAIResponse` in `data.js`):

```javascript
Topics covered:
├── Voter Registration (Form 6, EPIC, process)
├── EPIC / Voter ID (how to get, update, download)
├── EVM & VVPAT (technology, security, how-to-vote)
├── Polling Booth Finder (electoralsearch.eci.gov.in)
├── Model Code of Conduct (restrictions, enforcement)
├── NOTA (history, effect, when to use)
├── NRI Voting (Form 6A, in-person requirement)
├── ECI Powers (Article 324, structure, authority)
├── FPTP System (how constituencies work, pros/cons)
├── Paid Holiday (Section 135B RPA)
├── Multi-Phase Elections (why 7 phases, logistics)
└── PwD / Senior Citizen rights (accessibility)
```

Suggested questions are persona-specific — different chips shown for First-Time vs NRI vs Student.

---

## 📊 Election Data (Sourced from ECI)

All data in the app is sourced from official ECI records:

| Fact | Value |
|------|-------|
| Eligible Voters | 97.8 Crore (968 million) |
| Lok Sabha Seats | 543 |
| Vidhan Sabha Seats | 4,120 |
| Polling Stations | 10.5 Lakh+ |
| Phases (2024 LS) | 7 phases over 44 days |
| EVM Manufacturers | BEL + ECIL (Govt PSUs only) |
| First General Election | 1951–52 |
| ECI Established | January 25, 1950 (National Voters Day) |
| Voter Helpline | 1950 |
| MCC First Used | 1960 |
| SC Reserved Seats | 84 |
| ST Reserved Seats | 47 |

---

## 🚀 Setup & Running Locally

### Prerequisites
- Python 3.x (for local server) — or any static file server
- Modern browser (Chrome, Firefox, Safari, Edge)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/itisyashvanth/Nirvachan-AI.git
cd Nirvachan-AI

# 2. Start local server (REQUIRED — file:// protocol blocks script loading)
python3 -m http.server 8787

# 3. Open in browser
open http://localhost:8787
# or navigate manually to http://localhost:8787
```

> ⚠️ **Do NOT open index.html directly** (double-click). Always use the local server.
> The `file://` protocol blocks cross-file script loading in modern browsers.

### Alternative Servers

```bash
# Node.js (npx)
npx serve . -p 8787

# VS Code
# Install "Live Server" extension → Right-click index.html → Open with Live Server
```

---

## 🐛 Bugs Found & Fixed (Development Log)

### Critical JS Syntax Errors (All Fixed)

| File | Location | Bug | Fix Applied |
|------|----------|-----|-------------|
| `app.js` | Lines 90–95 | Unescaped apostrophes `I'm`, `I'll`, `Let's` inside single-quoted strings → `SyntaxError` | Switched to double-quoted strings `"..."` |
| `app.js` | Line 55 | `getElementById('splash-screen')` — element removed from HTML, caused `null` crash | Replaced with `getElementById('landing')` reference |
| `app.js` | Line 103 | Same `splash-screen` reference in `resetPersona()` | Fixed to use `landing` div |
| `app.js` | `toggleLearn()` | `el.previousElementSibling` accessed BEFORE null check → crash if element missing | Moved null guard `if (!el) return` to line 1 of function |
| `app.js` | Line 247 | `ECI's` unescaped in single-quoted string | Escaped to `ECI\'s` |
| `data.js` | Line 99 | `India's 543 Lok Sabha` — apostrophe in single-quoted `preview:` string | Escaped to `India\'s` |
| `data.js` | Line 104 | `candidates' agents` in single-quoted `body:` string → unterminated string at col 741 | Escaped to `candidates\' agents` |
| `data.js` | Line 134 | `What's allowed and what's not` — apostrophes in `subtitle:` field | Escaped both to `What\'s` |
| `data.js` | Line 143 | `agents' watch` — apostrophe in counting step detail | Escaped to `agents\' watch` |
| `data.js` | Line 146 | `candidate's lead` — apostrophe in results detail | Escaped to `candidate\'s lead` |
| `data.js` | Line 148 | `What you're entitled to` — apostrophe in subtitle | Converted to double-quoted string |
| `data.js` | Line 151 | `it's the law` — apostrophe in paid holiday detail | Escaped to `it\'s` |

### Architecture Fix

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| `selectPersona is not defined` | App loaded via `file://` — some browsers block cross-file script access | Moved to `http://localhost:8787` via Python server |
| Functions not global | Old code was wrapped in IIFE | Ensured all key functions declared at top-level scope |
| `data.js` crashes silently | Any one syntax error stops all JS execution → all data undefined | Fixed all 12 apostrophe bugs → full parse success |

---

## ✅ Final Test Results (47 Checks)

```
✅ File exists: index.html       — 20,405 bytes
✅ File exists: styles.css       — 29,778 bytes
✅ File exists: data.js          — 18,335 bytes
✅ File exists: app.js           — 13,878 bytes
✅ data.js — no syntax errors    — clean
✅ app.js  — no syntax errors    — clean
✅ HTML id="landing"             ← landing page div
✅ HTML id="main-app"            ← dashboard div
✅ HTML id="chat-messages"       ← AI chat
✅ HTML id="missions-container"  ← journey tab
✅ HTML id="timeline-wrapper"    ← timeline tab
✅ HTML id="guide-grid"          ← deep dive tab
✅ HTML id="chat-input"          ← AI text field
✅ HTML id="persona-badge"       ← navbar badge
✅ HTML id="hero-greeting"       ← personalized greeting
✅ HTML id="journey-progress-fill" ← progress bar
✅ JS function: selectPersona
✅ JS function: beginJourney
✅ JS function: toggleLearn
✅ JS function: goHome
✅ JS function: switchTab
✅ JS function: applyPersona
✅ JS function: sendMessage
✅ JS function: clearChat
✅ JS function: getAIResponse
✅ JS function: loadTimeline
✅ JS function: renderMissions
✅ JS function: openMission
✅ JS function: closeMissionModal
✅ JS function: handleChatKeydown
✅ Data object: PERSONAS
✅ Data object: MISSIONS
✅ Data object: AI_KB
✅ Data object: TIMELINES
✅ Data object: GUIDES
✅ Data object: GUIDE_CONTENT
✅ Data object: MISSION_DETAILS
✅ Script order: data.js before app.js
✅ No 'splash-screen' in app.js
✅ HTTP 200: index.html
✅ HTTP 200: data.js
✅ HTTP 200: app.js
✅ HTTP 200: styles.css

RESULT: 47/47 — ALL CHECKS PASSED ✅
```

---

## 🔗 Resources

| Resource | URL |
|----------|-----|
| Official Voter Portal | https://voters.eci.gov.in |
| Electoral Roll Search | https://electoralsearch.eci.gov.in |
| Election Commission of India | https://eci.gov.in |
| Voter Helpline | 1950 |
| cVIGIL App | Report MCC violations |
| Voter Helpline App | Download e-EPIC (digital Voter ID) |

---

## 👨‍💻 Built By

**Yash** — PromptWars Virtual Hackathon  
Stack: Vanilla HTML · CSS (Glassmorphism) · JavaScript (No frameworks)  
Data: Election Commission of India (ECI) official sources