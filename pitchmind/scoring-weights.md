# PitchMind â€” Position Scoring Weights
*Updated 2026-03-02 â€” Daniel's validated decisions applied*

## How It Works
Each sub-category has a position weight (0.0â€“1.0).
Weights within each pillar (Execution / Probability) sum to 1.0.
A CB with a low Shooting score is not penalized the same way a ST is.

---

## Overall Score Formula
```
Execution Overall   = Î£ (sub-category score Ã— position weight)
Probability Overall = Î£ (sub-category score Ã— position weight)
Match Score         = (Probability Ã— 0.55) + (Execution Ã— 0.45)
```

*Probability weighted higher (55/45) because decision-making has a bigger impact
on match outcomes than technical execution. âœ… CONFIRMED by Daniel.*

---

## EXECUTION Weights (7 sub-categories)

| Sub-category          | GK   | CB   | LB/RB | CDM  | CM   | CAM  | LW/RW | ST   |
|-----------------------|------|------|-------|------|------|------|-------|------|
| Distribution          | 0.35 | 0.20 | 0.18  | 0.22 | 0.23 | 0.14 | 0.14  | 0.08 |
| Dribbling             | 0.05 | 0.04 | 0.13  | 0.08 | 0.14 | 0.19 | 0.26  | 0.15 |
| Shooting              | 0.00 | 0.02 | 0.04  | 0.04 | 0.09 | 0.19 | 0.19  | 0.32 |
| First Touch           | 0.20 | 0.15 | 0.17  | 0.18 | 0.19 | 0.19 | 0.17  | 0.17 |
| Defending             | 0.05 | 0.25 | 0.20  | 0.22 | 0.15 | 0.05 | 0.05  | 0.02 |
| Shielding             | 0.35 | 0.14 | 0.20  | 0.14 | 0.16 | 0.20 | 0.15  | 0.11 |
| Heading/Aerial Duels  | 0.00â€ | 0.20 | 0.08  | 0.12 | 0.04 | 0.04 | 0.04  | 0.15 |
| **Sum**               | **1.0** | **1.0** | **1.0** | **1.0** | **1.0** | **1.0** | **1.0** | **1.0** |

â€ GK Heading uses a separate GK-specific aerial system (claiming, punching, positioning
under crosses) â€” not the outfield heading rubric. Scored independently.

### Heading/Aerial Duels â€” Position Priority Rationale
| Position | Priority | Weight | Notes |
|----------|----------|--------|-------|
| CB       | CRITICAL | 0.20   | Defensive headers are a core CB duty |
| ST       | HIGH     | 0.15   | Aerial holds, knock-downs, goal headers |
| CDM      | HIGH     | 0.12   | Winning second balls, aerial duels in midfield |
| LB/RB    | MEDIUM   | 0.08   | Defensive headers from crosses |
| CM       | LOW      | 0.04   | Occasional aerial contest |
| CAM      | LOW      | 0.04   | Rarely expected to win aerial duels |
| LW/RW    | LOW      | 0.04   | Occasional flick-ons, aerial challenges rare |
| GK       | SEPARATE | â€”      | GK-specific aerial system |

---

## PROBABILITY Weights (6 sub-categories)

The 6th sub-category is **position-group specific** â€” each position group has a
tailored trait that reflects their most critical intelligence requirement.

| Sub-category              | GK   | CB   | LB/RB | CDM  | CM   | CAM  | LW/RW | ST   |
|---------------------------|------|------|-------|------|------|------|-------|------|
| Decision Making           | 0.28 | 0.22 | 0.22  | 0.22 | 0.22 | 0.24 | 0.22  | 0.24 |
| Awareness                 | 0.20 | 0.18 | 0.18  | 0.18 | 0.18 | 0.18 | 0.18  | 0.17 |
| Positioning               | 0.22 | 0.25 | 0.22  | 0.20 | 0.18 | 0.18 | 0.17  | 0.18 |
| Reading the Game          | 0.15 | 0.18 | 0.18  | 0.20 | 0.20 | 0.18 | 0.18  | 0.18 |
| Composure                 | 0.10 | 0.10 | 0.10  | 0.12 | 0.12 | 0.10 | 0.12  | 0.10 |
| Position-Specific Trait*  | 0.05 | 0.07 | 0.10  | 0.08 | 0.10 | 0.12 | 0.13  | 0.13 |
| **Sum**                   | **1.0** | **1.0** | **1.0** | **1.0** | **1.0** | **1.0** | **1.0** | **1.0** |

### *Position-Specific Trait â€” By Position Group

| Position Group       | Positions    | Trait Name                         | What It Measures |
|----------------------|--------------|------------------------------------|------------------|
| GK                   | GK           | Distribution Decision              | When to play short vs long; reading press to pick correct outlet; decision speed under GK-specific pressure |
| Defensive            | CB, LB/RB    | Line Management / Cover Shadow     | Stepping to press vs holding the line; cover shadow positioning to block passing lanes; when to engage vs drop |
| Midfield             | CDM, CM      | Press Trigger Recognition          | Identifying the correct moment to press (cue-based); not pressing out of shape; recognising when to hold shape instead |
| Attacking            | CAM, LW/RW, ST | Shot Selection                  | Decision to shoot vs pass in dangerous positions; recognising optimal shooting moments; angle and distance assessment |

> **Open question for Daniel:** Should position-specific traits be ADDITIONAL to the 6
> standard ones (making 7 total for that group), or do they REPLACE one of the 6?
> Currently modelled as the 6th sub-cat (replacing what was Problem-Solving).

---

## Design Rationale

**GK:** Heavy Distribution + Shielding. Distribution Decision elevated because GK's most
consequential intelligence call is how/when to play from the back. Zero Shooting weight.

**CB:** Defending + Positioning dominant. Heading elevated to CRITICAL (0.20) â€” heading
duels are a core CB duty. High Positioning because line management is everything.

**LB/RB:** Balanced attack/defend split. Line Management the position-specific intelligence
trait â€” modern fullbacks must judge when to step vs hold constantly.

**CDM:** Defending + Distribution elevated. Press Trigger Recognition critical â€” a CDM
pressing out of position is a direct defensive liability.

**CM:** Most balanced position across all sub-cats. Press Trigger Recognition (moderate weight)
reflects box-to-box role requiring constant transition intelligence.

**CAM:** Shooting + Dribbling elevated. Shot Selection as position-specific trait (0.12)
because the CAM operates in the most dangerous decision zone.

**LW/RW:** Highest Dribbling weight. Shot Selection elevated â€” a winger's value spike
comes from making the right cut-inside/shoot vs cross/pass decision.

**ST:** Highest Shooting weight (0.32). Shot Selection critical (0.13). Decision Making
elevated because goals are the product of correct final-third intelligence.

---

## Removed from System

| Removed | Reason |
|---------|--------|
| **Problem-Solving** (sub-cat) | Absorbed into Decision Making, which is now strengthened |
| **Concentration/Focus** (sub-cat) | Cannot be reliably distinguished from wrong decision or bad execution on film |
| **Tackling** (sub-cat name) | Renamed to **Defending** â€” broader category covering full defensive skill set |
| **Transition Recognition** (sub-sub) | Absorbed into Reading the Game |

---

## TODO
- [ ] Daniel to confirm position-specific trait weights (especially GK 0.05 vs higher)
- [ ] Answer open question: position-specific as 6th or 7th sub-cat?
- [ ] Answer: should all 6 Defending sub-sub cats apply to attacking players, or only pressing + recovery?
- [ ] Validate weights against real match data once CV pipeline exists
- [ ] Build weighted scoring calculator/simulator
