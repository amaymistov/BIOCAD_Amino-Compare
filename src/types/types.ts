export type AminoAcid =
  'A' | 'R' | 'N' | 'D' | 'C' | 'E' | 'Q' | 'G' | 'H' |
  'I' | 'L' | 'K' | 'M' | 'F' | 'P' | 'S' | 'T' | 'W' | 'Y' | 'V' | '-';

export interface AlignmentResult {
  sequence1: string;
  sequence2: string;
}

export type FormDateRecord = Record<keyof AlignmentResult, string>