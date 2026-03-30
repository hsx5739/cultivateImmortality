## 1. Data Foundation

- [x] 1.1 Define the local data models for wellness tasks, encouragement lines, and level thresholds used by the demo.
- [x] 1.2 Create the static task library with exactly 100 tasks covering the five required wellness categories.
- [x] 1.3 Create the predefined encouragement library with 12 to 20 companion messages and the fixed level threshold table.
- [x] 1.4 Implement deterministic homepage selection logic that exposes 4 to 6 tasks from the static task library.

## 2. Dashboard Structure

- [x] 2.1 Build the single-page dashboard shell with the top info area, companion area, task area, growth feedback area, and ambient feedback area.
- [x] 2.2 Implement the virtual companion presentation so the page shows the “养元灵使” identity, current encouragement line, and switch-encouragement control.
- [x] 2.3 Apply the demo visual direction for a light healing Chinese-inspired style with clear hierarchy around the companion, tasks, and growth feedback.

## 3. Interactive Progression

- [x] 3.1 Implement homepage task cards with completion actions and completed-state rendering.
- [x] 3.2 Wire task completion to update total养元值, refresh the displayed encouragement line, and show immediate completion feedback.
- [x] 3.3 Implement level calculation and progress display from the threshold table, including explicit upgrade feedback when a threshold is crossed.

## 4. Demo Polish And Verification

- [x] 4.1 Add lightweight transitions or ambient effects for encouragement changes, completion feedback, and level-up moments without introducing heavy animation dependencies.
- [x] 4.2 Verify the homepage remains presentation-ready across desktop and mobile widths and that all required sections stay readable.
- [x] 4.3 Validate the implementation against the proposal and specs, confirming the single-page demo, static content counts, task completion loop, and level progression behaviors all work as specified.

## 5. Camera Verification

- [x] 5.1 Update the dashboard spec and design so task completion is gated by local camera-based action verification.
- [x] 5.2 Add a camera verification area with permission handling, live preview, and verification status messaging.
- [x] 5.3 Replace direct click-to-complete with a verification flow that detects enough movement before marking a task complete.
- [x] 5.4 Validate camera-unavailable, verification-failed, and verification-success states, then mark this updated flow complete.

## 6. System Quest Mode

- [x] 6.1 Update the specs and design so tasks are presented as novel-style system quests with visible rewards and penalties.
- [x] 6.2 Add penalty fields and system-style copy to the local quest data model and task UI.
- [x] 6.3 Apply failed-verification penalties to cultivation progress without allowing negative progress.
- [x] 6.4 Validate the revised reward/penalty loop and mark the new system-task flow complete.

## 7. Progress Persistence

- [x] 7.1 Update the specs and design so progress is restored and saved through backend persistence APIs.
- [x] 7.2 Add a minimal backend service with file-based storage and endpoints for reading and saving progress.
- [x] 7.3 Connect frontend initialization and state updates to the backend progress APIs.
- [x] 7.4 Document and validate the persisted progress flow, including reload behavior.
