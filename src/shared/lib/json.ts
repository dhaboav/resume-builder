import type { ResumeState } from './resume';

/**
 * Pure utility function to trigger native JSON downloads.
 * Single Responsibility: Handling browser file distribution.
 */
export function exportStateToJson(state: ResumeState, filename = 'resume-data.json') {
  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Pure utility to parse uploaded file strings into structurally valid state object maps.
 */
export function importStateFromJson(file: File): Promise<ResumeState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        // Senior-level defensive check: Validate payload shape roughly
        if (json && Array.isArray(json.sections)) {
          resolve(json as ResumeState);
        } else {
          reject(new Error('Invalid JSON structure: Missing sections schema.'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('File reading error.'));
    reader.readAsText(file);
  });
}
