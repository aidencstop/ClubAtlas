# ClubAtlas

**A web-based centralized club platform for transparent access, AI recommendations, and campus engagement.**

## Project Overview

ClubAtlas replaces fragmented, last-minute club communication (emails, word-of-mouth) with a **central, student-friendly hub** where students can:

- Discover clubs
- View meeting schedules & past activities
- Subscribe and get notifications
- Receive AI-powered club recommendations

Club leaders can:

- Manage club profiles
- Post announcements and events
- Reach both members and prospective students

### Key Features

1. **Club Profile Pages**
   - Each club has: mission, leadership, meeting schedule, past activities, optional media highlights
   - Students can subscribe to each club

2. **Club Calendar**
   - Integrated calendar showing upcoming meetings/events
   - Filter by date, club, or category
   - Easy to scan in a timeline/month/week style

3. **AI Recommendation Assistant**
   - Suggests relevant clubs based on:
     - User's stated interests (e.g., tags/checkboxes)
     - Usage behavior (viewed clubs, subscribed clubs, attended events) — if available
   - Supports:
     - Active query (user asks: "Recommend clubs for someone who likes X and Y")
     - Passive discovery (suggested list on dashboard/home)

4. **Subscription & Notification System**
   - Students can "follow/subscribe" to clubs
   - They receive timely alerts (email and/or in-app) for:
     - New announcements
     - Upcoming meeting reminders
     - Major updates (e.g., time/location changes)

5. **Club Leader / Admin Dashboard**
   - Club leaders can:
     - Edit club profile info
     - Create & edit events (with schedule and location)
     - Post announcements
   - Access should be permission-controlled (leaders vs normal students)

6. **Cross-Club Collaboration Board**
   - Shared board where clubs can:
     - Post joint events
     - Propose collaborations
   - Students can discover these joint events

### Optional Features (Phase 2)

- **Student Dashboard ("My Page")**
  - Personal overview: subscribed clubs, past participation, saved recommendations
  - Architecture should support this, but UI can be minimal in first iteration

- **Social Interaction Features**
  - Lightweight engagement: comments, reactions
  - Design system to support easy addition later

## Engineering Principles

- Aim for **clean, maintainable, well-structured code**, not quick hacks
- Prefer clear naming over brevity
- Keep business logic and presentation logic separated where possible
- For any complex logic (e.g., recommendation scoring, subscription/notification dispatch), add short, clear comments
- If unsure about a requirement:
  1. First infer from this Project Overview
  2. If still ambiguous, clearly list assumptions in comments and in response

## Architecture & Data Modeling

### Core Entities

- **User / Student**
  - Basic profile (name, email, etc.)
  - Role flags (e.g., normal student, club leader, admin)
  - Interest tags (for recommendations)

- **Club**
  - Name, mission/description
  - Category/tags
  - Leadership (link to Users who are leaders)
  - Meeting schedule summary (e.g., "Every Tuesday after school")
  - Media (optional images, links, etc.)

- **ClubEvent**
  - Belongs to a Club
  - Title, description
  - Start/end datetime, location
  - Optional category (e.g., recruitment, workshop, social)
  - Visibility status (active, cancelled, etc.)

- **ClubSubscription**
  - User ↔ Club relation
  - Created_at, active flag

- **Announcement**
  - Belongs to a Club
  - Title, body
  - Created_at, updated_at
  - Visibility status

- **CollaborationPost / CrossClubEvent**
  - Joint post across multiple clubs (e.g., many-to-many relationship with Club)
  - Title, description, date/time, location
  - Powers the "Cross-Club Collaboration Board"

- **Notification / EmailQueue** (if implemented)
  - Tracks notifications to be sent or recently sent
  - Type (event reminder, announcement, etc.)

- **RecommendationData / RecommendationHistory** (optional)
  - For storing logs or scores from the recommendation engine

### AI Recommendation Engine

- For the MVP, design the system so that the recommendation logic is **modular**:
  - Start with something simple (e.g., rule-based: tag matching between user interests and club tags)
  - Make it easy to swap/extend later with ML/LLM-based recommendations
- Encapsulate recommendation logic in a dedicated module/service file

## Non-Functional & UX Considerations

- The interface MUST be **student-friendly and easy to scan**:
  - Club profiles should highlight:
    - "Is this club right for me?" (mission, tags, activity type)
    - When & where it meets next
  - Calendar views should clearly show conflicts and timing

- For Club leaders:
  - Make content management simple and safe:
    - Validate data
    - Prevent accidental loss
    - Use clear forms for events and announcements

- Access Control:
  - Only authorized club leaders can modify their club's content
  - Admins can manage all clubs and moderate collaboration posts

## Figma Design as Source of Truth

- Treat the Figma-based spec as the **primary source of truth for UI layout and visual hierarchy**
- Follow the described layout structure, sections, and components as closely as reasonably possible
- Keep components reusable and align naming with the Figma semantics (e.g., "ClubCard", "ClubList", "EventCalendarSidebar" etc.)
- Make the implementation easily adjustable in case we later tweak the Figma design

**When matching Figma design**:
- Respect layout structure (sections, cards, sidebars, header/footer, spacing)
- Respect key typography hierarchy (what is the main title, subtitle, body, meta)
- Respect main colors, borders, and corner radius tokens if provided

If there is any ambiguity in the text spec:
- Make a reasonable assumption and **write it down as a short comment** in the code (e.g. `// Assumption: mobile breakpoint at 768px`)

## Scope & Priority

When prioritizing tasks or making trade-offs, follow this order:

1. **Core club directory & club profiles**
2. **Club events & calendar**
3. **Subscriptions & notifications**
4. **Club leader dashboard**
5. **Cross-club collaboration board**
6. **Simple, modular AI recommendations (rule-based to start)**
7. Optional: Student "My Page" dashboard, social features

If implementing something in a later priority requires minimal extra effort at the current step (e.g., adding a column now to avoid migration churn later), you may do it — but clearly document it.

## Development Guidelines

### Response Structure

When given a task, follow this structure:

1. **Restate** the task in 1–3 sentences to confirm understanding
2. If needed, ask **at most 2–3 precise clarification questions**. If you can infer safely from this spec, prefer inference over asking
3. Propose a **small step plan** (1–5 steps)
4. Show the concrete code changes:
   - File paths
   - New/updated code
   - Very short explanations for each significant block

### Never

- Change or delete existing functionality silently
- Ignore the project overview or feature list above
- Over-engineer (build huge abstractions) without a clear benefit for this project

