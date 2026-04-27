"use client";
import { useState, useCallback } from "react";

const SECTIONS = [
  {
    id: "observation",
    title: "Behavioral Observation",
    subtitle: "General attentiveness during interview",
    instructions:
      "Rate the following based on direct observation during the clinical encounter. These items do not require formal testing.",
    items: [
      {
        id: "obs_1",
        text: "Patient awareness of purpose of examination and current situation",
        anchors: [
          "Unaware of purpose/situation",
          "Vaguely aware",
          "Partially oriented to situation",
          "Mostly aware",
          "Fully oriented to situation and purpose",
        ],
      },
      {
        id: "obs_2",
        text: "Conversational coherence — ability to maintain logical thread without rambling or contradiction",
        anchors: [
          "Incoherent / frequent contradictions",
          "Frequent tangentiality",
          "Occasional drift from topic",
          "Mostly coherent",
          "Fully coherent and goal-directed",
        ],
      },
      {
        id: "obs_3",
        text: "Sustained engagement — maintains attention throughout interview without external redirection",
        anchors: [
          "Cannot sustain beyond seconds",
          "Frequent disengagement",
          "Intermittent lapses",
          "Mostly sustained",
          "Fully sustained throughout",
        ],
      },
      {
        id: "obs_4",
        text: "Psychomotor presentation (hypoactivity, hyperactivity, tremor, myoclonus, or other movement abnormalities)",
        anchors: [
          "Marked abnormality",
          "Moderate abnormality",
          "Mild abnormality",
          "Questionable finding",
          "No abnormality observed",
        ],
      },
      {
        id: "obs_5",
        text: 'Subjective report — does the patient describe their thinking as "foggy/cloudy" vs "sharp/clear"?',
        anchors: [
          "Reports marked fogginess",
          "Reports moderate fogginess",
          "Reports mild fogginess",
          "Reports mostly clear",
          "Reports sharp and clear",
        ],
      },
      {
        id: "obs_6",
        text: "Facial expression and apparent perplexity (wide-eyed, bewildered appearance)",
        anchors: [
          "Markedly perplexed",
          "Moderately perplexed",
          "Mildly perplexed",
          "Questionable",
          "Alert and appropriate",
        ],
      },
    ],
  },
  {
    id: "orientation",
    title: "Orientation",
    subtitle: "Temporal, spatial, situational, and personal",
    instructions:
      "Prevent patient from consulting watches, calendars, phones, or asking others. Normal ranges: within 4 hours of current time, 3 days of date, 2 days of day-of-week, and correct month/year.",
    items: [
      {
        id: "ori_1",
        text: "Temporal — day of week, date, month, year, season, and approximate current time",
        anchors: [
          "Disoriented to most elements",
          "Knows month/year only",
          "Knows month/year + day of week",
          "Off by ≤3 days on date",
          "Fully oriented within normal limits",
        ],
      },
      {
        id: "ori_2",
        text: "Functional time sense — awareness of passage of time (distinct from knowing the calendar date)",
        anchors: [
          "No sense of time passage",
          "Markedly impaired",
          "Moderately impaired",
          "Mildly impaired",
          "Intact functional time sense",
        ],
      },
      {
        id: "ori_3",
        text: "Place — type of facility, name of facility, city/neighborhood, state",
        anchors: [
          "Disoriented to type of place",
          "Knows type but not name/location",
          "Knows type and name, not locale",
          "Minor error (e.g., wrong floor/ward)",
          "Fully oriented to place",
        ],
      },
      {
        id: "ori_4",
        text: "Directional/spatial — can describe location of home relative to clinic, direction of travel, estimated travel time",
        anchors: [
          "Cannot describe any spatial relations",
          "Markedly impaired",
          "Moderately impaired",
          "Mildly impaired",
          "Intact spatial/directional orientation",
        ],
      },
      {
        id: "ori_5",
        text: "Situational — reason for visit, current clinical context",
        anchors: [
          "No awareness of reason for visit",
          "Vague/incorrect understanding",
          "Partial understanding",
          "Mostly accurate",
          "Fully aware of situation and reason",
        ],
      },
      {
        id: "ori_6",
        text: "Personal (autopsychic) — name, age, biographical details",
        anchors: [
          "Cannot provide personal details",
          "Markedly impaired",
          "Moderately impaired",
          "Minor inaccuracies",
          "Fully oriented to self",
        ],
      },
    ],
  },
  {
    id: "attentional_tasks",
    title: "Structured Attentional Tasks",
    subtitle: "Serial recitation, continuous performance, and spatial tasks",
    instructions:
      'Administer 3–4 different types of attentional tasks and mentally "factor analyze" the common denominator. These are supplementary to clinical observation, not a replacement. Maintain a non-threatening atmosphere.',
    items: [
      {
        id: "task_1",
        text: "Digit Span Forward — serial recitation (normal ≥ 5 digits)",
        administration: "Read a sequence of random digits aloud at a rate of one per second (avoid rhythmic grouping). Start with 3 digits. After each correct repetition, increase by one digit. Give two trials at each length. Record the longest span correctly repeated on at least one of two trials. Use different digit sequences for each trial. Avoid sequences that form recognizable patterns (e.g., 1-2-3) or phone-number-like groupings.",
        anchors: [
          "≤2 digits",
          "3 digits",
          "4 digits",
          "5 digits",
          "≥6 digits",
        ],
      },
      {
        id: "task_2",
        text: "Digit Span Backward — working memory component (normal ≥ 3 digits)",
        administration: "Read a sequence of random digits aloud at one per second. Ask the patient to repeat them in reverse order. Demonstrate with a 2-digit example first (e.g., \"If I say 3-8, you say 8-3\"). Start with 2 digits. Increase by one digit after each correct reversal. Give two trials at each length. Record the longest span correctly reversed. This task loads on working memory in addition to attention — a forward-backward discrepancy of >2 digits suggests a working memory deficit beyond simple attentional impairment.",
        anchors: [
          "Unable to perform",
          "2 digits",
          "3 digits",
          "4 digits",
          "≥5 digits",
        ],
      },
      {
        id: "task_3",
        text: 'Continuous Performance — "A" vigilance task or similar (sustained attention over ≥2 minutes)',
        administration: "Bedside version (\"A\" vigilance task): Read aloud a series of random letters at a rate of one per second for at least 2 minutes (longer is more sensitive). Instruct the patient to tap the table or raise a hand each time they hear the letter \"A.\" Use a list with ~10% target frequency (roughly 1 \"A\" per 10 letters). Record omission errors (missed targets), commission errors (responses to non-targets), and whether performance degrades over time. A time-on-task decline (more errors in the second half) specifically implicates sustained attention rather than selective attention. Alternative: use the letter \"E\" as the target if the patient's name starts with \"A.\"",
        anchors: [
          "Unable to engage with task",
          "Multiple omissions and commissions",
          "Several errors, declining with time",
          "Few errors, stable performance",
          "Accurate and consistent throughout",
        ],
      },
      {
        id: "task_4",
        text: "Serial 7s or Serial 3s — sustained calculation (assess for both accuracy and consistency)",
        administration: "Ask the patient to subtract 7 from 100 and keep subtracting 7 from each result (100, 93, 86, 79, 72, 65...). Allow self-correction. If the patient cannot perform serial 7s, switch to serial 3s from 50 (50, 47, 44, 41, 38...). Record both accuracy and consistency — a patient who makes one early arithmetic error but continues subtracting correctly from their wrong answer is showing intact attention with a calculation error, which is a different finding than random or deteriorating responses. Note whether the patient loses track of the task itself (attentional failure) vs. makes arithmetic mistakes (calculation error).",
        anchors: [
          "Unable to begin",
          "≤2 correct before stopping",
          "3–4 correct with errors",
          "Mostly correct, occasional error",
          "Accurate and fluent",
        ],
      },
      {
        id: "task_5",
        text: "Months/days backward — overlearned sequence reversal",
        administration: "Ask the patient to recite the months of the year backward starting from December, or the days of the week backward starting from Saturday. These are overlearned sequences, so the primary demand is attentional control rather than memory or calculation. Time the response — healthy adults typically complete months backward in under 30 seconds. Note whether errors are sequencing errors (skipping a month), perseverations (repeating), or complete derailment (switching to forward). Days backward is easier and can be used as a fallback. Self-corrections should be noted but count as intact performance.",
        anchors: [
          "Unable to perform",
          "Marked difficulty, multiple errors",
          "Moderate difficulty",
          "Mild difficulty or self-corrects",
          "Fluent and accurate",
        ],
      },
      {
        id: "task_6",
        text: "Interviewability probe — ability to count raised fingers on examiner's hands",
        administration: "Hold up both hands and display a random number of raised fingers (vary between trials). Ask the patient to state the total number. This is a basic screening probe for whether the patient can engage with even simple directed tasks — it assesses visual attention, counting, and task comprehension simultaneously. It requires minimal language, making it useful for patients with aphasia or limited English. If the patient fails this, more complex attentional tasks are unlikely to yield valid results. Use 3–5 trials with varying numbers.",
        anchors: [
          "Unable to perform",
          "Frequent errors",
          "Occasional errors",
          "Accurate but slow",
          "Accurate and prompt",
        ],
      },
    ],
  },
  {
    id: "attentional_dynamics",
    title: "Attentional Dynamics",
    subtitle: "Tenacity, vigilance, variability, and qualitative features",
    instructions:
      "Assess based on the full encounter. Tenacity = concentration/fixation on a target. Vigilance (descriptive psychopathology sense) = mobility/shifting of attention. These often move in opposite directions.",
    items: [
      {
        id: "dyn_1",
        text: "Tenacity — ability to sustain focused concentration on a single target or topic",
        anchors: [
          "Hypotenacity — cannot fix attention",
          "Reduced tenacity",
          "Normal tenacity",
          "Mildly increased tenacity",
          "Hypertenacity — rigidly fixated",
        ],
      },
      {
        id: "dyn_2",
        text: "Vigilance (mobility) — ability to appropriately shift attention to new relevant stimuli",
        anchors: [
          "Hypovigilance — fails to shift",
          "Reduced shifting",
          "Normal mobility",
          "Increased shifting",
          "Hypervigilance — shifts to every stimulus",
        ],
      },
      {
        id: "dyn_3",
        text: "Attentional variability — moment-to-moment fluctuation in performance during the encounter",
        anchors: [
          "Extreme fluctuation",
          "Marked fluctuation",
          "Moderate fluctuation",
          "Mild fluctuation",
          "Stable and consistent",
        ],
      },
      {
        id: "dyn_4",
        text: "Attentional depolarization — evidence of intensified inward-directed attention mimicking external inattention (e.g., preoccupation with obsessions, somatic concerns, or internal experiences)",
        anchors: [
          "Markedly absorbed internally",
          "Frequently absorbed",
          "Occasionally absorbed",
          "Questionable",
          "No evidence of internal absorption",
        ],
      },
      {
        id: "dyn_5",
        text: "Distractibility vs. distraction — is the apparent inattention due to inability to filter irrelevant stimuli (distractibility) or intense concentration on specific content (distraction)?",
        anchors: [
          "Clear distractibility",
          "Predominantly distractibility",
          "Mixed / uncertain",
          "Predominantly distraction",
          "Clear distraction (concentrated elsewhere)",
        ],
        isQualitative: true,
      },
      {
        id: "dyn_7",
        text: "Qualitative phenomenology of inattention — what is the subjective 'flavor' of the attentional difficulty?",
        anchors: [
          "Wants to act but can't initiate",
          "No perceived point / amotivation",
          "Internally absorbed / preoccupied",
          "Anxious overcontrol / paralysis",
          "No subjective difficulty reported",
        ],
        isQualitative: true,
        administration: "Ask the patient to describe what happens when they try to focus or complete a task. Key probes: \"When you can't concentrate, what does it feel like inside?\" \"Do you want to do the task but feel stuck, or does the task just not seem worth doing?\" \"Are you thinking about something else instead, or is your mind blank?\" The goal is to distinguish between: (1) ADHD-pattern — 'I desperately want to start but I just can't make myself, it's like being stuck behind glass'; (2) Depression-pattern — 'I don't see the point, nothing seems worth the effort, everything feels flat'; (3) OCD/anxiety-pattern — 'I'm caught up thinking about [obsessional content / worries / somatic symptoms]'; (4) Anxiety-driven overcontrol — 'I spend all my time making lists and organizing to avoid making mistakes but never actually get to the task.' These patterns have different treatment implications.",
      },
      {
        id: "dyn_8",
        text: "Hot executive function — capacity for self-regulation in emotionally or motivationally charged contexts (reward sensitivity, impulse control under arousal, decision-making with stakes)",
        anchors: [
          "Severe dysregulation under emotional load",
          "Frequent impulsive/reward-driven failures",
          "Occasional lapses in emotionally charged contexts",
          "Mild difficulty, generally compensates",
          "Intact regulation across contexts",
        ],
        administration: "This assesses affectively-loaded executive control — distinct from the 'cool' cognitive tasks above (digit span, serial 7s) which are emotionally neutral. Probe with questions about real-world decision-making: \"Do you find it harder to think clearly when you're upset or excited?\" \"Have you made decisions you regret when emotions were running high?\" \"Is it harder to resist something tempting when you're stressed?\" Also observe: Does the patient's cognitive performance change when discussing emotionally charged material vs. neutral topics? A patient who passes all structured tasks but reports severe real-world self-regulation failures may have selective hot EF impairment with preserved cool EF — a pattern strongly associated with the hyperactive/impulsive ADHD subtype, addictions, and borderline personality features. The reverse pattern (cool EF impaired, hot EF intact) is more characteristic of inattentive-type ADHD and some neurocognitive conditions.",
      },
      {
        id: "dyn_9",
        text: "Metacognitive accuracy — does the patient's self-assessment of their attentional/cognitive abilities match observed performance?",
        anchors: [
          "Marked overconfidence (reports intact, performs poorly)",
          "Mild overconfidence",
          "Accurate self-assessment",
          "Mild underconfidence (catastrophizes deficits)",
          "Marked underconfidence (reports severe impairment, performs normally)",
        ],
        isQualitative: true,
        administration: "Compare the patient's subjective report of their cognitive abilities with their actual observed and tested performance. Ask: \"How would you rate your concentration and memory right now — good, fair, or poor?\" Then compare this self-rating against objective findings. Overconfidence (reports 'fine' but performs poorly) is associated with compulsive phenotypes and anosognosia; these patients tend to under-use compensatory strategies like reminders and external aids, which has direct treatment implications — they may need psychoeducation about their actual cognitive profile. Underconfidence (reports severe impairment but performs normally) is common in depression and anxiety, and may indicate that the subjective complaint is driven by mood state or cognitive distortions rather than true attentional impairment. Both directions of mismatch are clinically meaningful.",
      },
      {
        id: "dyn_6",
        text: "Attentional bias — attention captured by disorder-specific stimuli (e.g., substance cues, threat cues, somatic sensations)",
        anchors: [
          "Marked bias observed",
          "Moderate bias",
          "Mild bias",
          "Questionable",
          "No bias observed",
        ],
      },
    ],
  },
  {
    id: "context",
    title: "Contextual Modifiers",
    subtitle: "Factors affecting attentional performance",
    instructions:
      "Document factors that may be contributing to attentional findings. These inform interpretation rather than scoring.",
    items: [
      {
        id: "ctx_1",
        text: "Sleep status — hours of sleep in past 24h and recent sleep pattern",
        anchors: [
          "Severe deprivation (<2h)",
          "Moderate deprivation (2–4h)",
          "Mild deprivation (4–6h)",
          "Adequate (6–7h)",
          "Well-rested (≥7h)",
        ],
      },
      {
        id: "ctx_2",
        text: "Acute stress level at time of assessment",
        anchors: [
          "Severe acute stress",
          "Moderate stress",
          "Mild stress",
          "Minimal stress",
          "Calm/relaxed",
        ],
      },
      {
        id: "ctx_3",
        text: "Medication effects — current psychotropic or other medications with known attentional impact",
        anchors: [
          "Likely significant impact",
          "Probable moderate impact",
          "Possible mild impact",
          "Unlikely impact",
          "No relevant medications",
        ],
      },
      {
        id: "ctx_4",
        text: "Substance use — recent use of substances with attentional effects",
        anchors: [
          "Active intoxication/withdrawal",
          "Recent use (<24h)",
          "Recent use (24–72h)",
          "Remote use",
          "No recent use",
        ],
      },
      {
        id: "ctx_5",
        text: "Time on task — was attentional performance stable or declining as the assessment progressed?",
        anchors: [
          "Rapid early decline",
          "Progressive decline",
          "Mild late decline",
          "Stable throughout",
          "Improved with engagement",
        ],
      },
      {
        id: "ctx_6",
        text: "Developmental history — onset and chronicity of attentional complaints",
        anchors: [
          "Lifelong / childhood onset",
          "Adolescent onset",
          "Adult onset, chronic",
          "Recent onset (weeks–months)",
          "Acute onset (days)",
        ],
        isQualitative: true,
        administration: "Ask: \"Have you always had trouble with focus, or is this new?\" \"Did teachers or parents comment on your attention as a child?\" \"When did you first notice this was a problem?\" Childhood-onset, persistent attentional difficulty is a necessary (though not sufficient) criterion for ADHD. Adult or recent onset points toward mood disorders, anxiety, substance effects, medical conditions, or early neurocognitive decline. Acute onset (days) should raise immediate concern for delirium, substance intoxication/withdrawal, or acute psychiatric crisis. Note: ADHD can be 'masked' in childhood by high structure or intelligence, so absence of childhood complaints does not definitively rule it out, but presence of childhood complaints strongly supports it.",
      },
      {
        id: "ctx_7",
        text: "Cross-context pattern — does the attentional difficulty manifest across settings or is it context-specific?",
        anchors: [
          "Isolated to one context",
          "Primarily one setting, mild in others",
          "Two settings affected",
          "Most settings affected",
          "Pervasive across all contexts",
        ],
        isQualitative: true,
        administration: "Ask about attention/concentration at work, at home, in social settings, and during leisure activities. ADHD-pattern dysfunction typically shows friction across multiple settings (though severity may vary — many patients function better in novel or high-stakes environments). Context-specific dysfunction suggests the attentional difficulty may be driven by the emotional/motivational characteristics of that setting (e.g., anxiety-driven disorganization at work but not at home; depression-related amotivation at home but functional at work due to external structure). Also probe for interest-based variation: \"Are there things you can focus on easily?\" The ability to hyperfocus on novel/rewarding tasks while being completely blocked by routine/low-reward tasks is characteristic of ADHD, while global inability regardless of interest or reward is more suggestive of depression, delirium, or cognitive decline.",
      },
    ],
  },
];

