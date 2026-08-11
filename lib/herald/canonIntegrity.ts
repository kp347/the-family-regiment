// lib/herald/canonIntegrity.ts

import { HeraldCanon } from "./index";

export interface CanonIntegrityIssue {
  type:
    | "duplicate-id"
    | "missing-related-entry"
    | "missing-version";

  entryId: string;

  relatedId?: string;
}

export function runCanonIntegrityCheck(): {
  valid: boolean;
  issues: CanonIntegrityIssue[];
} {
  const result = HeraldCanon.validate();

  const issues: CanonIntegrityIssue[] = [];

  for (const id of result.duplicateIds) {
    issues.push({
      type: "duplicate-id",
      entryId: id,
    });
  }

  for (const item of result.missingRelatedEntries) {
    issues.push({
      type: "missing-related-entry",
      entryId: item.entryId,
      relatedId: item.relatedId,
    });
  }

  for (const id of result.missingVersions) {
    issues.push({
      type: "missing-version",
      entryId: id,
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}