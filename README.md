# NutriForge

> Adaptive nutrition intelligence. Not a calorie counter — a structured body transformation system.

![NutriForge](public/favicon.png)

---

## What is NutriForge?

NutriForge calculates your personalised calorie and macro targets using the **Mifflin-St Jeor formula**, scores your daily adherence with a **Discipline Score (0–100)**, tracks your weight trends, and suggests adaptive calorie adjustments — all without a backend. It runs entirely in the browser with optional cloud sync via Supabase.

---

## Features

### Nutrition Engine
- BMR + TDEE calculated with Mifflin-St Jeor (male/female)
- 5 activity level multipliers
- Phase-based calorie targets: **Cut** (−500 kcal) · **Bulk** (+300 kcal) · **Maintain** (±0)
- Macro splits auto-set per phase; protein capped at 2.2g/kg bodyweight
- Adaptive suggestions based on 2-week weight trend

### Meal Logging
- 150+ food database with smart units (grams / ml / pieces)
- 80+ Indian foods — dal, biryani, roti, dosa, samosa, lassi and more
- Custom entry for any food not in the database
- Portion presets + live nutrition preview
- Inline edit and delete per meal
- Bulk sync to Supabase when logger closes (efficient requests)

### Analytics
- Discipline Score — 40% calorie accuracy + 40% macro adherence + 20% streak
- GitHub-style 16-week consistency heatmap
- Calorie bar chart (last 7 days vs target)
- Macro trend area chart (protein / carbs / fat split)
- Weight progress line chart
- Weekly summary with smart insights

### Weight Tracking
- Daily weight logging with 14-day editable calendar
- Tap any day to add or edit past entries
- Line chart appears after 2+ entries
- History list with edit and delete

### Auth & Sync
- **Magic link** (passwordless) sign in via Supabase
- **Persistent sessions** — stays logged in for 60 days, no repeated sign-ins
- Cross-device sync — profile, meals (90 days), weight log
- **Fully offline** — everything works without internet via localStorage
- Row-Level Security — users can only access their own data

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite 5 | UI framework + bundler |
| React Router 6 | Client-side routing |
| Tailwind CSS 3 | Styling + design tokens |
| Recharts 2 | Charts and data visualisation |
| Supabase JS | Auth (magic link) + Postgres sync |
| Vercel | Hosting + serverless API proxy |
| USDA FoodData API | Food nutrition database |

**Fonts:** Bebas Neue (display) · DM Sans (body) · JetBrains Mono (numbers)

---

## Project Structure

```
nutriforge/
├── public/
│   ├── index.html
│   └── favicon.png
└── src/
    ├── App.jsx                  # Router + auth + sync
    ├── lib/
    │   └── supabase.js          # Supabase client (persistent sessions)
    ├── hooks/
    │   ├── useAuth.js           # Login, logout, session
    │   ├── useMeals.js          # Meal CRUD + totals
    │   ├── useProfile.js        # Profile read/write
    │   ├── useSync.js           # Push/pull Supabase
    │   ├── useWeight.js         # Weight log CRUD
    │   └── useAnalytics.js      # Weekly aggregations
    ├── utils/
    │   ├── calculations.js      # BMR, TDEE, macros
    │   ├── disciplineScore.js   # 0–100 score algorithm
    │   ├── adaptiveSuggestions.js
    │   └── dateHelpers.js
    ├── constants/
    │   ├── foodDatabase.js      # 150+ foods with units
    │   └── macroRatios.js       # Macro splits + activity multipliers
    ├── pages/
    │   ├── Hero.jsx             # / — always the landing page
    │   ├── Login.jsx            # /login
    │   ├── Onboarding.jsx       # /onboarding
    │   ├── Dashboard.jsx        # /dashboard
    │   ├── MealLog.jsx          # /log
    │   ├── Analytics.jsx        # /analytics
    │   └── Settings.jsx         # /settings
    ├── components/
    │   ├── layout/              # Sidebar, TopBar, Layout
    │   ├── dashboard/           # MacroRing, DisciplineScore, PhaseCard, TodaySummary
    │   ├── meals/               # MealLogger, MealList, MealItem
    │   ├── analytics/           # Charts + ConsistencyCalendar + WeeklySummary
    │   ├── feedback/            # AdaptiveAlert, MacroFeedback
    │   └── settings/            # ProfileForm, GoalSelector, TargetDisplay, WeightTracker
    └── styles/
        └── index.css
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/yourusername/nutriforge.git
cd nutriforge
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_USDA_API_KEY=your_usda_key_here
```

- **Supabase keys** — [supabase.com](https://supabase.com) → Project → Settings → API
- **USDA key** — [fdc.nal.usda.gov/api-key-signup](https://fdc.nal.usda.gov/api-key-signup) (free, instant)

### 3. Set up Supabase

Run this in your Supabase **SQL Editor**:

```sql
-- Profiles
create table profiles (
  id uuid references auth.users primary key,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users own their profile"
  on profiles for all using (auth.uid() = id);

-- Meals
create table meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  date text not null,
  data jsonb not null default '[]',
  updated_at timestamptz default now(),
  unique(user_id, date)
);
alter table meals enable row level security;
create policy "Users own their meals"
  on meals for all using (auth.uid() = user_id);

-- Weight log
create table weight_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  date text not null,
  weight numeric not null,
  unique(user_id, date)
);
alter table weight_log enable row level security;
create policy "Users own their weight"
  on weight_log for all using (auth.uid() = user_id);
```

Then in Supabase dashboard:
- **Auth → Providers → Email** — enable magic links, disable email confirmation
- **Auth → URL Configuration** — add `http://localhost:5173` and your production URL
- **Auth → Sessions** — set JWT expiry to `604800` (7 days)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel → Settings → Environment Variables
4. Deploy — done

The `vercel.json` and `api/food-search.js` are already configured.

---

## How Sync Works

NutriForge is **offline-first**. All data is saved to `localStorage` immediately, then synced to Supabase in the background when the user is logged in.

| localStorage key | Content |
|---|---|
| `nf_profile` | User profile JSON |
| `nf_meals_YYYY-MM-DD` | Meals array per day |
| `nf_weight_log` | Weight entries array |

Sync is batched and debounced to minimise Supabase requests (~5–8 per day, well within the free tier of 500k/month).

---

## Algorithms

**BMR (Mifflin-St Jeor)**
```
Male:   10×weight(kg) + 6.25×height(cm) − 5×age + 5
Female: 10×weight(kg) + 6.25×height(cm) − 5×age − 161
```

**TDEE** = BMR × activity multiplier (1.2 → 1.9)

**Discipline Score**
```
score = (calorie accuracy × 0.4) + (macro adherence × 0.4) + (streak × 0.2)
```

**Adaptive suggestion** — compares 2-week weight trend to goal:
- Cut + stalled → decrease 150 kcal
- Cut + losing too fast → increase 100 kcal
- Bulk + not gaining → increase 150 kcal
- Bulk + gaining too fast → decrease 100 kcal

---

## License

MIT
