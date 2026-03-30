## ADDED Requirements

### Requirement: Dashboard presents a complete single-page demo experience
The system SHALL provide a single-page dashboard for “今日养元” that includes a top information area, a virtual companion area, a task area, a growth feedback area, and an ambient feedback area.

#### Scenario: User opens the demo homepage
- **WHEN** the user first enters the application
- **THEN** the system shows the product name, subtitle, current level, current养元值, virtual companion area, and today's task list on one page

### Requirement: Virtual companion area communicates character identity and encouragement
The system SHALL present the companion character as the primary visual focus, display the character name “养元灵使”, show one current encouragement line, and provide a control to switch to another encouragement line.

#### Scenario: User manually switches encouragement text
- **WHEN** the user activates the “换一句鼓励” control
- **THEN** the system replaces the displayed encouragement line with another predefined encouragement line and shows a lightweight visual transition

### Requirement: Tasks are presented as system-issued quests
The system SHALL present homepage tasks as novel-style system quests with explicit quest framing, target behavior, reward value, and failure penalty so the user can understand both gain and loss before starting verification.

#### Scenario: User reviews the current quest list
- **WHEN** the homepage renders available tasks
- **THEN** each task card shows system-style quest wording, reward information, and the penalty that applies if verification fails

### Requirement: Task completion requires camera-based action verification
The system SHALL require the user to pass a camera-based action verification flow before any displayed task can be marked as completed, and only a verified completion may add the configured reward to the user's total养元值 and present completion feedback.

#### Scenario: User completes a displayed task after verification
- **WHEN** the user activates the completion action for an incomplete displayed task and the camera verification flow detects enough movement for the guided action
- **THEN** the system marks the task as completed, increases total养元值 by the task reward, and displays a completion feedback message

### Requirement: Failed verification reduces cultivation progress
The system SHALL reduce the user’s current cultivation progress when a quest verification fails, and the failure penalty MUST be visible on the quest before verification begins.

#### Scenario: Quest verification fails
- **WHEN** the user starts a quest verification flow and the motion check does not reach the required threshold within the verification window
- **THEN** the system keeps the quest incomplete, deducts the configured penalty from current养元值 without dropping below zero, and shows a failure result explaining the lost cultivation progress

### Requirement: Dashboard provides local camera verification feedback
The system SHALL provide a local camera verification area that requests camera access, previews the live feed, communicates verification status, and blocks quest completion when camera access is unavailable or movement verification fails.

#### Scenario: Camera access is unavailable
- **WHEN** the user starts a task verification flow and the browser denies camera access or the device has no usable camera
- **THEN** the system keeps the task incomplete and shows an actionable message explaining that camera permission is required for completion

#### Scenario: Verification does not detect enough movement
- **WHEN** the user starts a task verification flow and the motion check does not reach the required threshold within the verification window
- **THEN** the system keeps the task incomplete, applies the configured penalty, and shows a retry-oriented verification result

### Requirement: Progress is restored from backend persistence
The system SHALL load the user’s last saved cultivation progress, task completion state, and current encouragement state from a backend persistence API when the page initializes.

#### Scenario: Returning user reopens the demo
- **WHEN** the application starts and a saved progress record exists in the backend
- **THEN** the system restores score, completed tasks, and current encouragement state from the saved progress before rendering the main dashboard

### Requirement: Progress is saved through backend APIs
The system SHALL persist progress changes through backend APIs after quest completion, quest failure, or other state changes that affect cultivation progress or task state.

#### Scenario: Progress changes after a quest result
- **WHEN** the user completes or fails a quest verification
- **THEN** the system sends the updated progress state to the backend and the backend stores it for future sessions

### Requirement: Task completion refreshes companion encouragement
The system SHALL refresh the companion encouragement line after a task completion so the companion appears responsive to user progress.

#### Scenario: Encouragement changes after task completion
- **WHEN** the user completes a task
- **THEN** the system updates the currently shown encouragement line to another predefined encouragement line

### Requirement: Dashboard shows level progression and upgrade feedback
The system SHALL calculate the current level from the configured threshold table, show progress toward the next level, and display an explicit upgrade message when a task completion crosses a level threshold.

#### Scenario: User reaches a higher level threshold
- **WHEN** a task completion causes total养元值 to meet or exceed the next level threshold
- **THEN** the system updates the displayed level and shows an upgrade feedback message indicating the new level
