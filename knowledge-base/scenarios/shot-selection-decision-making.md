# Scenario: Shot Selection Decision-Making

## What It Is
Shot selection is the decision to shoot vs. take another action (pass, dribble, shield). Every attack has multiple possible actions. Elite players choose the HIGHEST-VALUE action. This scenario trains players to make correct shot selection decisions in game-realistic situations.

## Why It Matters
Poor shot selection loses possession frequently. A player who:
- Takes low-xG shots (0.02) instead of passing to high-xG situation (0.35) loses ~0.33 xG per action
- Over a match (10 such situations), loses ~3.3 xG (roughly 1 goal of value)
- Shot selection is coachable: players can improve through practice and decision-making training

## Universal Decision Framework

Before shooting, player should ask:

```
1. DOES THE SHOT HAVE HIGH xG? (≥0.15)
   YES → Consider shooting
   NO → Probably don't shoot

2. IS THERE A BETTER PASSING OPTION AVAILABLE?
   YES → Pass (higher xG likely)
   NO → Continue considering shot

3. IS THE GOALKEEPER VULNERABLE?
   YES (out of position, poor positioning) → Shoot
   NO (positioned correctly) → Only shoot if high xG

4. HOW MUCH TIME DO I HAVE?
   <0.5s (pressure coming) → Must decide now (shoot or pass)
   0.5-1.0s → Normal decision timing
   >1.0s → Have time to improve position

5. WHAT'S THE CONSEQUENCE OF LOSING POSSESSION HERE?
   Low consequence (own half, time available) → Can risk shot
   High consequence (attacking position, no time) → Must pass if uncertain
```

## Scenario 1: Midfielder on Edge of Penalty Area

### Situation
- Midfielder receives ball 22 yards from goal, central
- One defender approaching from behind (2 meters away)
- Fullback making overlapping run on right (10 meters away)
- Striker positioned in penalty area (loose marking)
- Goalkeeper positioned correctly in center

### xG Analysis
- **Shot from this position**: ~0.08 xG (distance is far, central position is good, but goalkeeper ready)
- **Pass to overlapping fullback**: ~0.20 xG (fullback will cross from better angle, creates 2v1 on wing)
- **Pass to striker**: ~0.15 xG (striker is only 12 yards, but marked)

### Correct Decision
**PASS TO OVERLAPPING FULLBACK** (0.20 xG)

Why not shoot?
- Passing option (0.20 xG) is better than shooting (0.08 xG)
- Defender approaching (pressure coming) means time is limited
- Fullback overlap creates numerical advantage (2v1 on wing)

### Poor Decision
**SHOOT immediately** (0.08 xG)

Why is this poor?
- Shot xG (0.08) is lower than passing xG (0.20)
- Fullback is available (better option)
- Result: Takes lower-value action

### Decision Process (Footballer's Perspective)
1. Receive ball (central, 22 yards)
2. Scan: Defender approaching, fullback overlapping right, striker in box
3. Quick calculation: "Fullback is in space, 2v1 on right. Pass or shoot?"
4. Check xG values: Shot is okay (0.08). Pass to fullback creates better chance (0.20)
5. **Decision: PASS** to overlapping fullback
6. Fullback delivers cross (high-quality, from 2v1 situation)
7. Result: Higher-probability goal attempt

### Coaching Points
1. **Teach xG logic**: Explicitly teach that passing to overlapping fullback (0.20) beats shooting (0.08)
2. **Scan before receiving**: Player should already know fullback is overlapping before receiving ball
3. **First-touch decision**: First touch should be toward the overlapping fullback (already committed to pass)
4. **Timing**: Pass must be released before defender closes (decision speed is critical)

---

## Scenario 2: Striker in Penalty Area, Crowded

### Situation
- Striker receives ball 14 yards from goal, central
- Three defenders in penalty area (tight marking)
- Fullback outside box with space (but far)
- Goalkeeper is tight (well-positioned)
- Midfielder is making late run from deep (arrival timing uncertain)

