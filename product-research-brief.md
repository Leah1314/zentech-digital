# ZenTech Product Research Brief

Generated from local laptop files, Google Drive, the provided screenshot, the connected Lovable project, and founder input.

## Company-Level Vision

ZenTech stands for technology that is good for humans. The company is looking for unmet needs in the AI era and building products where technology should make life more humane, not colder.

The current product portfolio can be framed as a human-centered AI product studio with four product directions:

1. Career mobility and human connection: `早点上岸 / Get Me a Job`.
2. Preventive health and personal data intelligence: `Gut Health In and Out`.
3. Future patient-experience products: upcoming software and hardware products for healthcare.
4. Smart mobility / driver safety prototype: a live-camera smart audio assistant for drivers.

The unifying thesis:
AI will automate more tasks, but people still need trust, context, judgment, care, and safer real-world experiences. ZenTech builds around those gaps.

## Product 1: 早点上岸 / Get Me a Job

### Short Positioning
早点上岸 is a WeChat mini-program and community marketplace for Chinese-speaking overseas job seekers. It connects students and job seekers with verified working professionals for practical, flexible career support.

In the AI era, most job seekers can generate CVs, cover letters, and application answers with AI. 早点上岸 focuses on the missing last mile: human touch, real industry context, insider experience, and connection to real people.

### Core Audience
- Chinese-speaking students and graduates overseas, especially in the UK and Europe.
- Job seekers applying for consulting, finance, technology, audit/accounting, sales, education, and related professional roles.
- Working professionals who want a flexible side-income channel by mentoring younger job seekers.

### Problem
- Overseas job seekers feel lonely, anxious, and under-informed.
- Traditional agencies can be expensive, opaque, or feel like "information resellers."
- Students struggle with CV writing, interview preparation, referrals, industry understanding, English communication, and career direction.
- There is a trust gap between candidates and paid career services.
- AI tools can improve application materials, but they cannot reliably tell candidates about hidden context such as team situation, workplace politics, hiring-manager expectations, informal norms, or what the job actually feels like from the inside.
- Job seeking is not only a document problem; it is also a confidence, information, and relationship problem.

### Solution
The product offers direct access to working mentors for:
- CV/resume review
- Mock interviews
- Career Q&A
- Industry pathway explanation
- Referral advice where appropriate
- Online tests/written test guidance
- Group talks or workshops

### Key Product Mechanics
- Student-side registration, browsing mentors, booking, order management, payment flow.
- Mentor-side registration, profile editing, order notifications, profile management, earnings records.
- Admin-side order list, user management, commission settings, data export, post management.
- Mentor profile fields include company, role, industry, work experience, education, intro, strengths, services, and optional privacy-preserving display name/avatar.
- Pricing is in GBP, with RMB/Alipay settlement for mentors.
- Platform fee mentioned in onboarding docs: 7% for early mentors.

### Messaging From Existing Materials
- "为每一个漂在海外的你，点一盏求职的灯"
- "你的求职路，不必一个人走"
- "不做信息贩子，只做靠谱助攻"
- "预约导师，马上开始提升"
- "不要做信息贩子，只做靠谱助攻"

### Growth Strategy Found
- Mentor-side: LinkedIn outreach, Xiaohongshu, WeChat alumni/professional groups, public account/video interviews, webinar/roundtable activity.
- Student-side: Xiaohongshu as core channel, WeChat public account, mutual-help groups, university CSSA/career society partnerships.
- Content themes: CV pitfalls, UK job-search difficulty, mock interview support, mentor stories, student-to-job journey, behind-the-scenes, practical guides.
- Initial goals mentioned: 30 quality mentors and 100 high-intent students.

### Product Visual Assets Found
- Screenshot supplied by user: WeChat mini-program home page with search bar, carousel banner, mentor/category filters, and bottom tabs.
- Local image found: `/Users/user/Desktop/早点上岸/ChatGPT Image Oct 27, 2025, 05_07_52 PM.png`, a bold Chinese social-style poster saying "爸妈请进 / 英国今年没工作".
- Local banner copy doc: `/Users/user/Desktop/04_项目与工作/早点上岸小程序banner文案.docx`.

