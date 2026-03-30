## ADDED Requirements

### Requirement: Demo provides a complete static wellness task library
The system SHALL include a static task library of exactly 100 tasks for the demo, and each task MUST define `id`, `title`, `description`, `category`, `reward`, `penalty`, and `completed` fields.

#### Scenario: Static task library is loaded for the demo
- **WHEN** the application initializes its local content data
- **THEN** the system has exactly 100 task records available with the required fields populated

### Requirement: Task library covers the required wellness categories
The system SHALL classify every task into one of the following categories: 身体唤醒类, 呼吸调节类, 饮食节律类, 情绪修复类, 环境整理类.

#### Scenario: A user reviews task metadata
- **WHEN** task content is inspected in the application data or UI
- **THEN** every task category belongs to one of the five approved wellness categories

### Requirement: Homepage displays a limited subset of the task library
The system SHALL display only 4 to 6 tasks on the homepage at a time while keeping the remainder of the 100-task library available as static demo content.

#### Scenario: User views today's tasks on the homepage
- **WHEN** the homepage renders its task cards
- **THEN** the system displays no fewer than 4 and no more than 6 task cards sourced from the static task library

### Requirement: Quest content includes system-style framing
The system SHALL phrase available tasks as system-issued quests and pair each quest with a visible reward and penalty so the interface feels like a cultivation-novel system panel instead of a neutral checklist.

#### Scenario: User reads a quest card
- **WHEN** the homepage renders a quest card
- **THEN** the card includes system-style quest framing, the reward value, and the failure penalty value

### Requirement: Demo provides a predefined encouragement library
The system SHALL include a predefined library of no fewer than 12 and no more than 20 encouragement lines, and each encouragement line MUST define `id` and `text` fields.

#### Scenario: Encouragement content is initialized
- **WHEN** the application loads its encouragement content
- **THEN** the system has between 12 and 20 encouragement entries available with `id` and `text` values

### Requirement: Demo provides a fixed level threshold table
The system SHALL include a fixed level threshold table that defines at least five ordered levels beginning with “养元一阶” at 0 points and continuing with ascending threshold values for later levels.

#### Scenario: Growth data is evaluated
- **WHEN** the application computes current level and next level progress
- **THEN** the system reads from a static ordered threshold table with at least five levels and ascending point requirements