### xG Analysis
- **Shot from this position**: ~0.20 xG (good position, but three defenders, goalkeeper ready)
- **Pass to fullback**: ~0.05 xG (fullback is far, low-quality passing option, fullback isn't a finisher)
- **Pass backward to midfielder**: ~0.15 xG (midfielder might arrive in better position, undefended)
- **Shield and reset**: Reset possession, try again → varies

### Correct Decision
**SHOOT** (0.20 xG)

Why shoot in this situation?
- Striker position is good (14 yards, central)
- Passing options are poor (fullback pass is 0.05, midfielder pass is risky)
- Goalkeeper is positioned, but striker can place shot (side netting, avoid defenders)
- **Best available action is to shoot** (0.20 xG beats alternatives)

### Alternative Scenario (Why Not Shoot)
If midfielder is arriving in 0.5 seconds (late run with clear space):
- **Late run xG might be**: 0.25 (if midfielder gets clean finish)
- **Striker should consider passing** to arriving midfielder
- **Decision**: Depends on timing. If midfielder is arriving immediately → pass. If uncertain → shoot now.

### Poor Decision
**PASS TO FULLBACK** (0.05 xG)

Why is this poor?
- Fullback option (0.05 xG) is much lower than shooting (0.20 xG)
- Fullback isn't in good finishing position (far from goal)
- Wasted possession

### Decision Process (Footballer's Perspective)
1. Receive ball in box (crowded, three defenders)
2. Scan: Fullback outside box, midfielder arriving late, goalkeeper ready
3. Quick calculation: "Crowded box. Shoot or pass?"
4. Check options: Fullback pass is poor (far away). Midfielder is arriving but timing unclear.
5. **Decision: SHOOT** (best available option)
6. Uses placement (side netting, avoiding defenders)
7. Result: High-quality shot attempt

### Coaching Points
1. **Placement over passing in crowded box**: When space is limited, often shooting is better than passing
2. **Timing of late runs**: Teach late runners to arrive with clear space (so striker considers passing)
3. **Body shape for placement**: In crowded box, placement (side netting) beats power
4. **Decision speed**: Striker must decide within 0.5 seconds (before defenders can close)

---

## Scenario 3: Winger on Wing, Space Available

### Situation
- Winger receives ball on right wing, 25 yards from goal
- Space ahead (fullback covering, no immediate pressure)
- Two defenders ahead (not immediately closing)
- Fullback making overlap run at correct timing
- Striker in penalty area with space (but not perfectly positioned)

### xG Analysis
- **Shot from wing position**: ~0.04 xG (wide angle, far from goal, very low-quality)
- **Pass to overlapping fullback**: ~0.18 xG (fullback has space, better angle, can cross or shoot)
- **Dribble into center, then shoot**: ~0.12 xG (improves angle and distance, takes time)
- **Cross immediately**: ~0.12 xG (striker is not well-positioned, cross is okay but not amazing)

### Correct Decision
**PASS TO OVERLAPPING FULLBACK** (0.18 xG)

Why?
- Overlapping fullback creates 2v1 situation
- Fullback has better angle and distance for cross
- xG from overlap pass (0.18) beats shooting (0.04) or crossing (0.12)

### Alternative: Dribble Toward Center
If fullback overlap is NOT available:
- **Dribble toward center** (0.12 xG) is second-best option
- Improves angle and distance for shot
- Takes time (defenders can recover)

### Poor Decision
**SHOOT FROM WING** (0.04 xG)

Why is this poor?
- Wide angle, far from goal (very low xG)
- All other options are better (overlap, dribble, cross)
- Wasted possession

### Decision Process (Footballer's Perspective)
1. Receive ball on wing
2. Scan: Fullback overlapping, defenders not immediately closing, striker in box
3. Quick calculation: "Overlap available? Dribble in? Shoot?"
4. Check options: Overlap is best (0.18). Shoot is terrible (0.04).
5. **Decision: PASS TO FULLBACK** for overlap
6. Fullback has space, can deliver high-quality cross
7. Result: 2v1 situation, high xG chance

### Coaching Points
1. **Never shoot from wide angle far out**: This is the most common shot selection error
2. **Recognize overlaps early**: Winger should know fullback is overlapping before receiving ball
3. **Passing creates value**: Passing to overlapping fullback creates MORE value than shooting
4. **Dribble selection**: If overlap not available, dribble toward center (improves angle)

---

## Scenario 4: Player One-on-One with Goalkeeper

### Situation
- Forward has beaten defenders, one-on-one with goalkeeper
- Goalkeeper is advancing (not in optimal position)
- Teammate is 5 meters behind (unmarked, running forward)
- Time: 0.5 seconds before goalkeeper closes down

### xG Analysis
- **Shot from this position**: ~0.85 xG (one-on-one, goalkeeper advancing = high-quality chance)
- **Pass to teammate**: ~0.50 xG (teammate is unmarked, but further from goal, less optimal)

### Correct Decision
**SHOOT IMMEDIATELY** (0.85 xG)

Why?
- One-on-one with goalkeeper (highest-xG situation in soccer)
- Passing reduces xG (0.85 → 0.50)
- Time is limited (goalkeeper closing)
- **Best available action is to shoot** immediately

### Poor Decision (Common Mistake)
**PASS TO TEAMMATE** (0.50 xG)

Why is this poor?
- Reduces xG significantly (0.85 → 0.50)
- Teammate is further from goal (lower-quality chance)
- Over-complicates what should be simple finishing

### Exception: Teammate is Clearer
If teammate is in BETTER position (e.g., unmarked striker, near goal):
- **Pass might be better** (0.70+ xG if teammate is in good position)
- But this is rare in one-on-one situation
- Forward should almost always shoot

### Decision Process (Footballer's Perspective)
1. Beat defender, one-on-one with goalkeeper
2. Scan: Goalkeeper advancing, teammate behind
3. Quick calculation: "Shoot or pass?"
4. Check options: I have highest-xG situation (one-on-one). Teammate is behind, further away.
5. **Decision: SHOOT IMMEDIATELY**
6. Composure, placement (not wild power), finish
7. Result: Goal or goalkeeper save (very likely goal)

### Coaching Points
1. **One-on-ones are highest-xG situations**: Shoot immediately
2. **Overcomplicate**: Passing in one-on-one is usually error
3. **Composure execution**: Even with time pressure (goalkeeper advancing), must compose finish
4. **Exception**: Only pass if teammate is CLEARLY in better position (very rare)

---

## Scenario 5: Midfielder Far from Goal with Space

### Situation
- Midfielder receives ball 28 yards from goal in midfield
- Space ahead (defenders retreating)
- Striker is 25 yards away, moving toward goal
- Fullback has space on wing (crossing option)
- No immediate pressure (time to decide)

### xG Analysis
- **Long-range shot**: ~0.04 xG (far from goal, midfielder shot, low probability)
- **Pass to striker**: ~0.08 xG (striker is advancing, but still far from goal)
- **Pass to fullback for cross**: ~0.12 xG (fullback cross creates 2v1 on wing)
- **Carry the ball forward**: ~0.10 xG (progress down field, improve position)

### Correct Decision
**PASS TO FULLBACK** (0.12 xG) OR **CARRY FORWARD** (0.10 xG)

Why not shoot?
- Shot xG (0.04) is lowest among options
- Distance is too far for midfielder
- Better to progress the ball (pass or carry)

### Decision Process (Footballer's Perspective)
1. Receive ball with space (28 yards out)
2. Scan: Space ahead, striker advancing, fullback on wing
3. Quick calculation: "Shoot or keep moving?"
4. Check options: Shot is poor (0.04). Better options available (fullback pass 0.12, carry forward 0.10).
5. **Decision: PASS TO FULLBACK** or **CARRY FORWARD**
6. Progress the ball while maintaining possession
7. Result: Better scoring opportunity created in next few seconds

### Coaching Points
1. **Young players over-shoot from distance**: Teaching shot selection prevents this
2. **Carrying is valuable**: Sometimes progressing the ball (carrying) is better than passing
3. **Space management**: With space ahead, move forward (pass, carry, or combo)
4. **Midfielder discipline**: Midfielders aren't strikers. Their role is to progress the ball, not shoot

---

## Decision-Making Training Framework

### Training Drills

**Drill 1: Video Analysis**
- Show video clips of players making shot selection decisions
- Pause before decision, ask: "Shoot or pass? Why?"
- Discuss xG values of different options
- Show what actually happened, analyze decision quality

**Drill 2: Scenario Practice (Small-Sided)**
- 4v4 or 5v5 game
- Coach calls out scenarios: "Space on wing, striker in box, fullback overlapping. What do you do?"
- Freeze play after player decision, discuss quality

**Drill 3: Pressure Decision-Making**
- Player makes quick decisions under time pressure
- Multiple scenarios back-to-back (decisions per minute)
- Builds decision-making speed under pressure

**Drill 4: Position-Specific Decision-Making**
- Striker training: Shoot vs. pass in penalty area scenarios
- Midfielder training: Shot selection from distance
- Winger training: When to shoot vs. cross vs. pass

### Teaching Points by Position

**Striker Shot Selection:**
- High bar for shooting (must be in good position, high xG)
- Passing to unmarked players is often better
- Composure when shooting (placement, not panic)

**Midfielder Shot Selection:**
- Very selective about shooting (long-range is low-value)
- Passing is primary responsibility
- Shoot only when high-quality opportunity

**Winger Shot Selection:**
- Very rarely shoot from wide position (low xG)
- Crossing or passing to fullback is almost always better
- Shoot only when angle improves significantly

**Fullback Shot Selection:**
- Even more selective than winger (defensive role)
- Crosses usually better than shots
- Shoot only when extremely clear opportunity

### Data Metrics

| Metric | Good Target | Elite Target |
|--------|---|---|
| **Shot xG average** | 0.12 | 0.18 |
| **Passing xG average** | 0.08 | 0.10 |
| **Shot selection accuracy** | Player takes high-xG shots, passes when xG is low | Very high consistency |
| **Possession retention** | 80%+ | 85%+ |

## Key Principles to Reinforce

1. **xG is the framework**: High xG options are usually better than low xG
2. **Passing creates value**: Often passing to better-positioned teammate creates more xG than shooting
3. **Position matters**: Strikers shoot more. Midfielders pass more. Fullbacks defend more.
4. **Time constraints**: Tight pressure → faster decision. Space available → time to find best option
5. **Consequence**: Near own goal → be conservative. Attacking position → can be aggressive
6. **Composure**: Even with perfect decision, execution matters (first touch, shot placement)

## Sources
- Elite shot selection: Karim Benzema (understands when to shoot), Harry Kane (shoot vs. pass judgment), Sergio Agüero (clinical finishing decisions)
- Analytics: StatsBomb xG model (shot quality quantification), Expected Assists (xA) from passing
- Coaching: Pep Guardiola's decision-making framework, Liverpool pressing decision triggers