### Useful Landing Page Angle
For ZenTech company site, position this as:
"An overseas Chinese career-support marketplace connecting job seekers with trusted working mentors for CV review, mock interviews, industry guidance, and practical job-search support."

Sharper positioning:
"AI can polish your application. Real mentors help you understand the room."

## Product 2: Gut Health In and Out

### Short Positioning
Gut Health In and Out is an AI-powered gut-health companion for continuous digestive-health tracking. It helps users log stool, symptoms, diet, and lifestyle signals, then turns those records into trends, scores, and personalized recommendations.

### Live App / Lovable Project
- Public URL: `https://gut-health-in-and-out.lovable.app`
- Lovable project: `gut-health-in-and-out`
- Project status: completed and published
- Visibility: private
- Public app redirects unauthenticated visitors to `/auth`
- Auth screen title: "In and Out"

### Lovable Project Description
The app tracks gut health through symptom logging, dietary intake, notes, and AI-powered insights. It includes a monthly activity calendar with historical date entry, phone login, voice input, and Vite/React/Shadcn UI/TypeScript implementation.

### Core Product Features Found
- Stool tracker with AI image analysis and manual entry.
- Bristol Stool Scale classification.
- Stool consistency and color selection.
- Stool photo upload.
- General digestive symptom notes.
- Food diary with AI food image analysis and manual meal logging.
- Meal categories: breakfast, lunch, dinner, snack.
- Quick-add common foods.
- Food notes and symptom notes.
- Analytics dashboard with food score, stool score, today score, historical trends, monthly activity calendar, and personalized recommendations.
- AI gut-health coach chat.
- Health profile, test-results upload, education hub, wellness check, language selector, voice input.

### Strategic Vision From Research Doc
ZenTech Gut Health aims to build a longitudinal gut-health dataset by continuously tracking stool images, bowel habits, symptoms, diet, and lifestyle data. The product thesis is that the strongest signal comes from changes over time, not one-off stool analysis.

### Problem
- Digestive symptoms are usually tracked inconsistently.
- Patients often cannot describe symptoms accurately.
- Screening and testing are episodic and reactive.
- Existing stool tests are lab-based snapshots, not continuous monitoring.
- Users struggle to connect food, lifestyle, and digestive symptoms.

### Solution
Combine:
- AI stool image analysis
- Bristol classification
- Stool frequency tracking
- Stool color tracking
- Symptom monitoring
- Diet and lifestyle logging

The goal is to create a continuous digestive-health profile and eventually support earlier detection, prevention, and personalized guidance.

### Roadmap Found
- Phase 1: Consumer gut-health companion with stool photo logging, AI classification, Bristol score tracking, personalized gut score, and food-symptom correlation.
- Phase 2: Clinical risk prediction, including digestive-disorder alerts, IBD risk prediction, colorectal-cancer risk flagging, and screening recommendations.
- Phase 3: Precision gut-health platform integrating FIT tests, microbiome sequencing, blood biomarkers, and colonoscopy reports.

### Business Model Found
- Subscription: premium membership around GBP 9.99-19.99/month.
- Marketplace revenue sharing with microbiome labs, FIT providers, and nutrition programs.
- B2B anonymized aggregated data platform for research institutions, pharma companies, and digital-health partners.

### Useful Landing Page Angle
For ZenTech company site, position this as:
"An AI gut-health companion that helps users track stool, food, symptoms, and trends over time, turning daily digestive signals into personal insights."

## Product Direction 3: Future Patient-Experience Products

### Short Positioning
ZenTech plans to develop more software and hardware products in healthcare, with a focus on improving patient experience.

### Strategic Thesis
Healthcare has many unmet needs where patients feel confused, anxious, underserved, or disconnected from care. In the AI era, better software, connected devices, and human-centered design can improve how patients understand, monitor, and manage their health.

### Opportunity Areas
- Patient-facing health companions.
- Home monitoring and self-tracking hardware.
- Tools that help patients prepare for appointments and explain symptoms more clearly.
- Products that reduce friction between daily life and clinical care.
- Software that turns fragmented health signals into clearer patient journeys.

