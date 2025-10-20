# CLI Update Specification Delta

## MODIFIED Requirements

### Requirement: Refresh existing slash command files
The command SHALL refresh existing slash command files for configured tools without creating new ones.

#### Scenario: Refreshing Trae IDE configuration
- **WHEN** `.trae\rules\project_rules.md` exists and contains OpenSpec managed markers
- **THEN** update the content within the `<!-- OPENSPEC:START -->` and `<!-- OPENSPEC:END -->` markers
- **AND** preserve all user-authored content outside the managed block
- **AND** maintain the file's existing structure and formatting

#### Scenario: Skipping unconfigured Trae IDE
- **WHEN** `.trae\rules\project_rules.md` does not exist
- **OR** the file exists but does not contain OpenSpec managed markers
- **THEN** skip Trae IDE configuration refresh
- **AND** do not create new Trae IDE configuration files

## ADDED Requirements

### Requirement: Trae IDE Update Support
The command SHALL update Trae IDE project rules when they are already configured with OpenSpec.

#### Scenario: Updating Trae project rules content
- **WHEN** updating an existing Trae IDE configuration
- **THEN** replace the managed block content with the latest OpenSpec instructions template
- **AND** ensure the updated content includes current OpenSpec command references
- **AND** maintain compatibility with Trae IDE's project rules format

#### Scenario: Handling missing managed markers
- **WHEN** `.trae\rules\project_rules.md` exists but lacks OpenSpec managed markers
- **THEN** log a warning that the file exists but is not managed by OpenSpec
- **AND** skip updating the file to avoid corrupting user content
- **AND** suggest running `openspec init` to properly configure Trae IDE support