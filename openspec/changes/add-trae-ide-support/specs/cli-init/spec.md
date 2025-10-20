# CLI Init Specification Delta

## MODIFIED Requirements

### Requirement: AI Tool Configuration
The command SHALL configure AI coding assistants with OpenSpec instructions using a grouped selection experience so teams can enable native integrations while always provisioning guidance for other assistants.

#### Scenario: Prompting for AI tool selection
- **WHEN** run interactively
- **THEN** present a multi-select wizard that separates options into two headings:
  - **Natively supported providers** shows each available first-party integration (Claude Code, Cursor, OpenCode, Trae IDE, …) with checkboxes
  - **Other tools** explains that the root-level `AGENTS.md` stub is always generated for AGENTS-compatible assistants and cannot be deselected
- **AND** mark already configured native tools with "(already configured)" to signal that choosing them will refresh managed content
- **AND** keep disabled or unavailable providers labelled as "coming soon" so users know they cannot opt in yet
- **AND** allow confirming the selection even when no native provider is chosen because the root stub remains enabled by default
- **AND** change the base prompt copy in extend mode to "Which natively supported AI tools would you like to add or refresh?"

## ADDED Requirements

### Requirement: Trae IDE Configuration
The command SHALL configure Trae IDE with OpenSpec instructions by managing the project rules file.

#### Scenario: Configuring Trae IDE
- **WHEN** Trae IDE is selected during initialization
- **THEN** create or update `.trae\rules\project_rules.md` file in the project root
- **AND** populate the file with OpenSpec-specific instructions wrapped in managed markers
- **AND** preserve any existing content outside the OpenSpec managed block

#### Scenario: Creating new Trae project rules file
- **WHEN** `.trae\rules\project_rules.md` does not exist
- **THEN** create the directory structure `.trae\rules\` if it doesn't exist
- **AND** create the file with OpenSpec content wrapped in markers:
```markdown
<!-- OPENSPEC:START -->
# OpenSpec Instructions for Trae IDE

This project uses OpenSpec to manage AI assistant workflows.

## Quick Reference
- Full guidance: `@/openspec/AGENTS.md`
- Create proposals: Use OpenSpec change workflow
- Validate changes: `openspec validate --strict`

## Project Rules Integration
When working with OpenSpec in Trae IDE:
1. Always read `@/openspec/AGENTS.md` for complete instructions
2. Follow the three-stage workflow: Create → Implement → Archive
3. Use `openspec` commands for validation and management

Keep this managed block so 'openspec update' can refresh the instructions.
<!-- OPENSPEC:END -->
```

#### Scenario: Updating existing Trae project rules file
- **WHEN** `.trae\rules\project_rules.md` already exists
- **THEN** locate the OpenSpec managed block between `<!-- OPENSPEC:START -->` and `<!-- OPENSPEC:END -->` markers
- **AND** replace only the content within the managed block
- **AND** preserve all user-authored content outside the managed markers
- **AND** if no managed block exists, append the OpenSpec section to the end of the file

#### Scenario: Detecting Trae IDE availability
- **WHEN** checking if Trae IDE is available for configuration
- **THEN** return true if the `.trae` directory exists in the project root
- **OR** if the user explicitly selects Trae IDE (allowing manual setup)
- **AND** mark as "(already configured)" if `.trae\rules\project_rules.md` already contains OpenSpec markers