### Landing Page Angle
For the current ZenTech company site, this should appear as an upcoming product category rather than a finished product:
"Upcoming: patient-experience software and hardware that make healthcare easier to understand, monitor, and live with."

## Product Direction 4: Smart Driver Audio Assistant Prototype

### Short Positioning
A smart in-car audio assistant connected to a live road camera. The assistant can talk with drivers, capture unsafe driving incidents, and help report dangerous or unlawful behavior on highways through voice command.

### Target Market
- Petrol car drivers who do not have advanced built-in smart assistant systems.
- Drivers who want safer, hands-free incident capture.
- The broader smart assistant and driver-safety market.

### Core Problem
- Many drivers see unsafe or aggressive behavior on highways but cannot safely capture or report it while driving.
- Dashcams record passively, but they often require manual review after the fact.
- Existing smart car assistants are mostly concentrated in newer or electric vehicles, leaving a large petrol-car market underserved.

### Prototype Concept
The driver can speak a command such as:
"Report that car" or "Save the last 30 seconds."

The system would:
- Use the live camera feed to capture the relevant car or incident.
- Save photos and/or short video clips.
- Use audio interaction so the driver can stay hands-free.
- Package incident evidence with time/location metadata where allowed.
- Potentially send a report to relevant authorities or prepare a report for user confirmation.

### Important Safety And Compliance Notes
- Any final product would need careful legal review by market because road-reporting rules, privacy laws, video recording rules, and police/authority submission systems vary by country.
- The product should avoid distracting the driver and should prioritize hands-free, low-cognitive-load interaction.
- Automated reporting should likely require user confirmation before submission.

### Landing Page Angle
For now, this should be presented as a prototype / concept:
"Prototype: a voice-first road safety assistant for drivers, combining live camera capture with hands-free incident reporting."

## Sources Reviewed

### Google Drive
- `Research collection_ZenTech Gut Health`
- `【早点上岸】微信小程序最终交付会议 Check List（详细版）`
- `20250830-早点上岸团队第一次会议-整体推广策略`
- `推广计划`
- `问卷2.0`
- `导师入驻合作条款v2.0`
- `导师入驻合作条款v3.0`
- `导师入驻欢迎包`
- `阅读-导师资料填写模板与建议.docx`

### Local Laptop
- `/Users/user/Desktop/04_项目与工作/早点上岸小程序banner文案.docx`
- `/Users/user/Desktop/04_项目与工作/早点上岸_推广计划会议Agenda.docx`
- `/Users/user/Desktop/04_项目与工作/早点上岸_导师入驻欢迎包.docx`
- `/Users/user/Desktop/04_项目与工作/早点上岸_导师Profile填写模板.docx`
- `/Users/user/Desktop/早点上岸/`
- `/Users/user/Desktop/06_音频与视频/Gut Health Transformation Journey-VEED.mp4`

### Lovable
- Project: `7e7cd539-b8a4-4194-8d53-08e3ae9b0936`
- Key files inspected:
  - `src/App.tsx`
  - `src/components/StoolTracker.tsx`
  - `src/components/FoodDiary.tsx`
  - `src/components/Analytics.tsx`
  - `src/components/GutHealthCoach.tsx`
  - `src/components/AuthGuard.tsx`

## Landing Page Implications

The ZenTech landing page should present the company as a human-centered technology studio building products around unmet needs in the AI era.

Product pillars:

1. Career mobility for overseas Chinese job seekers.
2. Preventive gut-health tracking and longitudinal health insights.
3. Upcoming patient-experience software and hardware.
4. Smart mobility / road-safety assistant prototype.

The site should include:
- A company hero introducing ZenTech as "technology good for humans."
- Two product sections with strong visual demos.
- A smaller "Upcoming" section for future healthcare and smart mobility concepts.
- Separate CTAs for each product.
- A shared "register interest / free trial" form where visitors choose which product they want.
- Product demo screenshots/video blocks.
- A credibility section: founder background, Microsoft for Startups credits, product stage, and advisory/partnership interest.
- Privacy-sensitive wording for gut health, avoiding diagnosis claims unless clinically validated.
- Compliance-sensitive wording for driver reporting, avoiding claims that reports will automatically be accepted by authorities.
