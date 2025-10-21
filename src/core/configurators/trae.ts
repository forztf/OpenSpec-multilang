import path from 'path';
import { ToolConfigurator } from './base.js';
import { FileSystemUtils } from '../../utils/file-system.js';
import { TemplateManager } from '../templates/index.js';
import { OPENSPEC_MARKERS } from '../config.js';

export class TraeConfigurator implements ToolConfigurator {
  name = 'Trae IDE';
  // Use forward slashes; Node will normalize on Windows
  configFileName = '.trae/rules/project_rules.md';
  // Always allow manual setup via selection; availability does not block configuration
  isAvailable = true;

  async configure(projectPath: string, openspecDir: string, language: string = 'en'): Promise<void> {
    const filePath = path.join(projectPath, this.configFileName);
    const dirPath = path.dirname(filePath);
    const content = TemplateManager.getTraeProjectRulesTemplate(language);

    // Determine mode by openspecDir: init passes a non-absolute (e.g., 'openspec'), update passes absolute
    const isUpdateMode = path.isAbsolute(openspecDir);

    // Ensure directory exists when we need to create or write
    await FileSystemUtils.createDirectory(dirPath);

    const startMarker = OPENSPEC_MARKERS.start;
    const endMarker = OPENSPEC_MARKERS.end;

    const managedBlock = `${startMarker}\n${content}\n${endMarker}`;

    const exists = await FileSystemUtils.fileExists(filePath);

    if (!exists) {
      // Create new file with managed block
      await FileSystemUtils.writeFile(filePath, managedBlock + '\n');
      return;
    }

    // File exists; decide how to update
    const existing = await FileSystemUtils.readFile(filePath);
    const hasStart = existing.includes(startMarker);
    const hasEnd = existing.includes(endMarker);

    if (hasStart && hasEnd && existing.indexOf(startMarker) < existing.indexOf(endMarker)) {
      // Replace content within markers using the common utility
      await FileSystemUtils.updateFileWithMarkers(filePath, content, startMarker, endMarker);
      return;
    }

    // No managed markers present
    if (isUpdateMode) {
      // Skip during update to avoid altering user content; optionally warn
      console.warn(
        "[OpenSpec] Trae project rules exist but are not OpenSpec-managed. Skipping update. Run 'openspec init' to configure."
      );
      return;
    }

    // Init mode: append managed block at the end, preserving user content
    const appended = existing.endsWith('\n') ? existing + '\n' + managedBlock + '\n' : existing + '\n\n' + managedBlock + '\n';
    await FileSystemUtils.writeFile(filePath, appended);
  }
}