function getSeverityColor(score) {
  if (score === null) return "var(--c-border)";
  if (score <= 1) return "#c0392b";
  if (score <= 2) return "#e67e22";
  if (score <= 3) return "#f1c40f";
  if (score <= 4) return "#27ae60";
  return "#2980b9";
}

function getSeverityLabel(score) {
  if (score === null) return "—";
  if (score <= 1) return "Severe";
  if (score <= 2) return "Moderate";
  if (score <= 3) return "Mild";
  if (score <= 4) return "Normal";
  return "Intact";
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=DM+Sans:wght@400;500;600&display=swap');

  :root {
    --c-bg: #faf9f7;
    --c-surface: #ffffff;
    --c-text: #1a1a1a;
    --c-text-secondary: #5a5a5a;
    --c-text-muted: #8a8a8a;
    --c-border: #e0ddd8;
    --c-border-light: #eeedea;
    --c-accent: #2c5f4a;
    --c-accent-light: #e8f0ec;
    --c-accent-hover: #1e4535;
    --c-warn: #c0392b;
    --c-warn-bg: #fdf0ef;
    --font-display: 'Source Serif 4', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --radius: 8px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    font-family: var(--font-body);
    color: var(--c-text);
    background: var(--c-bg);
    min-height: 100vh;
    padding: 24px 16px 80px;
    max-width: 820px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 2px solid var(--c-accent);
  }

  .header h1 {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--c-accent);
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .header .subtitle {
    font-size: 0.85rem;
    color: var(--c-text-muted);
    margin-top: 6px;
  }

  .header .draft-badge {
    display: inline-block;
    background: var(--c-warn-bg);
    color: var(--c-warn);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 3px 10px;
    border-radius: 100px;
    margin-top: 10px;
  }

  .patient-bar {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .patient-bar input {
    flex: 1;
    min-width: 140px;
    font-family: var(--font-body);
    font-size: 0.85rem;
    padding: 8px 12px;
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    background: var(--c-surface);
    color: var(--c-text);
    outline: none;
    transition: border-color 0.2s;
  }

  .patient-bar input:focus {
    border-color: var(--c-accent);
  }

  .section {
    margin-bottom: 28px;
    background: var(--c-surface);
    border-radius: var(--radius);
    border: 1px solid var(--c-border-light);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .section-header {
    padding: 16px 20px 12px;
    border-bottom: 1px solid var(--c-border-light);
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .section-header:hover {
    background: var(--c-accent-light);
  }

  .section-header h2 {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--c-accent);
    line-height: 1.3;
  }

  .section-header .section-sub {
    font-size: 0.78rem;
    color: var(--c-text-muted);
    margin-top: 2px;
  }

  .section-header .section-score {
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    padding: 4px 10px;
    border-radius: 100px;
    color: white;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .section-header .chevron {
    font-size: 1.1rem;
    color: var(--c-text-muted);
    flex-shrink: 0;
    transition: transform 0.2s;
    margin-top: 4px;
  }

  .section-header .chevron.open {
    transform: rotate(180deg);
  }

  .section-instructions {
    padding: 12px 20px;
    background: var(--c-accent-light);
    font-size: 0.8rem;
    color: var(--c-accent);
    line-height: 1.5;
    border-bottom: 1px solid var(--c-border-light);
  }

  .section-body {
    padding: 8px 0;
  }

  .item {
    padding: 14px 20px;
    border-bottom: 1px solid var(--c-border-light);
  }

  .item:last-child {
    border-bottom: none;
  }

  .item-text {
    font-size: 0.85rem;
    color: var(--c-text);
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .admin-details {
    margin-bottom: 10px;
  }

  .admin-summary {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--c-accent);
    cursor: pointer;
    padding: 4px 0;
    user-select: none;
    list-style: none;
  }

  .admin-summary::-webkit-details-marker {
    display: none;
  }

  .admin-summary::before {
    content: "▸ ";
    font-size: 0.7rem;
  }

  details[open] > .admin-summary::before {
    content: "▾ ";
  }

  .admin-body {
    font-size: 0.78rem;
    color: var(--c-text-secondary);
    line-height: 1.6;
    padding: 8px 12px;
    margin-top: 4px;
    background: #f8f7f5;
    border-left: 3px solid var(--c-accent);
    border-radius: 0 var(--radius) var(--radius) 0;
  }

  .rating-row {
    display: flex;
    gap: 6px;
    align-items: stretch;
  }

  .rating-btn {
    flex: 1;
    padding: 6px 4px;
    font-family: var(--font-body);
    font-size: 0.68rem;
    line-height: 1.3;
    border: 1.5px solid var(--c-border);
    border-radius: 6px;
    background: var(--c-surface);
    color: var(--c-text-secondary);
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rating-btn:hover {
    border-color: var(--c-accent);
    background: var(--c-accent-light);
  }

  .rating-btn.selected {
    border-color: var(--c-accent);
    background: var(--c-accent);
    color: white;
    font-weight: 600;
  }

  .rating-btn .score-num {
    display: block;
    font-weight: 700;
    font-size: 0.85rem;
    margin-bottom: 2px;
  }

  .summary-section {
    margin-top: 32px;
    background: var(--c-surface);
    border-radius: var(--radius);
    border: 1px solid var(--c-border-light);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  .summary-header {
    padding: 16px 20px;
    background: var(--c-accent);
    color: white;
  }

  .summary-header h2 {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 600;
  }

  .summary-body {
    padding: 20px;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }

  .summary-card {
    padding: 14px;
    border-radius: var(--radius);
    border: 1px solid var(--c-border-light);
    text-align: center;
  }

  .summary-card .card-label {
    font-size: 0.72rem;
    color: var(--c-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
  }

  .summary-card .card-score {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
  }

  .summary-card .card-severity {
    font-size: 0.75rem;
    font-weight: 600;
    margin-top: 2px;
  }

  .formulation-section {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 2px solid var(--c-accent);
  }

  .formulation-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--c-accent);
    margin-bottom: 16px;
  }

  .form-field {
    margin-bottom: 18px;
  }

  .form-label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--c-text);
    margin-bottom: 4px;
  }

  .form-hint {
    display: block;
    font-weight: 400;
    font-size: 0.75rem;
    color: var(--c-text-muted);
    margin-top: 2px;
    margin-bottom: 8px;
  }

  .form-options {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
  }

  .form-chip {
    font-family: var(--font-body);
    font-size: 0.75rem;
    padding: 5px 12px;
    border: 1.5px solid var(--c-border);
    border-radius: 100px;
    background: var(--c-surface);
    color: var(--c-text-secondary);
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
  }

  .form-chip:hover {
    border-color: var(--c-accent);
    color: var(--c-accent);
  }

  .form-chip-active {
    border-color: var(--c-accent);
    background: var(--c-accent);
    color: white;
    font-weight: 600;
  }

  .form-textarea-sm {
    width: 100%;
    min-height: 52px;
    font-family: var(--font-body);
    font-size: 0.82rem;
    padding: 8px 12px;
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    background: var(--c-surface);
    color: var(--c-text);
    resize: vertical;
    outline: none;
    line-height: 1.5;
    margin-top: 4px;
  }

  .form-textarea-sm:focus {
    border-color: var(--c-accent);
  }

  .form-textarea {
    width: 100%;
    min-height: 72px;
    font-family: var(--font-body);
    font-size: 0.82rem;
    padding: 10px 12px;
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    background: var(--c-surface);
    color: var(--c-text);
    resize: vertical;
    outline: none;
    line-height: 1.5;
  }

  .form-textarea:focus {
    border-color: var(--c-accent);
  }

  .action-bar {
    display: flex;
    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .btn {
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn-primary {
    background: var(--c-accent);
    color: white;
  }

  .btn-primary:hover {
    background: var(--c-accent-hover);
  }

  .btn-secondary {
    background: var(--c-surface);
    color: var(--c-text-secondary);
    border: 1px solid var(--c-border);
  }

  .btn-secondary:hover {
    border-color: var(--c-accent);
    color: var(--c-accent);
  }

  .delirium-flag {
    margin-top: 16px;
    padding: 14px 18px;
    background: var(--c-warn-bg);
    border: 1px solid #e8b4ae;
    border-radius: var(--radius);
    font-size: 0.82rem;
    color: var(--c-warn);
    line-height: 1.5;
  }

  .delirium-flag strong {
    display: block;
    margin-bottom: 4px;
  }

  .tenacity-vigilance-note {
    margin-top: 12px;
    padding: 12px 16px;
    background: #f0f4f8;
    border-radius: var(--radius);
    font-size: 0.78rem;
    color: var(--c-text-secondary);
    line-height: 1.5;
  }

  .citation {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--c-border-light);
    font-size: 0.72rem;
    color: var(--c-text-muted);
    line-height: 1.5;
  }

  .interp-panel {
    margin-top: 16px;
    border-radius: var(--radius);
    border: 1px solid var(--c-border);
    overflow: hidden;
  }

  .interp-header {
    padding: 10px 16px;
    background: #f0f4f8;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    border-bottom: 1px solid var(--c-border-light);
  }

  .interp-icon {
    font-size: 1rem;
    flex-shrink: 0;
  }

  .interp-body {
    padding: 14px 16px;
    font-size: 0.82rem;
    line-height: 1.65;
    color: var(--c-text);
  }

  .interp-body p {
    margin-bottom: 10px;
  }

  .interp-body p:last-child {
    margin-bottom: 0;
  }

  .interp-body strong {
    color: var(--c-text);
  }

  .interp-caveat {
    font-size: 0.75rem;
    color: var(--c-text-muted);
    font-style: italic;
    padding-top: 8px;
    border-top: 1px solid var(--c-border-light);
    margin-top: 12px;
  }

  .interp-discrepancy .interp-header {
    background: #fff8e6;
    border-bottom-color: #f0e0b0;
  }

  .interp-discrepancy {
    border-color: #f0e0b0;
  }

  .interp-orientation .interp-header {
    background: #fdf0ef;
    border-bottom-color: #e8b4ae;
  }

  .interp-orientation {
    border-color: #e8b4ae;
  }

  .interp-variability .interp-header {
    background: #e8f0ec;
    border-bottom-color: #b8d4c4;
  }

  .interp-variability {
    border-color: #b8d4c4;
  }

  .interp-depolarization .interp-header,
  .interp-distraction .interp-header {
    background: #f0f0fa;
    border-bottom-color: #d0d0e8;
  }

  .interp-depolarization,
  .interp-distraction {
    border-color: #d0d0e8;
  }

  .interp-bias .interp-header,
  .interp-fatigue .interp-header {
    background: #fff8e6;
    border-bottom-color: #f0e0b0;
  }

  .interp-bias,
  .interp-fatigue {
    border-color: #f0e0b0;
  }

  .interp-tv {
    border-width: 2px;
  }

  .interp-tv-danger {
    border-color: #c0392b;
  }

  .interp-tv-danger .interp-header {
    background: var(--c-warn-bg);
    border-bottom-color: #e8b4ae;
  }

  .interp-tv-warn {
    border-color: #e67e22;
  }

  .interp-tv-warn .interp-header {
    background: #fef5e7;
    border-bottom-color: #f0d0a0;
  }

  .interp-tv-info {
    border-color: #2980b9;
  }

  .interp-tv-info .interp-header {
    background: #eaf2fa;
    border-bottom-color: #b0d0e8;
  }

  .interp-phenomenology .interp-header {
    background: #f5f0fa;
    border-bottom-color: #d4c8e8;
  }

  .interp-phenomenology {
    border-color: #d4c8e8;
  }

  .interp-hotef .interp-header {
    background: #fef5e7;
    border-bottom-color: #f0d0a0;
  }

  .interp-hotef {
    border-color: #f0d0a0;
  }

  .interp-metacog .interp-header {
    background: #e8f0f8;
    border-bottom-color: #b8d0e4;
  }

  .interp-metacog {
    border-color: #b8d0e4;
  }

  .interp-differential {
    border-color: var(--c-accent);
    border-width: 2px;
  }

  .interp-differential .interp-header {
    background: var(--c-accent-light);
    border-bottom-color: #b8d4c4;
  }

  .diff-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
    margin: 12px 0;
  }

  .diff-card {
    padding: 12px;
    border-radius: var(--radius);
    border: 1px solid var(--c-border);
    background: var(--c-bg);
  }

  .diff-title {
    font-weight: 700;
    font-size: 0.82rem;
    color: var(--c-accent);
    margin-bottom: 6px;
  }

  .diff-features {
    font-size: 0.75rem;
    color: var(--c-text-secondary);
    line-height: 1.55;
    margin-bottom: 8px;
  }

  .diff-check {
    font-size: 0.72rem;
    color: var(--c-text-muted);
    line-height: 1.6;
    padding-top: 6px;
    border-top: 1px solid var(--c-border-light);
    font-family: var(--font-body);
  }
`;

export default function AttentionAssessment() {
  const [scores, setScores] = useState({});
  const [openSections, setOpenSections] = useState({ observation: true });
  const [patientInfo, setPatientInfo] = useState({ name: "", date: "", mrn: "" });
  const [formulation, setFormulation] = useState({
    attribution: "",
    stateVsTrait: "",
    biasTargets: "",
    confounders: "",
    plan: "",
    additionalNotes: "",
  });

  const updateFormulation = useCallback((field, value) => {
    setFormulation((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setScore = useCallback((itemId, value) => {
    setScores((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === value ? null : value,
    }));
  }, []);

  const toggleSection = useCallback((sectionId) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const getSectionAvg = (section) => {
    const rated = section.items
      .filter((i) => !i.isQualitative)
      .map((i) => scores[i.id])
      .filter((v) => v != null);
    if (rated.length === 0) return null;
    return rated.reduce((a, b) => a + b, 0) / rated.length;
  };

  const getSectionCompletion = (section) => {
    const total = section.items.length;
    const done = section.items.filter((i) => scores[i.id] != null).length;
    return `${done}/${total}`;
  };

  // Delirium triad check: hypoprosexia + appearance/perplexity + disorientation
  const checkDeliriumTriad = () => {
    const obsAvg = getSectionAvg(SECTIONS[0]);
    const oriAvg = getSectionAvg(SECTIONS[1]);
    const perplexity = scores["obs_6"];
    if (obsAvg !== null && oriAvg !== null && perplexity !== null) {
      return obsAvg <= 2 && oriAvg <= 2 && perplexity <= 2;
    }
    return false;
  };

  // Tenacity-vigilance pattern — structured output
  const getTenacityVigilancePattern = () => {
    const t = scores["dyn_1"];
    const v = scores["dyn_2"];
    if (t == null || v == null) return null;

    if (t >= 4 && v <= 2) return {
      label: "Hypertenacity + Hypovigilance",
      description: "Attention is rigidly fixed on specific content (often internal) while the capacity to shift to new stimuli is reduced. The patient may appear 'locked in' to a narrow attentional channel.",
      clinicalContext: "This is the classic attentional pattern described in delusional depression and fixed preoccupations. The patient's attention is consumed by rumination, delusional content, or obsessive concerns to the exclusion of environmental stimuli. Bleuler's original framework emphasized this antagonistic relationship between tenacity and vigilance as clinically meaningful.",
      differentials: "Delusional depression, severe OCD with attentional depolarization, catatonic states with fixed gaze, melancholic depression with ruminative preoccupation, paranoid states with hypervigilance narrowed to threat.",
      nextSteps: "Assess content of fixation (delusional themes, obsessional content, somatic preoccupation). Evaluate mood congruence. Screen for psychotic features. Consider whether the attentional pattern is secondary to mood state or primary.",
      severity: "warn"
    };

    if (t <= 2 && v >= 4) return {
      label: "Hypotenacity + Hypervigilance",
      description: "Attention cannot be sustained on any single target, while the patient shifts rapidly and involuntarily to every new stimulus. Concentration is functionally impossible despite apparent alertness.",
      clinicalContext: "This pattern is characteristic of delirium tremens and other hyperactive deliria, acute mania, and severe agitation. The norepinephrine system is typically in overdrive — the orienting response fires indiscriminately. The patient may appear alert or even hyperalert, masking the severity of the attentional impairment if only vigilance (in the behavioral neurology sense of arousal) is assessed.",
      differentials: "Delirium tremens and other substance withdrawal states, hyperactive delirium (any etiology), acute mania with flight of ideas, severe anxiety/panic with attentional fragmentation, stimulant intoxication, akathisia.",
      nextSteps: "Urgent: rule out delirium with CAM/DRS-R-98. Obtain vitals including autonomic signs. Medication reconciliation for withdrawal risk. Consider CIWA-Ar if alcohol-related. Assess for tremor, diaphoresis, autonomic instability. Differentiate from mania by checking orientation and consciousness.",
      severity: "danger"
    };

    if (t <= 2 && v <= 2) return {
      label: "Hypotenacity + Hypovigilance",
      description: "Both concentration and attentional shifting are globally compromised. The patient can neither focus on a target nor appropriately redirect attention. This represents the most severe form of attentional impairment.",
      clinicalContext: "Global attentional collapse suggests a disturbance at the level of consciousness itself — the field of awareness is narrowed, dimmed, or fragmented. This is the pattern most strongly associated with hypoactive delirium, which is frequently missed because the patient may appear quietly cooperative rather than agitated. Combined with disorientation and perplexity, this completes the delirium triad.",
      differentials: "Hypoactive delirium (most common and most missed), obtundation from any cause, severe depression with psychomotor retardation, advanced dementia, postictal states, medication toxicity (especially anticholinergics, benzodiazepines, opioids), metabolic encephalopathy.",
      nextSteps: "High priority: formal delirium screening (CAM, DRS-R-98). Check metabolic panel, CBC, UA, medication levels. Review anticholinergic burden. Assess level of consciousness with GCS or RASS. Nursing observation for fluctuating course (hallmark of delirium). Consider EEG if unclear.",
      severity: "danger"
    };

    if (t >= 4 && v >= 4) return {
      label: "Hypertenacity + Hypervigilance",
      description: "Both concentration and attentional shifting appear heightened. The patient can sustain intense focus while also rapidly detecting and responding to new stimuli. Total attentional capacity appears expanded.",
      clinicalContext: "This pattern corresponds to what classical descriptive psychopathology termed hyperprosexia — a controversial concept describing a global increase in attentional capacity. Most authorities question whether true hyperprosexia exists as a distinct phenomenon, as what appears to be expanded capacity may instead reflect hypomania (where subjective attentional experience is enhanced but objective performance is not), stimulant effects, or anxiety-driven hyperarousal where the 'expansion' is non-volitional. The article notes this construct is characterized by infatigability and persistence.",
      differentials: "Hypomania (early stage, before attentional fragmentation), stimulant use or intoxication, high-performance states in anxiety-prone individuals, flow states in neurodivergent presentations, prodromal mania. Distinguish from normal high-functioning attention by assessing whether the pattern is ego-syntonic, sustainable, and functionally adaptive.",
      nextSteps: "Monitor for evolution into mania (where hypervigilance typically overtakes tenacity as severity increases). Assess sleep patterns — sustained hyperprosexia with decreased sleep need is a red flag for mania. Screen for substance use. Document whether this represents baseline for the patient or a change from prior functioning.",
      severity: "info"
    };

    if (t === 3 && v === 3) return null;
    return null;
  };

  const resetAll = () => {
    setScores({});
    setFormulation({
      attribution: "",
      stateVsTrait: "",
      biasTargets: "",
      confounders: "",
      plan: "",
      additionalNotes: "",
    });
  };

  const [copyStatus, setCopyStatus] = useState("");

  const generateChartText = useCallback(() => {
    const lines = [];
    const hr = "─".repeat(50);

    // Header
    lines.push("CLINICAL ATTENTION ASSESSMENT");
    if (patientInfo.name) lines.push(`Patient: ${patientInfo.name}`);
    if (patientInfo.date) lines.push(`Date: ${patientInfo.date}`);
    if (patientInfo.mrn) lines.push(`Examiner: ${patientInfo.mrn}`);
    lines.push("");

    // Section scores
    lines.push(hr);
    lines.push("DOMAIN SCORES");
    lines.push(hr);
    SECTIONS.forEach((section) => {
      const avg = getSectionAvg(section);
      const completion = getSectionCompletion(section);
      if (avg !== null) {
        lines.push(`${section.title}: ${avg.toFixed(1)}/5 (${getSeverityLabel(avg)}) [${completion} items rated]`);
      } else {
        lines.push(`${section.title}: Not rated [${completion} items rated]`);
      }
    });
    if (globalAvg !== null) {
      lines.push(`Global Composite: ${globalAvg.toFixed(1)}/5 (${getSeverityLabel(globalAvg)})`);
    }
    lines.push("");

    // Individual item scores
    lines.push(hr);
    lines.push("ITEM-LEVEL DETAIL");
    lines.push(hr);
    SECTIONS.forEach((section) => {
      const ratedItems = section.items.filter(i => scores[i.id] != null);
      if (ratedItems.length > 0) {
        lines.push(`\n${section.title.toUpperCase()}`);
        ratedItems.forEach((item) => {
          const val = scores[item.id];
          const anchor = item.anchors[val - 1] || "";
          // Truncate item text for readability
          const shortText = item.text.split("—")[0].trim();
          lines.push(`  ${shortText}: ${val}/5 (${anchor})`);
        });
      }
    });
    lines.push("");

    // Flags and patterns
    const flags = [];
    if (deliriumTriad) {
      flags.push("DELIRIUM TRIAD FLAG: Attentional impairment + perplexity + disorientation detected. Pattern consistent with disturbance in continuity, breadth, and clarity of consciousness. Formal delirium workup recommended (CAM, DRS-R-98).");
    }
    if (tvPattern) {
      flags.push(`TENACITY-VIGILANCE PATTERN: ${tvPattern.label}. ${tvPattern.description}`);
    }

    // Observation-task discrepancy
    const obsAvg = getSectionAvg(SECTIONS[0]);
    const taskAvg = getSectionAvg(SECTIONS[2]);
    if (obsAvg !== null && taskAvg !== null && Math.abs(obsAvg - taskAvg) >= 1.5) {
      flags.push(`OBSERVATION-TASK DISCREPANCY: Observation avg ${obsAvg.toFixed(1)} vs. structured task avg ${taskAvg.toFixed(1)}. ${obsAvg < taskAvg ? "Observation worse than tasks — naturalistic impairment may exceed formal test performance." : "Tasks worse than observation — possible test anxiety, effort, or temperament effects."}`);
    }

    // Attentional variability
    if (scores["dyn_3"] != null && scores["dyn_3"] <= 3) {
      const varLabel = scores["dyn_3"] <= 1 ? "extreme" : scores["dyn_3"] <= 2 ? "marked" : "moderate";
      flags.push(`ATTENTIONAL VARIABILITY: ${varLabel.charAt(0).toUpperCase() + varLabel.slice(1)} moment-to-moment fluctuation in attentional performance. Emerging transdiagnostic marker of psychiatric vulnerability.`);
    }

    // Attentional depolarization
    if (scores["dyn_4"] != null && scores["dyn_4"] <= 2) {
      flags.push("ATTENTIONAL DEPOLARIZATION: Intensified internally-directed attention mimicking external hypoprosexia. Assess content of internal preoccupation.");
    }

    // Phenomenology
    if (scores["dyn_7"] != null) {
      const phenLabels = {
        1: "Wants to act but can't initiate (ADHD-pattern)",
        2: "No perceived point / amotivation (Depression-pattern)",
        3: "Internally absorbed / preoccupied (OCD/anxiety-pattern)",
        4: "Anxious overcontrol / paralysis (Anxiety/perfectionism-pattern)",
        5: "No subjective difficulty reported",
      };
      flags.push(`INATTENTION PHENOMENOLOGY: ${phenLabels[scores["dyn_7"]]}`);
    }

    // Hot EF
    if (scores["dyn_8"] != null && scores["dyn_8"] <= 3) {
      const hotLabel = scores["dyn_8"] <= 1 ? "severe" : scores["dyn_8"] <= 2 ? "significant" : "mild";
      let hotText = `HOT EXECUTIVE FUNCTION: ${hotLabel.charAt(0).toUpperCase() + hotLabel.slice(1)} difficulty with self-regulation in emotionally/motivationally charged contexts.`;
      if (taskAvg !== null && taskAvg >= 4 && scores["dyn_8"] <= 2) {
        hotText += " Hot-cool dissociation detected: cool EF intact on structured tasks while hot EF impaired.";
      }
      flags.push(hotText);
    }

    // Metacognitive accuracy
    if (scores["dyn_9"] != null && scores["dyn_9"] !== 3) {
      flags.push(`METACOGNITIVE ACCURACY: ${scores["dyn_9"] <= 2 ? "Overconfidence — patient self-assessment more positive than observed performance. May under-use compensatory strategies." : "Underconfidence — patient reports more impairment than objectively demonstrated. Consider mood/anxiety contribution to subjective cognitive complaints."}`);
    }

    // Distractibility vs distraction
    if (scores["dyn_5"] != null) {
      const distLabels = {
        1: "Clear distractibility (filtering failure)",
        2: "Predominantly distractibility",
        3: "Mixed / uncertain pattern",
        4: "Predominantly distraction (absorbed in specific content)",
        5: "Clear distraction (concentrated elsewhere)",
      };
      flags.push(`DISTRACTIBILITY VS. DISTRACTION: ${distLabels[scores["dyn_5"]]}`);
    }

    // Attentional bias
    if (scores["dyn_6"] != null && scores["dyn_6"] <= 2) {
      flags.push("ATTENTIONAL BIAS: Attention captured by disorder-specific stimuli.");
    }

    // Time on task
    if (scores["ctx_5"] != null && scores["ctx_5"] <= 2) {
      flags.push(`TIME-ON-TASK: ${scores["ctx_5"] <= 1 ? "Rapid early decline" : "Progressive decline"} in attentional performance over course of assessment.`);
    }

    if (flags.length > 0) {
      lines.push(hr);
      lines.push("CLINICAL FLAGS & PATTERNS");
      lines.push(hr);
      flags.forEach(f => lines.push(`• ${f}`));
      lines.push("");
    }

    // Contextual modifiers
    const ctxItems = SECTIONS[4].items.filter(i => scores[i.id] != null);
    if (ctxItems.length > 0) {
      lines.push(hr);
      lines.push("CONTEXTUAL MODIFIERS");
      lines.push(hr);
      ctxItems.forEach((item) => {
        const val = scores[item.id];
        const anchor = item.anchors[val - 1] || "";
        const shortText = item.text.split("—")[0].trim();
        lines.push(`${shortText}: ${anchor}`);
      });
      lines.push("");
    }

    // Formulation
    const hasFormulation = formulation.attribution || formulation.stateVsTrait || formulation.biasTargets || formulation.confounders || formulation.plan || formulation.additionalNotes;
    if (hasFormulation) {
      lines.push(hr);
      lines.push("CLINICAL FORMULATION");
      lines.push(hr);
      if (formulation.attribution) {
        let attrLine = `Primary Attribution: ${formulation.attribution}`;
        if ((formulation.attribution === "Comorbid / multifactorial" || formulation.attribution === "Insufficient data") && formulation.attributionDetail) {
          attrLine += ` — ${formulation.attributionDetail}`;
        }
        lines.push(attrLine);
      }
      if (formulation.stateVsTrait) lines.push(`State vs. Trait: ${formulation.stateVsTrait}`);
      if (formulation.biasTargets) lines.push(`Attentional Bias Targets: ${formulation.biasTargets}`);
      if (formulation.confounders) lines.push(`Confounders: ${formulation.confounders}`);
      if (formulation.plan) lines.push(`Plan: ${formulation.plan}`);
      if (formulation.additionalNotes) lines.push(`Additional Notes: ${formulation.additionalNotes}`);
      lines.push("");
    }

    lines.push(hr);
    lines.push("Draft tool — not validated. Based on Albertella et al., Psychiatr Clin N Am (2026).");

    return lines.join("\n");
  }, [scores, patientInfo, formulation, globalAvg, deliriumTriad, tvPattern]);

  const copyToClipboard = useCallback(async () => {
    const text = generateChartText();
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch {
      // Fallback for environments where clipboard API isn't available
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopyStatus("Copied");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  }, [generateChartText]);

  const allSectionAverages = SECTIONS.filter((s) => s.id !== "context").map(
    (s) => getSectionAvg(s)
  );
  const ratedAverages = allSectionAverages.filter((v) => v != null);
  const globalAvg =
    ratedAverages.length > 0
      ? ratedAverages.reduce((a, b) => a + b, 0) / ratedAverages.length
      : null;

  const deliriumTriad = checkDeliriumTriad();
  const tvPattern = getTenacityVigilancePattern();

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <h1>Clinical Attention Assessment</h1>
          <div className="subtitle">
            Based on Albertella, Lee & Fontenelle — <em>Psychiatr Clin N Am</em> (2026)
          </div>
          <div className="draft-badge">Draft — Not Validated</div>
        </div>

        <div className="patient-bar">
          <input
            placeholder="Patient name / ID"
            value={patientInfo.name}
            onChange={(e) =>
              setPatientInfo((p) => ({ ...p, name: e.target.value }))
            }
          />
          <input
            placeholder="Date of assessment"
            value={patientInfo.date}
            onChange={(e) =>
              setPatientInfo((p) => ({ ...p, date: e.target.value }))
            }
          />
          <input
            placeholder="Examiner"
            value={patientInfo.mrn}
            onChange={(e) =>
              setPatientInfo((p) => ({ ...p, mrn: e.target.value }))
            }
          />
        </div>

        {SECTIONS.map((section) => {
          const avg = getSectionAvg(section);
          const isOpen = openSections[section.id];
          return (
            <div className="section" key={section.id}>
              <div
                className="section-header"
                onClick={() => toggleSection(section.id)}
              >
                <div>
                  <h2>{section.title}</h2>
                  <div className="section-sub">
                    {section.subtitle} — {getSectionCompletion(section)} rated
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {avg !== null && (
                    <span
                      className="section-score"
                      style={{ background: getSeverityColor(avg) }}
                    >
                      {avg.toFixed(1)} — {getSeverityLabel(avg)}
                    </span>
                  )}
                  <span className={`chevron ${isOpen ? "open" : ""}`}>▼</span>
                </div>
              </div>
              {isOpen && (
                <>
                  <div className="section-instructions">
                    {section.instructions}
                  </div>
                  <div className="section-body">
                    {section.items.map((item) => (
                      <div className="item" key={item.id}>
                        <div className="item-text">{item.text}</div>
                        {item.administration && (
                          <details className="admin-details">
                            <summary className="admin-summary">How to administer</summary>
                            <div className="admin-body">{item.administration}</div>
                          </details>
                        )}
                        <div className="rating-row">
                          {item.anchors.map((anchor, idx) => {
                            const val = idx + 1;
                            return (
                              <button
                                key={idx}
                                className={`rating-btn ${
                                  scores[item.id] === val ? "selected" : ""
                                }`}
                                onClick={() => setScore(item.id, val)}
                              >
                                <div>
                                  <span className="score-num">{val}</span>
                                  {anchor}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}

        <div className="summary-section">
          <div className="summary-header">
            <h2>Clinical Summary</h2>
          </div>
          <div className="summary-body">
            <div className="summary-grid">
              {SECTIONS.filter((s) => s.id !== "context").map((section) => {
                const avg = getSectionAvg(section);
                return (
                  <div className="summary-card" key={section.id}>
                    <div className="card-label">{section.title}</div>
                    <div
                      className="card-score"
                      style={{ color: getSeverityColor(avg) }}
                    >
                      {avg !== null ? avg.toFixed(1) : "—"}
                    </div>
                    <div
                      className="card-severity"
                      style={{ color: getSeverityColor(avg) }}
                    >
                      {getSeverityLabel(avg)}
                    </div>
                  </div>
                );
              })}
              <div className="summary-card" style={{ border: "2px solid var(--c-accent)" }}>
                <div className="card-label">Global Composite</div>
                <div
                  className="card-score"
                  style={{ color: getSeverityColor(globalAvg) }}
                >
                  {globalAvg !== null ? globalAvg.toFixed(1) : "—"}
                </div>
                <div
                  className="card-severity"
                  style={{ color: getSeverityColor(globalAvg) }}
                >
                  {getSeverityLabel(globalAvg)}
                </div>
              </div>
            </div>

            {/* Global composite interpretation */}
            {globalAvg !== null && (
              <div className="interp-panel">
                <div className="interp-header">
                  <span className="interp-icon">📊</span>
                  <strong>Global Composite Interpretation</strong>
                </div>
                <div className="interp-body">
                  <p>{globalAvg <= 1.5
                    ? "Severe global attentional impairment detected across domains. This level of compromise strongly suggests a disturbance at the level of consciousness (delirium) or a severe acute psychiatric state. Formal cognitive and medical workup is warranted before attributing findings to a primary psychiatric diagnosis."
                    : globalAvg <= 2.5
                    ? "Moderate attentional impairment. Performance is below expected across multiple domains. This pattern is non-specific — it can be seen in delirium, major depression, acute psychosis, substance intoxication/withdrawal, severe anxiety, and neurocognitive disorders. Clinical context and the pattern across individual domains (below) are more informative than the composite score."
                    : globalAvg <= 3.5
                    ? "Mild attentional compromise. Deficits may be subtle and situational. Consider whether findings reflect state factors (sleep deprivation, acute stress, medication effects) vs. trait vulnerabilities. Individual domain scores and the tenacity-vigilance pattern may reveal clinically meaningful dissociations even when the global score appears near-normal."
                    : "Attentional performance is broadly within normal limits. Note that bedside assessment has limited sensitivity for subtle deficits — if clinical suspicion remains, formal neuropsychological testing or ecological momentary assessment of attentional variability may be more revealing."
                  }</p>
                  <p className="interp-caveat">Note: This composite is an unweighted average across domains. It has not been psychometrically validated. Observation-based domains should carry more interpretive weight than structured tasks per the source framework.</p>
                </div>
              </div>
            )}

            {/* Domain-specific interpretations */}
            {(() => {
              const obsAvg = getSectionAvg(SECTIONS[0]);
              const oriAvg = getSectionAvg(SECTIONS[1]);
              const taskAvg = getSectionAvg(SECTIONS[2]);
              const panels = [];

              // Observation-task discrepancy
              if (obsAvg !== null && taskAvg !== null && Math.abs(obsAvg - taskAvg) >= 1.5) {
                const obsWorse = obsAvg < taskAvg;
                panels.push(
                  <div className="interp-panel interp-discrepancy" key="disc">
                    <div className="interp-header">
                      <span className="interp-icon">⚡</span>
                      <strong>Observation–Task Discrepancy Detected</strong>
                    </div>
                    <div className="interp-body">
                      <p>{obsWorse
                        ? `Behavioral observation scores (${obsAvg.toFixed(1)}) are substantially worse than structured task performance (${taskAvg.toFixed(1)}). This can indicate: (1) the "coercive" quality of formal testing is temporarily boosting performance beyond the patient's habitual functioning; (2) attentional difficulties are primarily evident in unstructured, naturalistic contexts (ecologically more valid); or (3) the patient's impairment is qualitative rather than quantitative — they may pass digit span while still showing conversational incoherence, which points to higher-order integrative failures rather than raw attentional capacity deficits.`
                        : `Structured task scores (${taskAvg.toFixed(1)}) are substantially worse than behavioral observation (${obsAvg.toFixed(1)}). Consider: (1) test anxiety or unfamiliarity with the format is degrading performance; (2) effort/motivation issues — the patient may perform well in natural conversation but disengage from what feels like an "exam"; (3) specific cognitive deficits (e.g., working memory, processing speed) that structured tasks expose but conversation masks; or (4) temperament effects — some patients underperform on formal tests due to the "experimental condition" that the source article specifically warns about.`
                      }</p>
                      <p className="interp-caveat">Per the source framework: when observation and testing contradict, observation should generally be prioritized. The test result is the one that requires caution.</p>
                    </div>
                  </div>
                );
              }

              // Orientation-specific interpretation
              if (oriAvg !== null && oriAvg <= 2.5) {
                panels.push(
                  <div className="interp-panel interp-orientation" key="ori">
                    <div className="interp-header">
                      <span className="interp-icon">🧭</span>
                      <strong>Orientation Impairment</strong>
                    </div>
                    <div className="interp-body">
                      <p>Orientation scores indicate meaningful disorientation (avg {oriAvg.toFixed(1)}). Orientation is typically preserved in primary psychiatric conditions and its disturbance strongly suggests an organic/medical contribution. Temporal disorientation typically emerges first, followed by place, then person — this hierarchy can help gauge severity.</p>
                      <p><strong>Key distinctions to assess:</strong> Is the patient disoriented to calendar date but retains a functional sense of time passing (common in institutional settings and not necessarily pathological)? Or is the functional time sense itself disrupted (more concerning)? Does place disorientation involve not knowing the type of facility (severe) vs. being wrong about the floor or ward (mild, can be normal in hospitalized patients)?</p>
                      <p><strong>Expected normal ranges:</strong> Healthy individuals should be within 4 hours of the current time, 3 days of the date, 2 days of the day of the week, and should know the current month and year.</p>
                    </div>
                  </div>
                );
              }

              // Attentional variability interpretation
              const variability = scores["dyn_3"];
              if (variability !== null && variability <= 3) {
                panels.push(
                  <div className="interp-panel interp-variability" key="var">
                    <div className="interp-header">
                      <span className="interp-icon">📈</span>
                      <strong>Elevated Attentional Variability</strong>
                    </div>
                    <div className="interp-body">
                      <p>Moment-to-moment fluctuation in attentional performance was rated as {variability <= 1 ? "extreme" : variability <= 2 ? "marked" : "moderate"}. This is a significant finding. Trial-level attentional variability is emerging as one of the most promising transdiagnostic markers of psychiatric vulnerability — it has been shown to mediate the relationship between polygenic risk scores and symptom expression, and it may underlie other attentional phenomena commonly attributed to disorder-specific biases.</p>
                      <p><strong>Mechanistic significance:</strong> When attention fluctuates significantly across moments, stimuli are experienced differently on each exposure. This means normally redundant information continues to be processed as novel — a mechanism proposed to drive the unusual thoughts and perceptual experiences seen in positive psychotic symptoms. Essentially, unstable attention prevents the normal down-regulation of processing that occurs with repeated exposure.</p>
                      <p><strong>Longitudinal tracking value:</strong> Consider implementing repeated measurement of attentional variability over time (measurement burst design). Increasing variability trajectories may serve as an early warning of escalating psychiatric vulnerability — potentially allowing intervention before frank symptom emergence. This is especially relevant for patients with known risk factors (family history, genetic loading, early symptoms).</p>
                      <p><strong>Differential contributions:</strong> Check contextual modifiers — sleep deprivation and acute stress both increase attentional variability and could account for the finding. If variability persists after addressing these factors, it is more likely to reflect trait-level vulnerability.</p>
                    </div>
                  </div>
                );
              }

              // Attentional depolarization interpretation
              const depol = scores["dyn_4"];
              if (depol !== null && depol <= 2) {
                panels.push(
                  <div className="interp-panel interp-depolarization" key="depol">
                    <div className="interp-header">
                      <span className="interp-icon">🔄</span>
                      <strong>Attentional Depolarization</strong>
                    </div>
                    <div className="interp-body">
                      <p>Evidence of intensified internally-directed attention that mimics external hypoprosexia. The patient appears inattentive to the environment but is actually hyper-focused on internal content — obsessional themes, somatic sensations, delusional material, or ruminative cycles.</p>
                      <p>This phenomenon was originally described by Cabaleiro Goás in patients with OCD, hypochondriasis, and schizophrenia. It's an important distinction because it looks identical to global attentional deficit on casual observation, but the mechanism is entirely different — attentional capacity isn't reduced, it's redirected inward. This has treatment implications: attentional depolarization may respond to interventions targeting the content (e.g., SSRIs for OCD, antipsychotics for delusions) rather than interventions targeting attention per se (e.g., stimulants).</p>
                      <p><strong>Clinical probe:</strong> Ask the patient what they were thinking about during apparent lapses. If they can describe vivid, detailed internal content, depolarization is likely. If they report blankness or confusion, true hypoprosexia is more likely.</p>
                    </div>
                  </div>
                );
              }

              // Distractibility vs distraction interpretation
              const distractType = scores["dyn_5"];
              if (distractType !== null) {
                panels.push(
                  <div className="interp-panel interp-distraction" key="distract">
                    <div className="interp-header">
                      <span className="interp-icon">🎯</span>
                      <strong>Distractibility vs. Distraction</strong>
                    </div>
                    <div className="interp-body">
                      <p>{distractType <= 2
                        ? `Rated as predominantly distractibility — the patient has genuine difficulty filtering irrelevant stimuli and sustaining task-directed attention. This pattern suggests a deficit in top-down attentional control and is the prototypical attentional problem measured by continuous performance tests. It occurs across numerous psychiatric conditions and is notably not specific to ADHD — research shows OCD may actually produce greater attentional impairments than ADHD on these measures.`
                        : distractType >= 4
                        ? `Rated as predominantly distraction — the apparent inattention may not represent a true deficit but rather intense active concentration on specific content with simultaneous inhibition of everything else. Think of the deeply absorbed student who doesn't hear their name called. This distinction matters because "distraction" in this sense may be a sign of cognitive engagement (potentially with pathological content like obsessions or delusions) rather than attentional failure. Treatment should target the absorbing content, not the attention system.`
                        : `Mixed or uncertain pattern — unable to clearly distinguish between true distractibility (filtering failure) and distraction (absorption in specific content). This ambiguity is common and worth noting explicitly in the clinical record. Serial assessment may clarify: distractibility tends to be consistent across content domains, while distraction resolves when the absorbing content is addressed.`
                      }</p>
                    </div>
                  </div>
                );
              }

              // Attentional bias interpretation
              const bias = scores["dyn_6"];
              if (bias !== null && bias <= 2) {
                panels.push(
                  <div className="interp-panel interp-bias" key="bias">
                    <div className="interp-header">
                      <span className="interp-icon">⚠️</span>
                      <strong>Attentional Bias Detected</strong>
                    </div>
                    <div className="interp-body">
                      <p>The patient's attention appears captured by disorder-specific cues. Attentional biases are well-established across psychiatric conditions — substance cues in addictions, threat cues in anxiety, somatic cues in health anxiety, food/body cues in eating disorders. These biases are not simply "poor attention" but reflect a preferential allocation of processing resources toward salient, disorder-relevant stimuli.</p>
                      <p><strong>Document the bias target:</strong> What specific stimuli or themes capture attention? This has diagnostic and treatment-planning value. Attentional bias modification techniques exist for some conditions (particularly anxiety and addiction), and identifying the specific bias target helps calibrate these interventions.</p>
                    </div>
                  </div>
                );
              }

              // Time-on-task interpretation
              const timeOnTask = scores["ctx_5"];
              if (timeOnTask !== null && timeOnTask <= 2) {
                panels.push(
                  <div className="interp-panel interp-fatigue" key="tot">
                    <div className="interp-header">
                      <span className="interp-icon">⏱</span>
                      <strong>Time-on-Task Decline</strong>
                    </div>
                    <div className="interp-body">
                      <p>Attentional performance {timeOnTask <= 1 ? "declined rapidly early in the assessment" : "declined progressively over the course of assessment"}. This is a critical observation because it helps distinguish between selective attention deficits (which are consistent regardless of time on task) and sustained attention deficits (which worsen with duration). Continuous Performance Tests deliberately use long durations (20+ minutes) to provoke this effect.</p>
                      <p>Time-on-task effects reflect mental fatigue and are expected to some degree, but rapid or pronounced decline suggests the sustained attention system is compromised. This pattern is associated with sleep deprivation, depression-related fatigue, and some neurocognitive conditions. It can also reflect low effort/motivation, though the clinical presentation usually distinguishes these.</p>
                    </div>
                  </div>
                );
              }

              return panels;
            })()}

            {/* Delirium triad — expanded */}
            {deliriumTriad && (
              <div className="delirium-flag">
                <strong>⚠ Delirium Triad Flag</strong>
                <p style={{ marginBottom: 8 }}>Attentional impairment + perplexed appearance + disorientation detected. This triad indicates a disturbance in the continuity, breadth, and clarity of the field of consciousness.</p>
                <p style={{ marginBottom: 8 }}><strong>Clinical significance:</strong> This combination has high specificity for delirium. While any individual element can occur in primary psychiatric disorders (depression, schizophrenia, dementia), the co-occurrence of all three — particularly when attention is globally impaired rather than selectively redirected — strongly suggests an acute confusional state with a medical etiology.</p>
                <p style={{ marginBottom: 8 }}><strong>Immediate next steps:</strong> (1) Formal delirium screening with CAM or DRS-R-98. (2) Assess for fluctuating course — hallmark of delirium often missed in cross-sectional assessment. (3) Medical workup: metabolic panel, CBC, UA, medication review (especially anticholinergic burden), vitals, oxygen saturation. (4) Assess for precipitants: infection, medication changes, metabolic derangement, dehydration, pain, urinary retention, constipation. (5) Consider EEG if diagnosis remains unclear — generalized slowing supports delirium.</p>
                <p><strong>Caution:</strong> Do not attribute these findings to a known psychiatric diagnosis without ruling out delirium first. Delirium is superimposed on psychiatric disorders more often than it is recognized, and misattribution delays treatment of potentially reversible medical conditions.</p>
              </div>
            )}

            {/* Tenacity-vigilance pattern — expanded */}
            {tvPattern && (
              <div className={`interp-panel interp-tv interp-tv-${tvPattern.severity}`}>
                <div className="interp-header">
                  <span className="interp-icon">🔀</span>
                  <strong>Tenacity–Vigilance Pattern: {tvPattern.label}</strong>
                </div>
                <div className="interp-body">
                  <p><strong>Pattern description:</strong> {tvPattern.description}</p>
                  <p><strong>Clinical context:</strong> {tvPattern.clinicalContext}</p>
                  <p><strong>Differential considerations:</strong> {tvPattern.differentials}</p>
                  <p><strong>Recommended next steps:</strong> {tvPattern.nextSteps}</p>
                  <p className="interp-caveat">Conceptual framework: Tenacity and vigilance are dimensions from Bleuler's descriptive psychopathology, where "vigilance" refers to attentional mobility (not arousal/arousability as used in behavioral neurology). These dimensions often function antagonistically but not always. The pattern identified here reflects a clinical heuristic, not a validated diagnostic algorithm.</p>
                </div>
              </div>
            )}

            {/* Qualitative phenomenology interpretation */}
            {scores["dyn_7"] != null && (
              <div className="interp-panel interp-phenomenology">
                <div className="interp-header">
                  <span className="interp-icon">💭</span>
                  <strong>Inattention Phenomenology: Differential Pattern</strong>
                </div>
                <div className="interp-body">
                  {scores["dyn_7"] === 1 && (
                    <>
                      <p><strong>Pattern: "Wants to act but can't initiate"</strong> — This phenomenology is most consistent with ADHD-pattern executive dysfunction, where the subjective experience is one of frustrated intention. The patient perceives the goal, understands the steps, and wants to engage, but experiences a block at the point of initiation or sustained effort. This is often described as "being stuck behind glass" or "my brain won't cooperate."</p>
                      <p><strong>Differential weight:</strong> This pattern strongly favors ADHD (particularly combined or predominantly inattentive presentations), though it can also be seen in autistic inertia, early Parkinson's disease, and some frontal lobe syndromes. Cross-reference with developmental history (childhood onset?) and cross-context pattern (pervasive vs. situational?). If this is lifelong and pervasive, ADHD probability increases substantially. Also assess for interest-based regulation — if the patient can hyperfocus on novel/rewarding tasks but is blocked by routine ones, this further supports an ADHD interpretation.</p>
                      <p><strong>Treatment implications:</strong> This pattern may respond to stimulant medication, behavioral activation with external scaffolding (timers, body doubling, task decomposition), and environmental restructuring. Cognitive behavioral approaches focused on insight alone are typically insufficient — the deficit is at the level of action initiation, not understanding.</p>
                    </>
                  )}
                  {scores["dyn_7"] === 2 && (
                    <>
                      <p><strong>Pattern: "No perceived point / amotivation"</strong> — The patient's inattention is colored by a global reduction in perceived value or purpose. This is the phenomenology most characteristic of major depression, where anhedonia and psychomotor retardation create an executive landscape where nothing seems worth the cognitive effort.</p>
                      <p><strong>Differential weight:</strong> Strongly favors depression, particularly when combined with other depressive symptoms (sleep/appetite changes, guilt, hopelessness). Can also be seen in negative symptoms of schizophrenia, burnout/demoralization, and apathy syndromes from frontal or subcortical lesions. The key distinction from ADHD: in ADHD, there are reliably things the patient CAN engage with (novel, high-reward, high-urgency tasks); in depression-pattern amotivation, the global flattening of perceived value typically extends even to previously enjoyable activities.</p>
                      <p><strong>Treatment implications:</strong> Treat the underlying mood disorder. Attentional complaints often resolve or substantially improve with effective antidepressant treatment. Stimulants may provide short-term activation but do not address the core mechanism. Behavioral activation (structured scheduling of activities before motivation returns) is evidence-based for this pattern.</p>
                    </>
                  )}
                  {scores["dyn_7"] === 3 && (
                    <>
                      <p><strong>Pattern: "Internally absorbed / preoccupied"</strong> — The patient's attentional capacity is being consumed by internal content — obsessional rumination, somatic preoccupation, delusional material, worry cycles, or intrusive imagery. This is the attentional depolarization pattern described in classical psychopathology.</p>
                      <p><strong>Differential weight:</strong> Most consistent with OCD (obsessional rumination), health anxiety/somatic symptom disorder (somatic monitoring), generalized anxiety disorder (worry), PTSD (intrusive re-experiencing), or psychotic disorders (engagement with delusional content or hallucinations). Research shows OCD can produce larger sustained attention deficits than ADHD on objective testing, yet these go unrecognized because clinicians attribute them to the "anxiety" bucket rather than identifying the attentional mechanism.</p>
                      <p><strong>Treatment implications:</strong> Target the absorbing content, not the attention system directly. SSRIs for OCD/anxiety, antipsychotics for psychotic content, trauma-focused therapy for PTSD. Stimulants are generally not indicated and may worsen the internal preoccupation. Consider whether cognitive remediation targeting attentional control (e.g., attention training technique from metacognitive therapy) could be adjunctive.</p>
                    </>
                  )}
                  {scores["dyn_7"] === 4 && (
                    <>
                      <p><strong>Pattern: "Anxious overcontrol / paralysis"</strong> — The patient's executive dysfunction manifests paradoxically as excessive planning, list-making, or organizing that never progresses to action — driven by fear of mistakes, negative evaluation, or uncertainty. The cognitive resources are consumed by the control process itself rather than task execution.</p>
                      <p><strong>Differential weight:</strong> Most consistent with social anxiety, perfectionism, generalized anxiety disorder, or OCPD traits. Distinguished from ADHD disorganization: the ADHD patient forgets to make the list; this patient makes the list but can't stop refining it. Distinguished from depression: the depressed patient doesn't make the list because nothing seems worthwhile; this patient makes elaborate lists because everything feels dangerous.</p>
                      <p><strong>Treatment implications:</strong> Exposure-based approaches (tolerating imperfection, acting before certainty), anxiolytic medications if appropriate, and possibly CBT for perfectionism. The attentional system itself is intact — the regulatory failure is in the anxiety-control interface.</p>
                    </>
                  )}
                  {scores["dyn_7"] === 5 && (
                    <p>No subjective attentional difficulty reported by the patient. If objective findings suggest impairment, consider anosognosia (particularly in frontal lesions, delirium, or mania), metacognitive overconfidence (common in compulsive phenotypes), or a presentation where the impairment is only evident under load conditions not present during the interview.</p>
                  )}
                </div>
              </div>
            )}

            {/* Hot EF interpretation */}
            {scores["dyn_8"] != null && scores["dyn_8"] <= 3 && (() => {
              const taskAvg = getSectionAvg(SECTIONS[2]);
              const hotCoolDiscrepancy = taskAvg !== null && taskAvg >= 4 && scores["dyn_8"] <= 2;
              return (
                <div className="interp-panel interp-hotef">
                  <div className="interp-header">
                    <span className="interp-icon">🔥</span>
                    <strong>Hot Executive Function {scores["dyn_8"] <= 2 ? "Impairment" : "Difficulty"}</strong>
                  </div>
                  <div className="interp-body">
                    <p>The patient demonstrates {scores["dyn_8"] <= 1 ? "severe" : scores["dyn_8"] <= 2 ? "significant" : "mild"} difficulty with self-regulation in emotionally or motivationally charged contexts. This involves reward-driven decision-making, impulse control under arousal, and the ability to maintain executive control when emotions are engaged.</p>
                    {hotCoolDiscrepancy && (
                      <p><strong>Hot–Cool Dissociation Detected:</strong> Structured cognitive tasks (cool EF, avg {taskAvg.toFixed(1)}) are intact while hot EF is rated as impaired ({scores["dyn_8"]}/5). This dissociation is clinically important — it means the patient will likely pass standard neuropsychological screening but still experience severe real-world self-regulation failures. This pattern is strongly associated with hyperactive/impulsive ADHD presentations, addiction vulnerability, borderline personality features, and some conduct-related presentations. The underlying neurobiology involves ventromedial prefrontal cortex and orbitofrontal-limbic circuits rather than the dorsolateral prefrontal systems tested by digit span and serial 7s.</p>
                    )}
                    <p><strong>Assessment note:</strong> Hot EF is difficult to assess at bedside because the clinical encounter is typically low-stakes and affectively neutral. The impairment may only emerge in real-world situations involving temptation, frustration, social conflict, or time pressure. Collateral history and ecological assessment (diaries, EMAs) may be more revealing than office-based testing for this dimension.</p>
                  </div>
                </div>
              );
            })()}

            {/* Metacognitive accuracy interpretation */}
            {scores["dyn_9"] != null && scores["dyn_9"] !== 3 && (
              <div className="interp-panel interp-metacog">
                <div className="interp-header">
                  <span className="interp-icon">🪞</span>
                  <strong>Metacognitive {scores["dyn_9"] <= 2 ? "Overconfidence" : "Underconfidence"} Detected</strong>
                </div>
                <div className="interp-body">
                  {scores["dyn_9"] <= 2 ? (
                    <>
                      <p>The patient's self-assessment of their cognitive abilities is more positive than their observed performance warrants. This metacognitive overconfidence has specific clinical implications: patients who believe their cognition is intact tend to under-use compensatory strategies (reminders, lists, alarms, cognitive offloading) even when these would significantly improve functioning.</p>
                      <p><strong>Associated conditions:</strong> Transdiagnostic compulsivity (OCD, behavioral addictions), anosognosia in frontal lesions or dementia, mania/hypomania, and some personality presentations. Research shows compulsive individuals specifically demonstrate overconfidence in memory tasks, leading to systematic under-use of external aids despite objectively poor performance.</p>
                      <p><strong>Treatment implications:</strong> Psychoeducation about the specific discrepancy between perceived and actual performance. Structured introduction of compensatory strategies with objective demonstration of benefit. Consider whether the overconfidence reflects a global metacognitive deficit (frontal syndrome) or a domain-specific bias (compulsivity-related).</p>
                    </>
                  ) : (
                    <>
                      <p>The patient reports cognitive impairment that exceeds what objective assessment demonstrates. This metacognitive underconfidence — catastrophizing about cognitive abilities — is common and clinically significant in its own right.</p>
                      <p><strong>Associated conditions:</strong> Depression (cognitive distortions extending to self-assessment of abilities), anxiety disorders (monitoring for cognitive failures as a threat), subjective cognitive decline (where the complaint itself may be an early marker even when testing is normal), and some post-COVID presentations. The patient's distress about their cognition is real and worth addressing regardless of whether objective impairment is found.</p>
                      <p><strong>Treatment implications:</strong> Address the mood/anxiety component — subjective cognitive complaints often improve with effective treatment of the underlying condition. Reassurance about objective test results, while appropriate, is often insufficient alone because the subjective experience of cognitive failure is driven by the same negative attentional bias that characterizes the mood disorder. If underconfidence persists after mood treatment, consider longitudinal monitoring (subjective cognitive complaints can be a prodrome of neurocognitive decline even when initial testing is normal).</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Differential attribution panel */}
            {globalAvg !== null && globalAvg <= 3.5 && (
              <div className="interp-panel interp-differential">
                <div className="interp-header">
                  <span className="interp-icon">🔍</span>
                  <strong>Differential Attribution Guide</strong>
                </div>
                <div className="interp-body">
                  <p>Attentional impairment has been detected. The following patterns can help attribute the findings to the most likely underlying mechanism. These are heuristics, not algorithms — most patients will show features of multiple categories.</p>
                  <div className="diff-grid">
                    <div className="diff-card">
                      <div className="diff-title">ADHD Pattern</div>
                      <div className="diff-features">
                        Childhood onset, pervasive across contexts, interest-based regulation (hyperfocus on novel/rewarding tasks), "wants to act but can't initiate," distractibility (not distraction), high attentional variability, hot EF may be selectively impaired, typically intact orientation
                      </div>
                      <div className="diff-check">
                        Check: {scores["ctx_6"] === 1 ? "✅" : "—"} Childhood onset{" "}
                        {scores["ctx_7"] != null && scores["ctx_7"] >= 4 ? "✅" : "—"} Cross-context{" "}
                        {scores["dyn_7"] === 1 ? "✅" : "—"} Initiation phenomenology{" "}
                        {scores["dyn_5"] != null && scores["dyn_5"] <= 2 ? "✅" : "—"} Distractibility
                      </div>
                    </div>
                    <div className="diff-card">
                      <div className="diff-title">Depression Pattern</div>
                      <div className="diff-features">
                        Adult/recent onset, amotivation phenomenology ("no point"), global rather than interest-based, psychomotor changes, time-on-task decline from fatigue, metacognitive underconfidence, typically intact orientation, may show hypertenacity (ruminative fixation)
                      </div>
                      <div className="diff-check">
                        Check: {scores["ctx_6"] != null && scores["ctx_6"] >= 3 ? "✅" : "—"} Non-childhood onset{" "}
                        {scores["dyn_7"] === 2 ? "✅" : "—"} Amotivation phenomenology{" "}
                        {scores["dyn_9"] != null && scores["dyn_9"] >= 4 ? "✅" : "—"} Underconfidence{" "}
                        {scores["ctx_5"] != null && scores["ctx_5"] <= 2 ? "✅" : "—"} Time-on-task decline
                      </div>
                    </div>
                    <div className="diff-card">
                      <div className="diff-title">OCD / Anxiety Pattern</div>
                      <div className="diff-features">
                        Internally absorbed (attentional depolarization), distraction rather than distractibility, may be context-specific, anxious overcontrol phenomenology, disorder-specific attentional bias, may show metacognitive overconfidence, orientation preserved
                      </div>
                      <div className="diff-check">
                        Check: {scores["dyn_4"] != null && scores["dyn_4"] <= 2 ? "✅" : "—"} Depolarization{" "}
                        {scores["dyn_5"] != null && scores["dyn_5"] >= 4 ? "✅" : "—"} Distraction pattern{" "}
                        {scores["dyn_7"] === 3 || scores["dyn_7"] === 4 ? "✅" : "—"} Internal/anxious phenomenology{" "}
                        {scores["dyn_6"] != null && scores["dyn_6"] <= 2 ? "✅" : "—"} Attentional bias
                      </div>
                    </div>
                    <div className="diff-card">
                      <div className="diff-title">Delirium / Organic Pattern</div>
                      <div className="diff-features">
                        Acute onset, disorientation (especially temporal), perplexity, global hypoprosexia or aprosexia, psychomotor abnormalities, fluctuating course, hypotenacity + hypovigilance pattern, impaired interviewability
                      </div>
                      <div className="diff-check">
                        Check: {scores["ctx_6"] === 5 ? "✅" : "—"} Acute onset{" "}
                        {(() => { const o = getSectionAvg(SECTIONS[1]); return o !== null && o <= 2 ? "✅" : "—"; })()} Disorientation{" "}
                        {scores["obs_6"] != null && scores["obs_6"] <= 2 ? "✅" : "—"} Perplexity{" "}
                        {scores["dyn_3"] != null && scores["dyn_3"] <= 2 ? "✅" : "—"} High variability
                      </div>
                    </div>
                  </div>
                  <p className="interp-caveat">These patterns are not mutually exclusive. Comorbidity is common (e.g., ADHD + depression, delirium superimposed on dementia). The developmental history and phenomenological quality of the inattention are often more diagnostically informative than the severity of the deficit, since objective impairment levels are non-specific across conditions.</p>
                </div>
              </div>
            )}

            <div className="formulation-section">
              <div className="formulation-title">Clinical Formulation</div>

              <div className="form-field">
                <label className="form-label">
                  Primary Attribution
                  <span className="form-hint">What is the most likely source of the attentional findings? Reference the differential attribution guide above if applicable.</span>
                </label>
                <div className="form-options">
                  {["ADHD / neurodevelopmental", "Depressive / mood-related", "Anxiety / OCD-driven", "Delirium / organic", "Substance-related", "Neurocognitive decline", "Comorbid / multifactorial", "Insufficient data"].map((opt) => (
                    <button
                      key={opt}
                      className={`form-chip ${formulation.attribution === opt ? "form-chip-active" : ""}`}
                      onClick={() => updateFormulation("attribution", formulation.attribution === opt ? "" : opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <textarea
                  className="form-textarea-sm"
                  value={formulation.attribution === "Comorbid / multifactorial" || formulation.attribution === "Insufficient data" ? (formulation.attributionDetail || "") : ""}
                  onChange={(e) => setFormulation(p => ({ ...p, attributionDetail: e.target.value }))}
                  placeholder={formulation.attribution === "Comorbid / multifactorial" ? "Specify contributing factors and their relative weight..." : formulation.attribution === "Insufficient data" ? "What additional information is needed?" : ""}
                  style={{ display: formulation.attribution === "Comorbid / multifactorial" || formulation.attribution === "Insufficient data" ? "block" : "none" }}
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  State vs. Trait
                  <span className="form-hint">Are the findings acute/reversible (state) or reflective of baseline functioning (trait)?</span>
                </label>
                <div className="form-options">
                  {["Acute state — likely reversible", "Subacute — unclear trajectory", "Chronic trait — baseline", "Acute exacerbation of chronic trait", "Cannot determine"].map((opt) => (
                    <button
                      key={opt}
                      className={`form-chip ${formulation.stateVsTrait === opt ? "form-chip-active" : ""}`}
                      onClick={() => updateFormulation("stateVsTrait", formulation.stateVsTrait === opt ? "" : opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Attentional Bias Targets
                  <span className="form-hint">If attentional bias was observed, what specific stimuli or themes captured the patient's attention? Leave blank if none observed.</span>
                </label>
                <textarea
                  className="form-textarea-sm"
                  value={formulation.biasTargets}
                  onChange={(e) => updateFormulation("biasTargets", e.target.value)}
                  placeholder="e.g., substance cues (alcohol advertisements, bar locations), threat cues (exits, authority figures), somatic cues (heart rate, breathing), contamination cues..."
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Confounders & Contextual Factors
                  <span className="form-hint">Which contextual modifiers may be accounting for or inflating the findings?</span>
                </label>
                <div className="form-options">
                  {["Sleep deprivation", "Acute stress", "Medication effects", "Substance use", "Pain", "Test anxiety / effort", "Language barrier", "None significant"].map((opt) => {
                    const selected = (formulation.confounders || "").includes(opt);
                    return (
                      <button
                        key={opt}
                        className={`form-chip ${selected ? "form-chip-active" : ""}`}
                        onClick={() => {
                          const current = formulation.confounders || "";
                          if (opt === "None significant") {
                            updateFormulation("confounders", selected ? "" : opt);
                          } else {
                            const cleaned = current.replace("None significant", "").trim();
                            const items = cleaned ? cleaned.split(", ").filter(Boolean) : [];
                            if (selected) {
                              updateFormulation("confounders", items.filter(i => i !== opt).join(", "));
                            } else {
                              updateFormulation("confounders", [...items, opt].join(", "));
                            }
                          }
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Plan
                  <span className="form-hint">Next steps based on attentional findings.</span>
                </label>
                <div className="form-options">
                  {[
                    "Formal neuropsych referral",
                    "Delirium workup (CAM, labs, EEG)",
                    "Medication review / anticholinergic audit",
                    "Sleep intervention",
                    "Treat underlying mood/anxiety",
                    "ADHD-specific evaluation",
                    "Longitudinal attentional monitoring",
                    "Collateral history needed",
                    "No further workup indicated",
                  ].map((opt) => {
                    const selected = (formulation.plan || "").includes(opt);
                    return (
                      <button
                        key={opt}
                        className={`form-chip ${selected ? "form-chip-active" : ""}`}
                        onClick={() => {
                          const current = formulation.plan || "";
                          if (opt === "No further workup indicated") {
                            updateFormulation("plan", selected ? "" : opt);
                          } else {
                            const cleaned = current.replace("No further workup indicated", "").trim();
                            const items = cleaned ? cleaned.split(", ").filter(Boolean) : [];
                            if (selected) {
                              updateFormulation("plan", items.filter(i => i !== opt).join(", "));
                            } else {
                              updateFormulation("plan", [...items, opt].join(", "));
                            }
                          }
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Additional Notes
                  <span className="form-hint">Anything not captured above — observations, clinical reasoning, caveats.</span>
                </label>
                <textarea
                  className="form-textarea"
                  value={formulation.additionalNotes}
                  onChange={(e) => updateFormulation("additionalNotes", e.target.value)}
                  placeholder="Free text..."
                />
              </div>
            </div>

            <div className="action-bar">
              <button className="btn btn-primary" onClick={copyToClipboard}>
                {copyStatus || "Copy for Chart"}
              </button>
              <button className="btn btn-secondary" onClick={resetAll}>
                Reset All
              </button>
            </div>

            <div className="citation">
              Derived from: Albertella L, Lee RSC, Fontenelle LF. Attention and
              Its Symptoms: From Descriptive Psychopathology to RDoC and Back
              Again. <em>Psychiatr Clin N Am.</em> 2026. doi:10.1016/j.psc.2026.01.002.
              <br />
              <strong>
                This is a draft clinical tool and has not been validated. Formal
                tests should be considered supplementary to, not a replacement
                for, naturalistic clinical assessment.
              </strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
